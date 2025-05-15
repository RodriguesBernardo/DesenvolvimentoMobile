import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

const ContatosScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendEmail = async () => {
    if (!name || !email || !message) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const isAvailable = await MailComposer.isAvailableAsync();
    if (!isAvailable) {
      Alert.alert('Erro', 'O envio de e-mails não está disponível neste dispositivo.');
      return;
    }

    try {
      await MailComposer.composeAsync({
        recipients: ['pipa@bento.ifrs.edu.br'],
        subject: `Contato via App - ${name}`,
        body: `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
      });
      Alert.alert('Sucesso', 'E-mail enviado com sucesso!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar enviar o e-mail.');
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Entre em Contato</Text>

      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>E-mail:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Mensagem:</Text>
      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Digite sua mensagem"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={5}
      />

      <Button title="Enviar" onPress={handleSendEmail} color='#b42622' />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#b42622',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  messageInput: {
    height: 120,
    textAlignVertical: 'top',
  },
});

export default ContatosScreen;