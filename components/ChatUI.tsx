import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { chatWithUdine } from '../services/ai/chat';

/**
 * Displays a chat interface that allows users to interact with an AI assistant.
 *
 * Renders a scrollable conversation history and an input field for sending messages. User messages and AI responses are displayed with distinct styles.
 *
 * @returns The rendered chat UI component.
 */
export default function ChatUI() {
	const [history, setHistory] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
	const [input, setInput] = useState<string>('');

	const send = async () => {
		if (!input.trim()) return;
		const response = await chatWithUdine(history, input);
		setHistory([
			...history,
			{ role: 'user', content: input },
			{ role: 'assistant', content: response }
		]);
		setInput('');
	};

	return (
		<View style={styles.container}>
			<ScrollView style={styles.history}>
				{history.map((m, i) => (
					<Text key={i} style={m.role === 'assistant' ? styles.assistant : styles.user}>
						{m.role === 'assistant' ? 'Udine: ' : 'You: '}{m.content}
					</Text>
				))}
			</ScrollView>
			<View style={styles.inputRow}>
				<TextInput
					style={styles.input}
					value={input}
					onChangeText={setInput}
					placeholder="Type…"
				/>
				<Button title="Send" onPress={send} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, width: '100%' },
	history: { flex: 1, marginBottom: 8 },
	user: { color: '#3B82F6', marginVertical: 4 },
	assistant: { color: '#E2E8F0', marginVertical: 4 },
	inputRow: { flexDirection: 'row', alignItems: 'center' },
	input: { flex: 1, borderColor: '#ccc', borderWidth: 1, borderRadius: 4, padding: 8, marginRight: 8 },
});
