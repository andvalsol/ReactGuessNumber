import React, {useState} from "react"
import {View, StyleSheet, Text, TextInput, Button} from "react-native"
import Card from "../components/Card";
import Colors from "../constants/Colors.js"
import Input from "../components/Input.js"
import {TouchableWithoutFeedback, Keyboard, Alert} from "react-native";
import NumberContainer from "../components/NumberContainer";

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState("")
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()

    const numberInputHandler = (inputText) => {
        setEnteredValue(inputText.replace(/[ˆ0-9]/g), "")
    }

    const resetInputHandler = () => {
        setEnteredValue("")
        setConfirmed(false)
    }

    const confirmInputHandler = () => {
        // Check if the entered is actually a number
        const chosenNumber = parseInt(enteredValue)

        // Prevent non number and numbers that are not in [1, 99]
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert("Invalid number",
                "Number has to be between 1 and 99",
                [{
                    text: "Ok",
                    style: "destructive",
                    onPress: resetInputHandler()
                }])
            return
        }

        setConfirmed(true)
        setSelectedNumber(chosenNumber)
        setEnteredValue("")
        Keyboard.dismiss()
    }

    let confirmedOutput

    if (confirmed) {
        // If not then we won't output anything
        confirmedOutput =
            <Card style={Styles.summaryContainer}>
                <Text>
                    You selected
                </Text>
                <NumberContainer>
                    {selectedNumber}
                </NumberContainer>
                <Button
                    title="START GAME"
                    onPress={() => props.onStartGameHandler(selectedNumber)}/>
            </Card>
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            // Dismiss the keyboard
            Keyboard.dismiss()
        }}>
            <View style={Styles.container}>
                <Text style={Styles.title}
                      title="Start a new game"/>
                <Card style={Styles.inputContainer}>
                    <Text style={Styles.title}
                          title="Select a number"/>
                    <Input
                        style={Styles.input}
                        keyboardType="number-pad" // This works only for iOS
                        maxLength={2}
                        onChangedText={numberInputHandler}/>
                    <View style={Styles.buttonContainer}>
                        <View>
                            <Button
                                title="Reset"
                                onPress={resetInputHandler}
                                color={Colors.accentColor}/>
                        </View>
                        <View>
                            <Button
                                title="Confirm"
                                onPress={confirmInputHandler}
                                color={Colors.accentColor}/>
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    inputContainer: {
        width: 300,
        maxWidth: "80%",
        alignItems: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 15
    },
    input: {
        width: 100,
        textAlign: "center"
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: "center"
    }
})

export default StartGameScreen