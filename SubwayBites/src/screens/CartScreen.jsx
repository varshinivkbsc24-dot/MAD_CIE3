import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import { CartContext } from '../context/CartContext';

const CartScreen = ({ navigation }) => {
  const { cart, cartTotal, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const [success, setSuccess] = useState(false);

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    
    setSuccess(true);
    setTimeout(() => {
      clearCart();
      setSuccess(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    }, 2500);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.customizations}>
          {item.customizations.bread.name} | {item.customizations.veggies.length} Veggies | {item.customizations.sauces.length} Sauces
        </Text>
        <Text style={styles.itemPrice}>₹{item.totalPrice.toFixed(2)}</Text>
      </View>
      
      <View style={styles.actionsBox}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => updateQuantity(item.cartItemId, -1)} style={styles.qtyBtn}>
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyValue}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.cartItemId, 1)} style={styles.qtyBtn}>
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => removeFromCart(item.cartItemId)} style={styles.removeBtn}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (success) {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.successIcon}>🎉</Text>
        <Text style={styles.successTitle}>Order Placed!</Text>
        <Text style={styles.successMessage}>Your yummy meal is being prepared.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is completely empty!</Text>
          <CustomButton title="Back to Menu" onPress={() => navigation.goBack()} />
        </View>
      ) : (
        <>
          <FlatList 
            data={cart}
            keyExtractor={item => item.cartItemId}
            renderItem={renderCartItem}
            contentContainerStyle={styles.listContent}
          />
          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Grand Total:</Text>
              <Text style={styles.totalPrice}>₹{cartTotal.toFixed(2)}</Text>
            </View>
            <View style={styles.buttonRow}>
              <CustomButton 
                title="Go Back" 
                type="secondary"
                onPress={() => navigation.goBack()} 
                style={styles.halfBtn}
              />
              <CustomButton 
                title="Place Order" 
                onPress={handlePlaceOrder} 
                style={styles.halfBtn}
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  listContent: {
    padding: 16,
    paddingBottom: 200,
  },
  cartItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  customizations: {
    fontSize: 12,
    color: '#777',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#005e32',
  },
  actionsBox: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  qtyBtn: {
    backgroundColor: '#005e32',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnText: {
    color: '#fcba03',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  qtyValue: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 12,
  },
  removeBtn: {
    padding: 4,
  },
  removeText: {
    color: '#E53935',
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    color: '#555',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfBtn: {
    flex: 0.48,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
  successContainer: {
    flex: 1,
    backgroundColor: '#005e32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fcba03',
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 16,
    color: '#fff',
  }
});

export default CartScreen;
