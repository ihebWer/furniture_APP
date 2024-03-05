// Importation des composants nécessaires depuis react-native, react-native-safe-area-context et expo-status-bar.
// Ces composants sont utilisés pour construire l'interface utilisateur de l'écran de profil.
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./profile.style";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../constants";
import {
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Déclaration du composant Profile avec navigation en tant que prop pour la navigation entre les écrans.
const Profile = ({ navigation }) => {

   // Déclaration des états pour stocker les données de l'utilisateur et son statut de connexion.
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  

  // Utilisation de useEffect pour vérifier l'existence de l'utilisateur au démarrage de l'écran.
  useEffect(() => {
    checkExistingUser();
  }, []);

  // Fonction asynchrone pour vérifier si l'utilisateur existe déjà en utilisant AsyncStorage.
  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem("id");
    const useId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(useId);

      if (currentUser !== null) {
        const parsedData = JSON.parse(currentUser);
        setUserData(parsedData);
        setUserLogin(true);
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log("Error retrieving the data:", error);
    }
  };

  const userLogout = async () => {
    const id = await AsyncStorage.getItem("id");
    const useId = `user${JSON.parse(id)}`;
    try {
      await AsyncStorage.multiRemove([useId, "id"]);
      navigation.replace("Bottom Navigation");
    } catch (error) {
      console.log("Error loggin out:", error);
    }
  };

  // Fonction pour afficher une alerte avant de vider le cache.
  const clearCache = () => {
    Alert.alert(
      "Clear cache",
      "Are you sure you want to delete all saved data on your device",
      [
        {
          text: "cancel",
          onPress: () => console.log("cancel clear cache"),
        },
        {
          text: "continue",
          onPress: () => console.log("clear cache pressed"),
        },
        { defaultIndex: 1 },
      ]
    );
  };

  // Fonction pour afficher une alerte avant de supprimer le compte de l'utilisateur.
  const deleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account ",
      [
        {
          text: "cancel",
          onPress: () => console.log("cancel pressed"),
        },
        {
          text: "continue",
          onPress: () => console.log("delete account pressed"),
        },
        { defaultIndex: 1 },
      ]
    );
  };

  // Fonction pour afficher une alerte avant de déconnecter l'utilisateur.
  const logout = () => {
    Alert.alert("Logout", "Are you sure you want to logout ", [
      {
        text: "cancel",
        onPress: () => console.log("cancel pressed"),
      },
      {
        text: "continue",
        onPress: () => userLogout(),
      },
      { defaultIndex: 1 },
    ]);
  };

   // Structure de l'écran de profil avec des composants View, Image, et Text pour afficher les informations de l'utilisateur.
  // Les TouchableOpacity sont utilisés pour les boutons permettant à l'utilisateur d'interagir avec l'écran (naviguer, se déconnecter, etc.).

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.gray} />

        <View style={{ width: "100%" }}>
          <Image
            source={require("../assets/images/space.jpg")}
            style={styles.cover}
          />
        </View>

        <View style={styles.profileContainer}>
          <Image
            source={require("../assets/images/profile.jpeg")}
            style={styles.profile}
          />
          <Text style={styles.name}>
            {userLogin === true
              ? userData.username
              : "please login into your account"}
          </Text>
          {userLogin === false ? (
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <View style={styles.loginBtn}>
                <Text style={styles.menuText}>L O G I N </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.loginBtn}>
              <Text style={styles.menuText}>{userData.email}   </Text>
            </View>
          )}

          {userLogin === false ? (
            <View></View>
          ) : (
            <View style={styles.menuWrapper}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Favourites")}
              >
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="heart-outline"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Favorites</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Orders")}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Orders</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <View style={styles.menuItem(0.2)}>
                  <SimpleLineIcons
                    name="bag"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Cart</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => clearCache()}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="cached"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Clear cache</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteAccount()}>
                <View style={styles.menuItem(0.2)}>
                  <AntDesign
                    name="deleteuser"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Delete Account</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => logout()}>
                <View style={styles.menuItem(0.2)}>
                  <AntDesign name="logout" color={COLORS.primary} size={24} />
                  <Text style={styles.menuText}>Logout</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Profile;
