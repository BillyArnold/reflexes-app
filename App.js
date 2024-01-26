import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";

export default function App() {
  const valueX = useSharedValue(Math.floor(Math.random() * 99));
  const valueY = useSharedValue(Math.floor(Math.random() * 99));

  const style = useAnimatedStyle(() => {
    return {
      left: withTiming(valueX.value, {
        duration: 500,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
      }),
      top: withTiming(valueY.value, {
        duration: 500,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
      }),
    };
  });

  const handleTap = () => {
    valueX.value = Math.floor(Math.random() * 99);
    valueY.value = Math.floor(Math.random() * 99);
  };
  return (
    <View className="bg-black flex justify-center items-center h-full">
      <Pressable onPress={() => handleTap()}>
        <Animated.View
          style={[style]}
          className={`absolute flex w-5 h-5 bg-white rounded-full`}
        ></Animated.View>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}
