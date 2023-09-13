import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TextInput,
} from "react-native";
import React from "react";
import slider from "../assets/sliderHome1.jpg";
import avatar from "../assets/avatar.jpg";
import allServices from "../assets/allServices.jpg";
import { useNavigation } from "@react-navigation/native";
import settings from "../assets/settings.png";

const images = [
  require("../assets/sliderHome1.jpg"), // Import your images here
  require("../assets/slider2.png"),
  require("../assets/slider3.png"),
  require("../assets/slider4.png"),
];

const screenWidth = Dimensions.get("window").width;

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.headerTop}>
        <View style={styles.header}>
          <Image source={avatar} />
          <View>
            <Text>Welcome 👋</Text>
            <Text style={styles.headerName}>Ahmad Abelhadi</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Sidebar");
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
            navigation.navigate("Booking");
          }}
          style={styles.serviceBtns}
        >
          <Text style={styles.serviceText}>حجز موعد أو إستشارة</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("My_Appointments");
          }}
          style={styles.serviceBtns}
        >
          <Text style={styles.serviceText}>حجوزاتي</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.serviceBtns}>
          <Text style={styles.serviceText}>اطلب المساعدة</Text>
        </TouchableOpacity>
      </View>
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
