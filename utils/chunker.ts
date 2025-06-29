export function splitOnToken(text: string, maxTokens: number): string[] {
	const tokens = text.split(/\s+/);
	const chunks: string[] = [];
	for (let i = 0; i < tokens.length; i += maxTokens) {
		chunks.push(tokens.slice(i, i + maxTokens).join(' '));
	}
	return chunks;
}
