import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/Button';

const HomeScreen = ({ navigation }) => {
  const { usuario, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Bem-vindo, {usuario?.nome}</Text>
      
      <View style={styles.menu}>
        <Button 
          title="Enviar Orçamento" 
          onPress={() => navigation.navigate('EnviarOrcamento')} 
          style={styles.botao}
        />
        
        <Button 
          title="Meus Orçamentos" 
          onPress={() => navigation.navigate('MeusOrcamentos')} 
          style={styles.botao}
        />
        
        {usuario?.isAdmin && (
          <Button 
            title="Admin - Todos Orçamentos" 
            onPress={() => navigation.navigate('AdminOrcamentos')} 
            style={styles.botao}
          />
        )}
      </View>
      
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333'
  },
  menu: {
    marginBottom: 20
  },
  botao: {
    marginBottom: 15
  },
  logoutButton: {
    alignSelf: 'center',
    padding: 10
  },
  logoutText: {
    color: 'red',
    fontSize: 16
  }
});

export default HomeScreen;