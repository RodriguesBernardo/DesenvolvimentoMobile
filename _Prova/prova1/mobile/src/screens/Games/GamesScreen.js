import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, RefreshControl } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';

const GamesScreen = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const fetchGames = async () => {
    try {
      const res = await api.get('/games');
      setGames(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchGames();
  };

  const renderGameItem = ({ item }) => (
    <TouchableOpacity
      style={tw`w-1/2 p-2`}
      onPress={() => navigation.navigate('GameDetail', { id: item._id })}
    >
      <View style={tw`bg-white rounded-lg shadow overflow-hidden`}>
        <Image
          source={{ uri: `http://localhost:5000/uploads/${item.image}` }}
          style={tw`w-full h-40`}
          resizeMode="cover"
        />
        <View style={tw`p-3`}>
          <Text style={tw`font-bold`} numberOfLines={1}>{item.name}</Text>
          <Text style={tw`text-gray-600 text-xs`} numberOfLines={1}>
            Criador: {item.creator}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      <View style={tw`p-4`}>
        <Text style={tw`text-2xl font-bold mb-4`}>Jogos Disponíveis</Text>
        
        {loading ? (
          <Text>Carregando...</Text>
        ) : (
          <FlatList
            data={games}
            renderItem={renderGameItem}
            keyExtractor={(item) => item._id}
            numColumns={2}
            columnWrapperStyle={tw`justify-between`}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              <Text style={tw`text-center mt-8`}>Nenhum jogo disponível</Text>
            }
          />
        )}
      </View>
    </View>
  );
};

export default GamesScreen;