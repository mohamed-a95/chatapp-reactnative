import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { AuthContext } from "../contexts/AppProvider";

export default function Login({ navigation, route }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [LoginMessage, setLoginMessage] = useState("");
  const { handleLogin, loginMessage } = useContext(AuthContext);

  useEffect(() => {
    if (route.params?.action === "logout") {
      setUserName("");
      setPassword("");
      {
        loginMessage;
      }
      ("");
    }
  }, [route.params]);

  console.log("login", loginMessage);
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

      <Text
        style={
          loginMessage === "You have registered succesfully. Please login!"
            ? styles.successmsg
            : styles.errormsg
        }
      >
        {loginMessage}
      </Text>

      <TouchableOpacity
        style={styles.generalButton}
        onPress={() => handleLogin(userName, password)}
      >
        <Text>Log in</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerbtn}
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    color: "orange",
    alignSelf: "center",
    marginBottom: 10,
  },

  textinput2: {
    color: "green",
    alignSelf: "center",
    marginBottom: 10,
  },
  generalButton: {
    backgroundColor: "lightblue",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
    padding: 10,
    marginHorizontal: 20,
  },

  registerbtn: {
    backgroundColor: "lightblue",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 20,
  },

  errormsg: {
    color: "red",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  successmsg: {
    color: "blue",
    marginHorizontal: 20,
    marginBottom: 20,
  },
});
