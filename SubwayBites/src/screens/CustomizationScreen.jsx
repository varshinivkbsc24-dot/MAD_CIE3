import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CustomButton from '../components/CustomButton';
import { customizationOptions } from '../data/menuData';
import { CartContext } from '../context/CartContext';

const CustomizationScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const { addToCart } = useContext(CartContext);

  const [selectedBread, setSelectedBread] = useState(customizationOptions.breads[0]);
  const [selectedVeggies, setSelectedVeggies] = useState([]);
  const [selectedSauces, setSelectedSauces] = useState([]);
  const [totalPrice, setTotalPrice] = useState(item.basePrice);

  useEffect(() => {
    let newPrice = item.basePrice + (selectedBread?.price || 0);
    // If veggies or sauces had prices, we would add them here
    setTotalPrice(newPrice);
  }, [selectedBread, selectedVeggies, selectedSauces]);

  const toggleSelection = (option, selectedList, setSelectedList) => {
    const isSelected = selectedList.find(o => o.id === option.id);
    if (isSelected) {
      setSelectedList(selectedList.filter(o => o.id !== option.id));
    } else {
      setSelectedList([...selectedList, option]);
    }
  };

  const handleAddToCart = () => {
    const customizedItem = {
      ...item,
      totalPrice,
      customizations: {
        bread: selectedBread,
        veggies: selectedVeggies,
        sauces: selectedSauces,
      }
    };
    addToCart(customizedItem);
    navigation.navigate('Cart');
  };

  const renderSectionTitle = (title) => (
    <Text style={styles.sectionTitle}>{title}</Text>
  );

  return (
    <View style={styles.container}>
      <ScrollView styles={styles.scrollArea}>
        <View style={styles.header}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDesc}>{item.description}</Text>
        </View>

        {renderSectionTitle('Choose Your Bread')}
        <View style={styles.optionsContainer}>
          {customizationOptions.breads.map((bread) => (
            <TouchableOpacity 
              key={bread.id} 
              style={[
                styles.optionItem, 
                selectedBread.id === bread.id && styles.optionItemSelected
              ]}
              onPress={() => setSelectedBread(bread)}
            >
              <Text style={[
                styles.optionText,
                selectedBread.id === bread.id && styles.optionTextSelected
              ]}>
                {bread.name} {bread.price > 0 ? `(+₹${bread.price.toFixed(2)})` : ''}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {renderSectionTitle('Add Veggies')}
        <View style={styles.optionsContainer}>
          {customizationOptions.veggies.map((veggie) => {
            const isSelected = !!selectedVeggies.find(v => v.id === veggie.id);
            return (
              <TouchableOpacity 
                key={veggie.id} 
                style={[styles.optionItem, isSelected && styles.optionItemSelected]}
                onPress={() => toggleSelection(veggie, selectedVeggies, setSelectedVeggies)}
              >
                <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                  {veggie.name}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {renderSectionTitle('Add Sauces')}
        <View style={[styles.optionsContainer, { marginBottom: 100 }]}>
          {customizationOptions.sauces.map((sauce) => {
            const isSelected = !!selectedSauces.find(s => s.id === sauce.id);
            return (
              <TouchableOpacity 
                key={sauce.id} 
                style={[styles.optionItem, isSelected && styles.optionItemSelected]}
                onPress={() => toggleSelection(sauce, selectedSauces, setSelectedSauces)}
              >
                <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                  {sauce.name}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.totalPrice}>Total: ₹{totalPrice.toFixed(2)}</Text>
        <CustomButton 
          title="Add to Cart" 
          onPress={handleAddToCart}
          style={{ paddingHorizontal: 40 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollArea: {
    padding: 16,
  },
  header: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#005e32',
  },
  itemDesc: {
    marginTop: 8,
    color: '#666',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  optionItem: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,
    backgroundColor: '#fff',
  },
  optionItemSelected: {
    backgroundColor: '#005e32',
    borderColor: '#005e32',
  },
  optionText: {
    color: '#555',
    fontSize: 14,
  },
  optionTextSelected: {
    color: '#fcba03',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  }
});

export default CustomizationScreen;
