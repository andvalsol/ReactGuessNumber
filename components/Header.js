import React from 'react'
import {View, StyleSheet, Text} from "react-native"
import Colors from "../constants/Colors"

const Header = props => {
    return (
        <View style={Styles.header}>
            <Text title={props.title}/>
        </View>
    )
}

const Styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 90,
        paddingTop: 36,
        backgroundColor: "#FAFAFA",
        alignItems: "center",
        justifyContent: "center"
    },
    headerTitle: {
        color: Colors.accentColor,
        fontSize: 18
    }
})

export default Header