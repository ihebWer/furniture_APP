// Importation des composants React Native nécessaires pour construire l'interface utilisateur de l'écran d'inscription.
// SafeAreaView est utilisé pour éviter les chevauchements avec les éléments de l'interface système, comme la barre de statut ou le notch sur certains appareils.
// ScrollView permet de rendre l'écran défilable, utile pour les formulaires longs ou pour les écrans de petite taille.
// TextInput est utilisé pour les champs de saisie du formulaire.
// Alert est utilisé pour afficher des alertes ou des confirmations.
// Les icônes sont importées de @expo/vector-icons pour améliorer visuellement les inputs et les boutons.
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import styles from "./login.style";
import BackBtn from "../components/BackBtn";
import Button from "../components/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons, Ionicons
} from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import axios from "axios";
// Définition du schéma de validation des champs du formulaire avec Yup.
// Ceci est utilisé pour valider le formulaire d'inscription et fournir des messages d'erreur appropriés.
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 character ")
    .required("Required"),
  email: Yup.string()
    .email("Provide a valid email address")
    .required("Required"),
  location: Yup.string()
    .min(3,"Provide a valid location")
    .required("Required"),
  username: Yup.string()
    .min(3,"Provide a valid username")
    .required("Required"),
});

const SignUp = ({navigation}) => {
  // Déclaration des états locaux pour la gestion du chargement et la visibilité du mot de passe.
  const [loader, setLoader] = useState(false);
  const [obsecureText, setObsecureText] = useState(false); // Pour gérer la visibilité du mot de passe

  // Fonction pour afficher une alerte en cas de formulaire invalide.
  const inValidForm = () => {
    Alert.alert("Invalid Form", " Please provide all required fields", [
      {
        text: "Cancel",
        onPress: () => {},
      },
      {
        text: "Continue",
        onPress: () => {},
      },
      { defaultIndex: 1 },
    ]);
  };

  // Fonction asynchrone pour l'enregistrement de l'utilisateur.
  // Utilise axios pour faire une requête POST à un endpoint d'API.

  const registerUser = async(values) =>{
    setLoader(true);

    try {
      const endpoint = 'http://localhost:3000/api/register';
      const data = values;

      const response = await axios.post(endpoint, data);

      if (response.status === 201) {
        navigation.replace('Login') // Active l'indicateur de chargement
      }
    } catch (error) {
      console.log(error); // Log l'erreur en cas d'échec
    }

  };

  // Structure de l'écran d'inscription utilisant ScrollView pour un défilement vertical.
  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <View>
          <BackBtn onPress={() => navigation.goBack()} />
          <Image
            source={require("../assets/images/bk.png")}
            style={{
              height: SIZES.height/4,
              width: SIZES.width-60,
              resizeMode: "contain",
              marginBottom: SIZES.xxLarge,
            }}
          />

          <Text style={styles.title}> unlimited Luxurious Furniture</Text>

          <Formik
            initialValues={{ email: "", password: "", location: "", username: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => registerUser(values)}
          >
            {({
              handleChange,
              touched,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
              setFieldTouched,
            }) => (
              <View>
                <View>

                <View style={styles.wrapper}>
                    <Text style={styles.label}>Username</Text>
                    <View
                      style={styles.inputWrapper(
                        touched.email ? COLORS.secondary : COLORS.offwhite
                      )}
                    >
                      <MaterialCommunityIcons
                        name="face-man-profile"
                        size={20}
                        color={COLORS.gray}
                        style={styles.iconStyle}
                      />
                      <TextInput
                        placeholder="Enter Username"
                        onFocus={() => {
                          setFieldTouched("username");
                        }}
                        onBlur={() => {
                          setFieldTouched("username", "");
                        }}
                        value={values.username}
                        onChangeText={handleChange("username")}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{ flex: 1 }}
                      />
                    </View>

                    {touched.username && errors.username && (
                      <Text style={styles.errorMessage}> {errors.username} </Text>
                    )}
                  </View>




                  <View style={styles.wrapper}>
                    <Text style={styles.label}>Email</Text>
                    <View
                      style={styles.inputWrapper(
                        touched.email ? COLORS.secondary : COLORS.offwhite
                      )}
                    >
                      <MaterialCommunityIcons
                        name="email-outline"
                        size={20}
                        color={COLORS.gray}
                        style={styles.iconStyle}
                      />
                      <TextInput
                        placeholder="Enter email"
                        onFocus={() => {
                          setFieldTouched("email");
                        }}
                        onBlur={() => {
                          setFieldTouched("email", "");
                        }}
                        value={values.email}
                        onChangeText={handleChange("email")}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{ flex: 1 }}
                      />
                    </View>

                    {touched.email && errors.email && (
                      <Text style={styles.errorMessage}> {errors.email} </Text>
                    )}
                  </View>

                  <View style={styles.wrapper}>
                    <Text style={styles.label}>Location</Text>
                    <View
                      style={styles.inputWrapper(
                        touched.location ? COLORS.secondary : COLORS.offwhite
                      )}
                    >
                      <Ionicons
                        name="location-outline"
                        size={20}
                        color={COLORS.gray}
                        style={styles.iconStyle}
                      />
                      <TextInput
                        placeholder="Enter location"
                        onFocus={() => {
                          setFieldTouched("location");
                        }}
                        onBlur={() => {
                          setFieldTouched("location", "");
                        }}
                        value={values.location}
                        onChangeText={handleChange("location")}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{ flex: 1 }}
                      />
                    </View>

                    {touched.location && errors.location && (
                      <Text style={styles.errorMessage}> {errors.location} </Text>
                    )}
                  </View>

                  <View style={styles.wrapper}>
                    <Text style={styles.label}>Password</Text>
                    <View
                      style={styles.inputWrapper(
                        touched.password ? COLORS.secondary : COLORS.offwhite
                      )}
                    >
                      <MaterialCommunityIcons
                        name="lock-outline"
                        size={20}
                        color={COLORS.gray}
                        style={styles.iconStyle}
                      />
                      <TextInput
                        secureTextEntry={obsecureText}
                        placeholder="Password"
                        onFocus={() => {
                          setFieldTouched("password");
                        }}
                        onBlur={() => {
                          setFieldTouched("password", "");
                        }}
                        value={values.password}
                        onChangeText={handleChange("password")}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{ flex: 1 }}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          setObsecureText(!obsecureText);
                        }}
                      >
                        <MaterialCommunityIcons
                          name={
                            !obsecureText ? "eye-outline" : "eye-off-outline"
                          }
                          size={18}
                        />
                      </TouchableOpacity>
                    </View>

                    {touched.password && errors.password && (
                      <Text style={styles.errorMessage}>
                        {" "}
                        {errors.password}{" "}
                      </Text>
                    )}
                  </View>


                  <Button
                    title={"S I G N U P"}
                    onPress={isValid ? handleSubmit : inValidForm}
                    loader={loader}
                    isValid={isValid}
                  />

                  
                </View>

              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default SignUp

