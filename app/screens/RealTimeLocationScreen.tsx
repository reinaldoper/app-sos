import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Linking } from 'react-native';
import * as Location from 'expo-location';
import { mapsLink } from '../../constants/mapsLink';
import LogoutButton from "../../components/LogoutButton";


/**
 * Tela de Localiza o em Tempo Real, onde o usu rio v  sua localiza o atual
 * em tempo real.
 *
 * O componente solicita permiss o para acessar a localiza o do usu rio,
 * e se a permiss o for concedida, renderiza um bot o para abrir a localiza o
 * no Google Maps.
 *
 * Se o usu rio n o tiver permiss o para acessar a localiza o,
 * exibe um alerta informando que n o foi poss vel acessar a localiza o.
 *
 * Al m disso, o componente tamb m renderiza um bot o para fazer logout.
 */
export default function RealTimeLocationScreen() {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0
  });
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão de localização negada.');
        return;
      }

      const subscriber = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, 
          distanceInterval: 5, 
        },
        (loc) => {
          setLocation(loc.coords);
        }
      );

      return () => {
        subscriber.remove();
      };
    })();
  }, []);

  const openInMaps = () => {
    if (!location) return;
    const maps = mapsLink(location);
    Linking.openURL(maps);
  };

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>📍 Localização em Tempo Real</Text>
      {errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : location ? (
        <>
          <Button title="Ver no Google Maps" onPress={openInMaps} />
        </>
      ) : (
        <Text style={styles.text}>Obtendo localização...</Text>
      )}
    </View>
    <LogoutButton />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});
