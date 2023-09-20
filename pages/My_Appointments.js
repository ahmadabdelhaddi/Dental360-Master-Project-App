import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import curvedBack from "../assets/curvedBack.jpg";
import map from "../assets/map.png";
import logo from "../assets/logoSmall.png";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";

const My_Appointments = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userEmail, authToken, userId } = route.params;

  const [appointments, setAppointments] = useState(null);

  useEffect(() => {
    const fetchAppointmentsForUser = async () => {
      try {
        const USER_ID = userId;

        const response = await axios.get(
          `https://backendserver-9s51.onrender.com/api/appointments/user/${USER_ID}`
        );

        if (response.status === 200) {
          setAppointments(response.data);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointmentsForUser();
  }, [userEmail, authToken]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return { backgroundColor: "#FFEFD7", color: "#A05E03" };
      case "completed":
        return { backgroundColor: "#C9F0FF", color: "#0065D0" };
      case "accepted":
        return { backgroundColor: "#ECFCE5", color: "#198155" };
      case "declined":
        return { backgroundColor: "#FFE5E5", color: "#D3180C" };
      default:
        return { backgroundColor: "gray", color: "white" };
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bookingHeader}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home", { userEmail, authToken, userId });
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
              <Text>Hour: {item.selectedHour}</Text>
              <Text>Date: {item.selectedDate}</Text>
              <Text>Phone: {item.phoneNumber}</Text>
              <Text>Phone: {item.service}</Text>
              <Text
                style={[
                  styles.status,
                  {
                    backgroundColor: getStatusStyle(item.status)
                      .backgroundColor,
                    color: getStatusStyle(item.status).color,
                  },
                ]}
              >
                Status: {item.status}
              </Text>
              <Text style={styles.line}>
                ----------------------------------------------
              </Text>
            </View>
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
  status: {
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 5,
    borderRadius: 17,
    width: 200,
  },
  line: {
    color: "#E0E0E0",
  },
});
