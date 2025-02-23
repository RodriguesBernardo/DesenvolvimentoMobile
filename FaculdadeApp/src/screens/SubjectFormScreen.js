import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../styles/global';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

const SubjectFormScreen = ({ route, navigation }) => {
  const { subject: existingSubject } = route.params || {};

  const [subjectName, setSubjectName] = useState(existingSubject?.name || '');
  const [subjectRoom, setSubjectRoom] = useState(existingSubject?.room || '');
  const [subjectProfessor, setSubjectProfessor] = useState(existingSubject?.professor || '');
  const [selectedDay, setSelectedDay] = useState(existingSubject?.day || 'Segunda');
  const [selectedTime, setSelectedTime] = useState(
    existingSubject?.time ? new Date(`1970-01-01T${existingSubject.time}:00`) : new Date()
  );
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [image, setImage] = useState(existingSubject?.image || null);

  const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar sua galeria.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleSave = async () => {
    if (!subjectName || !subjectRoom || !subjectProfessor || !selectedDay || !selectedTime) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    // Formata o horário para HH:MM
    const formattedTime = selectedTime.toTimeString().slice(0, 5);

    const newSubject = {
      id: existingSubject?.id || Date.now(),
      name: subjectName,
      room: subjectRoom,
      professor: subjectProfessor,
      day: selectedDay,
      time: formattedTime,
      image: image, // Adiciona a imagem ao objeto da matéria
    };

    const savedSubjects = await AsyncStorage.getItem('subjects');
    const subjects = savedSubjects ? JSON.parse(savedSubjects) : [];

    if (existingSubject) {
      // Editar matéria existente
      const updatedSubjects = subjects.map((sub) =>
        sub.id === existingSubject.id ? newSubject : sub
      );
      await AsyncStorage.setItem('subjects', JSON.stringify(updatedSubjects));
    } else {
      // Adicionar nova matéria
      subjects.push(newSubject);
      await AsyncStorage.setItem('subjects', JSON.stringify(subjects));
    }

    navigation.goBack();
  };

  const onTimeChange = (event, selectedDate) => {
    setShowTimePicker(false);
    if (selectedDate) {
      setSelectedTime(selectedDate);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>{existingSubject ? 'Editar Matéria' : 'Adicionar Matéria'}</Text>

      <Text style={globalStyles.label}>Nome da Matéria</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Digite o nome da matéria"
        value={subjectName}
        onChangeText={setSubjectName}
      />

      <Text style={globalStyles.label}>Sala</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Digite a sala"
        value={subjectRoom}
        onChangeText={setSubjectRoom}
      />

      <Text style={globalStyles.label}>Professor</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Digite o nome do professor"
        value={subjectProfessor}
        onChangeText={setSubjectProfessor}
      />

      <Text style={globalStyles.label}>Dia da Semana</Text>
      <View style={styles.dayPicker}>
        {daysOfWeek.map((day) => (
          <TouchableOpacity
            key={day}
            style={[styles.dayButton, selectedDay === day && styles.selectedDayButton]}
            onPress={() => setSelectedDay(day)}
          >
            <Text style={selectedDay === day ? styles.selectedDayText : styles.dayText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={globalStyles.label}>Horário</Text>
      <TouchableOpacity
        style={globalStyles.input}
        onPress={() => setShowTimePicker(true)}
      >
        <Text>{selectedTime.toTimeString().slice(0, 5)}</Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onTimeChange}
        />
      )}

      <Text style={globalStyles.label}>Imagem de Fundo</Text>
      <TouchableOpacity style={globalStyles.button} onPress={pickImage}>
        <Text style={globalStyles.buttonText}>Selecionar Imagem</Text>
      </TouchableOpacity>

      {image && (
        <Image source={{ uri: image }} style={styles.imagePreview} />
      )}

      <TouchableOpacity style={globalStyles.button} onPress={handleSave}>
        <Text style={globalStyles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dayPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  dayButton: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  selectedDayButton: {
    backgroundColor: '#007bff',
  },
  dayText: {
    color: '#000',
  },
  selectedDayText: {
    color: '#fff',
  },
  imagePreview: {
    width: '100%',
    height: 150,
    marginTop: 10,
    borderRadius: 10,
  },
});

export default SubjectFormScreen;