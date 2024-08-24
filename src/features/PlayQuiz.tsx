import { useEffect, useState } from 'react';
import { QuizItem } from '../Types/quiz-types';
import { Flex, HStack, Heading, Radio, RadioGroup, SimpleGrid, Text, Box } from '@chakra-ui/react';
import Lottie from 'lottie-react';
import validAnim from '../assets/lottie/valid.json';
import invalidAnim from '../assets/lottie/invalid.json';

export function PlayQuiz(props: { quiz: QuizItem[], onFinished: (displayProgress: boolean[]) => void }) {
    const [currentQuizItemIndex, setCurrentQuizItemIndex] = useState<number>(0);
    const currentQuizItem: QuizItem = props.quiz[currentQuizItemIndex];
    const [answer, setAnswer] = useState<string>();
    const [questionStatus, setQuestionStatus] = useState<"valid" | "invalid" | "unanswered">("unanswered");
    const [history, setHistory] = useState<boolean[]>([]);

    const [availableAnswers, setAvailableAnswers] = useState<string[]>([]);

    //gets triggered any time currentItem is updated
    useEffect(() => {
        setAvailableAnswers([currentQuizItem.correct_answer, ...currentQuizItem.incorrect_answers].sort(() => Math.random() - 0.5))
    }, [currentQuizItemIndex]);

    useEffect(() => {
        if (answer) {
            const isValid = isValidAnswer(answer)
            if (isValid) {
                setQuestionStatus("valid")
            } else {
                setQuestionStatus("invalid")
            }
            //creates an array of all previous answers
            setHistory([...history, isValid])
        }
    }, [answer]);

    const isValidAnswer = (answer: string): boolean => {
        return answer === currentQuizItem.correct_answer;
    };

    const progressBar = () => {
        return (
            <HStack>
                {props.quiz.map((_, i) => {
                    return <Box
                        key={i}
                        marginBottom={10}
                        height={3}
                        width={25}
                        backgroundColor={
                            i >= currentQuizItemIndex
                                ? "gray"
                                : history[i]
                                    ? "green"
                                    : "red"} />
                })}
            </HStack>
        )
    };

    const radioList = availableAnswers.map((availableAnswer: string) => {
        return <Radio
            key={availableAnswer}
            value={availableAnswer}>
            <Text
                color={
                    questionStatus === "unanswered"
                        ? "black"
                        : isValidAnswer(availableAnswer)
                            ? "green"
                            : "red"}
                dangerouslySetInnerHTML={{ __html: availableAnswer }}></Text>
        </Radio>
    });

    return (
        <Flex
            direction={"column"}
            alignItems={"center"}
            justify={"center"}>
            {progressBar()}
            <Heading
                fontSize={"3xl"}
                marginTop={0}
                marginBottom={20}
                //way to inject html directly without weird symbols
                dangerouslySetInnerHTML={{ __html: currentQuizItem.question }} />
            <RadioGroup value={answer} onChange={questionStatus === "unanswered" ? setAnswer : undefined}>
                <SimpleGrid spacing={4} columns={2}>
                    {radioList}
                </SimpleGrid>
            </RadioGroup>
            <Lottie
                loop={false}
                style={{ marginTop: 100, height: 150 }}
                animationData={
                    questionStatus === "unanswered"
                        ? null
                        : questionStatus === "valid"
                            ? validAnim
                            : invalidAnim}
                onComplete={() => {
                    if (currentQuizItemIndex < props.quiz.length - 1) {
                        setQuestionStatus("unanswered")
                        setCurrentQuizItemIndex(currentQuizItemIndex + 1)
                    } else {
                        props.onFinished(history)
                    }
                }} />
        </Flex>
    )
}
