import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useState } from "react";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  Cart,
  ProductDetails,
  NewRivals,
  LoginPage,
  Favourites,
  Orders,
  SignUp,
} from "./screens";
import React, { useEffect } from "react";
import { UpdteCartContext } from "./context/updateCartContext";

// Création d'un gestionnaire de pile de navigation (Stack Navigator) en utilisant la fonction createNativeStackNavigator.
// Ce gestionnaire est utilisé pour permettre la navigation entre les écrans avec des transitions d'écran standard.
// Chaque écran dans le Stack Navigator est traité comme une nouvelle page, permettant une navigation intuitive avec la possibilité de revenir à l'écran précédent.
const Stack = createNativeStackNavigator();

export default function App() {
  const [updateCart, setUpdateCart] = useState(false);

  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    // Vérify if the fonts is loaded
    if (fontsLoaded) {
      //hide the splash screen
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UpdteCartContext.Provider value={{ updateCart, setUpdateCart }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Bottom Navigation"
              component={BottomTabNavigation}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ProductDetails"
              component={ProductDetails}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ProductList"
              component={NewRivals}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Login"
              component={LoginPage}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Orders"
              component={Orders}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Favourites"
              component={Favourites}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UpdteCartContext.Provider>
    </GestureHandlerRootView>
  );
}
