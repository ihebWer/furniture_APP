import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Profile, Search } from "../screens";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/index";


// retrun a navigation component that renders tab bar
// at the bottom of our screen 
const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 70,
  },
};
// Composant BottomTabNavigation pour la navigation par onglets en bas de l'écran.
// Utilise la bibliothèque @react-navigation/bottom-tabs pour la navigation entre les écrans.
// La configuration screenOptions est appliquée globalement à tous les onglets.
// Chaque onglet possède une icône personnalisée qui change selon son état (sélectionné ou non).
// Les couleurs des icônes sont également adaptées selon l'état de l'onglet pour améliorer l'expérience utilisateur.

const BottomTabNavigation = () => {
  // Début de la définition du navigateur d'onglets avec les options de style spécifiées dans screenOptions.
  return (
    <Tab.Navigator screenOptions={screenOptions}>
       {/* Onglet 'Home' avec icône personnalisée. L'icône et la couleur changent si l'onglet est actif. */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
             {/* Onglet 'Search' avec icône de recherche. La couleur change selon l'état de l'onglet. */}
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={focused ? COLORS.primary : COLORS.gray2}
              />
            );
          },
        }}
      />
       {/* Onglet 'Profile' avec icône personnalisée pour le profil utilisateur. */}
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={"search-sharp"}
                size={24}
                color={focused ? COLORS.primary : COLORS.gray2}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={24}
                color={focused ? COLORS.primary : COLORS.gray2}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
