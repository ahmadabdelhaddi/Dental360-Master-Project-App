import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import IntroductionImg2 from "../../assets/IntroductionImg2.png";
import stepTwo from "../../assets/stepTwo.png";
import { useNavigation } from "@react-navigation/native";

const Introduction_two = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <Image source={IntroductionImg2} />
      </View>
      <View>
        <Text style={styles.Header}>With Dental360 App</Text>

        <Text style={styles.sunText}>
          you can effortlessly schedule appointments, access your dental records
          and communicate with your dentist all in one place
        </Text>
      </View>
      <View style={styles.Steps}>
        <Image source={stepTwo} />
      </View>
      <View style={styles.BtnContainer}>
        <TouchableOpacity
          style={styles.NextIntroBtn}
          onPress={() => {
            navigation.navigate("Introduction_three");
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
