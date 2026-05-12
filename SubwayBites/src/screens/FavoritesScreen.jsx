import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import FoodCard from '../components/FoodCard';
import { FavoritesContext } from '../context/FavoritesContext';

const FavoritesScreen = ({ navigation }) => {
  const { favorites } = useContext(FavoritesContext);
  
  const handleItemPress = (item) => {
    navigation.navigate('Customization', { item });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorites</Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorite items yet!</Text>
          <Text style={styles.emptySubtext}>Tap the heart icon on menu items to add favorites.</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FoodCard item={item} onPress={handleItemPress} />}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#005e32',
  },
  listContainer: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default FavoritesScreen;