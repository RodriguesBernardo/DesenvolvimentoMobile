import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';
import Carousel from '../components/Carousel';

const HomeScreen = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNews = async () => {
    try {
      const res = await api.get('/news?limit=3');
      setNews(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchNews();
  };

  return (
    <ScrollView
      style={tw`flex-1 bg-gray-50`}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={tw`bg-primary p-4`}>
        <Text style={tw`text-white text-2xl font-bold`}>PIPA-IFRS</Text>
        <Text style={tw`text-white`}>Espaço de inovação e criatividade</Text>
      </View>

      {/* Carrossel de Destaques */}
      <Carousel items={news} />

      {/* Seções Rápidas */}
      <View style={tw`p-4`}>
        <Text style={tw`text-xl font-bold mb-4`}>Acesso Rápido</Text>
        
        <View style={tw`flex-row flex-wrap justify-between`}>
          <TouchableOpacity 
            style={tw`w-1/2 p-3`}
            onPress={() => navigation.navigate('Help')}
          >
            <View style={tw`bg-white p-4 rounded-lg shadow items-center`}>
              <Ionicons name="help-circle" size={32} color="#3B82F6" />
              <Text style={tw`mt-2 text-center`}>Como Usar</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={tw`w-1/2 p-3`}
            onPress={() => navigation.navigate('Rules')}
          >
            <View style={tw`bg-white p-4 rounded-lg shadow items-center`}>
              <Ionicons name="document-text" size={32} color="#3B82F6" />
              <Text style={tw`mt-2 text-center`}>Regras</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={tw`w-1/2 p-3`}
            onPress={() => navigation.navigate('News')}
          >
            <View style={tw`bg-white p-4 rounded-lg shadow items-center`}>
              <Ionicons name="newspaper" size={32} color="#3B82F6" />
              <Text style={tw`mt-2 text-center`}>Notícias</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={tw`w-1/2 p-3`}
            onPress={() => navigation.navigate('Games')}
          >
            <View style={tw`bg-white p-4 rounded-lg shadow items-center`}>
              <Ionicons name="game-controller" size={32} color="#3B82F6" />
              <Text style={tw`mt-2 text-center`}>Jogos</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Últimas Notícias */}
      <View style={tw`p-4`}>
        <View style={tw`flex-row justify-between items-center mb-3`}>
          <Text style={tw`text-xl font-bold`}>Últimas Notícias</Text>
          <TouchableOpacity onPress={() => navigation.navigate('News')}>
            <Text style={tw`text-primary`}>Ver todas</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <Text>Carregando...</Text>
        ) : (
          news.map((item) => (
            <TouchableOpacity 
              key={item._id}
              style={tw`mb-3 bg-white p-3 rounded-lg shadow`}
              onPress={() => navigation.navigate('NewsDetail', { id: item._id })}
            >
              <Text style={tw`font-bold`}>{item.title}</Text>
              <Text style={tw`text-gray-600 text-sm`}>
                {item.content.substring(0, 100)}...
              </Text>
              <Text style={tw`text-gray-400 text-xs mt-1`}>
                {new Date(item.createdAt).toLocaleDateString()}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;