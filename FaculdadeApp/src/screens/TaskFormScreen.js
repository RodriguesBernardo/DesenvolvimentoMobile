import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../styles/global';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';

const TaskFormScreen = ({ route, navigation }) => {
  const { task: existingTask } = route.params || {};

  const [title, setTitle] = useState(existingTask?.title || '');
  const [dueDate, setDueDate] = useState(
    existingTask?.dueDate ? new Date(existingTask.dueDate) : new Date()
  );
  const [subject, setSubject] = useState(existingTask?.subject || '');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = async () => {
    if (!title || !dueDate || !subject) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    const newTask = {
      id: existingTask?.id || Date.now(),
      title,
      dueDate: dueDate.toISOString().split('T')[0], // Formato YYYY-MM-DD
      subject,
    };

    const savedTasks = await AsyncStorage.getItem('tasks');
    const tasks = savedTasks ? JSON.parse(savedTasks) : [];

    if (existingTask) {
      // Editar tarefa existente
      const updatedTasks = tasks.map((t) =>
        t.id === existingTask.id ? newTask : t
      );
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } else {
      // Adicionar nova tarefa
      tasks.push(newTask);
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Agendar notificação
    const notificationDate = new Date(dueDate);
    notificationDate.setHours(8, 0, 0); // Define o horário da notificação (8:00 AM)

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Lembrete de Tarefa',
        body: `Não se esqueça da tarefa: ${title}`,
      },
      trigger: notificationDate,
    });

    navigation.goBack();
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>{existingTask ? 'Editar Tarefa' : 'Adicionar Tarefa'}</Text>

      <Text style={globalStyles.label}>Título</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Digite o título"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={globalStyles.label}>Data de Entrega</Text>
      <TouchableOpacity
        style={globalStyles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{dueDate.toISOString().split('T')[0]}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <Text style={globalStyles.label}>Matéria</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Digite a matéria"
        value={subject}
        onChangeText={setSubject}
      />

      <TouchableOpacity style={globalStyles.button} onPress={handleSave}>
        <Text style={globalStyles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskFormScreen;