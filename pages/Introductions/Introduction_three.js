import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import IntroductionImg3 from "../../assets/Introduction_Three.png";
import stepThree from "../../assets/stepThree.png";
import { useNavigation } from "@react-navigation/native";

const Introduction_two = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <Image source={IntroductionImg3} />
      </View>
      <View>
        <Text style={styles.Header}>Dental Care With Dentist360 </Text>

        <Text style={styles.sunText}>
          Experience a new dimension where convenience, efficiency, and superior
          oral health come together.
        </Text>
      </View>
      <View style={styles.Steps}>
        <Image source={stepThree} />
      </View>
      <View style={styles.BtnContainer}>
        <TouchableOpacity
          style={styles.NextIntroBtn}
          onPress={() => {
            navigation.navigate("Login_page");
          }}
        >
          <Text style={styles.BtnText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Introduction_two;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  Header: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 60,
    color: "#099588",
  },
  sunText: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 15,
    marginTop: 30,
    paddingHorizontal: 21,
    color: "#9E9D9D",
    marginBottom: 32,
  },
  Steps: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  BtnContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    marginBottom: 50,
  },
  NextIntroBtn: {
    width: 350,
    height: 50,
    backgroundColor: "#099588",
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  BtnText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
});
