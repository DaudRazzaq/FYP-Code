import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

const Footer = () => (
  <View className="p-4 border-t border-white/10">
    <View className="flex-row items-center bg-black/30 p-3 rounded-lg">
      <View className="bg-white/10 rounded-full p-2 mr-3">
        <Feather name="cpu" size={24} color="#fff" />
      </View>
      <View>
        <Text className="text-white text-base font-semibold">AI Analyzer</Text>
        <Text className="text-white/60 text-sm">Resume Processing</Text>
      </View>
    </View>
  </View>
);

export default Footer;

