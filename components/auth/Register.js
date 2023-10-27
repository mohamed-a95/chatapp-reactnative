import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../contexts/AppProvider";

export default function Register({ navigation }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const URL = "https://chat-api-with-auth.up.railway.app/auth/register";
  const { setLoginMessage } = useContext(AuthContext);
  const [registerResult, setRegisterResult] = useState(null);

  const handleRegister = async () => {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password: password,
        }),
      });

      if (response.status === 200) {
        setLoginMessage("You have registered successfully. Please login!");
        navigation.navigate("Login");
      } else if (response.status === 409) {
        const result = await response.json();
        setRegisterResult(result.message);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={userName}
        onChangeText={(text) => setUserName(text)}
      ></TextInput>

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      ></TextInput>

      {registerResult && (
        <Text style={styles.errorMsgrg}>{registerResult}</Text>
      )}

      <TouchableOpacity
        style={styles.inputReg}
        onPress={() => handleRegister()}
      >
        <Text>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.backText}> Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: 'center',
    justifyContent: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
    marginHorizontal: 20,
  },

  textinput: {
    color: "red",
    alignSelf: "center",
  },

  errorMsgrg: {
    color: "red",
    alignSelf: "flex-start",
    marginHorizontal: 20,
  },

  btn: {
    marginBottom: 10,
  },

  inputReg: {
    backgroundColor: "lightblue",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
    padding: 10,
    marginVertical: 20,
    marginHorizontal: 20,
  },

  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: 80,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "black",
  },

  backText: {
    fontWeight: "bold",
    color: "white",
  },
});
