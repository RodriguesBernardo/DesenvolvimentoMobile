import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const Input = ({ placeholder, value, onChangeText, secureTextEntry, error, ...props }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, error && styles.error]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#999"
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff'
  },
  error: {
    borderColor: 'red'
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5
  }
});

export default Input;