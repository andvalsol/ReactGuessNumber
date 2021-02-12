import React, {useState, useRef, useEffect} from "react"
import {View, StyleSheet, Button, Text, Alert} from "react-native"
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import DefaultStyles from "../constants/DefaultStyles.js"

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
    const [rounds, setRounds] = useState(0)

    const currentLow = useRef(1) // userRef survives re-renders of a component
    const currentHigh = useRef(100)

    const { userChoice, onGameOver } = props

    useEffect(() => {
        if (currentGuess === props.chosenNumber) {
            onGameOver(rounds)
        }
    }, [
        currentGuess, userChoice, onGameOver
    ])

    const nextGuessHandler = (direction) => {
        if ((direction === "lower" && currentGuess < props.chosenNumber) ||
            (direction === "greater" && currentGuess > props.chosenNumber)) {
            // The user has given a wrong hint
            Alert.alert(
                "Don't lie to me :(",
                [{text: "Sorry!", style: "cancel"}])
        } else {
            // The user has given a correct hint
            if (direction === "lower") {
                currentHigh.current = currentGuess
            } else if (direction === "higher") {
                currentLow.current = currentGuess
            }

            const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
            setCurrentGuess(nextNumber)
            setRounds((currentRounds) => currentRounds++)
        }
    }

    return (
        <View>
            <Text style={DefaultStyles.bodyText}>Opponent's guess</Text>
            <NumberContainer>
                {currentGuess}
            </NumberContainer>
            <Card>
                <Button
                    title="LOWER"
                    onPress={nextGuessHandler.bind(this, "lower")}/>
                <Button
                    title="GREATER"
                    onPress={nextGuessHandler.bind(this, "greater")}/>
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