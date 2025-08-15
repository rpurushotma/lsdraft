import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, Zap, Hourglass, Music, Star } from 'lucide-react-native';

interface GuideCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  colors: string[];
}

function GuideCard({ icon, title, description, colors }: GuideCardProps) {
  return (
    <LinearGradient colors={colors} style={styles.guideCard}>
      <View style={styles.cardIcon}>{icon}</View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </LinearGradient>
  );
}

export default function GuideScreen() {
  const guides = [
    {
      icon: <Zap size={32} color="#FFFFFF" />,
      title: 'Beat the Timer',
      description: 'Choose a task and try to finish it before the music ends! Tap "I Did It!" when you complete your task.',
      colors: ['#FF1493', '#FF69B4'],
    },
    {
      icon: <Hourglass size={32} color="#FFFFFF" />,
      title: 'Countdown Mode',
      description: 'Keep doing your task for the entire duration! Don\'t stop until the timer reaches zero.',
      colors: ['#32CD32', '#98FB98'],
    },
    {
      icon: <Music size={32} color="#FFFFFF" />,
      title: 'Custom Songs',
      description: 'You can choose your own favorite songs from your music library to make tasks even more fun!',
      colors: ['#9370DB', '#BA55D3'],
    },
    {
      icon: <Star size={32} color="#FFFFFF" />,
      title: 'Rewards',
      description: 'Complete tasks successfully to see amazing celebration animations and earn stars!',
      colors: ['#FF4500', '#FFA500'],
    },
  ];

  return (
    <LinearGradient
      colors={['#10B981', '#34D399', '#6EE7B7', '#A7F3D0']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>How to Play</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.welcomeText}>
          Welcome to Lickety Split! 🎮
        </Text>
        <Text style={styles.subtitle}>
          Here's how to have fun while getting things done:
        </Text>

        <View style={styles.guidesContainer}>
          {guides.map((guide, index) => (
            <GuideCard
              key={guide.title}
              icon={guide.icon}
              title={guide.title}
              description={guide.description}
              colors={guide.colors}
            />
          ))}
        </View>

        <View style={styles.tipContainer}>
          <Text style={styles.tipTitle}>🦆 Meet the Duck!</Text>
          <Text style={styles.tipText}>
            If you don't complete your task in time, a special duck friend will visit you. 
            Don't worry - the duck just wants to remind you to try again!
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
  welcomeText: {
    fontSize: 28,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  guidesContainer: {
    gap: 16,
    marginBottom: 30,
  },
  guideCard: {
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardIcon: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#FFFFFF',
    lineHeight: 20,
  },
  tipContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  tipTitle: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  tipText: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 20,
  },
});