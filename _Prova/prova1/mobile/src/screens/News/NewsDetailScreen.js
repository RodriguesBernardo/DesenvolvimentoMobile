import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import api from '../../services/api';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const NewsDetailScreen = () => {
  const route = useRoute();
  const { id } = route.params;
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        const res = await api.get(`/news/${id}`);
        setNewsItem(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsItem();
  }, [id]);

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (!newsItem) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Notícia não encontrada</Text>
      </View>
    );
  }

  return (
    <ScrollView style={tw`flex-1 bg-gray-50`}>
      {newsItem.image && (
        <Image
          source={{ uri: `http://localhost:5000/uploads/${newsItem.image}` }}
          style={tw`w-full h-64`}
          resizeMode="cover"
        />
      )}
      
      <View style={tw`p-4`}>
        <Text style={tw`text-2xl font-bold mb-2`}>{newsItem.title}</Text>
        
        {newsItem.isEvent && (
          <View style={tw`flex-row items-center mb-4`}>
            <Ionicons name="calendar" size={16} color="#3B82F6" />
            <Text style={tw`text-blue-600 ml-2`}>
              Evento em: {new Date(newsItem.eventDate).toLocaleDateString()}
            </Text>
          </View>
        )}

        <Text style={tw`text-gray-700 text-base leading-6`}>
          {newsItem.content}
        </Text>

        <View style={tw`mt-6 pt-4 border-t border-gray-200`}>
          <Text style={tw`text-gray-500 text-sm`}>
            Publicado em: {new Date(newsItem.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default NewsDetailScreen;