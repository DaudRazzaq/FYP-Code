import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import Header from "./components/Header";
import Footer from "./components/Footer";

const ResumeUploadScreen = ({ navigation }) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState(null);

  const backendUrl =
    "https://ai-interview-backend-zeta.vercel.app:8000/process";

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (result.type === "success") {
        setResumeFile(result);
        Alert.alert("Success", `File selected: ${result.name}`);
      } else if (result.type === "cancel") {
        Alert.alert("No File Selected", "You canceled the file selection.");
      }
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert("Error", "An error occurred while selecting the file.");
    }
  };

  const handleContinue = async () => {
    if (!resumeFile) {
      Alert.alert("Error", "Please upload a resume before proceeding.");
      return;
    }

    setLoading(true);
    try {
      const fileUri = resumeFile.uri;
      const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const formData = new FormData();
      formData.append("pdf_doc", {
        uri: fileUri,
        type: "application/pdf",
        name: resumeFile.name,
      });

      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setExtractedData(data);
        Alert.alert("Success", "Resume processed successfully!");
        
        // Navigate to Home screen after success
        navigation.navigate("home"); // Assuming the screen is named "home"
      } else {
        Alert.alert("Error", "Failed to process the resume.");
      }
    } catch (error) {
      console.error("Error during upload:", error);
      Alert.alert("Error", "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{flex:1,}}
    >
      <LinearGradient
        colors={["#1a2a6c", "#b21f1f", "#fdbb2d"]}
        className="flex-1"
      >
        <Header navigation={navigation} />

        <View className="flex-1 justify-between p-6">
          <View className="flex-1 justify-center items-center">
            <TouchableOpacity
              className="bg-white/10 rounded-lg p-8 items-center w-full border-2 border-dashed border-white/20"
              onPress={handleFileUpload}
            >
              <Feather name="upload" size={32} color="#fff" />
              <Text className="text-white text-lg mt-4 text-center">
                {resumeFile ? resumeFile.name : "Upload your Resume"}
              </Text>
              <Text className="text-white/60 text-sm mt-2">
                Supported format: PDF
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className={`${
              resumeFile
                ? "bg-yellow-400"
                : "bg-yellow-400 opacity-50"
            } rounded-full py-4 items-center mt-6`}
            onPress={handleContinue}
            disabled={!resumeFile || loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Text className="text-black text-base font-semibold">
                Continue
              </Text>
            )}
          </TouchableOpacity>

          {extractedData && (
            <ScrollView className="mt-6 bg-white/10 rounded-lg p-4">
              <Text className="text-white text-lg font-semibold mb-2">
                Extracted Data:
              </Text>
              <Text className="text-white text-sm leading-5">
                {JSON.stringify(extractedData, null, 2)}
              </Text>
            </ScrollView>
          )}
        </View>

        <Footer />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ResumeUploadScreen;
