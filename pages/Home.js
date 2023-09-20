import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TextInput,
  screenWidth,
  ScrollView,
} from "react-native";
import slider from "../assets/sliderHome1.jpg";
import avatar from "../assets/avatar.jpg";
import allServices from "../assets/allServices.jpg";
import { useNavigation, useRoute } from "@react-navigation/native"; // Import the useRoute hook
import settings from "../assets/settings.png";
import React, { useState, useEffect } from "react";
import axios from "axios";

const images = [
  require("../assets/sliderHome1.jpg"), // Import your images here
  require("../assets/slider2.png"),
  require("../assets/slider3.png"),
  require("../assets/slider4.png"),
];

const Home = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userEmail, authToken, appointments, userId } = route.params;

  // Extract the first 7 alphabetical characters from the user's email
  const shortenedUserEmail = userEmail
    .replace(/[^a-zA-Z]/g, "")
    .substring(0, 7);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.headerTop}>
          <View style={styles.header}>
            <Image source={avatar} />
            <View>
              <Text>Welcome 👋</Text>
              <Text style={styles.headerName}>{shortenedUserEmail}</Text>
              <Text style={styles.headerName}>id : {userId}</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Sidebar", {
                  userEmail,
                  authToken,
                  appointments,
                  userId,
                });
              }}
            >
              <Image source={settings} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.letsStart}>Let's Start ..</Text>
        </View>
        <View style={styles.searchBar}>
          <TextInput placeholder="🔍 Search For a Service"></TextInput>
        </View>

        {/* <View style={styles.homeSlider}>
        <Image source={slider} />
      </View> */}
        <View style={styles.homeSlider}>
          <FlatList
            data={images}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.slide}>
                <Image source={item} style={styles.image} />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <View>
          <Text style={styles.allServices}>All Services</Text>
        </View>
        <View style={styles.services}>
          <TouchableOpacity>
            <Image source={allServices} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Booking", {
                userEmail,
                authToken,
                appointments,
                userId,
              });
            }}
            style={styles.serviceBtns}
          >
            <Text style={styles.serviceText}>حجز موعد أو إستشارة</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("My_Appointments", {
                userEmail,
                authToken,
                appointments,
                userId,
              });
            }}
            style={styles.serviceBtns}
          >
            <Text style={styles.serviceText}>حجوزاتي</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceBtns}>
            <Text style={styles.serviceText}>اطلب المساعدة</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: "white",
    paddingHorizontal: 16,
  },

  homeSlider: {
    height: 180, // Set the height as needed
  },
  slide: {
    width: screenWidth, // Make each slide the width of the screen
  },
  image: {
    marginRight: 10,
    resizeMode: "cover",
  },

  header: {
    flexDirection: "row", // You can set the direction as per your layout requirements.
    justifyContent: "flex-start", // Adjust this based on your header content layout.
    alignItems: "center",
    gap: 5,
  },
  headerName: {
    fontWeight: "600",
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  letsStart: {
    fontWeight: "bold",
    fontSize: 32,
    marginBottom: 10,
  },
  searchBar: {
    width: 350,
    backgroundColor: "#fafafa",
    height: 50,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 10,
    borderRadius: 16,
    marginBottom: 10,
  },
  services: {
    justifyContent: "center",
    alignItems: "center",
  },

  allServices: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
    marginTop: 20,
  },
  serviceBtns: {
    width: 325,
    height: 50,
    backgroundColor: "#099588",

    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    flexDirection: "column",
    borderRadius: 32,
  },
  serviceText: {
    color: "white",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 22,
    fontWeight: "600",
  },
  // Other styles for header components can be defined here.
});
