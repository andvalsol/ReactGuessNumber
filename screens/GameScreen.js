import React, {useState} from "react"
import {View, StyleSheet, Button, Text} from "react-native"
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";


const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    const randomNumber = Math.floor((Math.random() * (max - min)) + min)

    if (randomNumber === exclude) {
        return generateRandomBetween(min, max, exclude)
    }

    return randomNumber
}

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.chosenNumber))

    return (
        <View>
            <Text>Opponent's guess</Text>
            <NumberContainer>
                {currentGuess}
            </NumberContainer>
            <Card>
                <Button
                    title="LOWER"
                    onPress={}/>
                <Button
                    title="GREATER"
                    onPress={}/>
            </Card>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
        width: 300,
        maxWidth: "80%"
    }
})

export default GameScreen