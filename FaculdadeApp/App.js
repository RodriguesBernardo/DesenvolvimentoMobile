import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import HomeScreen from './src/screens/HomeScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import SubjectsScreen from './src/screens/SubjectsScreen';
import SubjectFormScreen from './src/screens/SubjectFormScreen';
import TasksScreen from './src/screens/TasksScreen';
import TaskFormScreen from './src/screens/TaskFormScreen';
import ContactsScreen from './src/screens/ContactsScreen';
import ContactFormScreen from './src/screens/ContactFormScreen';
import Header from './src/components/Header';

// Configuração das notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Stack de Matérias
const SubjectsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Subjects"
      component={SubjectsScreen}
      options={({ navigation }) => ({
        header: () => <Header title="Matérias" navigation={navigation} />,
      })}
    />
    <Stack.Screen
      name="SubjectForm"
      component={SubjectFormScreen}
      options={({ navigation }) => ({
        header: () => <Header title="Adicionar/Editar Matéria" navigation={navigation} />,
      })}
    />
  </Stack.Navigator>
);

// Stack de Tarefas
const TasksStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Tasks"
      component={TasksScreen}
      options={({ navigation }) => ({
        header: () => <Header title="Tarefas" navigation={navigation} />,
      })}
    />
    <Stack.Screen
      name="TaskForm"
      component={TaskFormScreen}
      options={({ navigation }) => ({
        header: () => <Header title="Adicionar/Editar Tarefa" navigation={navigation} />,
      })}
    />
  </Stack.Navigator>
);

// Stack de Contatos
const ContactsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Contacts"
      component={ContactsScreen}
      options={({ navigation }) => ({
        header: () => <Header title="Contatos" navigation={navigation} />,
      })}
    />
    <Stack.Screen
      name="ContactForm"
      component={ContactFormScreen}
      options={({ navigation }) => ({
        header: () => <Header title="Adicionar/Editar Contato" navigation={navigation} />,
      })}
    />
  </Stack.Navigator>
);

// Drawer Navigator
const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen
      name="Home"
      component={HomeScreen}
      options={({ navigation }) => ({
        header: () => <Header title="Início" navigation={navigation} />,
        drawerLabel: 'Início',
      })}
    />
    <Drawer.Screen
      name="Matérias"
      component={SubjectsStack}
      options={{ drawerLabel: 'Matérias' }}
    />
    <Drawer.Screen
      name="Tarefas"
      component={TasksStack}
      options={{ drawerLabel: 'Tarefas' }}
    />
    <Drawer.Screen
      name="Contatos"
      component={ContactsStack}
      options={{ drawerLabel: 'Contatos' }}
    />
  </Drawer.Navigator>
);

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      setIsFirstLaunch(!hasLaunched);
    };
    checkFirstLaunch();

    // Configura as notificações
    const setupNotifications = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão para notificações não concedida!');
        return;
      }
    };
    setupNotifications();
  }, []);

  if (isFirstLaunch === null) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isFirstLaunch ? (
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
        ) : null}
        <Stack.Screen
          name="Main"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}