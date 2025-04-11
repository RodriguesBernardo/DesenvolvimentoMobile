import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator, SafeAreaView } from 'react-native';
import axios from 'axios';

const API_URL = 'https://api.escuelajs.co/api/v1';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  const fetchProductsByCategory = async (categoryId) => {
    setSelectedCategory(categoryId);
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/products/?categoryId=${categoryId}`);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item.id && styles.selectedCategoryButton
      ]}
      onPress={() => fetchProductsByCategory(item.id)}
    >
      <Text style={[
        styles.categoryText,
        selectedCategory === item.id && styles.selectedCategoryText
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }) => (
    <View style={styles.productCard}>
      <Image 
        source={{ uri: item.images[0] || 'https://via.placeholder.com/150' }} 
        style={styles.productImage} 
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          {item.price > 100 && (
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumText}>PREMIUM</Text>
            </View>
          )}
        </View>
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>⭐ {item.rating || '4.5'}</Text>
        </View>
      </View>
    </View>
  );

  if (loading && !selectedCategory) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7C3AED" />
        <Text style={styles.loadingText}>Carregando categorias...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Categorias</Text>
        <FlatList
          horizontal
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.categoriesList}
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.productsHeader}>
          <Text style={styles.header}>
            {selectedCategory 
              ? `Produtos (${products.length})` 
              : 'Selecione uma categoria'}
          </Text>
          {selectedCategory && (
            <TouchableOpacity onPress={() => setSelectedCategory(null)}>
              <Text style={styles.clearFilter}>Limpar filtro</Text>
            </TouchableOpacity>
          )}
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#7C3AED" />
            <Text style={styles.loadingText}>Carregando produtos...</Text>
          </View>
        ) : (
          <FlatList
            data={products}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.productsList}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Image 
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4076/4076478.png' }} 
                  style={styles.emptyImage}
                />
                <Text style={styles.emptyText}>
                  Nenhum produto encontrado
                </Text>
                <Text style={styles.emptySubtext}>
                  Selecione uma categoria para ver os produtos disponíveis
                </Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#F8FAFC',
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
  },
  productsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  clearFilter: {
    color: '#7C3AED',
    fontWeight: '600',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#64748B',
    fontSize: 16,
  },
  categoriesList: {
    paddingBottom: 16,
  },
  categoryButton: {
    backgroundColor: '#EDE9FE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#DDD6FE',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCategoryButton: {
    backgroundColor: '#7C3AED',
    borderColor: '#6D28D9',
  },
  categoryText: {
    color: '#7C3AED',
    fontWeight: '600',
    fontSize: 14,
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  productsList: {
    paddingBottom: 30,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#F1F5F9',
  },
  productInfo: {
    padding: 16,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1E293B',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10B981',
    marginRight: 10,
  },
  premiumBadge: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  premiumText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '700',
  },
  productDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 12,
  },
  ratingContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#FEF3C7',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  ratingText: {
    color: '#92400E',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
    opacity: 0.7,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    maxWidth: '80%',
  },
});

export default App;