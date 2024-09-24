import { OpenAI } from 'openai'

export const openai = new OpenAI({
	project: process.env.OPENAI_API_PROJECT_ID,
	apiKey: process.env.OPENAI_API_KEY,
})
