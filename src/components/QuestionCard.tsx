import React from 'react'
import { type AnswerObject } from '../App'

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestion: number;
}

const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNr,
    totalQuestion,
}) => {

    return (
        <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 mt-5 text-center">
            <p className="number text-end">
                Question: {questionNr} / {totalQuestion}
            </p>
            <p className='text-lg font-medium text-gray-700 mb-4' dangerouslySetInnerHTML={{ __html: question }}></p>
            <div className='grid grid-cols-1 gap-4'>
                {answers.map(answer => {
                    const isSelected = userAnswer?.answer === answer;
                    const isCorrect = userAnswer?.correctAnswer === answer;
                    return (


                        <button className={`py-3 px-6 rounded-lg font-medium border 
                    ${userAnswer ? isCorrect ? 'bg-green-100 border-green-500 text-green-700' :
                                isSelected ? 'bg-red-100 border-red-500 text-red-700' : 'bg-gray-100 border-gray-300 text-gray-700'
                                : 'hover:bg-blue-100 border-blue-500 text-blue-700'
                            }
                    `} disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{ __html: answer }}></span>
                        </button>

                    )
                }
                )}
            </div>

        </div>
    )
}

export default QuestionCard
