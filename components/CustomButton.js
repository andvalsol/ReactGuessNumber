import React from "react"
import {StyleSheet, View, Touchable, Text} from "react-native"
import Colors from "../constants/Colors";

const CustomButton = props => {
    return (
        <Touchable onPress={props.onPress}>
            <View style={Styles.button}>
                <Text style={Styles.buttonText}>
                    {props.text}
                </Text>
            </View>
        </Touchable>
    )
}

const Styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25
    },
    buttonText: {
        color: "#FFFFFF"
    }
})

export default CustomButton