import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../styles/global';
import ClassCard from '../components/ClassCard';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const SubjectsScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [subjects, setSubjects] = useState([]);

  const loadSubjects = async () => {
    const savedSubjects = await AsyncStorage.getItem('subjects');
    if (savedSubjects) setSubjects(JSON.parse(savedSubjects));
  };

  useEffect(() => {
    if (isFocused) loadSubjects();
  }, [isFocused]);

  const handleDeleteSubject = async (id) => {
    const updatedSubjects = subjects.filter((sub) => sub.id !== id);
    await AsyncStorage.setItem('subjects', JSON.stringify(updatedSubjects));
    setSubjects(updatedSubjects);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Matérias Cadastradas</Text>

      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('SubjectForm')}
      >
        <Text style={globalStyles.buttonText}>Adicionar Matéria</Text>
      </TouchableOpacity>

      <FlatList
        data={subjects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ClassCard
            subject={item}
            onDelete={() => handleDeleteSubject(item.id)}
          />
        )}
      />
    </View>
  );
};

export default SubjectsScreen;