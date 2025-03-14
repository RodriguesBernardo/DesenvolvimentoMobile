import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleStopwatch = () => {
    setIsRunning(!isRunning);
  };

  const resetStopwatch = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{time} segundos</Text>
      <View style={styles.buttonContainer}>
        <Button title={isRunning ? "Parar" : "Iniciar"} onPress={toggleStopwatch} />
        <Button title="Resetar" onPress={resetStopwatch} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 40,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
});

export default Stopwatch;