
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as Contacts from 'expo-contacts';


export default function ContactsScreen() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Permita o acesso aos contatos.');
        setLoading(false);
        return;
      }

      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      setContacts(data);
      setLoading(false);
    };

    loadContacts();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.contactCard}>
      <Text style={styles.contactName}>{item.name}</Text>
      {item.phoneNumbers?.[0] && (
        <Text style={styles.contactPhone}>{item.phoneNumbers[0].number}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>👥 Seus Contatos</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#00ffcc" />
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  contactCard: {
    backgroundColor: '#1e1e1e',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  contactName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  contactPhone: {
    fontSize: 16,
    color: '#aaa',
    marginTop: 4,
  },
});
