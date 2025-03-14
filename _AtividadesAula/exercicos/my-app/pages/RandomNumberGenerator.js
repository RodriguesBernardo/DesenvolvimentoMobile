import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const RandomNumberGenerator = () => {
  const [randomNumber, setRandomNumber] = useState(null);

  const generateRandomNumber = () => {
    const number = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(number);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>
        {randomNumber ? `Número: ${randomNumber}` : 'Clique para gerar um número'}
      </Text>
      <Button title="Gerar Número" onPress={generateRandomNumber} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: 30,
    marginBottom: 20,
  },
});

export default RandomNumberGenerator;