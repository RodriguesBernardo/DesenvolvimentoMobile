// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import NewsCards from '../components/NewsCards';
import newsData from '../services/data';

const HomeScreen = ({ navigation }) => {
  const [news, setNews] = useState(newsData);

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <NewsCards news={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default HomeScreen;