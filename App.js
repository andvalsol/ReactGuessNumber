import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import * as Font from "expo-font"
import {AppLoading} from "expo"

const fetchFonts = () => {
    return Font.loadAsync({
        "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
        "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
    })
}

export default function App() {
    const [userNumber, setUserNumber] = useState()
    const [guessRounds, setGuessRounds] = useState(0)

    const [isLoading, setIsLoading] = useState(true)

    if (isLoading) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={setIsLoading(false)}
                onError={console.log("There was en error while loading fonts")}/>
        )
    }

    const startGameHandler = (selectedNumber) => {
        setUserNumber(selectedNumber)
        setGuessRounds(0)
    }

    const gameOverHandler = (numberOfRounds) => {
        setGuessRounds(numberOfRounds)
    }

    const newGameHandler = () => {
        setGuessRounds(0)
        setUserNumber(null)
    }

    let content = <StartGameScreen onStartGameHandler={startGameHandler}/>

    if (userNumber && guessRounds === 0) {
        content = <GameScreen
            chosenNumber={userNumber}
            onGameOver={gameOverHandler}/>
    } else if (guessRounds > 0) {
        content =
            <GameOverScreen
                amountOfRounds={guessRounds}
                selectedNumber={userNumber}
                onRestartGame={newGameHandler}/>
    }

    return (
        <SafeAreaView>
            <View>
                <Header
                    style={Styles.container}
                    title={"Guess a number"}/>
                {content}
            </View>
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: "open-sans-bold"
    }
});
