import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, CircleCheck as CheckCircle, Circle as XCircle } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat,
  withSequence,
  runOnJS
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function TaskTimerScreen() {
  const params = useLocalSearchParams();
  const { taskTitle, taskEmoji, duration, mode } = params;
  
  const [timeLeft, setTimeLeft] = useState(parseInt(duration as string) * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const circleProgress = useSharedValue(0);
  const buttonScale = useSharedValue(1);
  const emojiRotation = useSharedValue(0);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        circleProgress.value = withTiming(
          1 - (timeLeft - 1) / (parseInt(duration as string) * 60),
          { duration: 1000 }
        );
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && hasStarted) {
      // Timer completed successfully
      router.push({
        pathname: '/success',
        params: { taskTitle, taskEmoji }
      });
    }
  }, [isRunning, timeLeft, hasStarted]);

  useEffect(() => {
    emojiRotation.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 1000 }),
        withTiming(10, { duration: 1000 }),
        withTiming(0, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const startTimer = () => {
    setIsRunning(true);
    setHasStarted(true);
    buttonScale.value = withSequence(
      withTiming(0.9, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
  };

  const handleCompletion = () => {
    if (mode === 'beat-timer') {
      // Beat the timer mode - success if completed before time runs out
      if (timeLeft > 0) {
        router.push({
          pathname: '/success',
          params: { taskTitle, taskEmoji }
        });
      }
    } else {
      // Countdown mode - failure if stopped before time runs out
      if (timeLeft > 0) {
        router.push({
          pathname: '/failure',
          params: { taskTitle, taskEmoji, reason: 'stopped-early' }
        });
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const circleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${circleProgress.value * 360}deg` }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const emojiAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${emojiRotation.value}deg` }],
  }));

  const getButtonText = () => {
    if (!hasStarted) return 'Start!';
    if (mode === 'beat-timer') return 'I Did It!';
    return 'I Stopped';
  };

  const getButtonColors = () => {
    if (!hasStarted) return ['#FFD700', '#FFA500'];
    if (mode === 'beat-timer') return ['#FF1493', '#FF69B4'];
    return ['#32CD32', '#98FB98'];
  };

  return (
    <LinearGradient
      colors={['#87CEEB', '#FFB6C1', '#98FB98']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#333333" />
        </Pressable>
        <Text style={styles.headerTitle}>{taskTitle}</Text>
      </View>

      <View style={styles.content}>
        <Animated.Text style={[styles.taskEmoji, emojiAnimatedStyle]}>
          {taskEmoji}
        </Animated.Text>

        <View style={styles.timerContainer}>
          <View style={styles.circleContainer}>
            <View style={styles.circleBackground} />
            <Animated.View style={[styles.circleProgress, circleAnimatedStyle]} />
            <View style={styles.timeDisplay}>
              <Text style={styles.timeText}>{formatTime(timeLeft)}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.instructions}>
          {mode === 'beat-timer' 
            ? 'Complete your task before time runs out!'
            : 'Keep going until the timer ends!'}
        </Text>

        <Animated.View style={buttonAnimatedStyle}>
          <Pressable
            onPress={hasStarted ? handleCompletion : startTimer}
            style={styles.actionButtonContainer}
          >
            <LinearGradient
              colors={getButtonColors()}
              style={styles.actionButton}
            >
              {hasStarted && mode === 'beat-timer' && (
                <CheckCircle size={24} color="#FFFFFF" style={styles.buttonIcon} />
              )}
              {hasStarted && mode === 'countdown' && (
                <XCircle size={24} color="#FFFFFF" style={styles.buttonIcon} />
              )}
              <Text style={styles.actionButtonText}>{getButtonText()}</Text>
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
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  taskEmoji: {
    fontSize: 72,
    marginBottom: 40,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  circleContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleBackground: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 10,
    borderColor: '#FFFFFF',
  },
  circleProgress: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 10,
    borderColor: '#FF1493',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
  },
  timeDisplay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 42,
    fontFamily: 'Nunito-Bold',
    color: '#FF4500',
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  instructions: {
    fontSize: 20,
    fontFamily: 'Nunito-SemiBold',
    color: '#9370DB',
    textAlign: 'center',
    marginBottom: 50,
    paddingHorizontal: 30,
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  actionButtonContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
    paddingVertical: 20,
    borderRadius: 30,
    gap: 8,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  buttonIcon: {
    marginRight: 8,
  },
  actionButtonText: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
});