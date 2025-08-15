import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, Hourglass } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface CountdownTaskProps {
  title: string;
  emoji: string;
  duration: number;
  onPress: () => void;
}

function CountdownTask({ title, emoji, duration, onPress }: CountdownTaskProps) {
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
        colors={['#32CD32', '#98FB98']}
        style={styles.taskButton}
      >
        <Text style={styles.taskEmoji}>{emoji}</Text>
        <Text style={styles.taskTitle}>{title}</Text>
        <View style={styles.durationContainer}>
          <Hourglass size={16} color="#FFFFFF" />
          <Text style={styles.durationText}>{duration}min</Text>
        </View>
        <Text style={styles.taskDescription}>Keep going until time's up!</Text>
      </LinearGradient>
    </AnimatedPressable>
  );
}

export default function CountdownScreen() {
  const countdownTasks = [
    { title: 'Take Turns', emoji: '🤝', duration: 5 },
    { title: 'Take Turns', emoji: '🤝', duration: 5 },
    { title: 'Brush Teeth', emoji: '🦷', duration: 2 },
    { title: 'Practice Piano', emoji: '🎹', duration: 15 },
    { title: 'Read Book', emoji: '📚', duration: 10 },
    { title: 'Meditation', emoji: '🧘‍♀️', duration: 5 },
    { title: 'Exercise', emoji: '🏃‍♂️', duration: 20 },
    { title: 'Homework', emoji: '📝', duration: 30 },
  ];

  const handleTaskSelect = (task: any) => {
    router.push({
      pathname: '/task-timer',
      params: {
        taskTitle: task.title,
        taskEmoji: task.emoji,
        duration: task.duration,
        mode: 'countdown',
        musicMode: 'default',
      }
    });
  };

  return (
    <LinearGradient
      colors={['#16A34A', '#22C55E']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>3️⃣2️⃣1️⃣ Countdown!</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.instructions}>
          Keep going steadily until your timer reaches zero! 3️⃣2️⃣1️⃣
        </Text>

        <View style={styles.tasksGrid}>
          {countdownTasks.map((task, index) => (
            <CountdownTask
              key={task.title}
              title={task.title}
              emoji={task.emoji}
              duration={task.duration}
              onPress={() => handleTaskSelect(task)}
            />
          ))}
        </View>

        <View style={styles.tipContainer}>
          <Text style={styles.tipTitle}>💡 Pro Tip:</Text>
          <Text style={styles.tipText}>
            If you stop before the timer ends, you'll meet our friend the duck! 🦆
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
  tasksGrid: {
    gap: 16,
    marginBottom: 30,
  },
  taskButton: {
    width: '100%',
    padding: 24,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 12,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  taskEmoji: {
    fontSize: 44,
    marginBottom: 12,
  },
  taskTitle: {
    fontSize: 20,
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
    marginBottom: 4,
  },
  durationText: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  taskDescription: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  tipContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  tipTitle: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 20,
  },
});