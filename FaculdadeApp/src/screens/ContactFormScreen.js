import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../styles/global';

const ContactFormScreen = ({ route, navigation }) => {
  const { contact: existingContact } = route.params || {};

  const [name, setName] = useState(existingContact?.name || '');
  const [email, setEmail] = useState(existingContact?.email || '');
  const [phone, setPhone] = useState(existingContact?.phone || '');

  const handleSave = async () => {
    if (!name || !email || !phone) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    const newContact = {
      id: existingContact?.id || Date.now(),
      name,
      email,
      phone,
    };

    const savedContacts = await AsyncStorage.getItem('contacts');
    const contacts = savedContacts ? JSON.parse(savedContacts) : [];

    if (existingContact) {
      // Editar contato existente
      const updatedContacts = contacts.map((c) =>
        c.id === existingContact.id ? newContact : c
      );
      await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
    } else {
      // Adicionar novo contato
      contacts.push(newContact);
      await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
    }

    navigation.goBack();
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>{existingContact ? 'Editar Contato' : 'Adicionar Contato'}</Text>

      <Text style={globalStyles.label}>Nome</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Digite o nome"
        value={name}
        onChangeText={setName}
      />

      <Text style={globalStyles.label}>Email</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Digite o email"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={globalStyles.label}>Telefone</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Digite o telefone"
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity style={globalStyles.button} onPress={handleSave}>
        <Text style={globalStyles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContactFormScreen;