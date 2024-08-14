import { z } from 'zod'

export const GenerateContentValidator = z.object({
	pathwayId: z.string(),
	moduleId: z.string(),
	moduleNumber: z.string(),
	moduleTitle: z.string(),
})
