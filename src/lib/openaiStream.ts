import { createOpenAI } from '@ai-sdk/openai'

export const openai = createOpenAI({
	project: process.env.OPENAI_API_PROJECT_ID,
	apiKey: process.env.OPENAI_API_KEY,
})
