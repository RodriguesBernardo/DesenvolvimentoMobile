// src/navigation/AppNavigator.js
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import MainStack from './MainStack';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.drawerContainer}>
      {/* Cabeçalho do Drawer */}
      <View style={styles.drawerHeader}>
        <Image 
          // source={require('../assets/logo.png')} 
          // style={styles.logo} 
        />
        <Text style={styles.headerTitle}>CriarAoCubo</Text>
        {user && (
          <Text style={styles.userEmail}>{user.email}</Text>
        )}
      </View>

      {/* Itens do Menu */}
      <View style={styles.menuContainer}>
        {user ? (
          <>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => navigation.navigate('Noticias')}
            >
              <MaterialIcons name="home" size={24} color="#555" />
              <Text style={styles.menuItemText}>Home</Text>
            </TouchableOpacity>

            {user.tipo === 'admin' ? (
              <>
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => navigation.navigate('PedidosAdmin')}
                >
                  <FontAwesome name="list-alt" size={22} color="#555" />
                  <Text style={styles.menuItemText}>Pedidos</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => navigation.navigate('NovaNoticia')}
                >
                  <Ionicons name="md-add-circle-outline" size={22} color="#555" />
                  <Text style={styles.menuItemText}>Nova Notícia</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => navigation.navigate('NovoPedido')}
                >
                  <Ionicons name="md-add-circle-outline" size={22} color="#555" />
                  <Text style={styles.menuItemText}>Novo Pedido</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => navigation.navigate('MeusPedidos')}
                >
                  <FontAwesome name="list-alt" size={22} color="#555" />
                  <Text style={styles.menuItemText}>Meus Pedidos</Text>
                </TouchableOpacity>
              </>
            )}

            <View style={styles.divider} />

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={logout}
            >
              <MaterialIcons name="logout" size={22} color="#555" />
              <Text style={styles.menuItemText}>Sair</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => navigation.navigate('Login')}
            >
              <MaterialIcons name="login" size={24} color="#555" />
              <Text style={styles.menuItemText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => navigation.navigate('Register')}
            >
              <MaterialIcons name="person-add" size={24} color="#555" />
              <Text style={styles.menuItemText}>Cadastre-se</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default function AppNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: 'front',
        drawerStyle: {
          width: 280,
        },
        headerShown: false,
        drawerActiveBackgroundColor: '#e3f2fd',
        drawerActiveTintColor: '#2196f3',
      }}
    >
      <Drawer.Screen name="Main" component={MainStack} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 40,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  menuContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingLeft: 25,
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
});