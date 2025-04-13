
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛡️ Aplicativo SOS</Text>
      <Text style={styles.subtitle}>
        Segurança pessoal na palma da sua mão
      </Text>

      <View style={styles.buttonGroup}>
        <Link href="/screens/SOSScreen" asChild>
          <TouchableOpacity style={styles.buttonRed}>
            <Text style={styles.buttonText}>🚨 Acessar SOS</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/screens/CheckInScreen" asChild>
          <TouchableOpacity style={styles.buttonGreen}>
            <Text style={styles.buttonText}>📍 Fazer Check-in</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/screens/ContactsScreen" asChild>
          <TouchableOpacity style={styles.buttonBlue}>
            <Text style={styles.buttonText}>👥 Contatos</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/screens/TipsScreen" asChild>
          <TouchableOpacity style={styles.buttonYellow}>
            <Text style={styles.buttonText}>💡 Dicas de Segurança</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/screens/HistoryScreen" asChild>
          <TouchableOpacity style={styles.buttonBlue}>
            <Text style={styles.buttonText}>🗺️ Histórico</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/screens/RealTimeLocationScreen" asChild>
          <TouchableOpacity style={styles.buttonBlue}>
            <Text style={styles.buttonText}>📡 Localização em tempo real</Text>
          </TouchableOpacity>
        </Link>


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonGroup: {
    gap: 16,
  },
  buttonRed: {
    backgroundColor: '#e53935',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonGreen: {
    backgroundColor: '#43a047',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonBlue: {
    backgroundColor: '#1e88e5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonYellow: {
    backgroundColor: '#fdd835',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    fontWeight: 'bold',
  },
});
