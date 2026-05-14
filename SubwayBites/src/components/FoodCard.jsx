import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FavoritesContext } from '../context/FavoritesContext';

const { width } = Dimensions.get('window');

const FoodCard = ({ item, onPress }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useContext(FavoritesContext);

  const handleFavoritePress = () => {
    if (isFavorite(item.id)) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.card} onPress={() => onPress(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.price}>₹{item.basePrice.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoritePress}>
        <Text style={[styles.favoriteIcon, isFavorite(item.id) && styles.favoriteIconActive]}>
          ♥
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginVertical: 10,
    marginHorizontal: 16,
    width: width - 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  image: {
    width: 120,
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#005e32', // Subway Green
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#555',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fcba03', // Subway Yellow
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 20,
    color: '#ddd',
  },
  favoriteIconActive: {
    color: '#ff6b6b',
  },
});

export default FoodCard;
