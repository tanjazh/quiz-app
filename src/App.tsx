import { Box, Flex, Image } from '@chakra-ui/react'
import './App.css'
import logoImg from './assets/logo.png'
import bubbleImg from './assets/bubble.png'
import { useState } from 'react';
import { SetQuestQuantity } from './features/SetQuestQuantity';

enum Step {
  SetQuestQuantity,
  SetQuestCategory,
  SetQuestDifficulty,
  Play,
  Score,
}

export function App() {
  const [step, setStep] = useState<Step>(Step.SetQuestQuantity)

  const header = (
    <Flex justify="center">
      <Image height="120px" src={logoImg} />
    </Flex>
  );

  const renderScreenByStep = () => {
    switch (step) {
      case Step.SetQuestQuantity:
        return <SetQuestQuantity defaultValue={10} max={30} min={5} step={5}/>;
      case Step.SetQuestCategory:
        return <></>;
      case Step.SetQuestDifficulty:
        return <></>;
      case Step.Play:
        return <></>;
      case Step.Score:
        return <></>
      default:
        return null;
    }
  }

  return (
    <>
    <Box py={"10"} height={"100%"}>
    {header}
    <Image 
    src={bubbleImg} 
    position={"absolute"} 
    zIndex={-1} 
    right={-120} 
    top={100}/>
      <Box marginTop={100}>
        {renderScreenByStep()}
      </Box>
    </Box>
     
    </>
  )
}

