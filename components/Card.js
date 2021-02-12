import React from "react"
import {View} from "react-native"

const Card = props => {
    return (
        <View style={{...Styles.card, ...props.style}}>{
            props.children
        }
        </View>
    )
}

const Styles = StyleSheet.create({
    card: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 2, // This works for Android while the other with shadow... in iOS
        backgroundColor: "#FFFFFF",
        padding: 20,
        borderRadius: 10
    }
})

export default Card