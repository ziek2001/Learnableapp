import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Import your screens (you will create them next)
import HomeScreen from "./screens/HomeScreen";
import QuizScreen from "./screens/QuizScreen";
import SignLanguageScreen from "./screens/SignLanguageScreen";
import RoutineScreen from "./screens/RoutineScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#0066CC",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            paddingVertical: 8,
            height: 60,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName = "home";

            if (route.name === "Home") iconName = "home";
            if (route.name === "Quiz") iconName = "book";
            if (route.name === "Sign Language") iconName = "hand-left";
            if (route.name === "Routine") iconName = "calendar";

            return <Ionicons name={iconName} size={size} color={color} />;
          }
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Quiz" component={QuizScreen} />
        <Tab.Screen name="Sign Language" component={SignLanguageScreen} />
        <Tab.Screen name="Routine" component={RoutineScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
