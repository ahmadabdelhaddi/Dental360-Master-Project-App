import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import curvedBack from "../assets/curvedBack.jpg";
import { useNavigation, useRoute } from "@react-navigation/native"; // Import the useRoute hook

const GetHelp = () => {
  const navigation = useNavigation();
const route = useRoute(); // Use the useRoute hook to access route parameters
const { userEmail, authToken, appointments, userId } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.bookingHeader}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Sidebar"  ,{ userEmail, authToken, userId });
          }}
        >
          <Image source={curvedBack} />
        </TouchableOpacity>
        <Text style={styles.curved}>Get Help</Text>
        <Text></Text>
      </View>
    </View>
  );
};

export default GetHelp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: "white",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  bookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  curved: {
    fontSize: 20,
  },
});
