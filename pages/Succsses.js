import { StyleSheet, Image, TouchableOpacity, Text, View } from "react-native";
import React from "react";
import succssesImg from "../assets/Succsses.png";
import { useNavigation, useRoute } from "@react-navigation/native"; // Import the useRoute hook
const Succsses = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Use the useRoute hook to access route parameters
  const { userEmail, authToken, userId } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.succssesImage}>
        <Image source={succssesImg} />
      </View>
      <View style={styles.successTexts}>
        <Text style={styles.successTextHeader}>Success Booking</Text>
      </View>

      <Text style={styles.successSubtext}>
        You don’t have any notifications at this time notifications at this have
      </Text>
      <View>
        <TouchableOpacity
          style={styles.BtnReturnToHome}
          onPress={() => {
            navigation.navigate("Home", { userEmail, authToken, userId });
          }}
        >
          <Text style={styles.BtnText}>Return To Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.BtnBookingAgain}
          onPress={() => {
            navigation.navigate("Booking", { userEmail, authToken, userId });
          }}
        >
          <Text style={styles.BtnText}> Book a new appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Succsses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  succssesImage: { marginBottom: 30 },
  successTextHeader: {
    fontSize: 30,
    fontWeight: "700",
  },
  successSubtext: {
    color: "#9E9D9D",
    width: 300,
    marginTop: 10,
    textAlign: "center",
  },
  successTexts: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  BtnReturnToHome: {
    backgroundColor: "#099588",
    color: "white",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 350,
    borderRadius: 32,
    marginTop: 50,
  },
  BtnText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },

  BtnBookingAgain: {
    backgroundColor: "#099588",
    color: "white",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 350,
    borderRadius: 32,
    marginTop: 10,
  },
});
