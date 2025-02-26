export interface Options {
	id: string
	text: string
	is_correct: boolean
	is_selected: boolean
}

export interface Questions {
	id: string
	type: 'MULTIPLE_SELECT' | 'MULTIPLE_CHOICE'
	question: string
	options: Options[]
	explanation: string
}
