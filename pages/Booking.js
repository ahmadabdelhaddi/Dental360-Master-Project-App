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
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import { React, useState } from "react";
import curvedBack from "../assets/curvedBack.jpg";
import { useNavigation, useRoute } from "@react-navigation/native"; // Import the useRoute hook
import { useEffect } from "react";
import axios from "axios"; // Import the axios library
import { CalendarList, Agenda } from "react-native-calendars";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
const data = [
  { label: "reservation", value: "reservation" },
  { label: "consultation", value: "consultation" },
];
const Booking = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [service, setService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("pending");
  const route = useRoute(); // Use the useRoute hook to access route parameters
  const { userEmail, authToken, appointments, userId } = route.params;
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [availableHours, setAvailableHours] = useState([
    { id: "1", time: "9:30 AM - 10:30 AM" },
    { id: "2", time: "11:30 AM - 12:30 PM" },
    { id: "3", time: "1:30 PM - 2:30 PM" },
    { id: "4", time: "4:30 PM - 5:30 PM" },
    { id: "5", time: "6:30 PM - 7:30 PM" },
  ]);

  const handleTimePress = (time) => {
    setSelectedHour(time);

    // Remove the selected hour from availableHours
    setAvailableHours((prevHours) =>
      prevHours.filter((hour) => hour.id !== time.id)
    );
  };

  const handleFormSubmit = async () => {
    try {
      // Check for missing fields
      if (
        !fullName ||
        !service ||
        !selectedDate ||
        !selectedHour ||
        !phoneNumber
      ) {
        Alert.alert("All appointment fields are required");
        // Handle the missing fields error (e.g., display an error message to the user)
        return;
      }

      const USER_ID = userId; // Replace with the actual user ID

      // Create an appointment object
      const appointmentData = {
        fullName,
        service,
        selectedDate,
        selectedHour,
        phoneNumber,
        status,
      };

      // Make a POST request to create a new appointment
      const response = await axios.post(
        `https://backendserver-9s51.onrender.com/api/appointments/${USER_ID}`,
        appointmentData
      );

      if (response.status === 200) {
        // Appointment created successfully
        // You can navigate to a success page or perform other actions here
        console.log("Appointment created successfully", appointmentData);
        navigation.navigate("Succsses", { userEmail, authToken, userId });
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error === "Appointment already booked"
      ) {
        // Handle the "Appointment already booked" error (e.g., display an error message to the user)
        Alert.alert("Appointment already booked , choose another time");
        // You can display an error message to the user or perform other error handling actions
      } else {
        // Handle other errors from the API request or unexpected errors
        console.error("Error creating appointment:", error);
        // You can display a general error message to the user or perform other error handling actions
      }
    }
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "#099588" }]}>
          Select your service
        </Text>
      );
    }
    return null;
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
              navigation.navigate("Home", { userEmail, authToken, userId });
            }}
          >
            <Image source={curvedBack} />
          </TouchableOpacity>
          <Text style={styles.curved}>Book Appointment</Text>
          <Text></Text>
        </View>
        {/* Calendar */}
        <View></View>

        {/* textInputFeailds */}
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Calendar
            onDayPress={(day) => {
              // const date = setSelected();
              setSelectedDate(day.dateString);
            }}
            markedDates={{
              [selectedDate]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: "#099588",
              },
            }}
            theme={{
              backgroundColor: "#ffffff",
              calendarBackground: "#ffffff",
              textSectionTitleColor: "#red",
              selectedDayBackgroundColor: "#099588",
              selectedDayTextColor: "white",
              todayTextColor: "#099588",
            }}
          />

          <FlatList
            data={availableHours}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleTimePress(item.time)}
                style={[
                  styles.hour,
                  selectedHour === item.time && {
                    backgroundColor: "#099588",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.hourText,
                    selectedHour === item.time && {
                      color: "white",
                    },
                  ]}
                >
                  {item.time}
                </Text>
              </TouchableOpacity>
            )}
          />
          <View>
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
              {/* <View style={styles.containerr}>
                {renderLabel()}
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocus && { borderColor: "#099588" },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  maxHeight={100}
                  valueField="value"
                  placeholder={!isFocus ? "Select your service" : "..."}
                  searchPlaceholder="Search..."
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setValue(item.value);
                    setIsFocus(false);
                  }}
                  renderLeftIcon={() => (
                    <AntDesign
                      style={styles.icon}
                      color={isFocus ? "#099588" : "black"}
                      name="Safety"
                      size={20}
                    />
                  )}
                />
              </View> */}
              <View style={styles.containerr}></View>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select item"
                value={value}
                onChange={(item) => {
                  setService(item.value);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color="black"
                    name="Safety"
                    size={20}
                  />
                )}
              />
              <TextInput
                style={styles.inputDate}
                keyboardType="numeric"
                placeholder="Select your Date"
                value={selectedDate}
                onChangeText={(value) => {
                  setSelectedDate(value);
                }}
                required // Add the required attribute
                editable={false} // Set editable to false to make it read-only
              />
              <TextInput
                style={styles.inputHour}
                keyboardType="numeric"
                placeholder="Select Hour"
                value={selectedHour}
                onChangeText={(value) => {
                  setSelectedHour(value);
                }}
                required // Add the required attribute
                editable={false} // Set editable to false to make it read-only
              />

              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="numeric"
                value={phoneNumber}
                onChangeText={(value) => {
                  setPhoneNumber(value.toString());
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
        </ScrollView>
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
  },

  bookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  curved: {
    fontSize: 20,
  },
  allHeaders: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
    marginTop: 20,
  },
  hour: {
    marginTop: 10,
    marginRight: 10,
    borderWidth: "2",
    height: 40,
    width: 150,
    borderRadius: 32,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    borderColor: "#099588",
    color: "r",
  },
  hourText: {
    color: "#099588",
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
    marginTop: 20,
  },
  textBtnContinue: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },

  inputDate: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#E3E5E5",
    padding: 15,
    borderRadius: 6,
    color: "#72777A",
    backgroundColor: "#EFEFEF",
  },
  inputHour: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#E3E5E5",
    padding: 15,
    borderRadius: 6,
    color: "#72777A",
    backgroundColor: "#EFEFEF",
  },

  containerr: {
    backgroundColor: "white",
    marginTop: 10,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 29,
    top: 16,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 15,
  },
  placeholderStyle: {
    fontSize: 15,
    color: "#E3E5E5",
  },
  selectedTextStyle: {
    fontSize: 15,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 15,
  },
});
