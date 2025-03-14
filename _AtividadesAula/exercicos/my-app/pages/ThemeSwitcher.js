import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#333' : '#fff',
    },
    text: {
      color: isDarkMode ? '#fff' : '#000',
      fontSize: 20,
      marginBottom: 20,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tema {isDarkMode ? 'Escuro' : 'Claro'}</Text>
      <Button title="Alternar Tema" onPress={toggleTheme} />
    </View>
  );
};

export default ThemeSwitcher;