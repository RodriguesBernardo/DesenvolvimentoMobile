import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/global';

const ContactCard = ({ contact }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity onPress={() => setExpanded(!expanded)}>
      <View style={[globalStyles.card, styles.card]}>
        <Text style={styles.title}>{contact.name}</Text>
        {expanded && (
          <View style={styles.content}>
            <Text style={globalStyles.text}>Email: {contact.email}</Text>
            <Text style={globalStyles.text}>Telefone: {contact.phone}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    marginTop: 10,
  },
});

export default ContactCard;