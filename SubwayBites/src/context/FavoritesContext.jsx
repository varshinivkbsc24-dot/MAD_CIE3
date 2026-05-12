import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (item) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.find(fav => fav.id === item.id)) {
        return [...prevFavorites, item];
      }
      return prevFavorites;
    });
  };

  const removeFromFavorites = (itemId) => {
    setFavorites((prevFavorites) => prevFavorites.filter(item => item.id !== itemId));
  };

  const isFavorite = (itemId) => {
    return favorites.some(item => item.id === itemId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};