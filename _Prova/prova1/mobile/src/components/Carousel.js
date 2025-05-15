import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const { width } = Dimensions.get('window');

const Carousel = ({ items, onItemPress }) => {
  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={tw`mb-4`}
    >
      {items.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={[tw`relative`, { width }]}
          onPress={() => onItemPress && onItemPress(item)}
        >
          <Image
            source={{ uri: `http://localhost:5000/uploads/${item.image}` }}
            style={tw`w-full h-48`}
            resizeMode="cover"
          />
          <View style={tw`absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-3`}>
            <Text style={tw`text-white font-bold`}>{item.title}</Text>
            <Text style={tw`text-white text-sm`} numberOfLines={1}>
              {item.content.substring(0, 60)}...
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Carousel;