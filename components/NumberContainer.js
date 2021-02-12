import React from "react"
import {View, Text, StyleSheet} from "react-native"
import Colors from "../constants/Colors";

const NumberContainer = props => {
    return (
        <View style={Styles.container}>
            <Text style={Styles.number}>
                {props.children}
            </Text>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        borderWith: 2,
        borderColor: Colors.primaryColor,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: "center"
    },
    number: {
        color: Colors.accentColor,
        fontSize: 22
    }
})

export default NumberContainer