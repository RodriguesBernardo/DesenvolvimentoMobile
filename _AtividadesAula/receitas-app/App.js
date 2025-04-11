import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Dados fictícios
const categories = [
  { id: '1', name: 'Sobremesas' },
  { id: '2', name: 'Massas' }
];

const recipes = {
  'Sobremesas': [
    { id: '1', name: 'Pudim', ingredients: ['Leite', 'Ovos', 'Açúcar'] }
  ],
  'Massas': [
    { id: '2', name: 'Espaguete', ingredients: ['Massa', 'Molho'] }
  ]
};

// Telas
function Categories({ navigation }) {
  return (
    <View style={styles.container}>
      {categories.map(cat => (
        <Button 
          key={cat.id} 
          title={cat.name}
          onPress={() => navigation.navigate('Recipes', { category: cat.name })}
        />
      ))}
    </View>
  );
}

function Recipes({ route, navigation }) {
  const categoryRecipes = recipes[route.params.category] || [];
  
  return (
    <View style={styles.container}>
      {categoryRecipes.map(recipe => (
        <Button
          key={recipe.id}
          title={recipe.name}
          onPress={() => navigation.navigate('RecipeDetail', { recipe })}
        />
      ))}
    </View>
  );
}

function RecipeDetail({ route }) {
  const { recipe } = route.params;
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{recipe.name}</Text>
      <Text>Ingredientes:</Text>
      {recipe.ingredients.map((ing, i) => (
        <Text key={i}>- {ing}</Text>
      ))}
    </ScrollView>
  );
}

function Favorites() {
  return (
    <View style={styles.container}>
      <Text>Suas receitas favoritas aparecerão aqui</Text>
    </View>
  );
}

// Navegação
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Categories" component={Categories} />
      <HomeStack.Screen name="Recipes" component={Recipes} />
      <HomeStack.Screen name="RecipeDetail" component={RecipeDetail} />
    </HomeStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Favorites" component={Favorites} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 }
});