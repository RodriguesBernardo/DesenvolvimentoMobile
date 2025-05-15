import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';

const HelpScreen = () => {
  const [helpItems, setHelpItems] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchHelpItems = async () => {
      try {
        const res = await api.get('/help');
        setHelpItems(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHelpItems();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getIcon = (category) => {
    switch (category) {
      case 'impressora3d':
        return 'print';
      case 'cortadoraLaser':
        return 'cut';
      case 'notebooks':
        return 'laptop';
      default:
        return 'help-circle';
    }
  };

  return (
    <ScrollView style={tw`flex-1 bg-gray-50 p-4`}>
      <Text style={tw`text-2xl font-bold mb-6`}>Guia de Ajuda</Text>
      
      {helpItems.map((item) => (
        <View key={item._id} style={tw`mb-4 bg-white rounded-lg shadow overflow-hidden`}>
          <TouchableOpacity
            style={tw`p-4 flex-row items-center justify-between`}
            onPress={() => toggleExpand(item._id)}
          >
            <View style={tw`flex-row items-center`}>
              <Ionicons 
                name={getIcon(item.category)} 
                size={24} 
                color="#3B82F6" 
                style={tw`mr-3`} 
              />
              <Text style={tw`font-bold`}>{item.title}</Text>
            </View>
            <Ionicons 
              name={expandedId === item._id ? 'chevron-up' : 'chevron-down'} 
              size={20} 
            />
          </TouchableOpacity>
          
          {expandedId === item._id && (
            <View style={tw`p-4 border-t border-gray-100`}>
              <Text style={tw`text-gray-700`}>{item.content}</Text>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default HelpScreen;