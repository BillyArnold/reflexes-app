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
  const valueX = useSharedValue(Math.floor(Math.random() * 90));
  const valueY = useSharedValue(Math.floor(Math.random() * 90));
  const [count, setCount] = useState(0);

  const style = useAnimatedStyle(() => {
    return {
      left: withTiming(valueX.value + "%", {
        duration: 400,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
      }),
      top: withTiming(valueY.value + "%", {
        duration: 400,
        easing: Easing.bezier(0.5, 0.08, 0, 1),
      }),
    };
  });

  const calculateNewPosition = (prev) => {
    if (prev > 50) {
      return Math.floor(Math.random() * 50);
    } else {
      return Math.floor(Math.random() * 50) + 40;
    }
  };

  const handleTap = () => {
    valueX.value = calculateNewPosition(valueX.value);
    valueY.value = calculateNewPosition(valueY.value);
    setCount((prev) => (prev += 1));
  };
  return (
    <View className="bg-gray-800 flex justify-center items-center h-full z-50">
      <View className="absolute right-4 top-10">
        <Text className="text-white">Tap Count: {count}</Text>
      </View>
      <Animated.View
        style={[style]}
        className="absolute left-0 top-0 flex w-10 h-10 bg-white shadow-2xl shadow-blue-50/80 rounded-full"
      >
        <Pressable
          className="absolute w-full h-full top-0 left-0"
          onPress={() => handleTap()}
        ></Pressable>
      </Animated.View>
      <StatusBar style="light" />
    </View>
  );
}
