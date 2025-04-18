import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert, Linking } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { FIREBASE_APP } from '../../constants/firebaseConfig';
import { mapsLink } from '../../constants/mapsLink';
import LogoutButton from "../../components/LogoutButton";


const db = getFirestore(FIREBASE_APP);

interface LocationData {
  id: string;
  latitude: number;
  longitude: number;
  createdAt: any;
}

/**
 * Tela de Hist rico de Localiza es, onde o usu rio v  uma lista de todas as localiza es
 * que ele enviou para os contatos.
 *
 * O componente fetcha a lista de localiza es do usu rio no useEffect,
 * e renderiza uma lista de localiza es com o endere o e data/hora de cada localiza o.
 *
 * Se o usu rio n o tiver permiss o para acessar a localiza o,
 * exibe um alerta informando que n o foi poss vel acessar a localiza o.
 *
 * Al m disso, o componente tamb m renderiza um bot o para fazer logout.
 */
export default function HistoryScreen() {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'checkins'));
        const fetchedLocations: LocationData[] = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            latitude: data.latitude,
            longitude: data.longitude,
            createdAt: data.createdAt?.toDate(),
          };
        });
        
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
    <>
    <View style={styles.container}>
      <Text style={styles.title}>🗺️ Histórico de Localizações</Text>
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => openMap(item.latitude, item.longitude)}>
            <Text style={styles.text}>📍 {item.latitude}, {item.longitude}</Text>
            <Text style={styles.timestamp}>🕒 {item.createdAt?.toLocaleString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.text}>Nenhum check-in encontrado.</Text>}/>
    </View>
    <LogoutButton />
    </>
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
