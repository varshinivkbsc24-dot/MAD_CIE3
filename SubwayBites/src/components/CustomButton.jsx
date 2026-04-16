import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, type = 'primary', style }) => {
  const isPrimary = type === 'primary';
  
  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      style={[
        styles.button, 
        isPrimary ? styles.primaryBg : styles.secondaryBg,
        style
      ]} 
      onPress={onPress}
    >
      <Text style={[
        styles.text, 
        isPrimary ? styles.primaryText : styles.secondaryText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryBg: {
    backgroundColor: '#005e32', // Subway green
  },
  secondaryBg: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#005e32',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryText: {
    color: '#fcba03', // Subway yellow
  },
  secondaryText: {
    color: '#005e32',
  }
});

export default CustomButton;
