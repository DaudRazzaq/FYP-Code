import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Keyboard, ActivityIndicator } from 'react-native';
//import logo from '../assests/logo.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth } from '../hooks/NewFireBaseCOnfig'; 
 // Importing Firebase auth instance
import { signInWithEmailAndPassword } from 'firebase/auth';
import LottieView from 'lottie-react-native';  
import firebase from 'firebase/compat/app';
import { sendPasswordResetEmail } from 'firebase/auth';
export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // State for Loader
const forgotPassword = () => {
  if (!email) {
    setErrorMessage('Please enter your email address');
    return;
  }

  sendPasswordResetEmail(auth, email)
    .then(() => {
      setSuccessMessage('Password reset email sent!');
    })
    .catch((error) => {
      setErrorMessage(error.message);
    });
}
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);  // Toggle password visibility
  };

  const handleLogin = () => {
    // Clear any previous messages
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);  // Start loader

    // Check if all fields are filled
    if (!email || !password) {
      setErrorMessage('Please fill in both fields.');
      setIsLoading(false);  // Stop loader
      return;
    }

    // Firebase Authentication Logic
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIsLoading(false);  // Stop loader
        setSuccessMessage('Login successful!');
        navigation.navigate('ResumeUploadSCreen');  // Navigate to Home screen on success
      })
      .catch((error) => {
        setIsLoading(false);  // Stop loader
        setErrorMessage(error.message);  // Display Firebase error message
      });
  };

  return (
    <View className="flex-1 bg-white justify-center px-6 relative">
      {/* Logo Section - Top Left */}
      <View className="absolute top-28 left-6 flex-row items-center mb-10">
        {/* <Image
          source={logo}
          className="w-16 h-16 mb-4"
          resizeMode="contain"
        /> */}
        <Text className="text-2xl text-teal-600 font-bold ml-2"></Text>
      </View>

      {/* Sign Up Button - Top Right */}
      <TouchableOpacity onPress={() => navigation.navigate('signup')} 
        className="absolute top-32 right-6 bg-teal-500 rounded-full py-3 px-6">
        <Text className="text-black font-bold text-xl">Sign Up</Text>
      </TouchableOpacity>

      <View className="py-16"></View>

      {isLoading ? (  // Show Loader if Loading
        <View className="flex-1 justify-center items-center">
          <LottieView
            source={require('../../assets/success-animation.json')}  // Path to Lottie JSON file
            autoPlay
            loop
            style={{ width: 200, height: 200 }}
          />
        </View>
      ) : (
        <>
          {/* Input Fields */}
          <View className="mt-24 mb-6">
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              className="border border-teal-500 rounded-lg p-4 text-base mb-4 "
            />
            <TextInput
              placeholder="Password"
              secureTextEntry={!isPasswordVisible}  // Toggle visibility
              value={password}
              onChangeText={setPassword}
              className="border border-teal-500 rounded-lg p-4 "
            />

            {/* Eye Icon to Toggle Password Visibility */}
            <TouchableOpacity onPress={togglePasswordVisibility} className="absolute right-6 top-24">
              <Icon
                name={isPasswordVisible ? 'eye' : 'eye-slash'}  // Change icon based on visibility
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          {/* Error or Success Message */}
          {errorMessage ? (
            <Text className="text-red-500 text-center mb-4">{errorMessage}</Text>
          ) : null}
          {successMessage ? (
            <Text className="text-green-500 text-center mb-4">{successMessage}</Text>
          ) : null}

          {/* Login Button */}
          <TouchableOpacity onPress={handleLogin} className="bg-teal-500 rounded-lg py-4 mb-4">
            <Text className="text-xl text-black text-center font-bold">Log in</Text>
          </TouchableOpacity>

          {/* Social Login */}
          <TouchableOpacity onPress={()=>{forgotPassword()}}>
          <Text className="text-center text-black ">Forgot password</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}