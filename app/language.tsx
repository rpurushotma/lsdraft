import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, Check } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface LanguageOptionProps {
  language: string;
  flag: string;
  isSelected: boolean;
  onPress: () => void;
}

function LanguageOption({ language, flag, isSelected, onPress }: LanguageOptionProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.95, { duration: 100 }),
      withSpring(1, { duration: 100 })
    );
    onPress();
  };

  return (
    <AnimatedPressable style={animatedStyle} onPress={handlePress}>
      <LinearGradient
        colors={isSelected ? ['#96CEB4', '#AFDEC4'] : ['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
        colors={isSelected ? ['#FFD700', '#FFA500'] : ['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.2)']}
        style={[styles.languageOption, isSelected && styles.selectedOption]}
      >
        <Text style={styles.flag}>{flag}</Text>
        <Text style={[styles.languageText, isSelected && styles.selectedText]}>
          {language}
        </Text>
        {isSelected && (
          <View style={styles.checkContainer}>
            <Check size={20} color="#FFFFFF" />
          </View>
        )}
      </LinearGradient>
    </AnimatedPressable>
  );
}

export default function LanguageScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = [
    { language: 'English', flag: '🇺🇸' },
    { language: 'Español', flag: '🇪🇸' },
    { language: 'Français', flag: '🇫🇷' },
    { language: 'Deutsch', flag: '🇩🇪' },
    { language: '中文', flag: '🇨🇳' },
    { language: '日本語', flag: '🇯🇵' },
    { language: 'Português', flag: '🇧🇷' },
    { language: 'Italiano', flag: '🇮🇹' },
  ];

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    // In a real app, this would save the language preference
  };

  return (
    <LinearGradient
      colors={['#F59E0B', '#FBBF24', '#FCD34D', '#FDE68A']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Choose Language</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.instructions}>
          Select your preferred language 🌍
        </Text>

        <View style={styles.languageGrid}>
          {languages.map((lang) => (
            <LanguageOption
              key={lang.language}
              language={lang.language}
              flag={lang.flag}
              isSelected={selectedLanguage === lang.language}
              onPress={() => handleLanguageSelect(lang.language)}
            />
          ))}
        </View>

        <View style={styles.noteContainer}>
          <Text style={styles.noteText}>
            Language changes will apply to all task names and instructions throughout the app.
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    marginLeft: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  instructions: {
    fontSize: 18,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  languageGrid: {
    gap: 12,
    marginBottom: 30,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  selectedOption: {
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 12,
  },
  flag: {
    fontSize: 28,
    marginRight: 20,
  },
  languageText: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  selectedText: {
    color: '#FFFFFF',
  },
  checkContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 4,
  },
  noteContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
    borderRadius: 16,
  },
  noteText: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 20,
  },
});