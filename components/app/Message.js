import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../contexts/AppProvider";

export default function Message({
  message,
  userID,
  setShowDeletion,
  showDeletion,
  setItemId,
}) {
  const { accessToken } = useContext(AuthContext);

  if (userID == accessToken.userID) {
    console.log("equal");
  }

  const handleDelete = () => {
    setShowDeletion(true);
    setItemId(message._id);
  };

  const formatMessageDate = (dateString) => {
    const messageDate = new Date(dateString);
    const hours = messageDate.getHours();
    const minutes = messageDate.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
    return `${formattedHours}:${minutes}:${ampm}`;
  };

  return (
    <View style={styles.container}>
      {userID == accessToken.userID ? (
        <View style={styles.right}>
          <TouchableOpacity onPress={() => handleDelete()}>
            <Text style={styles.textConten}>{message.content}</Text>
            <Text>{formatMessageDate(message.date)}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.left}>
          <Text style={styles.textConten}>{message.content}</Text>
          <Text>{formatMessageDate(message.date)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  right: {
    backgroundColor: "white",
    color: "blue",
    alignSelf: "flex-end",
    marginBottom: 10,
    width: "50%",
    borderRadius: 10,
  },
  left: {
    backgroundColor: "lightgray",
    alignItems: "flex-start",
    color: "green",
    marginBottom: 10,
    width: "50%",
    borderRadius: 10,
  },

  textConten: {
    margin: 10,
  },
});
