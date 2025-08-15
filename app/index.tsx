import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { BookOpen, Globe } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withRepeat, 
  withSequence,
  withTiming,
  runOnJS
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface MainButtonProps {
  title: string;
  emoji: string;
  colors: string[];
  onPress: () => void;
  delay?: number;
}

interface SmallButtonProps {
  title: string;
  icon: React.ReactNode;
  colors: string[];
  onPress: () => void;
  delay?: number;
}

function MainButton({ title, emoji, colors, onPress, delay = 0 }: MainButtonProps) {
  const scale = useSharedValue(0);
  const bounce = useSharedValue(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      scale.value = withSpring(1, { damping: 8, stiffness: 100 });
      
      // Continuous bouncing
      bounce.value = withRepeat(
        withSequence(
          withSpring(1.05, { damping: 10 }),
          withSpring(1, { damping: 10 })
        ),
        -1,
        true
      );
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value * bounce.value }
    ],
  }));

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.9, { duration: 100 }),
      withSpring(1.1, { duration: 200 }),
      withSpring(1, { duration: 100 })
    );
    setTimeout(() => {
      runOnJS(onPress)();
    }, 400);
  };

  return (
    <AnimatedPressable style={[animatedStyle]} onPress={handlePress}>
      <LinearGradient
        colors={colors}
        style={styles.mainButton}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.mainEmoji}>{emoji}</Text>
        <Text style={styles.mainButtonText}>{title}</Text>
      </LinearGradient>
    </AnimatedPressable>
  );
}

function SmallButton({ title, icon, colors, onPress, delay = 0 }: SmallButtonProps) {
  const scale = useSharedValue(0);
  const wiggle = useSharedValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      scale.value = withSpring(1, { damping: 12, stiffness: 80 });
      
      // Gentle wiggle
      wiggle.value = withRepeat(
        withSequence(
          withTiming(-2, { duration: 1500 }),
          withTiming(2, { duration: 1500 })
        ),
        -1,
        true
      );
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${wiggle.value}deg` }
    ],
  }));

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.9, { duration: 100 }),
      withSpring(1, { duration: 100 })
    );
    setTimeout(() => {
      runOnJS(onPress)();
    }, 200);
  };

  return (
    <AnimatedPressable style={[animatedStyle]} onPress={handlePress}>
      <LinearGradient
        colors={colors}
        style={styles.smallButton}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {icon}
        <Text style={styles.smallButtonText}>{title}</Text>
      </LinearGradient>
    </AnimatedPressable>
  );
}

export default function LicketySplitHome() {
  const titleScale = useSharedValue(0);
  const decorationFloat = useSharedValue(0);

  useEffect(() => {
    titleScale.value = withSpring(1, { damping: 6, stiffness: 60 });
    
    // Floating decorations
    decorationFloat.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 3000 }),
        withTiming(-10, { duration: 3000 })
      ),
      -1,
      true
    );
  }, []);

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: titleScale.value },
      { rotate: '-3deg' }
    ],
  }));

  const decorationAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: decorationFloat.value }],
  }));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#10B981', '#34D399']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* Floating decorations */}
      <Animated.View style={[styles.decorations, decorationAnimatedStyle]}>
        <Text style={[styles.decoration, { top: '45%', right: '10%' }]}>✨</Text>
      </Animated.View>

      <View style={styles.content}>
        <Animated.View style={[styles.titleContainer, titleAnimatedStyle]}>
          <Text style={styles.title}>⚡ Lickety Split! ⚡</Text>
          <Text style={styles.subtitle}>Pick your timer game!</Text>
        </Animated.View>

        <View style={styles.mainButtonsContainer}>
          <MainButton
            title="Beat the Timer"
            emoji="⏰"
            colors={['#D97706', '#F59E0B']}
            onPress={() => router.push('/beat-timer')}
            delay={300}
          />
          
          <MainButton
            title="Countdown"
            emoji="3️⃣2️⃣1️⃣"
            colors={['#166534', '#16A34A']}
            onPress={() => router.push('/countdown')}
            delay={600}
          />
        </View>

        <View style={styles.smallButtonsContainer}>
          <SmallButton
            title="Guide"
            icon={<BookOpen size={18} color="#FFFFFF" strokeWidth={3} />}
            colors={['#14532D', '#166534']}
            onPress={() => router.push('/guide')}
            delay={900}
          />
          
          <SmallButton
            title="Language"
            icon={<Globe size={18} color="#FFFFFF" strokeWidth={3} />}
            colors={['#A16207', '#D97706']}
            onPress={() => router.push('/language')}
            delay={1200}
          />
        </View>

        <Text style={styles.footer}>Ready, set, go! 🏃‍♀️💨</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  decorations: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  decoration: {
    position: 'absolute',
    fontSize: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 42,
    fontFamily: 'Nunito-Bold',
    color: '#F59E0B',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 22,
    fontFamily: 'Nunito-SemiBold',
    color: '#FEF9C3',
    textAlign: 'center',
    marginTop: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  mainButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    marginBottom: 40,
  },
  mainButton: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 15,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  mainEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  mainButtonText: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  smallButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 30,
  },
  smallButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  smallButtonText: {
    fontSize: 11,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 4,
  },
  footer: {
    fontSize: 18,
    fontFamily: 'Nunito-SemiBold',
    color: '#FEF9C3',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
});