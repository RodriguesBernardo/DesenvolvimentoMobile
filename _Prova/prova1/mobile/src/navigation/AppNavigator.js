import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Screens
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import HelpScreen from '../screens/HelpScreen';
import RulesScreen from '../screens/RulesScreen';
import NewsScreen from '../screens/News/NewsScreen';
import GamesScreen from '../screens/GamesScreen';
import GameDetailScreen from '../screens/GameDetailScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="Rules" component={RulesScreen} />
        <Stack.Screen name="News" component={NewsScreen} />
        <Stack.Screen name="Games" component={GamesScreen} />
        <Stack.Screen name="GameDetail" component={GameDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}