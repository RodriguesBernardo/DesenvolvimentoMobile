import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import api from '../services/api';

const RulesScreen = () => {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const res = await api.get('/rules');
        setRules(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRules();
  }, []);

  return (
    <ScrollView style={tw`flex-1 bg-gray-50 p-4`}>
      <Text style={tw`text-2xl font-bold mb-6`}>Regras do Espaço</Text>
      
      {rules.map((rule, index) => (
        <View key={rule._id} style={tw`mb-4 bg-white p-4 rounded-lg shadow`}>
          <Text style={tw`font-bold text-primary mb-2`}>
            {index + 1}. {rule.title}
          </Text>
          <Text style={tw`text-gray-700`}>{rule.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default RulesScreen;