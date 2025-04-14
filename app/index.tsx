import { useState } from "react";
import { StyleSheet, View, Text, Pressable, TextInput } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
import { auth } from "../constants/firebaseConfig";
import { primary, backGroundContainer, backGroundTitle, secondary } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";



export default function CreateUser() {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleRoute = () => {
    router.push('/screens/Login')
  }
  
  return (
    <>
      <Pressable style={styles.backStyle} onPress={handleRoute}>
        <Ionicons name="arrow-back" size={24} color={secondary} />
      </Pressable>
      <View style={styles.container}>
        <Text style={styles.title}>👨🏻‍💼 Create User</Text>
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
        {error && <Text style={{ color: "red" }}>{error}</Text>}
        {loading && <Text style={{ color: "blue" }}>Loading...</Text>}
        <Pressable
          style={styles.item}
          onPress={async () => {
            try {
              if (!email || !password) {
                setError("Por favor, preencha todos os campos.");
                return;
              }
              setLoading(true);
              await createUserWithEmailAndPassword(auth, email, password);
              router.push('/screens/Login')
            } catch (error: any) {
              setError(error.message);
            } finally {
              setLoading(false);
            }
          }}
        >
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
    color: '#ccc',
    marginTop: 4,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backGroundContainer,
  },
  pressable: {
    justifyContent: 'center',
    alignItems: 'center',

  }
});
