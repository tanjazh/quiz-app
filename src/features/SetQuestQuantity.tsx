import { useState } from "react"
import { Slider, SliderMark, SliderTrack, SliderFilledTrack, SliderThumb, Flex, Heading, Button } from '@chakra-ui/react'
import { ArrowForwardIcon } from "@chakra-ui/icons";


interface QuantityProps {
    defaultValue: number;
    max: number;
    min: number;
    step: number;
    onClickNext: (amount: number) => void;
}

export function SetQuestQuantity(props: QuantityProps) {
    const [sliderValue, setSliderValue] = useState<number>(props.defaultValue)

    const renderMarks = (): JSX.Element[] => {
        const marks = [];
        for (let i = props.min; i <= props.max; i += props.step) {
            marks.push(<SliderMark marginLeft={-2} paddingTop={4} key={i} value={i}>{i}</SliderMark>)
        }
        return marks; //return an array of components
    }

    return (
        <div>
            <Flex direction={"column"} alignItems={"center"}>
                <Heading as={"h1"} fontSize={"3xl"} position={"relative"} top={"-50px"}>
                    How many questions?
                </Heading>
                <Slider
                    position={"relative"}
                    marginTop={"10"}
                    value={sliderValue}
                    maxWidth={400}
                    max={props.max}
                    min={props.min}
                    step={props.step}
                    aria-label='slider-ex-6'
                    onChange={(val) => setSliderValue(val)}
                    colorScheme="red">
                    {renderMarks()}
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </Flex>
            <Button
                onClick={() => props.onClickNext(sliderValue)}
                position={"absolute"}
                top={"80%"}
                right={"10%"}
                rightIcon={<ArrowForwardIcon />}>
                set category
            </Button>
        </div>

    )
}