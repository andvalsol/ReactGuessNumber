import React, {useState, useEffect} from "react"

import {View, StyleSheet, Text, Button, Dimensions} from "react-native"
import Card from "../components/Card";
import Colors from "../constants/Colors.js"
import Input from "../components/Input.js"
import {TouchableWithoutFeedback, TouchableNativeFeedback, Keyboard, Alert, KeyboardAvoidingView, ScrollView} from "react-native";
import NumberContainer from "../components/NumberContainer";
import CustomButton from "../components/CustomButton";

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState("")
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()

    const [buttonWidth, setButtonWidth] = useState(Dimensions.get("window").width / 4)

    useEffect(() => { // This will run on every re-render
        const updateLayout = () => {
            setButtonWidth(Dimensions.get("window").width / 4)
        }

        Dimensions.addEventListener("change", updateLayout)

        // Clean up the listener
        return () => {
            Dimensions.removeEventListener("change", updateLayout)
        }
    })

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
                <CustomButton
                    text="START GAME"
                    onPress={() => props.onStartGameHandler(selectedNumber)}/>
            </Card>
    }

    let ButtonComponent = TouchableWithoutFeedback // The constant needs to start with capital letter

    if (Platform.OS === "android" && Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView
                behaviour="position"
                keyboardVerticalOffset={30}>
                <ButtonComponent onPress={() => {
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
                                        style={{width: buttonWidth}}
                                        title="Reset"
                                        onPress={resetInputHandler}
                                        color={Colors.accentColor}/>
                                </View>
                                <View>
                                    <Button
                                        style={{width: buttonWidth}}
                                        title="Confirm"
                                        onPress={confirmInputHandler}
                                        color={Colors.accentColor}/>
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </ButtonComponent>
            </KeyboardAvoidingView>
        </ScrollView>
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
        width: "80%",
        minWidth: 300, // This will set always the min width
        maxWidth: "95%",
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