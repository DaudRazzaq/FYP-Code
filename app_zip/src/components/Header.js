import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const Header = ({ navigation }) => (
  <View className="flex-row items-center justify-between p-4">
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Feather name="arrow-left" size={24} color="#fff" />
    </TouchableOpacity>
    <Text className="text-white text-lg font-semibold">Upload Resume</Text>
    <View className="w-6" />
  </View>
);

export default Header;
