import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/global';

const TaskCard = ({ task, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity onPress={() => setExpanded(!expanded)}>
      <View style={[globalStyles.card, styles.card]}>
        <Text style={styles.title}>{task.title}</Text>
        {expanded && (
          <View style={styles.content}>
            <Text style={globalStyles.text}>Data: {task.dueDate}</Text>
            <Text style={globalStyles.text}>Matéria: {task.subject}</Text>
            <TouchableOpacity
              style={[globalStyles.button, styles.deleteButton]}
              onPress={onDelete}
            >
              <Text style={globalStyles.buttonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    marginTop: 10,
  },
});

export default TaskCard;