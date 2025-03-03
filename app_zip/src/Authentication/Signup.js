import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { registerUser } from './registerUser';

export default function Signup({navigation
  
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async () => {
    setIsLoading(true);
    setError({});
    let errors = {};

    if (!name) errors.name = 'Name is required.';
    if (!email) errors.email = 'Email is required.';
    else if (!validateEmail(email)) errors.email = 'Enter a valid email format.';
    if (!password) errors.password = 'Password is required.';
    if (!isTermsChecked) errors.terms = 'You must agree to the terms.';

    if (Object.keys(errors).length > 0) {
      setError(errors);
      setIsLoading(false);
      return;
    }

    try {
      const errorMessage = await registerUser(email, password, name);
      if (errorMessage) {
        setError({ general: errorMessage });
      } else {
        setShowSuccessAnimation(true);
        setTimeout(() => {
          setShowSuccessAnimation(false);
          navigation.navigate('login');
        }, 3000);
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 48 }}>
            {showSuccessAnimation ? (
              <LottieView
                source={require('../../assets/success-animation.json')}
                autoPlay
                loop={false}
                style={{ height: 200, width: 200, alignSelf: 'center' }}
              />
            ) : (
              <>
                <View style={{ marginBottom: 40 }}>
                  <Text style={{ fontSize: 36, fontWeight: 'bold', textAlign: 'center', color: '#1f2937', marginBottom: 8 }}>
                    Create Account
                  </Text>
                  <Text style={{ textAlign: 'center', color: '#4b5563' }}>
                    Join us and start your journey
                  </Text>
                </View>

                <View style={{ gap: 24 }}>
                  <View>
                    <TextInput
                      placeholder="Full Name"
                      value={name}
                      onChangeText={setName}
                      style={{
                        backgroundColor: 'white',
                        color: '#1f2937',
                        borderWidth: 1,
                        borderColor: '#d1d5db',
                        borderRadius: 12,
                        paddingVertical: 16,
                        paddingHorizontal: 16,
                      }}
                    />
                    {error.name && (
                      <Text style={{ color: '#ef4444', fontSize: 14, marginTop: 4 }}>{error.name}</Text>
                    )}
                  </View>

                  <View>
                    <TextInput
                      placeholder="Email"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      style={{
                        backgroundColor: 'white',
                        color: '#1f2937',
                        borderWidth: 1,
                        borderColor: '#d1d5db',
                        borderRadius: 12,
                        paddingVertical: 16,
                        paddingHorizontal: 16,
                      }}
                    />
                    {error.email && (
                      <Text style={{ color: '#ef4444', fontSize: 14, marginTop: 4 }}>{error.email}</Text>
                    )}
                  </View>

                  <View>
                    <View style={{ position: 'relative' }}>
                      <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!isPasswordVisible}
                        style={{
                          backgroundColor: 'white',
                          color: '#1f2937',
                          borderWidth: 1,
                          borderColor: '#d1d5db',
                          borderRadius: 12,
                          paddingVertical: 16,
                          paddingHorizontal: 16,
                        }}
                      />
                      <TouchableOpacity
                        style={{ position: 'absolute', right: 16, top: 16 }}
                        onPress={togglePasswordVisibility}
                      >
                        <Ionicons
                          name={isPasswordVisible ? 'eye-off' : 'eye'}
                          size={24}
                          color="#9CA3AF"
                        />
                      </TouchableOpacity>
                    </View>
                    {error.password && (
                      <Text style={{ color: '#ef4444', fontSize: 14, marginTop: 4 }}>
                        {error.password}
                      </Text>
                    )}
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                      style={{
                        height: 24,
                        width: 24,
                        borderWidth: 2,
                        borderColor: '#14b8a6',
                        borderRadius: 6,
                        marginRight: 12,
                        backgroundColor: isTermsChecked ? '#14b8a6' : 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => setIsTermsChecked(!isTermsChecked)}
                    >
                      {isTermsChecked && (
                        <Ionicons name="checkmark" size={20} color="white" />
                      )}
                    </TouchableOpacity>
                    <Text style={{ color: '#4b5563', flex: 1 }}>
                      I agree to the{' '}
                      <Text
                        style={{ color: '#14b8a6', textDecorationLine: 'underline' }}
                        onPress={() => Linking.openURL('https://miro.com/terms/')}
                      >
                        Terms and Conditions
                      </Text>
                    </Text>
                  </View>
                  {error.terms && (
                    <Text style={{ color: '#ef4444', fontSize: 14 }}>{error.terms}</Text>
                  )}

                  {error.general && (
                    <Text style={{ color: '#ef4444', textAlign: 'center' }}>
                      {error.general}
                    </Text>
                  )}

                  <TouchableOpacity
                    onPress={handleSignup}
                    style={{
                      backgroundColor: '#14b8a6',
                      borderRadius: 12,
                      paddingVertical: 16,
                      opacity: isTermsChecked ? 1 : 0.5,
                    }}
                    disabled={!isTermsChecked || isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text style={{ color: 'white', textAlign: 'center', fontSize: 18, fontWeight: '600' }}>
                        Create Account
                      </Text>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {}} // navigation.goBack()
                    style={{ marginTop: 16 }}
                  >
                    <Text style={{ color: '#14b8a6', textAlign: 'center' }}>
                      Already have an account? Sign In
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

