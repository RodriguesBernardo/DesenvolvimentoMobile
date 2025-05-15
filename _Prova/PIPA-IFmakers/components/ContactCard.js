// components/ContactCard.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ContactCard = ({ contact, image }) => {
  return (
    <View style={styles.card}>
      {/* Imagem de fundo */}
      {image && <Image source={{ uri: image }} style={styles.backgroundImage} />}

      {/* Overlay escuro para melhorar a legibilidade */}
      <View style={styles.overlay} />

      {/* Conteúdo do card */}
      <View style={styles.content}>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.info}>Email: {contact.email}</Text>
        <Text style={styles.info}>Telefone: {contact.phone}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    padding: 15,
    position: 'relative',
    zIndex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    color: '#fff',
  },
});

export default ContactCard;