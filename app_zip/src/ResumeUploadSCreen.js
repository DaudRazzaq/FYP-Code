import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import uploadPDFToFirebase from "./hooks/uploadDataToFireBAse";
import { BACKEND_ONE_URI } from "./Services/ResumeParser_URL";

const ResumeUploadScreenNew = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileUri, setFileUri] = useState(null);
  const [uploadedLink, setUploadedLink] = useState(null);
  const [extractedData, setExtractedData] = useState(null);

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const { uri } = result.assets[0];
        setFileUri(uri);
        Alert.alert(
          "File Selected",
          "Your file has been selected successfully."
        );
      } else {
        Alert.alert("No File Selected", "You canceled the file selection.");
      }
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert("Error", "An error occurred while selecting the file.");
    }
  };

  const uploadFile = async () => {
    if (!fileUri) {
      Alert.alert("No File", "Please select a file first.");
      return;
    }

    setLoading(true);
    try {
      // Upload the PDF to Firebase
      const downloadURL = await uploadPDFToFirebase(fileUri);
      setUploadedLink(downloadURL);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (downloadURL) {
        const response = await fetch(`${BACKEND_ONE_URI}/process`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pdf_url: downloadURL }),
        });

        if (response.ok) {
          const result = await response.json();
          setExtractedData(result.extracted_data);
          console.log("Extracted Data:", result.extracted_data);
          Alert.alert("Success", "File processed successfully.");
        } else {
          const errorResponse = await response.json();
          console.error("Error from backend:", errorResponse);
          Alert.alert("Error", "Failed to process the file on the backend.");
        }
      }

      console.log("Uploaded File Link:", downloadURL);
      Alert.alert("Upload Successful", "Your file has been uploaded.");
    } catch (error) {
      console.error("Error uploading file:", error);
      Alert.alert(
        "Upload Failed",
        "An error occurred while uploading the file."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        marginTop:'20%'
      }}
    >
      <TouchableOpacity
        onPress={handleFileUpload}
        style={{
          padding: 15,
          backgroundColor: "blue",
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>
          {fileUri ? "File Selected" : "Select File"}
        </Text>
      </TouchableOpacity>

      {fileUri && (
        <TouchableOpacity
          onPress={uploadFile}
          style={{
            padding: 15,
            backgroundColor: "green",
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            {loading ? "Uploading..." : "Upload and Process File"}
          </Text>
        </TouchableOpacity>
      )}

      {loading && (
        <ActivityIndicator
          size="large"
          color="blue"
          style={{ marginTop: 20 }}
        />
      )}

     
    </View>
  );
};

export default ResumeUploadScreenNew;
