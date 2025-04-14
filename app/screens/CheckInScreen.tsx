import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  FlatList,
} from "react-native";
import * as Location from "expo-location";
import * as Linking from "expo-linking";
import * as Contacts from "expo-contacts";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { FIREBASE_APP } from "../../constants/firebaseConfig";
import { mapsLink } from "../../constants/mapsLink";
import {
  selectedContacts,
  backGroundButton,
  backGroundButtonText,
  backGroundTitle,
  backGroundContainer,
  contactItens,
  contactSubText,
  description,
  contactText,
} from "../../constants/Colors";
import Logout from "../Logout";

const db = getFirestore(FIREBASE_APP);

export default function CheckInScreen() {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState<any[]>([]);
  const [selectedContact, setSelectedContact] = useState<any | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão negada",
          "Não foi possível acessar os contatos."
        );
        return;
      }

      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
      });

      const validContacts = data.filter(
        (c) => c.phoneNumbers && c.phoneNumbers.length > 0
      );
      setContacts(validContacts);
    };

    fetchContacts();
  }, []);

  const handleCheckIn = async () => {
    if (!selectedContact) {
      Alert.alert("Selecione um contato");
      return;
    }

    setLoading(true);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão negada",
          "Não foi possível acessar a localização."
        );
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const maps = mapsLink(location.coords);

      await addDoc(collection(db, "checkins"), {
        latitude,
        longitude,
        createdAt: serverTimestamp(),
      });

      const phone = selectedContact.phoneNumbers[0]?.number.replace(/\D/g, "");
      const email = selectedContact.emails?.[0]?.email;

      if (phone) {
        const whatsappUrl = `whatsapp://send?phone=+55${phone}&text=🚨 Check-in de segurança: ${maps}`;
        await Linking.openURL(whatsappUrl);
      }

      if (email) {
        const emailUrl = `mailto:${email}?subject=Check-in de Segurança&body=🚨 Minha localização atual: ${maps}`;
        await Linking.openURL(emailUrl);
      }

      Alert.alert("Check-in realizado com sucesso!");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro ao fazer check-in");
    } finally {
      setLoading(false);
    }
  };

  const renderContact = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.contactItem,
        selectedContact?.id === item.id && styles.selectedContact,
      ]}
      onPress={() => setSelectedContact(item)}
    >
      <Text style={styles.contactText}>{item.name}</Text>
      <Text style={styles.contactSubText}>
        {item.phoneNumbers?.[0]?.number || "Sem número"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Check-in de Segurança</Text>

        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={renderContact}
          style={{ marginBottom: 20 }}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleCheckIn}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Enviando..." : "Fazer Check-in"}
          </Text>
          {loading && (
            <ActivityIndicator
              size="small"
              color="#fff"
              style={{ marginTop: 10 }}
            />
          )}
        </TouchableOpacity>

        <Text style={styles.description}>
          Selecione um contato para enviar sua localização via WhatsApp e Email.
        </Text>
      </View>
      <Logout />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backGroundContainer,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 26,
    color: backGroundTitle,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: backGroundButton,
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: backGroundButtonText,
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    textAlign: "center",
    color: description,
    fontSize: 16,
  },
  contactItem: {
    backgroundColor: contactItens,
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  selectedContact: {
    backgroundColor: selectedContacts,
  },
  contactText: {
    color: contactText,
    fontSize: 18,
  },
  contactSubText: {
    color: contactSubText,
    fontSize: 14,
  },
});
