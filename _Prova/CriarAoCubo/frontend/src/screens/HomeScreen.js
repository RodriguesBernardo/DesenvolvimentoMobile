import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({ navigation }) => {
  const { usuario, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Bem-vindo, {usuario?.nome}</Text>
        <Text style={styles.subtitulo}>O que você gostaria de fazer hoje?</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.cardContainer}>
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('EnviarOrcamento')}
          >
            <View style={styles.cardIconContainer}>
              <Icon name="file-upload" size={32} color="#3F51B5" />
            </View>
            <Text style={styles.cardTitle}>Enviar Orçamento</Text>
            <Text style={styles.cardDescription}>Envie um novo arquivo para orçamento</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('MeusOrcamentos')}
          >
            <View style={styles.cardIconContainer}>
              <Icon name="list-alt" size={32} color="#3F51B5" />
            </View>
            <Text style={styles.cardTitle}>Meus Orçamentos</Text>
            <Text style={styles.cardDescription}>Visualize seus orçamentos enviados</Text>
          </TouchableOpacity>

          {usuario?.isAdmin && (
            <TouchableOpacity 
              style={styles.card}
              onPress={() => navigation.navigate('AdminOrcamentos')}
            >
              <View style={styles.cardIconContainer}>
                <Icon name="admin-panel-settings" size={32} color="#3F51B5" />
              </View>
              <Text style={styles.cardTitle}>Todos Orçamentos</Text>
              <Text style={styles.cardDescription}>Painel administrativo</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity 
        onPress={handleLogout} 
        style={styles.logoutButton}
      >
        <Icon name="logout" size={20} color="#F44336" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    padding: 24,
    backgroundColor: '#3F51B5',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 4,
    marginBottom: 16
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8
  },
  subtitulo: {
    fontSize: 16,
    color: '#E0E0E0'
  },
  content: {
    padding: 16,
    paddingBottom: 32
  },
  cardContainer: {
    marginBottom: 16
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardIconContainer: {
    backgroundColor: '#E8EAF6',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F51B5',
    marginBottom: 8
  },
  cardDescription: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    alignSelf: 'center'
  },
  logoutText: {
    color: '#F44336',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8
  }
});

export default HomeScreen;