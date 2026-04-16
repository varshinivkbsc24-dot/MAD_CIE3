import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import FoodCard from '../components/FoodCard';
import CustomButton from '../components/CustomButton';
import { menuData } from '../data/menuData';
import { CartContext } from '../context/CartContext';

const MenuScreen = ({ navigation }) => {
  const { cart } = useContext(CartContext);
  
  const handleItemPress = (item) => {
    navigation.navigate('Customization', { item });
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Our Menu</Text>
      </View>

      <FlatList
        data={menuData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FoodCard item={item} onPress={handleItemPress} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      
      {totalItems > 0 && (
        <View style={styles.cartBarContainer}>
          <CustomButton 
            title={`View Cart (${totalItems} items)`}
            onPress={() => navigation.navigate('Cart')}
          />
        </View>
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
    paddingBottom: 100, // Make room for cart bar
    alignItems: 'center',
  },
  cartBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  }
});

export default MenuScreen;
