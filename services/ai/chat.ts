import { generateText } from 'ai'
import { google } from '@ai-sdk/google'

export async function chatWithUdine(
	history: { role: 'user' | 'assistant'; content: string }[],
	message: string
): Promise<string> {
	const { text } = await generateText({
		model: google.chat('gemini-2.5-flash'),
		system: 'You are Udine, a conflict-resolution specialist.',
		prompt: [...history, { role: 'user', content: message }]
	})
	return text
}
