import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import curvedBack from "../assets/curvedBack.jpg";
import { useNavigation } from "@react-navigation/native";
import map from "../assets/map.png";
import logo from "../assets/logoSmall.png";
import axios from "axios"; // Import the axios library

const My_Appointments = () => {
  const navigation = useNavigation();

  // get all appointments
  const [appointments, setAppointments] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "https://backendserver-9s51.onrender.com/api/appointments"
        );

        if (response.status === 200) {
          setAppointments(response.data); // Use response.data instead of response.json()
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []); // Removed 'appointments' from dependencies array as it caused an infinite loop

  // update status
  // Function to update appointment status
  const updateStatus = async (appointmentId, newStatus) => {
    try {
      console.log(`Updating status for appointment with ID: ${appointmentId}`);
      const response = await axios.patch(
        `https://backendserver-9s51.onrender.com/api/appointments/${appointmentId}`,
        {
          status: newStatus,
        }
      );

      if (response.status === 200) {
        // Update the local appointments list with the new status
        const updatedAppointments = appointments.map((appointment) => {
          if (appointment._id === appointmentId) {
            return { ...appointment, status: newStatus };
          }
          return appointment;
        });
        setAppointments(updatedAppointments);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bookingHeader}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Image source={curvedBack} />
        </TouchableOpacity>
        <Text style={styles.curved}>My Bookings</Text>
        <View></View>
      </View>
      <Text style={styles.CurrentReservation}>Current Reservation</Text>
      <FlatList
        data={appointments}
        renderItem={({ item }) => (
          <View style={styles.historyBooking}>
            <View>
              <Image style={styles.logoSmall} source={logo} />
            </View>
            <View>
              <Text style={styles.historyHeaderText}>{item.fullName}</Text>
              <Text>Hour: {item.selectedHour} PM</Text>
              <Text>Service: {item.service}</Text>
              <Text
                style={{
                  backgroundColor: "#FFEFD7",
                  color: "#A05E03",
                  padding: 10,
                }}
              >
                Status: {item.status}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                updateStatus(item._id, "Accepted");
              }}
            >
              <Text style={styles.button}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                updateStatus(item._id, "Rejected");
              }}
            >
              <Text style={styles.button}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default My_Appointments;

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
  CurrentReservation: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 40,
  },
  historyBooking: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  logoSmall: {
    width: 60,
    height: 60,
    marginRight: 30,
  },
  historyHeaderText: {
    fontWeight: "600",
    fontSize: 18,
  },

  button: {
    backgroundColor: "#007BFF",
    color: "#FFFFFF",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    textAlign: "center",
  },
});
