# 🧠 Analysis Engine – Multi-Step Orchestration

This document explains **how each turn of the conversation is processed** end-to-end using our current stack: **Vercel AI SDK + Google Gemini**, optional Voyage embeddings for RAG, and ElevenLabs for voice. The goal is clarity—not code dumps—so you can picture the flow before writing functions.

> Terminology
> * **Turn** – one full round-trip: user speaks → Udine replies.
> * **Engine** – the functions in `services/ai/` that transform voice into a final answer.

---
## 0. Bird’s-Eye Pipeline
```
Voice ► STT ► Enrich ► RAG ► Gemini ► Tools ► TTS
```
1. **STT** – Convert speech to plain text.  
2. **Enrich** – Add speaker info, emotion, and recent history.  
3. **RAG** – Retrieve relevant knowledge snippets.  
4. **Gemini** – Produce the reply + any tool calls.  
5. **Tools** – Execute client-side actions (brightness, etc.).  
6. **TTS** – Speak via ElevenLabs.

Each box is a *function*; chaining them keeps things testable and lets us swap providers later.

---
## 1. Speech-to-Text (STT)
* **Where** `services/ai/stt.ts`  
* **How** `await whisper.transcribe(blob)` (or Google Speech API fallback).
* **Why modular?** Mobile vs web may record different formats; we keep STT isolated.

```ts
export async function speechToText(blob: Blob): Promise<string> {
	// 1. compress if needed 2. send to Whisper 3. return transcript
}
```

---
## 2. Enrichment Layer
Build a `ChatContext` object:
```ts
{
	userId,
	profile: { name, preferences },
	emotion: latestEmotion,  // from Hume
	recent: lastNMessages,
}
```
Why? Gemini answers improve when it sees who’s speaking and recent flow.

---
## 3. Retrieval-Augmented Generation (RAG)
Below is a **complete recipe** that keeps everything client-side, no servers, using only Vercel AI SDK utilities.

### 3.1 File Ingestion (one-time per upload)
```ts
import { embedMany } from 'ai';
import { v4 as uuid } from 'uuid';

export async function ingestFile(userId: string, file: File) {
	const text = await extractText(file);           // pdf-parse / txt / md
	const chunks = chunk(text, 800, 200);           // utils/chunker.ts
	const ids    = chunks.map(() => uuid());
	const vecs   = await embedMany({ model: 'voyage-2', values: chunks });
	await vectorStore.putMany(userId, ids, vecs, chunks);
}
```

*Vectors are saved in IndexedDB (web) or Expo FileSystem + SQLite (native).*  
No LangChain DB drivers needed—our `vectorStore` wrapper is ~30 lines.

### 3.2 Turn-Time Retrieval
```ts
import { cosineSimilarity, embedMany } from 'ai';

export async function ragRetrieve(question: string, userId: string) {
	const [qVec] = await embedMany({ model: 'voyage-2', values: [question] });
	const cand   = await vectorStore.getNearest(userId, qVec, 50);
	return cand
		.map(c => ({ ...c, score: cosineSimilarity(qVec, c.vector) }))
		.sort((a, b) => b.score - a.score)
		.slice(0, 3)
		.map(t => t.chunkText);
}
```

### 3.3 Packing Context into Gemini Prompt
```ts
const passages = await ragRetrieve(userInput, userId);

const response = await generateStream({
	model: gemini1p5,
	prompt: [
		{ role: 'system', content: SYSTEM_PROMPT },
		...history,
		{ role: 'assistant', content: passages.map((p,i)=>`### Context ${i+1}\n${p}`).join('\n\n') },
		{ role: 'user', content: userInput }
	],
	functions: toolSchemas
});
```

This keeps full streaming and tool-calling while giving Gemini clear, citable context blocks.

1. Split docs → chunks (`utils/chunker.ts`).
2. `embedMany(chunks)` with Voyage.
3. Store vectors in local IndexedDB.
4. At turn time: `cosineSimilarity(queryEmbed, topK)`.
5. Return top passages; attach to `ChatContext`.

> **Note** Vercel AI SDK ships `embedMany` & `cosineSimilarity` helpers, so no heavy LangChain needed.

---
## 4. Gemini Prompt Assembly
```ts
import { generateStream } from "ai";

const response = await generateStream({
	model: gemini1p5,
	prompt: [
		{role: 'system', content: SYSTEM_PROMPT},
		...context.recent,
		{role: 'assistant', content: passagesMarkup},
		{role: 'user', content: transcript},
	],
	functions: toolSchemas,  // brightness, etc.
});
```
* **SYSTEM_PROMPT** explains Udine personality + tool usage rules.
* `functions` lets Gemini emit tool calls (`{"name":"flash_screen","arguments":{...}}`).
* The stream feeds UI for instant feedback.

---
## 5. Tool Execution
In `services/ai/tools.ts` map each schema to an **actual** client-side function. The UI listens to streamed tool calls and runs them (battery level, screen flash…).

---
## 6. Text-to-Speech (TTS)
* Parse streamed tokens into plain text.
* Send to ElevenLabs `speak()` with Udine voice ID.

Because TTS starts while the tail of the reply is still generating, perceived latency stays low.

---
## 7. Error & Retry Strategy
* Any stage can throw; we surface a toast + keep transcript so user can resend.
* On bad network, STT + RAG still work offline; only Gemini needs connectivity – show offline banner.

---
## 8. Extending the Chain
Want sentiment-aware music? Add a **“Mood Audio”** step *after* emotion detection but *before* TTS. Because everything is modular, you just insert a new function in the chain.

---
---
## 9. End-of-Conversation Insight & Resolution Planner
After several turns—or when the user says "wrap up"—we run an **insight pass** that looks at *both* sides of the dialogue and produces structured data.

1. **Transcript Collation** – stitch the final `history` array into a markdown transcript.
2. **Intent Extraction** – prompt Gemini with an `extractIntents` function schema to pull:
   * open questions
   * promised actions
   * sentiment trend
3. **Action Plan Drafting** – if there are open items, feed them back to Gemini with the function schema `draftActionPlan` (returns checklist).
4. **Storage** – save `insights.json` + `action_plan.json` in `IndexedDB` (web) or `FileSystem` (native). These can later be surfaced in a "Past Sessions" screen.

```ts
export async function runResolutionPlanner(history: Message[]): Promise<ResolutionBundle> {
	const transcript = history.map(h => `**${h.role}:** ${h.content}`).join('\n');

	const { intents } = await generateJSON({
		model: gemini1p5,
		prompt: TRANSCRIPT_INTENT_PROMPT,
		jsonSchema: INTENT_SCHEMA,
		input: { transcript },
	});

	const { actionList } = await generateJSON({
		model: gemini1p5,
		prompt: ACTION_PLAN_PROMPT,
		jsonSchema: ACTION_SCHEMA,
		input: { intents },
	});

	await db.put('insights', { id: uuid7str(), transcript, intents, actionList });
	return { intents, actionList };
}
```

---
## 10. Sample Glue – Putting It All Together
A helper that chains everything with `pipeAsync` style:

```ts
export async function processTurn(blob: Blob) {
	const text = await speechToText(blob);
	const context = await enrichContext(text);
	const passages = await ragRetrieve(text);
	const { replyStream, toolStream } = await askGemini(text, context, passages);
	await runToolExecutor(toolStream);
	scheduleTTS(replyStream);
}
```

*If* the session ends, call `runResolutionPlanner(history)`.

---
## TL;DR
Our analysis engine is a **pipeline of small, single-purpose functions** glued together by Vercel AI SDK streams. This keeps code readable, lets us unit-test each stage, and avoids heavyweight LangChain graphs while still supporting tool-calling, RAG, and voice reply.
