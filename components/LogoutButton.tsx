import React from 'react';
import { StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      router.replace('/Logout'); 
    } catch (error: any) {
      Alert.alert("Erro ao sair", error.message);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <Text style={styles.text}>🚪 Logout</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#e53935',
    padding: 12,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
