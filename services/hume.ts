import { HumeClient } from 'hume';

export class HumeService {
	private client = new HumeClient({ apiKey: process.env.EXPO_PUBLIC_HUME_API_KEY });

	async analyzeText(text: string) {
		const resp = await this.client.empathicVoice.analyzeText({ text, models: ['language'] });
		return resp;
	}
}
