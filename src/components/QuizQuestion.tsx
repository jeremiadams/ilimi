import { FC } from 'react'
import { Questions } from '@/lib/types/QuestionsAndAnswers'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Checkbox } from './ui/checkbox'

interface QuizQuestionProps {
	question: Questions
	number: number
	checkSelected: (
		questionId: string,
		optionId: string,
		type: 'radio' | 'checkbox',
		checked: boolean
	) => void
	isComplete: boolean
	mark: boolean
}

const QuizQuestion: FC<QuizQuestionProps> = ({
	question,
	number,
	checkSelected,
	isComplete,
	mark,
}) => {
	return (
		<div className='py-5 flex flex-col gap-3 text-white'>
			<p className=' font-semibold text-lg'>
				{number + 1}. {question.question}
			</p>
			<div className='flex flex-col gap-2 items-start'>
				{question.type === 'MULTIPLE_CHOICE' ? (
					<RadioGroup
						className='text-white'
						disabled={mark || isComplete}
						onValueChange={(value) => {
							checkSelected(question.id, value, 'radio', false)
						}}
						value={
							isComplete &&
							!question.options.every((option) => option.is_selected === false)
								? question.options.filter(
										(option) => option.is_selected === true
								  )[0].id
								: undefined
						}
					>
						{question.options.map((option) => (
							<div
								key={option.id}
								className={`flex items-center space-x-2 bg-[#2C2C2F] rounded-md ${
									(isComplete || mark) && option.is_correct
										? 'bg-transparent border border-[#2D9E51]'
										: (isComplete || mark) &&
										  option.is_selected !== option.is_correct
										? 'bg-transparent border border-[#902826]'
										: !isComplete && !mark && option.is_selected
										? 'bg-transparent border border-[#7058D0]'
										: !isComplete &&
										  !mark &&
										  !option.is_selected &&
										  !question.options.every(
												(option) => option.is_selected === false
										  )
										? 'opacity-75'
										: ''
								}`}
							>
								<RadioGroupItem
									value={option.id}
									id={option.id}
									className={`ml-3
										${
											(isComplete || mark) &&
											!question.options.every(
												(option) => option.is_selected === false
											) &&
											option.is_correct
												? 'border-[#2D9E51] text-[#2D9E51] disabled:opacity-100'
												: (isComplete || mark) &&
												  question.options.every(
														(option) => option.is_selected === false
												  ) &&
												  option.is_correct
												? 'border-[#2D9E51] text-transparent disabled:opacity-100'
												: (isComplete || mark) &&
												  option.is_selected &&
												  !option.is_correct
												? 'border-[#902826] text-[#902826] disabled:opacity-100'
												: !isComplete && !mark && option.is_selected
												? 'border-[#7058D0] text-[#7058D0]'
												: 'border-white text-white'
										}
									`}
								/>
								<Label
									className=' py-3 pr-3 w-full cursor-pointer'
									htmlFor={option.id}
								>
									{option.text}
								</Label>
							</div>
						))}
					</RadioGroup>
				) : question.type === 'MULTIPLE_SELECT' ? (
					question.options.map((option) => (
						<div
							key={option.id}
							className={`flex items-center space-x-2 bg-[#2C2C2F] rounded-md ${
								(isComplete || mark) && option.is_correct
									? 'bg-transparent border border-[#2D9E51]'
									: (isComplete || mark) &&
									  option.is_selected !== option.is_correct
									? 'bg-transparent border border-[#902826]'
									: !isComplete && !mark && option.is_selected
									? 'bg-transparent border border-[#7058D0]'
									: !isComplete &&
									  !mark &&
									  !option.is_selected &&
									  !question.options.every((obj) => obj.is_selected === false)
									? 'opacity-75'
									: ''
							}`}
						>
							<Checkbox
								id={option.id}
								disabled={mark || isComplete}
								checked={option.is_selected}
								onCheckedChange={(checked) => {
									if (typeof checked === 'boolean') {
										checkSelected(question.id, option.id, 'checkbox', checked)
									}
								}}
								className={`ml-3
										${
											(isComplete || mark) && option.is_correct
												? 'border-[#2D9E51] text-[#2D9E51] data-[state=checked]:text-[#2D9E51] disabled:opacity-100'
												: (isComplete || mark) &&
												  option.is_selected !== option.is_correct
												? 'border-[#902826] text-[#902826] data-[state=checked]:text-[#902826] disabled:opacity-100'
												: (isComplete || mark) &&
												  question.options.every(
														(option) => option.is_selected === false
												  ) &&
												  option.is_correct
												? 'border-[#2D9E51] text-[#2D9E51] data-[state=checked]:text-[#2D9E51] disabled:opacity-100'
												: !isComplete && !mark && option.is_selected
												? 'border-[#7058D0] text-[#7058D0] data-[state=checked]:text-[#7058D0]'
												: 'border-white text-white'
										}
									`}
							/>
							<label
								htmlFor={option.id}
								className='text-sm font-medium leading-none  py-3 pr-3 w-full cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
							>
								{option.text}
							</label>
						</div>
					))
				) : null}
			</div>
			{(isComplete || mark) && (
				<p className='py-2 text-sm text-[#f1fafa]'>
					Explanation: {question.explanation}
				</p>
			)}
		</div>
	)
}

export default QuizQuestion
