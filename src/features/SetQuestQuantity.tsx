import { useState } from "react"
import { Slider, SliderMark, SliderTrack, SliderFilledTrack, SliderThumb, Flex, Heading } from '@chakra-ui/react'

interface QuantityProps {
    defaultValue: number;
    max: number;
    min: number;
    step: number;
}
export function SetQuestQuantity(props: QuantityProps) {
    const [sliderValue, setSliderValue] = useState<number>(props.defaultValue)

    const renderMarks = (): JSX.Element[] => {
        const marks = [];
        for (let i = props.min; i <= props.max; i+=props.step) {
            marks.push(<SliderMark marginLeft={-2} paddingTop={4} key={i} value={i}>{i}</SliderMark>)
        }
        return marks; //return an array of components
    }

    return (
    <Flex direction={"column"} alignItems={"center"}>
        <Heading as={"h1"} fontSize={"3xl"} marginBottom={"20"}>
            How many questions?
        </Heading>
        <Slider 
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
)}