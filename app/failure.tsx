import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { Chrome as Home, RotateCcw } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
  withSequence,
  withDelay
} from 'react-native-reanimated';

export default function FailureScreen() {
  const params = useLocalSearchParams();
  const { taskTitle, taskEmoji, reason } = params;

  const duckTranslateX = useSharedValue(-200);
  const duckScale = useSharedValue(1);
  const textScale = useSharedValue(0);

  useEffect(() => {
    // Duck waddles in from left
    setTimeout(() => {
      duckTranslateX.value = withTiming(0, { duration: 1500 });
    }, 500);

    // Duck quacks (scale animation)
    setTimeout(() => {
      duckScale.value = withSequence(
        withSpring(1.2, { damping: 8 }),
        withSpring(0.9, { damping: 8 }),
        withSpring(1.1, { damping: 8 }),
        withSpring(1, { damping: 8 })
      );
    }, 2000);

    // Duck waddles out to right
    setTimeout(() => {
      duckTranslateX.value = withTiming(200, { duration: 1500 });
    }, 3500);

    // Show text after duck leaves
    setTimeout(() => {
      textScale.value = withSpring(1, { damping: 10 });
    }, 5000);
  }, []);

  const duckAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: duckTranslateX.value },
      { scale: duckScale.value }
    ],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: textScale.value }],
  }));

  const getMessage = () => {
    if (reason === 'stopped-early') {
      return "Oops! You stopped too early. Try to keep going next time!";
    }
    return "Time's up! Don't worry, you'll get it next time!";
  };

  return (
    <LinearGradient
      colors={['#FFB6C1', '#FFC0CB', '#FFE4E1', '#FFF0F5']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.duckStage}>
          <Animated.Text style={[styles.duck, duckAnimatedStyle]}>
            🦆
          </Animated.Text>
        </View>

        <Animated.View style={[styles.messageContainer, textAnimatedStyle]}>
          <Text style={styles.taskEmoji}>{taskEmoji}</Text>
          <Text style={styles.failureTitle}>Not quite there!</Text>
          <Text style={styles.taskName}>{taskTitle}</Text>
          <Text style={styles.message}>{getMessage()}</Text>
          <Text style={styles.encouragement}>
            Keep practicing - you've got this! 💪
          </Text>
        </Animated.View>

        <Animated.View style={[styles.buttonContainer, textAnimatedStyle]}>
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
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  duckStage: {
    height: 120,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  duck: {
    fontSize: 64,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  taskEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  failureTitle: {
    fontSize: 32,
    fontFamily: 'Nunito-Bold',
    color: '#FF1493',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  taskName: {
    fontSize: 24,
    fontFamily: 'Nunito-SemiBold',
    color: '#FF4500',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  message: {
    fontSize: 18,
    fontFamily: 'Nunito-Regular',
    color: '#9370DB',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 16,
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  encouragement: {
    fontSize: 18,
    fontFamily: 'Nunito-SemiBold',
    color: '#32CD32',
    textAlign: 'center',
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
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