import React from "react"
import {StyleSheet, View, Text, Button, Image} from "react-native";


const GameOverScreen = props => {
    return (
        <View>
            <Text>Game is over with rounds {props.amountOfRounds}</Text>
            <Image
                source={require("../assets/splash.png")}
                style={Styles.image}/>
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
    },
    image: {
        width: "80%",
        height: 300
    }
})

export default GameOverScreen