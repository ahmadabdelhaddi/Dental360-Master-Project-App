import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import FirstSplash from "./pages/Splash/FirstSplash";
import SecondSplash from "./pages/Splash/SecondSplash";
import Introduction_one from "./pages/Introductions/Introduction_one";
import Introduction_two from "./pages/Introductions/Introduction_two";
import Introduction_three from "./pages/Introductions/Introduction_three";
import { createStackNavigator } from "@react-navigation/stack";
import Login_page from "./pages/Registration/Login_page";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Succsses from "./pages/Succsses";
import Sidebar from "./pages/Sidebar";
import Register_Page from "./pages/Registration/Register_Page";
import My_Appointments from "./pages/My_Appointments";
import AboutUs from "./pages/AboutUs";
import GetHelp from "./pages/GetHelp";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {/* <Stack.Screen name="FirstSplash" component={FirstSplash} />
        <Stack.Screen name="SecondSplash" component={SecondSplash} />
        <Stack.Screen name="Introduction_one" component={Introduction_one} />
        <Stack.Screen name="Introduction_two" component={Introduction_two} />
        <Stack.Screen
          name="Introduction_three"
          component={Introduction_three}
        /> */}

        <Stack.Screen name="Login_page" component={Login_page} />
        <Stack.Screen name="Register_Page" component={Register_Page} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Booking" component={Booking} />
        <Stack.Screen name="Succsses" component={Succsses} />
        <Stack.Screen name="Sidebar" component={Sidebar} />
        <Stack.Screen name="My_Appointments" component={My_Appointments} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="GetHelp" component={GetHelp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
