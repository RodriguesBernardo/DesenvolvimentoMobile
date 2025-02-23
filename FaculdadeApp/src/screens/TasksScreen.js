import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../styles/global';
import TaskCard from '../components/TaskCard';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const TasksScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const savedTasks = await AsyncStorage.getItem('tasks');
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  };

  useEffect(() => {
    if (isFocused) loadTasks();
  }, [isFocused]);

  const handleDeleteTask = async (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Tarefas Cadastradas</Text>

      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('TaskForm')}
      >
        <Text style={globalStyles.buttonText}>Adicionar Tarefa</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onDelete={() => handleDeleteTask(item.id)}
          />
        )}
      />
    </View>
  );
};

export default TasksScreen;