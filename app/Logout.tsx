import { getAuth, signOut } from "firebase/auth";
import { FIREBASE_APP } from "../constants/firebaseConfig";
import { Button, Alert } from "react-native";
import { useRouter } from "expo-router";

const auth = getAuth(FIREBASE_APP);

import React from 'react'

const Logout = () => {

  const route = useRouter();

  const logoutUser = async () => {
    try {
      await signOut(auth);
      Alert.alert("Usuario deslogado com sucesso")
      route.push("/screens/Login")
    } catch (error) {
      Alert.alert("Erro", "Erro ao deslogar usuario")
    }
  };
  return (
    <>
      <Button title="Logout" onPress={logoutUser} />
    </>
  )
}

export default Logout
