import React from 'react'
import {View, StyleSheet, Text, Platform} from "react-native"
import Colors from "../constants/Colors"

const Header = props => {
    return (
        <View
            style={{
                ...Styles.headerBase,
                ...Platform.select(
                    {
                        ios: Styles.headeriOS,
                        android: Styles.headerAndroid
                    }
                )
            }}>
            <Text title={props.title}/>
        </View>
    )
}

const Styles = StyleSheet.create({
    headerBase: {
        width: "100%",
        height: 90,
        paddingTop: 36,
        alignItems: "center",
        justifyContent: "center",

    },
    headeriOS: {
        backgroundColor: "#FFFFFF",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    },
    headerAndroid: {
        backgroundColor: Colors.primaryColor,
        borderBottomColor: "#FFFFFF",
        borderBottomWidth: 0
    },
    headerTitle: {
        color: Colors.accentColor,
        fontSize: 18
    }
})

export default Header