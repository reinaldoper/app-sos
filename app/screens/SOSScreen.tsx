import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Share, ActivityIndicator, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
import * as Location from 'expo-location';
import { tintColorLight } from '../../constants/Colors';
import { mapsLink } from '../../constants/mapsLink';
import styles from '../../constants/styles';
import LogoutButton from "../../components/LogoutButton";


/**
 * Tela de Emerg ncia, onde o usu rio pode enviar sua localiza o atual
 * para os contatos de emerg ncia.
 *
 * O componente solicita permiss o para acessar a localiza o do usu rio,
 * e se a permiss o for concedida, renderiza um bot o pulsante para
 * enviar a localiza o.
 *
 * Se o usu rio n o tiver permiss o para acessar a localiza o,
 * exibe um alerta informando que n o foi poss vel acessar a localiza o.
 *
 * Al m disso, o componente tamb m renderiza um bot o para fazer logout.
 */
export default function SOSScreen() {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0
  });
  const [loadingLocation, setLoadingLocation] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão de localização negada!');
        setLoadingLocation(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      setLoadingLocation(false);
    })();
  }, []);

  const playAlarm = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/alarm.mp3') 
    );
    await sound.playAsync();
  };

  const handleSOSPress = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    await playAlarm();
    if (location) {
      const maps = mapsLink(location);
      await Share.share({
        message: `🚨 SOS! Preciso de ajuda! Minha localização: ${maps}`,
      });
    } else {
      Alert.alert('Localização não encontrada...');
    }
  };

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>Emergência</Text>

      {loadingLocation ? (
        <ActivityIndicator size={24} color={tintColorLight} />
      ) : (
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          easing="ease-out"
          style={styles.animContainer}
        >
          <TouchableOpacity style={styles.button} onPress={handleSOSPress}>
            <Text style={styles.text}>🚨 SOS</Text>
          </TouchableOpacity>
        </Animatable.View>
      )}

      <Text style={styles.footer}>Toque para enviar sua localização</Text>
    </View>
    <LogoutButton />
    </>
  );
}

