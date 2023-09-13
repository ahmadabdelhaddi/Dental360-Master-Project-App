import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import logoSmall from "../../assets/logoSmall.png";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Login_page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigation = useNavigation();

  // const validateEmail = () => {
  //   if (!email) {
  //     setEmailError("Email is required");
  //     return false;
  //   }
  //   // You can add more email validation logic here if needed
  //   setEmailError("");
  //   return true;
  // };

  // const validatePassword = () => {
  //   if (!password) {
  //     setPasswordError("Password is required");
  //     return false;
  //   }
  //   setPasswordError("");
  //   return true;
  // };

  const onSignUpPress = () => {
    navigation.navigate("Register_Page");
  };

  const handleLogin = async () => {
    // if (!validateEmail() || !validatePassword()) {
    //   return;
    // }

    try {
      // Make a POST request to your server's login endpoint to obtain the authentication token
      const loginResponse = await axios.post(
        "https://backendserver-9s51.onrender.com/api/user/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
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
      }
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error logging in:", error);

      // Set an error message for login failure
      setLoginError("Login failed. Please check your credentials.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logoSmall} style={styles.logo} />
      <Text style={styles.title}>Login to your Account</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#9E9D9D"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          required
        />
      </View>
      {emailError && <Text style={styles.errorText}>{emailError}</Text>}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#9E9D9D"
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          required
        />
      </View>
      {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

      {loginError && <Text style={styles.errorText}>{loginError}</Text>}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>

      <Text style={styles.DontHaveAcount}>
        Don’t have an Account?{" "}
        <TouchableOpacity onPress={onSignUpPress}>
          <Text style={styles.SignUpTxt}>Sign Up</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: 350,
    height: 50,
    backgroundColor: "#fafafa",
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 15,
  },
  inputIcon: {
    position: "absolute",
    top: 14,
    left: 12,
  },
  loginButton: {
    backgroundColor: "#099588",
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 350,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  DontHaveAcount: {
    marginTop: 20,
    color: "#9E9D9D",
  },
  SignUpTxt: {
    color: "#099588",
    fontWeight: "700",
  },
  errorText: {
    color: "red", // Change this line to set the color to red
    fontSize: 14,
    marginBottom: 10,
  },
});

export default Login_page;
