import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../styles/global';
import ClassCard from '../components/ClassCard';
import TaskCard from '../components/TaskCard';
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = () => {
  const isFocused = useIsFocused();
  const [userName, setUserName] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const loadData = async () => {
    const name = await AsyncStorage.getItem('userName');
    const savedSubjects = await AsyncStorage.getItem('subjects');
    const savedTasks = await AsyncStorage.getItem('tasks');

    if (name) setUserName(name);
    if (savedSubjects) setSubjects(JSON.parse(savedSubjects));
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  };

  useEffect(() => {
    if (isFocused) loadData();
  }, [isFocused]);

  // Filtra as matérias do dia atual
  const today = new Date().toLocaleDateString('pt-BR', { weekday: 'long' });
  const todaySubjects = subjects.filter((sub) => sub.day.toLowerCase() === today.toLowerCase());

  // Filtra as tarefas próximas (até 7 dias)
  const upcomingTasks = tasks
    .filter((task) => {
      const taskDate = new Date(task.dueDate);
      const todayDate = new Date();
      const diffTime = taskDate - todayDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 7; // Tarefas dentro de 7 dias
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Bem-vindo, {userName}!</Text>

      <Text style={styles.sectionTitle}>Matérias de Hoje</Text>
      {todaySubjects.length > 0 ? (
        <FlatList
          data={todaySubjects}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ClassCard subject={item} />}
        />
      ) : (
        <Text style={globalStyles.text}>Nenhuma matéria cadastrada para hoje.</Text>
      )}

      <Text style={styles.sectionTitle}>Próximas Tarefas</Text>
      {upcomingTasks.length > 0 ? (
        <FlatList
          data={upcomingTasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TaskCard task={item} />}
        />
      ) : (
        <Text style={globalStyles.text}>Nenhuma tarefa próxima.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default HomeScreen;