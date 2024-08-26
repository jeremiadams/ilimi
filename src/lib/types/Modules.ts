export interface Modules {
	id: string
	title: string | null
	pathwayStatus: 'NOT_STARTED' | 'PENDING' | 'COMPLETED'
	description?: string | null
	content?: string | null
	pathwayId?: string | null
}
