import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskCard from '../components/TaskCard';

const ExamsScreen = () => {
  const [exams, setExams] = useState([]);

  const loadExams = async () => {
    const savedExams = await AsyncStorage.getItem('exams');
    if (savedExams) setExams(JSON.parse(savedExams));
  };

  const addExam = () => {
    const newExam = { id: Date.now(), title: 'Prova X', date: '2023-12-10', subject: 'Matéria Y' };
    setExams([...exams, newExam]);
    AsyncStorage.setItem('exams', JSON.stringify([...exams, newExam]));
  };

  useEffect(() => {
    loadExams();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Adicionar Prova" onPress={addExam} />
      <FlatList
        data={exams}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TaskCard task={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
});

export default ExamsScreen;