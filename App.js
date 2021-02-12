import React, {useState} from 'react';
import { StyleSheet } from 'react-native';
import Header from "./components/Header";
import {View} from "react-native-web";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";

export default function App() {
  return (
      <View>
        <Header
            style={Styles.container}
            title={"Guess a number"}/>
        <StartGameScreen/>
        <GameScreen/>
      </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
