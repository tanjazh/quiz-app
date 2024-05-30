import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'

export function Score(props: { history: boolean[] }) {

    const rightAnswers = props.history.filter((isValidAnswer: boolean) => isValidAnswer === true).length;

    return (
        <Flex direction={"column"} alignItems={"center"}>
            <Heading fontSize={"3xl"}>
                Score
            </Heading>
            <Heading fontSize={"xl"} marginTop={5}>
                {rightAnswers}/{props.history.length}
            </Heading>
        </Flex>
    )
}
