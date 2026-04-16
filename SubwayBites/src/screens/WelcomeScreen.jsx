import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, Animated } from 'react-native';
import CustomButton from '../components/CustomButton';

const WelcomeScreen = ({ navigation }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <ImageBackground 
      source={{ uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgICAgIBwcHBwcHBwoHBwcHBw8ICQcKFREWFhURExMYHSggGCYxJx8TITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMIBAwMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAAAAQIFAwf/xAAZEAEBAQEBAQAAAAAAAAAAAAAAARECMUH/xAAWAQEBAQAAAAAAAAAAAAAAAAAABQH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD5/WPa11WWJopFAjSRYCpRKCVmlSgKyoKIA0IAohoKJpoKIaCommgqACJVZoJWOmqzQedY6eledBgUB0r6gAsWIoLFiRQKxa1WKCVCoCiAKqAKIAogCmogNamoaC6azoDWjJoKlNNBms1qs0GKxXpXn0DAuAOiAAoAsVFoM1itViglQqAqoAoigKgCiAGpogKIAGoAumomg0IgKlEBmsV6VigwADogALEUFiVYlBisVqsUEEUCKigAAKgCoACCAAgAJoKgACALqaAJWa0zQZAB0UUAABWemmegYrzrfTFBAAUAFEUAABFQBBAAqAIFABAVEAUQASmoAIA6SKAiooDFbY6Bjp51usUAAFAAIEBQAQKAiKAiValBAAEAEBAAQAEAAB0hUAAArFarNB51it9MUAAFAAgKAAAigIigM1GkBkVKCUAERUBAAEEAAB1KFAQUBms1qs0HnWa3WaDIKAQigAACgIKAyVQGSqgIioCVGqlBlFAZCgIioACA6tFqAIoDNZrdZoMVlusgwLUBQUAAAUBBQExGkwERpAZStJgM1GkBlGsSgyjSUGUaSgiKA6qKAgAJUqgMVmt2M2AxYjdjNBFAFBQQUBBQBFARGkBErSAyy2lBlltkGUaSgxUaqAyKA6qKAiKAgoDLNbZoMVLG7GbAZwXAAFAFAQUBBQEMUBnEaAYRvEoMYljVSgxYlbrNgMVmt1mgyKA6gqAIoCAAIoDOM1tKDFRuxMBlTABRQQUBBcATDFMBMTGsTAZxMbQGLEasSwGGa9KzQedZrdZoMgA6ggCoAAAAAIgAiACFQBVAFAAAAQAVAASgCM0AZZqgMVjr6oDAAP/Z' }} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Subway Bites</Text>
          <Text style={styles.subtitle}>Fresh. Fast. Yours.</Text>
        </View>
        
        <Animated.View style={[styles.buttonContainer, { transform: [{ scale: pulseAnim }] }]}>
          <CustomButton 
            title="Start Order" 
            onPress={() => navigation.navigate('Menu')} 
          />
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', // Darken image for text readability
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: '#fcba03', // yellow
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginTop: 8,
  },
  buttonContainer: {
    marginBottom: 40,
    width: '100%',
  }
});

export default WelcomeScreen;
