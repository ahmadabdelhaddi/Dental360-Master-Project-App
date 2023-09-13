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
const Register_Page = () => {
  const navigation = useNavigation();
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onLogInPress = () => {
    navigation.navigate("Login_page");
  };

  const fetchPost = async () => {
    try {
      const response = await axios.post(
        "https://backendserver-9s51.onrender.com/api/user/signup",
        {
          email,
          password,
          role: "user",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      navigation.navigate("Login_page");
    } catch (error) {
      console.error("Error:", error);
      console.error("Error response:", error.response);
      // Handle duplicate email error if needed
      if (error.response && error.response.status === 409) {
        setEmailError("Email is already registered");
      }
    }
  };

  const onSignUpPress = async () => {
    // Initialize error states
    let hasError = false;
    setEmailError("");
    setPasswordError("");

    // Check if email is empty or invalid
    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!isValidEmail(email)) {
      setEmailError("Invalid email format");
      hasError = true;
    }

    // Check if password is empty
    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (!isValidPassword(password)) {
      setPasswordError("Invalid password format");
      hasError = true;
    }

    // If any error exists, return without navigating
    if (hasError) {
      return;
    }

    try {
      await fetchPost();
      navigation.navigate("Login_page");
    } catch (error) {
      console.error(error);
    }
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const isValidPassword = (password) => {
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;

    return passwordPattern.test(password);
  };

  return (
    <View style={styles.container}>
      <Image source={logoSmall} style={styles.logo} />
      <Text style={styles.title}>Create New Account</Text>

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

      <TouchableOpacity style={styles.loginButton} onPress={onSignUpPress}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.DontHaveAcount}>
        Already have an Account?
        <TouchableOpacity onPress={onLogInPress}>
          <Text style={styles.SignUpTxt}> Sign In</Text>
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
  forgetPass: {
    color: "black",
  },
  DontHaveAcount: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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

export default Register_Page;
