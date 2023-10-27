import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../contexts/AppProvider";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

import { FontAwesome } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import Message from "./Message";

export default function Chat() {
  const [allMessages, setAllMessages] = useState(null);
  const URL = "https://chat-api-with-auth.up.railway.app/messages";
  const { accessToken } = useContext(AuthContext);
  const [newMessage, setNewMessage] = useState("");
  const [showDeletion, setShowDeletion] = useState(false);
  const [itemId, setItemId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken.accessToken,
        },
      });
      const result = await response.text();

      setAllMessages(JSON.parse(result).data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSendMessage = async () => {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken.accessToken,
        },
        body: JSON.stringify({
          content: newMessage,
        }),
      });

      const result = await response.json();
      if (result.status == "201") {
        fetchData();

        setNewMessage("");
      }
      console.log("result", result);
    } catch (error) {
      console.log(error);
    }
  };

  /* delete message */

  const deleteMessage = async (id) => {
    try {
      const response = await fetch(URL + "/" + `${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + accessToken.accessToken,
        },
      });

      const resultat = await response.json();
      if (resultat.status == "200") {
        setAllMessages(allMessages.filter((item) => item._id != id));
      }
      setShowDeletion(false);
      setItemId(null);
    } catch (error) {
      console.log(error);
    }
  };

  const CancelDelete = () => {
    setShowDeletion(false);
    setItemId(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={allMessages}
        inverted
        renderItem={({ item }) =>
          item.user != null && (
            <Message
              key={item._id}
              message={item}
              userID={item.user._id}
              setShowDeletion={setShowDeletion}
              showDeletion={showDeletion}
              setItemId={setItemId}
            />
          )
        }
        keyExtractor={(item) => item.id}
      ></FlatList>

      {showDeletion ? (
        <View style={styles.deletionBox}>
          <MaterialIcons
            name="delete"
            size={25}
            color="black"
            onPress={() => deleteMessage(itemId)}
          />

          <Ionicons
            name="close"
            size={25}
            color="black"
            onPress={() => CancelDelete()}
          />
        </View>
      ) : (
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            placeholder="Message..."
            value={newMessage}
            onChangeText={(text) => setNewMessage(text)}
          ></TextInput>

          <TouchableOpacity onPress={() => handleSendMessage()}>
            <FontAwesome name="send-o" size={25} color="blue" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: 'center',
    justifyContent: "flex-end",
  },

  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    width: "80%",
    marginVertical: 10,
  },

  content: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    columnGap: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  deletionBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "orange",
    padding: 10,
    marginVertical: 10,
  },
});
