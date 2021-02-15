import React from "react"
import {StyleSheet, View, Text, Button, Image, Dimensions, ScrollView} from "react-native";
import Colors from "../constants/Colors";


const GameOverScreen = props => {
    return (
        <ScrollView>
            <View>
                <Text>Game is over with rounds {props.amountOfRounds}</Text>
                <Image
                    source={require("../assets/splash.png")}
                    style={Styles.image}/>
                <Image
                    fadeDuration={300}
                    source={{
                        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPZ_1DRpDaQGkH2Rsq76_yKKzWvOHq-C5Tgg&usqp=CAU"
                    }}
                    style={Styles.image}/>
                <Text style={Styles.resultText}>Numbers was
                    <Text style={Styles.highlight}>
                        {props.selectedNumber}
                    </Text></Text>
                <Button
                    title="Start new game"
                    onPress={props.onRestartGame}/>
            </View>
        </ScrollView>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10
    },
    image: {
        width: Dimensions.get("window").width * 0.7,
        height: Dimensions.get("window").width * 0.7,
        borderRadius: (Dimensions.get("window").width * 0.7) / 2,
        borderWidth: 3,
        borderColor: "#000000",
        overflow: "hidden",
        marginVertical: Dimensions.get("window").height / 40 // This == to "2.5%"
    },
    resultText: {
        textAlign: "center",
        fontSize: Dimensions.get("window").height < 400 ? 16 : 20
    },
    highlight: {
        color: Colors.primaryColor,
    }
})

export default GameOverScreen