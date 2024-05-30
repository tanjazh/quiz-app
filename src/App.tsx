import { Box, Flex, Image } from '@chakra-ui/react'
import './App.css'
import logoImg from './assets/logo.png'
import bubbleImg from './assets/bubble.png'
import { useState, useEffect } from 'react';
import { SetQuestQuantity } from './features/SetQuestQuantity';
import { SetQuestCategory } from './features/SetQuestCategory';
import { SetQuestDifficulty } from './features/SetQuestDifficulty'
import { FetchQuizParams, QuizType, QuizDifficulty, QuizCategory, QuizItem } from './Types/quiz-types';
import { QuizAPI } from './api/quiz-api'
import { PlayQuiz } from './features/PlayQuiz'
import { Score } from './features/Score';

enum Step {
  SetQuestQuantity,
  SetQuestCategory,
  SetQuestDifficulty,
  Play,
  Score,
}

export function App() {
  const [step, setStep] = useState<Step>(Step.SetQuestQuantity);
  //by setting initial value in useState, it prohibits from giving an error, that type is
  //undefined
  const [quizParams, setQuizParams] = useState<FetchQuizParams>({
    amount: 0,
    category: "",
    difficulty: QuizDifficulty.Mixed,
    type: QuizType.Multiple
  });
  const [category, setCategory] = useState<QuizCategory[]>([]);
  //useEffect is in charge of fetching the data from api
  // [] => renders once in the beginning
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await QuizAPI.fetchCategories();
        setCategory([{ id: -1, name: "Mixed" }, ...categories]);
      } catch (error) {
        console.log("Error fetching quiz categories:", error);
      }
    };

    fetchCategories();
  }, []);
  const [quiz, setQuiz] = useState<QuizItem[]>([])
  const [gameHistory, setGameHistory] = useState<boolean[]>([])

  //make sure, that the response have enough data for the quiz
  //first we need to load quiz before we play, duh
  //storing the whole quiz in a state, so we can use it in the PLAY component as whole
  const fetchQuizAndStartPlay = async (params: FetchQuizParams) => {
    try {
      const quizResponse = await QuizAPI.fetchQuiz(params);
      if (quizResponse.length > 0) {
        setQuiz(quizResponse);
        setStep(Step.Play);
      } else {
        alert("Couldn't find any questions in this category");
        setStep(Step.SetQuestQuantity);
      }
    } catch (error) {
      console.log("Error fetching quiz:", error);
      alert("Error fetching quiz");
      setStep(Step.SetQuestQuantity);
    }
  };

  const header = (
    <Flex justify="center">
      <Image height="50px" src={logoImg} />
    </Flex>
  );

  const renderScreenByStep = () => {
    switch (step) {
      case Step.SetQuestQuantity:
        return <SetQuestQuantity
          onClickNext={(amount: number) => {
            setQuizParams({ ...quizParams, amount })
            setStep(Step.SetQuestCategory);
          }}
          defaultValue={10}
          max={30} min={5}
          step={5} />;
      case Step.SetQuestCategory:
        return <SetQuestCategory
          category={category}
          onClickNext={(category: string) => {
            setQuizParams({ ...quizParams, category: category === "-1" ? "" : category })
            setStep(Step.SetQuestDifficulty);
          }} />;
      case Step.SetQuestDifficulty:
        return <SetQuestDifficulty
          onClickNext={(difficulty: QuizDifficulty) => {
            const params = {
              ...quizParams, difficulty
            }
            //restructure setQuizParams, so we can use them in the next step without add rendering
            setQuizParams(params);
            fetchQuizAndStartPlay(params)
          }} />;
      case Step.Play:
        return <PlayQuiz quiz={quiz} onFinished={(gameHistory: boolean[]) => {
          setGameHistory(gameHistory)
          setStep(Step.Score)
        }} />;
      case Step.Score:
        return <Score history={gameHistory} />
      default:
        return null;
    }
  }

  return (
    <div>
      <Box py={"5"} height={"100%"}>
        {header}
        <Image
          src={bubbleImg}
          position={"absolute"}
          zIndex={-1}
          right={-120}
          top={100} />
        <Box marginTop={100}>
          {renderScreenByStep()}
        </Box>
      </Box>
    </div>
  )
}

