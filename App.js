import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { Audio } from "expo-av";

const FlagPole = () => {
  return (
    <View
      style={{
        backgroundColor: "grey",
        height: "70%",
        width: "5%",
        marginLeft: 30,
      }}
    ></View>
  );
};

export default function App() {
  const translateY = useRef(new Animated.Value(0)).current;
  const [sound, setSound] = useState();
  const [pressed, setPressed] = useState(false);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/anthem.mp3"),
      { shouldPlay: false },
    );
    setSound(sound);
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        setPressed(false);
        reverseAnimation();
      }
    });

    await sound.playAsync();
    startAnimation();
    setPressed(true);
  };
  const startAnimation = () => {
    Animated.timing(translateY, {
      toValue: -610,
      duration: 85000,
      useNativeDriver: true,
    }).start();
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
    }
  };
  const reverseAnimation = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    stopSound();
  };

  return (
    <View style={styles.container}>
      <FlagPole />
      <Animated.Image
        source={require("./assets/flag.jpeg")}
        style={{
          width: "30%",
          height: "10%",
          transform: [{ translateY }],
          marginLeft: 30,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          onPress={playSound}
          style={{
            backgroundColor: "#DC8686",
            padding: 20,
            borderRadius: 20,
            marginRight: 10,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Sekolah Sediah!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={reverseAnimation}
          style={{
            backgroundColor: "#86C7DC",
            padding: 20,
            borderRadius: 20,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Flag Lowering</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7EFE5",
    alignItems: "left",
    justifyContent: "center",
    marginLeft: 0,
  },
});
