import { embedMany, cosineSimilarity } from '@ai-sdk/voyage';
import { splitOnToken } from '../../utils/chunker';

let embeddings: number[][] = [];
let chunks: string[] = [];

/**
 * Loads a corpus of texts by splitting them into chunks and generating embeddings for each chunk.
 *
 * Each input text is divided into segments of up to 500 tokens. Embeddings for all resulting chunks are generated using the 'voyage-embed' model and stored for later similarity search.
 *
 * @param texts - An array of input texts to be processed and embedded
 */
export async function loadCorpus(texts: string[]): Promise<void> {
	chunks = texts.flatMap(t => splitOnToken(t, 500));
	embeddings = await embedMany({ model: 'voyage-embed', inputs: chunks });
}

/**
 * Finds and returns the top most similar text chunks to a given query based on vector embeddings.
 *
 * @param query - The input string to compare against the loaded text chunks
 * @param topK - The number of most similar chunks to return (default is 3)
 * @returns An array of objects containing the most similar chunk and its similarity score, sorted in descending order by score
 */
export async function findSimilar(query: string, topK = 3): Promise<{ chunk: string; score: number }[]> {
	const qEmb = (await embedMany({ model: 'voyage-embed', inputs: [query] }))[0];
	return chunks
		.map((c, i) => ({ chunk: c, score: cosineSimilarity(qEmb, embeddings[i]) }))
		.sort((a, b) => b.score - a.score)
		.slice(0, topK);
}
