import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert, Linking } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { FIREBASE_APP } from '@/constants/firebaseConfig';
import { mapsLink } from '@/constants/mapsLink';

const db = getFirestore(FIREBASE_APP);

interface LocationData {
  id: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

export default function HistoryScreen() {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'checkins'));
        const fetchedLocations: LocationData[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as LocationData[];
        setLocations(fetchedLocations);
      } catch (error) {
        Alert.alert('Erro:', 'Erro ao buscar localizações');
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const openMap = (latitude: number, longitude: number) => {
    const url = mapsLink({ latitude, longitude });
    Linking.openURL(url);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗺️ Histórico de Localizações</Text>
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => openMap(item.latitude, item.longitude)}>
            <Text style={styles.text}>📍 {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}</Text>
            <Text style={styles.timestamp}>🕒 {new Date(item.timestamp).toLocaleString()}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.text}>Nenhum check-in encontrado.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 16,
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
  },
  text: {
    fontSize: 16,
    color: '#fff',
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
    backgroundColor: '#111',
  },
});
