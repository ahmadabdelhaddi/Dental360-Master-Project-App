import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";
import { React, useState } from "react";
import curvedBack from "../assets/curvedBack.jpg";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import axios from "axios"; // Import the axios library

const Booking = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [service, setService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("pending");

  // // fullName,
  // service,
  // selectedDate,
  // selectedHour,
  // phoneNumber,

  const handleFormSubmit = async () => {
    const appointment = {
      fullName,
      service,
      selectedDate,
      selectedHour,
      phoneNumber,
      status,
    };

    try {
      const response = await axios.post(
        "https://backendserver-9s51.onrender.com/api/appointments",
        appointment,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.status);
      console.log(response.headers);
      const data = response.data;
      console.log(data);
      navigation.navigate("Succsses");
      // Handle the response data as needed
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error(error);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <View style={styles.bookingHeader}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Image source={curvedBack} />
          </TouchableOpacity>
          <Text style={styles.curved}>Book Appointment</Text>
          <Text></Text>
        </View>
        {/* Calender */}
        <View></View>

        {/* textInputFeailds */}

        <View>
          <Text>Book an appointment with the doctor</Text>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              keyboardType="default"
              value={fullName}
              onChangeText={(value) => {
                setFullName(value);
              }}
              required // Add the required attribute
            />
            <TextInput
              style={styles.input}
              placeholder="Select your service"
              value={service}
              onChangeText={(value) => {
                setService(value);
              }}
              required // Add the required attribute
            />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Select your Date"
              value={selectedDate}
              onChangeText={(value) => {
                setSelectedDate(value);
              }}
              required // Add the required attribute
            />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Select Hour"
              value={selectedHour}
              onChangeText={(value) => {
                setSelectedHour(value);
              }}
              required // Add the required attribute
            />

            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={(value) => {
                setPhoneNumber(value);
              }}
              required // Add the required attribute
            />
          </View>
          <TouchableOpacity
            style={styles.continueBtn}
            title="Submit"
            onPress={handleFormSubmit}
          >
            <Text style={styles.textBtnContinue}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Booking;
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
  textInputFeailds: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#E3E5E5",
    padding: 15,
    borderRadius: 6,
    color: "#72777A",
  },
  continueBtn: {
    backgroundColor: "#099588",
    color: "white",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    height: 50,
    width: 350,
    borderRadius: 32,
    position: "absolute",
    bottom: -380, // Set 'bottom' to 0 to position the button at the bottom
  },
  textBtnContinue: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
});
