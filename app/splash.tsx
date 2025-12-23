import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Shield, Heart } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const slideUpAnim = useRef(new Animated.Value(30)).current;
  const heartbeatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Main entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse animation for logo
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
        }),
      ])
    ).start();

    // Loading bar animation
    Animated.loop(
      Animated.timing(heartbeatAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();

    // Navigate to login after delay
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0F766E', '#14B8A6', '#2DD4BF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Background pattern */}
        <View style={styles.patternContainer}>
          {[...Array(6)].map((_, i) => (
            <View key={i} style={[styles.patternCross, {
              top: `${15 + (i * 15)}%`,
              left: `${(i % 2) * 70 + 10}%`,
              opacity: 0.05
            }]}>
              <Text style={styles.patternCrossText}>+</Text>
            </View>
          ))}
        </View>

        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* App Logo */}
          <Animated.View style={[styles.logoContainer, { transform: [{ scale: pulseAnim }] }]}>
            <Image
              source={require('@/assets/web/icon-512.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </Animated.View>

          {/* Heartbeat Line */}
          <View style={styles.heartbeatContainer}>
            <Svg width={width * 0.7} height={40} viewBox="0 0 200 40">
              <Path
                d="M0,20 L30,20 L40,20 L50,5 L60,35 L70,10 L80,30 L90,20 L100,20 L110,20 L120,5 L130,35 L140,10 L150,30 L160,20 L200,20"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="2"
                fill="none"
              />
            </Svg>
          </View>

          {/* App Name */}
          <Animated.View style={{ transform: [{ translateY: slideUpAnim }] }}>
            <Text style={styles.title}>ThalassCare</Text>
            <Text style={styles.aiText}>AI</Text>
          </Animated.View>

          {/* Tagline */}
          <Text style={styles.tagline}>Advanced Thalassemia Care Platform</Text>

          {/* Trust Badges */}
          <View style={styles.trustBadges}>
            <View style={styles.badge}>
              <Shield size={14} color="#fff" />
              <Text style={styles.badgeText}>HIPAA Compliant</Text>
            </View>
            <View style={styles.badgeDivider} />
            <View style={styles.badge}>
              <Heart size={14} color="#fff" />
              <Text style={styles.badgeText}>Patient First</Text>
            </View>
          </View>
        </Animated.View>

        {/* Footer */}
        <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
          <View style={styles.loadingContainer}>
            <View style={styles.loadingBar}>
              <Animated.View
                style={[
                  styles.loadingProgress,
                  {
                    transform: [{
                      translateX: heartbeatAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-200, 0],
                      })
                    }]
                  }
                ]}
              />
            </View>
            <Text style={styles.loadingText}>Initializing secure connection...</Text>
          </View>
          <Text style={styles.versionText}>Version 1.0.0 | Medical Grade Security</Text>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  patternContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  patternCross: {
    position: 'absolute',
  },
  patternCrossText: {
    fontSize: 80,
    color: '#fff',
    fontWeight: '200',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoImage: {
    width: 120,
    height: 120,
    borderRadius: 30,
  },
  heartbeatContainer: {
    marginVertical: 16,
    opacity: 0.8,
  },
  title: {
    fontSize: 38,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 1,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  aiText: {
    fontSize: 22,
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: 12,
    textAlign: 'center',
    marginTop: -4,
  },
  tagline: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 16,
    letterSpacing: 0.5,
  },
  trustBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  badgeDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  loadingBar: {
    width: 200,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingProgress: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  loadingText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 10,
  },
  versionText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 11,
  },
});
