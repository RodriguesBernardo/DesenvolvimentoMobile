import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../styles/global';
import ContactCard from '../components/ContactCard';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const ContactsScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [contacts, setContacts] = useState([]);

  const loadContacts = async () => {
    const savedContacts = await AsyncStorage.getItem('contacts');
    if (savedContacts) setContacts(JSON.parse(savedContacts));
  };

  useEffect(() => {
    if (isFocused) loadContacts();
  }, [isFocused]);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Contatos Cadastrados</Text>

      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('ContactForm')}
      >
        <Text style={globalStyles.buttonText}>Adicionar Contato</Text>
      </TouchableOpacity>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ContactCard contact={item} />}
      />
    </View>
  );
};

export default ContactsScreen;