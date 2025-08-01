
import { useState } from 'react'
import './App.css'
import QuestionCard from './components/QuestionCard'
import { type QuestionState, fetchQuizQuestions, Difficulty } from './API';


export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}


const TOTAL_QUESTIONS = 10;

function App() {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true);


  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) {
        setScore(prev => prev + 1);
      }
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers(prev => [...prev, answerObject]);
    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    }
    else {
      setNumber(nextQuestion)
    }
  }

  return (
    <div className="bg-[url('/bg.jpg')] bg-cover bg-center h-screen w-full flex items-center justify-center px-5 py-5">
      <div className='bg-white w-full  m-auto shadow-2xl rounded-2xl max-w-2xl px-5 py-5'> 
        <h1 className='text-4xl text-center text-purple-400 font-bold mb-5'>Quiz App</h1>
        {
          gameOver || userAnswers.length === TOTAL_QUESTIONS ?
            <button className="start text-2xl w-full text-center text-white font-bold bg-green-500" onClick={startTrivia}>Start</button> : null
        }
        {
          !gameOver ? <p className='score text-center'>Score: {score} </p> : null
        }

        {
          loading ? <p className="Load">Loading Questions</p> : null
        }

        {!loading && !gameOver ? <QuestionCard
          questionNr={number + 1}
          totalQuestion={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        /> : null}
        {
          !gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ?
            <button className="next text-2xl w-full text-center text-white font-bold bg-green-500 py-1 rounded-2xl mt-5" onClick={nextQuestion}>Next</button> : null
        }

      </div>
    </div>
  )
}

export default App
