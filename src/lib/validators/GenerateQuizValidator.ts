import { z } from 'zod'

export const GenerateQuizValidator = z.object({
	pathwayId: z.string(),
	pathwayTitle: z.string(),
	difficulty: z.string(),
})
