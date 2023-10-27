import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../components/contexts/AppProvider";
import { useNavigation } from "@react-navigation/native";

const Settings = () => {
  const { handleLogout } = useContext(AuthContext);
  const navigation = useNavigation();
  const logout = async () => {
    console.log("Profile LOGOUT");
    await handleLogout();

    navigation.navigate("Login");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>Settings</Text>
        <Button style={btnLogout} title="Log Out" onPress={() => logout()} />
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between",
  },

  btnLogout: {
    fontWeight: "bold",
    color: "white",
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: 80,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "black",
  },
});
