// components/ContactCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContactCard = ({ contact }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{contact.name}</Text>
      <Text style={styles.info}>Email: {contact.email}</Text>
      <Text style={styles.info}>Telefone: {contact.phone}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
  },
});

export default ContactCard;