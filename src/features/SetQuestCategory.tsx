import { useState } from "react";
import { QuizCategory } from '../Types/quiz-types';
import { Flex, Heading, Button, SimpleGrid, RadioGroup, Radio } from '@chakra-ui/react';
import { ArrowForwardIcon } from "@chakra-ui/icons";

export function SetQuestCategory(props: {
  category: QuizCategory[];
  onClickNext: (categoryID: string) => void;
}) {

  const [selectedCategoryID, setSelectedCategoryID] = useState<string>(props.category[0].id.toString());


  //since id=number and value expects string!
  const radioList = props.category.map((category: QuizCategory) => {
    return <Radio value={category.id.toString()} key={category.id} fontSize={"xs"}>{category.name}</Radio>
  });

  return (
    <div>
      <Flex direction={"column"} alignItems={"center"}>
        <Heading as={"h1"} fontSize={"3xl"} position={"relative"} top={"-50px"}>
          Choose your topic:
        </Heading>
      </Flex>
      <RadioGroup
        display={"flex"}
        justifyContent={"center"}
        value={selectedCategoryID}
        onChange={setSelectedCategoryID}>
        <SimpleGrid columns={[1, 3, 4]} spacing={"1"}>
          {radioList}
        </SimpleGrid>
      </RadioGroup>
      <Button
        onClick={() => props.onClickNext(selectedCategoryID)}
        position={"absolute"}
        top={"80%"}
        right={"10%"}
        rightIcon={<ArrowForwardIcon />}>
        set difficulty
      </Button>
    </div>
  )
}
