
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { FIREBASE_APP } from "../constants/firebaseConfig";
import { useEffect } from "react";
import { router } from "expo-router";

export default function AuthListener() {
  useEffect(() => {
    const auth = getAuth(FIREBASE_APP);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/");
      }
    });

    return unsubscribe;
  }, []);

  return null;
}
