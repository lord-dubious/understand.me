import { embedMany, cosineSimilarity } from '@ai-sdk/voyage';
import { splitOnToken } from '../../utils/chunker';

let embeddings: number[][] = [];
let chunks: string[] = [];

export async function loadCorpus(texts: string[]): Promise<void> {
	chunks = texts.flatMap(t => splitOnToken(t, 500));
	embeddings = await embedMany({ model: 'voyage-embed', inputs: chunks });
}

export async function findSimilar(query: string, topK = 3): Promise<{ chunk: string; score: number }[]> {
	const qEmb = (await embedMany({ model: 'voyage-embed', inputs: [query] }))[0];
	return chunks
		.map((c, i) => ({ chunk: c, score: cosineSimilarity(qEmb, embeddings[i]) }))
		.sort((a, b) => b.score - a.score)
		.slice(0, topK);
}
