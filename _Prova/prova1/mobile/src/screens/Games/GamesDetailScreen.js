import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import api from '../../services/api';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const GameDetailScreen = () => {
  const route = useRoute();
  const { id } = route.params;
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await api.get(`/games/${id}`);
        setGame(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  const handleDownload = async () => {
    try {
      const url = `http://localhost:5000/uploads/${game.downloadFile}`;
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Erro', 'Não foi possível abrir o arquivo');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar baixar o arquivo');
    }
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (!game) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Jogo não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={tw`flex-1 bg-gray-50`}>
      <Image
        source={{ uri: `http://localhost:5000/uploads/${game.image}` }}
        style={tw`w-full h-64`}
        resizeMode="cover"
      />
      
      <View style={tw`p-4`}>
        <Text style={tw`text-2xl font-bold mb-2`}>{game.name}</Text>
        
        <View style={tw`flex-row items-center mb-4`}>
          <Ionicons name="person" size={16} color="#6B7280" />
          <Text style={tw`text-gray-600 ml-2`}>Criador: {game.creator}</Text>
        </View>

        <Text style={tw`text-gray-700 mb-6`}>{game.description}</Text>

        <TouchableOpacity
          style={tw`bg-primary p-4 rounded-lg flex-row items-center justify-center`}
          onPress={handleDownload}
        >
          <Ionicons name="download" size={20} color="white" />
          <Text style={tw`text-white font-bold ml-2`}>Baixar Arquivo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default GameDetailScreen;