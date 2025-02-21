// screens/AboutScreen.js
import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import ContactCard from '../components/ContactCard';

const AboutScreen = () => {
  const contacts = [
    { id: 1, name: 'João Silva', email: 'joao.silva@ifmakers.com', phone: '(11) 99999-9999' },
    { id: 2, name: 'Maria Souza', email: 'maria.souza@ifmakers.com', phone: '(11) 88888-8888' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.history}>
        O PIPA IFmakers é um projeto que visa incentivar a inovação e a criatividade entre os estudantes.
      </Text>
      {contacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  history: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default AboutScreen;