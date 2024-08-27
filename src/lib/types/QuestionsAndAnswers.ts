export interface QuestionsAndAnswers {
	question: string
	answers: {
		answer: string
		isCorrect: boolean
		id?: string
		isSelected?: boolean
	}[]
}
