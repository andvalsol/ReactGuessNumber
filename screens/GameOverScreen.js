import React from "react"
import {StyleSheet, View, Text} from "react-native";
import {Button} from "react-native-web";


const GameOverScreen = props => {
    return (
        <View>
            <Text>Game is over with rounds {props.amountOfRounds}</Text>
            <Text>Numbers was {props.selectedNumber}</Text>
            <Button
                title="Start new game"
                onPress={props.onRestartGame}/>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default GameOverScreen