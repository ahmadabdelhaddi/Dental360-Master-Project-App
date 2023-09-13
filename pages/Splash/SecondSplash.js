import { Image, StyleSheet, Text, View } from "react-native";
import logoLarge from "../../assets/logoLarge.png";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook

const SecondSplash = () => {
  const navigation = useNavigation();

    useEffect(() => {
      const timeout = setTimeout(() => {
        navigation.navigate("Introduction_one");
      }, 2000);

      return () => clearTimeout(timeout);
    }, []);

  return (
    <View style={styles.container}>
      <Image source={logoLarge} />
      <Text style={styles.SecondSplashText}>Dental360</Text>
    </View>
  );
};

export default SecondSplash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },

  SecondSplashText: {
    color: "#099588",
    fontSize: 30,
    fontWeight: "bold",
  },
});

// ff333
