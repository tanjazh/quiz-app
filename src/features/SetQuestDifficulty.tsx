import { Flex, Heading, Button, RadioGroup, Radio, VStack } from '@chakra-ui/react'
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useState } from 'react';
import { QuizDifficulty } from '../Types/quiz-types';

export function SetQuestDifficulty(props: { onClickNext: (difficulty: QuizDifficulty) => void }) {
    const [difficulty, setDifficulty] = useState<QuizDifficulty>(QuizDifficulty.Mixed)

    const radioList = Object.values(QuizDifficulty).map((difficulty: QuizDifficulty) => {
        return (
            <Radio key={difficulty} value={difficulty}>
                <span style={{ textTransform: "capitalize" }}>
                    {difficulty === QuizDifficulty.Mixed ? "Mixed" : difficulty}
                </span>
            </Radio>
        )
    })
    return (
        <div>
            <Flex direction={"column"} alignItems={"center"}>
                <Heading as={"h1"} fontSize={"3xl"} position={"relative"} top={"-50px"}>
                    Choose difficulty level:
                </Heading>
            </Flex>
            <RadioGroup value={difficulty} onChange={setDifficulty as (difficulty: string) => void}>
                <VStack>
                    {radioList}
                </VStack>
            </RadioGroup>
            <Button
                onClick={() => props.onClickNext(difficulty)}
                position={"absolute"}
                top={"80%"}
                right={"10%"}
                rightIcon={<ArrowForwardIcon />}>
                PLAY
            </Button>
        </div>
    )
}
