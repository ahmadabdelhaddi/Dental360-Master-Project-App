import { StyleSheet, TouchableOpacity, Image, Text, View } from "react-native";
import React from "react";
import avatar from "../assets/avatar.jpg";
import settings from "../assets/settings.png";
import notifecations from "../assets/notifecations.png";
import myAppointments from "../assets/myAppointments.png";
import logout from "../assets/logout.png";
import help from "../assets/help.png";
import aboutus from "../assets/aboutus.png";
import { useNavigation, useRoute } from "@react-navigation/native"; // Import the useRoute hook

const Sidebar = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Use the useRoute hook to access route parameters
  const { userEmail, authToken, appointments, userId } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.headerTop}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home", { userEmail, authToken, userId });
          }}
        >
          <View style={styles.headerImg}>
            <Image source={avatar} />

            <View>
              <Text style={styles.headerUserame}>Ahmad Abelhadi</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home", { userEmail, authToken, userId });
            }}
          >
            <Image source={settings} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Notifications */}
      {/* <View style={styles.header}>
        <Image source={notifecations} />

        <View>
          <Text style={styles.headerName}>Notifications</Text>
        </View>
      </View> */}

      {/* My Appointment’s */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("My_Appointments", {
            userEmail,
            authToken,
            userId,
          });
        }}
      >
        <View style={styles.header}>
          <Image source={myAppointments} />

          <View>
            <Text style={styles.headerName}>My Appointment’s</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Help */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("GetHelp", { userEmail, authToken, userId });
        }}
      >
        <View style={styles.header}>
          <Image source={help} />

          <View>
            <Text style={styles.headerName}>Get help</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("AboutUs", { userEmail, authToken, userId });
        }}
      >
        <View style={styles.header}>
          <Image source={aboutus} />

          <View>
            <Text style={styles.headerName}>About Us</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Login_page");
        }}
      >
        <View style={styles.header}>
          <Image source={logout} />

          <View>
            <Text style={styles.headerName}>Logout</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
  headerImg: {
    flexDirection: "row", // You can set the direction as per your layout requirements.
    justifyContent: "flex-start", // Adjust this based on your header content layout.
    alignItems: "center",
    marginBottom: 20,
    gap: 5,
  },
  headerUserame: {
    fontWeight: "700",
  },
  header: {
    flexDirection: "row", // You can set the direction as per your layout requirements.
    justifyContent: "flex-start", // Adjust this based on your header content layout.
    alignItems: "center",
    marginBottom: 30,
    gap: 15,
  },
  headerName: {
    fontWeight: "500",
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginBottom: 10,
  },
});
