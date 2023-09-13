import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import styles from "../Style";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigation = useNavigation();

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    // You can add more email validation logic here if needed
    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const onSignUpPress = () => {
    navigation.navigate("signup");
  };

  const handleLogin = async () => {
    if (!validateEmail() || !validatePassword()) {
      return;
    }

    try {
      // Make a POST request to your server's login endpoint to obtain the authentication token
      const loginResponse = await axios.post(
        "https://barberapp.onrender.com/api/user/login",
        {
          email,
          password,
        }
      );

      if (loginResponse.status === 200) {
        // Successful login, you can handle the user data here
        console.log("Login successful", loginResponse.data);

        // Get the authentication token from the response
        const authToken = loginResponse.data.token;

        // Navigate to the Home screen and pass the user's email as a parameter
        navigation.navigate("Home", { userEmail: loginResponse.data.email }); // <- Add this line

        // No need to make a separate GET request for user data here; you can do it in the Home screen if needed
      } else {
        // Handle other response statuses if necessary
        setLoginError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error logging in:", error);

      // Set an error message for login failure
      setLoginError("Login failed. Please check your credentials.");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Image
              // source={require("../assets/logo.png")}
              style={{
                width: 120,
                height: 120,
                marginStart: 120,
                marginTop: 100,
              }}
              resizeMode="contain"
            />

            <Text style={styles.logoText}>Log in</Text>
            <TextInput
              placeholder="Email"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              value={email}
              onChangeText={setEmail}
            />
            {emailError && <Text style={styles.errorText}>{emailError}</Text>}
            <TextInput
              placeholder="Password"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            {passwordError && (
              <Text style={styles.errorText}>{passwordError}</Text>
            )}
            {loginError && <Text style={styles.errorText}>{loginError}</Text>}
            {/* <TouchableOpacity onPress={onForgotPasswordPress}> */}
            <Text style={{ marginStart: 220, marginBottom: 15 }}>
              Forgot Password?
            </Text>
            {/* </TouchableOpacity> */}
            <Button
              buttonStyle={styles.loginButton}
              onPress={handleLogin}
              title="Login"
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 250,
                marginStart: 70,
              }}
            >
              <Text>Don't have an account? </Text>
              <TouchableOpacity onPress={onSignUpPress}>
                <Text style={{ color: "orange", fontWeight: "bold" }}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
