import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, Clock, Music, Shuffle, Zap } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface TaskButtonProps {
  title: string;
  emoji: string;
  duration: number;
  onPress: () => void;
}

function TaskButton({ title, emoji, duration, onPress }: TaskButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.95, { duration: 100 }, () => {
      scale.value = withSpring(1);
    });
    onPress();
  };

  return (
    <AnimatedPressable style={animatedStyle} onPress={handlePress}>
      <LinearGradient
        colors={['#FF6B35', '#FF8E53']}
        style={styles.taskButton}
      >
        <Text style={styles.taskEmoji}>{emoji}</Text>
        <Text style={styles.taskTitle}>{title}</Text>
        <View style={styles.durationContainer}>
          <Zap size={16} color="#FFFFFF" />
          <Text style={styles.durationText}>{duration}min</Text>
        </View>
      </LinearGradient>
    </AnimatedPressable>
  );
}

export default function BeatTimerScreen() {
  const [selectedMode, setSelectedMode] = useState<'default' | 'custom-time' | 'custom-song'>('default');

  const tasks = [
    { title: 'Ready to Go', emoji: '🚀', duration: 5 },
    { title: 'Make Bed', emoji: '🛏️', duration: 3 },
    { title: 'Mealtime', emoji: '🍽️', duration: 15 },
    { title: 'Put on PJs', emoji: '👘', duration: 3 },
    { title: 'Brush Teeth', emoji: '🦷', duration: 2 },
    { title: 'Get Dressed', emoji: '👕', duration: 4 },
  ];

  const handleTaskSelect = (task: any) => {
    router.push({
      pathname: '/task-timer',
      params: {
        taskTitle: task.title,
        taskEmoji: task.emoji,
        duration: task.duration,
        mode: 'beat-timer',
        musicMode: selectedMode,
      }
    });
  };

  const handleCustomTime = () => {
    // In a real app, this would open a time picker
    setSelectedMode('custom-time');
  };

  const handleCustomSong = () => {
    // In a real app, this would open the document picker
    setSelectedMode('custom-song');
  };

  return (
    <LinearGradient
      colors={['#EAB308', '#FACC15']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>⚡ Beat the Timer!</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.instructions}>
          Race against time to finish before the timer runs out! ⏰⚡
        </Text>

        <View style={styles.modeSelector}>
          <Text style={styles.modeTitle}>Music Mode:</Text>
          <View style={styles.modeButtons}>
            <Pressable
              style={[styles.modeButton, selectedMode === 'default' && styles.activeModeButton]}
              onPress={() => setSelectedMode('default')}
            >
              <Music size={20} color={selectedMode === 'default' ? '#FF1493' : '#FFFFFF'} />
              <Text style={[styles.modeButtonText, selectedMode === 'default' && styles.activeModeButtonText]}>
                Default Song
              </Text>
            </Pressable>
            
            <Pressable
              style={[styles.modeButton, selectedMode === 'custom-time' && styles.activeModeButton]}
              onPress={handleCustomTime}
            >
              <Clock size={20} color={selectedMode === 'custom-time' ? '#FF1493' : '#FFFFFF'} />
              <Text style={[styles.modeButtonText, selectedMode === 'custom-time' && styles.activeModeButtonText]}>
                Custom Time
              </Text>
            </Pressable>
            
            <Pressable
              style={[styles.modeButton, selectedMode === 'custom-song' && styles.activeModeButton]}
              onPress={handleCustomSong}
            >
              <Shuffle size={20} color={selectedMode === 'custom-song' ? '#FF1493' : '#FFFFFF'} />
              <Text style={[styles.modeButtonText, selectedMode === 'custom-song' && styles.activeModeButtonText]}>
                My Song
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.tasksGrid}>
          {tasks.map((task, index) => (
            <TaskButton
              key={task.title}
              title={task.title}
              emoji={task.emoji}
              duration={task.duration}
              onPress={() => handleTaskSelect(task)}
            />
          ))}
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
  modeSelector: {
    marginBottom: 30,
  },
  modeTitle: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  modeButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  activeModeButton: {
    backgroundColor: '#FFFFFF',
  },
  modeButtonText: {
    fontSize: 12,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
  },
  activeModeButtonText: {
    color: '#EF4444',
  },
  tasksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  taskButton: {
    width: (width - 56) / 2,
    height: 160,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 12,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  taskEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  taskTitle: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  durationText: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});