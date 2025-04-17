import { useState } from "react";
import { StyleSheet, View, Text, Pressable, TextInput } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
import { auth } from "../../constants/firebaseConfig";
import { primary, backGroundContainer, backGroundTitle, secondary, description } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";



/**
 * This component renders a login screen with input fields for email and password.
 * The user can input their email and password and submit the form to login.
 * If the login is successful, the user is redirected to the Home screen.
 * If the login fails, an error message is displayed.
 */
export default function Login() {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const navigateHome = () => {
    router.push('/');
  }

  const handleLogin = async () => {
    if (!email || !password) {
      setLoginError("Por favor, preencha todos os campos.");
      return;
    }

    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/Home');
    } catch (error: any) {
      setLoginError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Pressable style={styles.backStyle} onPress={navigateHome}>
        <Ionicons name="arrow-back" size={24} color={secondary} />
      </Pressable>
      <View style={styles.container}>
        <Text style={styles.title}>🔓 Login</Text>
        <TextInput
          placeholder="Email"
          style={styles.item}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.item}
          value={password}
          onChangeText={setPassword}
        />
        {loginError && <Text style={{ color: "red" }}>{loginError}</Text>}
        {isLoading && <Text style={{ color: "blue" }}>Loading...</Text>}
        <Pressable style={styles.item} onPress={handleLogin}>
          <Ionicons name="add" size={24} color={secondary} />
        </Pressable>
      </View>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backGroundContainer,
    padding: 16,
  },
  backStyle: {
    backgroundColor: primary,
    padding: 10,
    borderRadius: 5,
    width: 40,
    marginLeft: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    color: '#fdd835',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#1e88e5',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: backGroundTitle,
  },
  timestamp: {
    fontSize: 12,
    color: description,
    marginTop: 4,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backGroundContainer,
  },
});
