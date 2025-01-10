export interface ModulesType {
	id: string
	title: string | null
	pathwayStatus: 'NOT_STARTED' | 'PENDING' | 'COMPLETED'
	description?: string | null
	content?: string | null
	pathwayId?: string | null
	Section: SectionsType[]
}

export interface SectionsType {
	id: string
	title?: string | null
	content?: string | null
	moduleId: string | null

	pathwayStatus: 'NOT_STARTED' | 'PENDING' | 'COMPLETED'
}
