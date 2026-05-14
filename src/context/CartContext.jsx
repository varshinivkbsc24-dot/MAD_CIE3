import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add an item to the cart, including customizations and calculated price
  const addToCart = (item) => {
    setCart((prevCart) => {
      // Check if an identical item matching id AND customizations exist, increment quantity if so
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => 
          cartItem.id === item.id && 
          JSON.stringify(cartItem.customizations) === JSON.stringify(item.customizations)
      );

      if (existingItemIndex >= 0) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      }

      return [...prevCart, { ...item, cartItemId: Math.random().toString(), quantity: 1 }];
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, change) => {
    setCart((prevCart) => 
      prevCart.map((item) => {
        if (item.cartItemId === cartItemId) {
          const newQuantity = item.quantity + change;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.totalPrice * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};
