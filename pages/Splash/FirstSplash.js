import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import logoSplash from "../../assets/logoSplash.png";
// import { useNavigation } from '@react-navigation/native';

const FirstSplash = () => {
  const navigation = useNavigation(); // Get navigation instance

  useEffect(() => {
    // Use setTimeout to delay navigation after 2 seconds (2000 milliseconds)
    const timeout = setTimeout(() => {
      // Navigate to the next screen using navigation.navigRate()
      navigation.navigate("SecondSplash"); // Use the screen name, not the component
    }, 2000);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timeout);
  }, []); // Empty dependency array to run the effect only once

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logoSplash} style={styles.logo} />
        <Text style={styles.FirstSplashText}>Dental360</Text>
      </View>
    </View>
  );
};

export default FirstSplash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#099588",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  FirstSplashText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
});
