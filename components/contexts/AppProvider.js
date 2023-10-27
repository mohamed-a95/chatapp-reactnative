import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext();

export default function AppProvider({ children }) {
  const [accessToken, setAccessToken] = useState({});
  const URL = "https://chat-api-with-auth.up.railway.app/auth/token";
  const [loginMessage, setLoginMessage] = useState("");
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(null);

  const handleLogin = async (userName, password) => {
    console.log("userName", userName);
    console.log("pass", password);

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
      const result = await response.json();

      if (result.status == "401") {
        setLoginMessage("Incorrect user information");
      } else if (result.status == "200") {
        const authInformation = {};
        authInformation.userID = result.data._id;
        authInformation.accessToken = result.data.accessToken;

        await AsyncStorage.setItem("myUser", JSON.stringify(authInformation));

        setAccessToken(authInformation);

        navigation.navigate("Chat");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    console.log("handleLogout");

    try {
      await AsyncStorage.removeItem("accessToken");
      setAccessToken({});
    } catch (error) {
      console.log(error);
    }
  };

  const isLoggedIn = async () => {
    console.log("isLoggedIn");

    try {
      const token = await AsyncStorage.getItem("accessToken");
      setAccessToken(token);
      console.log("token", token);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        handleLogin,
        handleLogout,
        loginMessage,
        setLoginMessage,
        profileImage,
        setProfileImage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
