import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';

const NewsScreen = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const fetchNews = async () => {
    try {
      const res = await api.get('/news');
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
      <View style={tw`p-4`}>
        <Text style={tw`text-2xl font-bold mb-6`}>Notícias e Eventos</Text>
        
        {loading ? (
          <Text>Carregando...</Text>
        ) : (
          news.map((item) => (
            <TouchableOpacity
              key={item._id}
              style={tw`mb-4 bg-white rounded-lg shadow overflow-hidden`}
              onPress={() => navigation.navigate('NewsDetail', { id: item._id })}
            >
              {item.image && (
                <Image
                  source={{ uri: `http://localhost:5000/uploads/${item.image}` }}
                  style={tw`w-full h-48`}
                  resizeMode="cover"
                />
              )}
              <View style={tw`p-4`}>
                <Text style={tw`font-bold text-lg`}>{item.title}</Text>
                {item.isEvent && (
                  <View style={tw`bg-blue-100 px-2 py-1 rounded-full self-start mt-2`}>
                    <Text style={tw`text-blue-800 text-xs`}>
                      Evento: {new Date(item.eventDate).toLocaleDateString()}
                    </Text>
                  </View>
                )}
                <Text style={tw`text-gray-600 mt-2`}>
                  {item.content.substring(0, 150)}...
                </Text>
                <Text style={tw`text-gray-400 text-xs mt-3`}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default NewsScreen;