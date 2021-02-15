import React, {useState, useRef, useEffect} from "react"
import {View, StyleSheet, Button, Text, Alert, ScrollView, Dimensions} from "react-native"
import NumberContainer from "../components/NumberContainer"
import DefaultStyles from "../constants/DefaultStyles.js"
import {Ionicons} from "@expo/vector-icons"
import {ScreenOrientation} from "expo"


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
    const initialGuess = generateRandomBetween(1, 100, props.chosenNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)

    const currentLow = useRef(1) // userRef survives re-renders of a component
    const currentHigh = useRef(100)

    const [pastGuesses, setPastGuesses] = useState([initialGuess])

    const [deviceWidth, setDeviceWidth] = useState(Dimensions.get("window").width)
    const [deviceHeight, setDeviceHeight] = useState(Dimensions.get("window").height)

    const updateLayout = () => {
        setDeviceWidth(Dimensions.get("window").width)
        setDeviceHeight(Dimensions.get("window").height)
    }

    const {userChoice, onGameOver} = props

    useEffect(() => {
        if (currentGuess === props.chosenNumber) {
            onGameOver(pastGuesses.length)
        }
    }, [
        currentGuess, userChoice, onGameOver
    ])

    useEffect(() => {
        Dimensions.addEventListener("change", updateLayout)

        return () => {
            Dimensions.removeEventListener("change", updateLayout)
        }
    })

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
            // setRounds((currentRounds) => currentRounds++)
            setPastGuesses((localCurrentGuess) => [nextNumber, ...localCurrentGuess])
        }
    }

    if (deviceHeight < 500) {
        return (
            <View>
                <Text style={DefaultStyles.bodyText}>Opponent's guess</Text>
                <View style={Styles.controls}>
                    <Button
                        title="LOWER"
                        onPress={nextGuessHandler.bind(this, "lower")}/>
                    <Ionicons
                        name="md-remove"
                        size={24}
                        color="#FFFFFF"/>
                    <NumberContainer>
                        {currentGuess}
                    </NumberContainer>
                    <Button
                        title="GREATER"
                        onPress={nextGuessHandler.bind(this, "greater")}/>
                    <Ionicons
                        name="md-add"
                        size={24}
                        color="#FFFFFF"/>
                </View>
                <ScrollView>
                    {pastGuesses.map((pastGuess) =>
                        <View>
                            <Text>{pastGuess}</Text>
                        </View>)}
                </ScrollView>
            </View>
        )
    } else {
        return (
            <View>
                <Text style={DefaultStyles.bodyText}>Opponent's guess</Text>
                <Button
                    title="LOWER"
                    onPress={nextGuessHandler.bind(this, "lower")}/>
                <Ionicons
                    name="md-remove"
                    size={24}
                    color="#FFFFFF"/>
                <NumberContainer>
                    {currentGuess}
                </NumberContainer>
                <Button
                    title="GREATER"
                    onPress={nextGuessHandler.bind(this, "greater")}/>
                <Ionicons
                    name="md-add"
                    size={24}
                    color="#FFFFFF"/>
                <ScrollView>
                    {pastGuesses.map((pastGuess) =>
                        <View>
                            <Text>{pastGuess}</Text>
                        </View>)}
                </ScrollView>
            </View>
        )
    }
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
        marginTop: Dimensions.get("window").width > 600 ? 20 : 10,
        width: 300,
        maxWidth: "80%"
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "80%",
        alignItem: "center"
    }
})

export default GameScreen