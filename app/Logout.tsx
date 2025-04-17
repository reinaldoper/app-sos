import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../constants/firebaseConfig';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { primary, secondary, backGroundContainer } from '../constants/Colors';
import { useNavigation } from 'expo-router';

/**
 * Logout component that renders a screen with an option to log out.
 * 
 * This component displays a message asking the user if they wish to log out of 
 * their account, along with a button to confirm the logout action. 
 * 
 * When the logout button is pressed, the `handleLogout` function is executed, 
 * which signs the user out using Firebase authentication and redirects them to 
 * the login screen.
 * 
 * Additionally, there's a back button that allows the user to navigate to the 
 * previous screen by executing the `handleRoute` function.
 */

export default function Logout() {
  const router = useRouter();
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/screens/Login'); 
    } catch (error: any) {
      Alert.alert("Erro ao sair", error.message);
    }
  };
  const handleRoute = () => {
    navigation.goBack;
  }

  return (
    <>
    <Pressable style={styles.backStyle} onPress={handleRoute}>
      <Ionicons name="arrow-back" size={24} color={secondary} />
    </Pressable>
    <View style={styles.container}>
      <Text style={styles.title}>👋 Deseja sair da sua conta?</Text>
      <Pressable style={styles.button} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#fff" />
        <Text style={styles.buttonText}>Sair</Text>
      </Pressable>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backGroundContainer,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    color: primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: secondary,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  backStyle: {
    backgroundColor: primary,
    padding: 10,
    borderRadius: 5,
    width: 40,
    marginLeft: 10,
    marginVertical: 10,
  },
});
