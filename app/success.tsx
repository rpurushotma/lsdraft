import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { Chrome as Home, RotateCcw } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';

export default function SuccessScreen() {
  const params = useLocalSearchParams();
  const { taskTitle, taskEmoji } = params;

  const confettiScale = useSharedValue(0);
  const emojiScale = useSharedValue(0);
  const textScale = useSharedValue(0);
  const starRotation = useSharedValue(0);
  const bounceValue = useSharedValue(0);

  useEffect(() => {
    // Staggered entrance animations
    confettiScale.value = withSpring(1, { damping: 12 });
    
    setTimeout(() => {
      emojiScale.value = withSpring(1.2, { damping: 8 });
    }, 200);
    
    setTimeout(() => {
      textScale.value = withSpring(1, { damping: 10 });
    }, 400);

    // Continuous animations
    starRotation.value = withRepeat(
      withTiming(360, { duration: 3000 }),
      -1,
      false
    );

    bounceValue.value = withRepeat(
      withSequence(
        withSpring(1.1, { damping: 10 }),
        withSpring(1, { damping: 10 })
      ),
      -1,
      true
    );
  }, []);

  const confettiAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: confettiScale.value }],
  }));

  const emojiAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: emojiScale.value * bounceValue.value }],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: textScale.value }],
  }));

  const starAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${starRotation.value}deg` }],
  }));

  return (
    <LinearGradient
      colors={['#FFD700', '#FFA500', '#FF69B4', '#32CD32']}
      style={styles.container}
    >
      <Animated.View style={[styles.confettiContainer, confettiAnimatedStyle]}>
        <Text style={styles.confetti}>🎉</Text>
        <Text style={[styles.confetti, styles.confetti2]}>✨</Text>
        <Text style={[styles.confetti, styles.confetti3]}>🌟</Text>
        <Text style={[styles.confetti, styles.confetti4]}>🎊</Text>
        <Text style={[styles.confetti, styles.confetti5]}>⭐</Text>
      </Animated.View>

      <View style={styles.content}>
        <Animated.View style={starAnimatedStyle}>
          <Text style={styles.starEmoji}>⭐</Text>
        </Animated.View>

        <Animated.Text style={[styles.taskEmoji, emojiAnimatedStyle]}>
          {taskEmoji}
        </Animated.Text>

        <Animated.View style={textAnimatedStyle}>
          <Text style={styles.successTitle}>Amazing Work!</Text>
          <Text style={styles.taskCompleted}>You completed: {taskTitle}</Text>
          <Text style={styles.celebrationText}>
            You're absolutely fantastic! 🌈
          </Text>
        </Animated.View>

        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => router.push('/')}
            style={styles.buttonWrapper}
          >
            <LinearGradient
              colors={['#FF1493', '#FF69B4']}
              style={styles.button}
            >
              <Home size={20} color="#FFFFFF" />
              <Text style={styles.buttonText}>Home</Text>
            </LinearGradient>
          </Pressable>

          <Pressable
            onPress={() => router.back()}
            style={styles.buttonWrapper}
          >
            <LinearGradient
              colors={['#32CD32', '#98FB98']}
              style={styles.button}
            >
              <RotateCcw size={20} color="#FFFFFF" />
              <Text style={styles.buttonText}>Try Again</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  confetti: {
    position: 'absolute',
    fontSize: 24,
  },
  confetti2: {
    top: '15%',
    right: '20%',
    fontSize: 20,
  },
  confetti3: {
    top: '25%',
    left: '15%',
    fontSize: 28,
  },
  confetti4: {
    top: '40%',
    right: '10%',
    fontSize: 22,
  },
  confetti5: {
    top: '60%',
    left: '25%',
    fontSize: 26,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    zIndex: 2,
  },
  starEmoji: {
    fontSize: 48,
    marginBottom: 20,
  },
  taskEmoji: {
    fontSize: 96,
    marginBottom: 30,
  },
  successTitle: {
    fontSize: 36,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  taskCompleted: {
    fontSize: 20,
    fontFamily: 'Nunito-SemiBold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 16,
  },
  celebrationText: {
    fontSize: 18,
    fontFamily: 'Nunito-Regular',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  buttonWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
  },
});