import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import InterviewScreen from "./src/InterviewScreen";
import Signup from "./src/Authentication/Signup";
import Login from "./src/Authentication/Login";
import uploadDataToFireBAse from "./src/hooks/uploadDataToFireBAse";
import ResumeUploadScreenNew from "./src/ResumeUploadSCreen";
import screens_ResumeUpload from "./src/screens_ResumeUpload";


const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      
        <Stack.Screen name="login" component={Login}/>
        <Stack.Screen name="signup" component={Signup}/> 
        {/* <Stack.Screen name="screens_" component={InterviewScreen}/> */}
        {/* <Stack.Screen name="ResumeUploadSCreen" component={screens_ResumeUpload}/> */}
        <Stack.Screen name="ResumeUploadSCreen" component={ResumeUploadScreenNew}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
