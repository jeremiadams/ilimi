import Quiz from '@/components/Quiz'
import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { notFound, redirect } from 'next/navigation'
import { FC } from 'react'

interface PageProps {
	params: {
		id: string
	}
}

const Page: FC<PageProps> = async ({ params }) => {
	const { id } = params

	const { getUser } = getKindeServerSession()
	const user = await getUser()

	if (!user || !user.id)
		redirect(`/auth-callback?origin=dashboard/pathways/quiz/${id}`)

	const singleQuiz = await db.quiz.findFirst({
		where: {
			id: id,
		},
		select: {
			isComplete: true,
			score: true,
			questions: {
				select: {
					id: true,
					type: true,
					question: true,
					explanation: true,
					options: {
						select: {
							id: true,
							text: true,
							is_correct: true,
							is_selected: true,
						},
					},
				},
			},
		},
	})

	if (!singleQuiz) notFound()
	return (
		<Quiz
			isComplete={singleQuiz.isComplete}
			finalScore={singleQuiz.score}
			questions={singleQuiz.questions}
			id={id}
		/>
	)
}

export default Page
