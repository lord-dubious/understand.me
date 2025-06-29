import { generateText } from 'ai'
import { google } from '@ai-sdk/google'

/**
 * Generates a response from Udine, an AI conflict-resolution specialist, based on the provided conversation history and a new user message.
 *
 * @param history - The conversation history as an array of message objects with roles and content
 * @param message - The new user message to continue the conversation
 * @returns The AI-generated reply as a string
 */
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
