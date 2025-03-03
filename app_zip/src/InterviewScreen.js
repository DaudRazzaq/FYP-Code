import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  ImageBackground,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const InterviewScreen = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(40);

  useEffect(() => {
    let countdown;
    if (isRecording && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsRecording(false);
    }
    return () => clearInterval(countdown);
  }, [isRecording, timer]);

  const handleRecordToggle = () => {
    if (!isRecording) {
      setTimer(40);
    }
    setIsRecording((prev) => !prev);
  };

  return (
    <SafeAreaView className={`flex-1 bg-black ${Platform.OS === "android" ? `pt-${StatusBar.currentHeight}` : ""}`}>
      <ImageBackground
        source={{ uri: "https://example.com/interview-background.jpg" }}
        className="flex-1"
        style={{ resizeMode: "cover" }}
        blurRadius={3}
      >
        {/* Header */}
        <View className="flex-row justify-between items-center p-4">
          <TouchableOpacity>
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">Let’s Start Interview</Text>
          <TouchableOpacity>
            <Feather name="settings" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Candidate Profile */}
        <View className="items-center my-4">
          <Text className="text-white text-base font-bold">Candidate: John Doe</Text>
          <Text className="text-white/70 text-sm">Role: Software Engineer</Text>
        </View>

        {/* Feedback Meter and Question Box */}
        <View className="flex-1 justify-center items-center px-5">
          <Text className="text-white text-base text-center mb-6">
            Realtime and Secured AI Feedback
          </Text>

          {/* Feedback Meter */}
          <View className="w-36 h-36 justify-center items-center mb-6">
            <LinearGradient
              colors={["#6a11cb", "#2575fc"]}
              start={{ x: 0.1, y: 0 }}
              end={{ x: 0.9, y: 0 }}
              className="w-full h-full rounded-full"
            />
          </View>

          {/* Question Box */}
          <View className="bg-yellow-500 p-4 rounded-xl mb-6 shadow-lg">
            <Text className="text-black text-base font-bold text-center">
              What is the Design Thinking Process?
            </Text>
          </View>

          {/* Playback Controls */}
          <View className="flex-row items-center justify-between w-3/5 mb-4">
            <TouchableOpacity>
              <Feather name="chevron-left" size={32} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              className={`w-15 h-15 rounded-full justify-center items-center ${
                isRecording ? "bg-red-500" : "bg-yellow-500"
              }`}
              onPress={handleRecordToggle}
            >
              <Feather name={isRecording ? "square" : "play"} size={28} color="black" />
            </TouchableOpacity>

            <TouchableOpacity>
              <Feather name="chevron-right" size={32} color="white" />
            </TouchableOpacity>
          </View>

          <Text className="text-white text-base">{`Time Left: ${timer}s`}</Text>
        </View>

        {/* Footer */}
        <View className="p-4 border-t border-white/20">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="mr-3">
                <Feather name="cpu" size={24} color="white" />
              </View>
              <View>
                <Text className="text-white text-base font-bold">AI Analyzer</Text>
                <Text className="text-white/70 text-sm">Process Personalization</Text>
              </View>
            </View>
            <TouchableOpacity className="flex-row items-center">
              <Feather name="help-circle" size={24} color="white" />
              <Text className="text-white ml-1">Help</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default InterviewScreen;
