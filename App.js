// App.js

import * as React from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppProvider from "./components/contexts/AppProvider";
import AuthNavigator from "./components/navigation/AuthNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <AppProvider>
          <AuthNavigator />
        </AppProvider>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
