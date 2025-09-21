import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Platform
} from 'react-native';

const { width } = Dimensions.get('window');

const AboutSection = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const bulletPoints = [
    { icon: '🤝', text: 'Equity partnership aligns our success' },
    { icon: '🎯', text: 'Validation before development saves time & money' },
    { icon: '🤖', text: 'AI-native development: 10x faster, 50% cheaper' },
    { icon: '💰', text: 'Flexible deals: cash, equity, or hybrid' },
  ];

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.sectionTitle}>The Venture Partner Model</Text>
        
        <View style={styles.mainContent}>
          <View style={styles.textContent}>
            <Text style={styles.introText}>
              I saw coding becoming commoditized. So I studied the venture side.
            </Text>
            
            <Text style={styles.description}>
              CS background taught me to build. VC training taught me what to build. Watching Diet AI's exit taught me that execution beats perfection. Now I combine technical expertise with business strategy to build ventures I'd personally invest in. Early in my venture studio journey with 2 promising ventures validating the thesis.
            </Text>
            
            <View style={styles.bulletContainer}>
              {bulletPoints.map((point, index) => (
                <Animated.View 
                  key={index}
                  style={[
                    styles.bulletPoint,
                    {
                      opacity: fadeAnim,
                      transform: [{
                        translateX: slideAnim.interpolate({
                          inputRange: [0, 50],
                          outputRange: [0, -50],
                        }),
                      }],
                    },
                  ]}
                >
                  <Text style={styles.bulletIcon}>{point.icon}</Text>
                  <Text style={styles.bulletText}>{point.text}</Text>
                </Animated.View>
              ))}
            </View>
          </View>
          
          <View style={styles.imageContainer}>
            <View style={styles.imageFrame}>
              <View style={styles.imagePlaceholder}>
                <Text style={styles.placeholderText}>VENTURE PARTNER</Text>
              </View>
            </View>
            <Text style={styles.imageCaption}>Technical Expertise + Venture Mindset</Text>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Active Ventures</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>$10K</Text>
            <Text style={styles.statLabel}>Recently Declined</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>100%</Text>
            <Text style={styles.statLabel}>Selective Rate</Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A0B0F',
    paddingVertical: 80,
    paddingHorizontal: width > 768 ? 40 : 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  content: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  sectionTitle: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 36 : 28,
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 50,
    letterSpacing: -0.5,
  },
  mainContent: {
    flexDirection: width > 768 ? 'row' : 'column',
    alignItems: 'center',
    gap: 40,
  },
  textContent: {
    flex: 1,
  },
  introText: {
    fontFamily: Platform.OS === 'web' ? "'Orbitron', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 20 : 16,
    color: '#FFFFFF',
    marginBottom: 20,
    lineHeight: 28,
  },
  highlight: {
    color: '#0EA5E9',
    fontWeight: '900',
    textShadowColor: '#14B8A6',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  description: {
    fontFamily: Platform.OS === 'web' ? "'Orbitron', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 16 : 14,
    color: '#CCCCCC',
    marginBottom: 30,
    lineHeight: 24,
  },
  bulletContainer: {
    gap: 15,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(14, 165, 233, 0.05)',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#0EA5E9',
  },
  bulletIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  bulletText: {
    fontFamily: Platform.OS === 'web' ? "'Orbitron', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 14 : 12,
    color: '#FFFFFF',
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
  },
  imageFrame: {
    position: 'relative',
    borderWidth: 2,
    borderColor: '#0EA5E9',
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0 0 30px rgba(14, 165, 233, 0.3)',
      },
    }),
  },
  imagePlaceholder: {
    width: width > 768 ? 300 : 200,
    height: width > 768 ? 300 : 200,
    backgroundColor: 'rgba(20, 21, 32, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 18,
    color: '#F59E0B',
    fontWeight: '700',
    letterSpacing: 2,
  },
  founderImage: {
    width: width > 768 ? 300 : 200,
    height: width > 768 ? 300 : 200,
  },
  imageGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    ...Platform.select({
      web: {
        boxShadow: 'inset 0 0 30px rgba(14, 165, 233, 0.3)',
      },
    }),
  },
  imageCaption: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 13,
    color: '#0EA5E9',
    marginTop: 15,
    textAlign: 'center',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 60,
    gap: 20,
    flexWrap: 'wrap',
  },
  statBox: {
    alignItems: 'center',
    padding: width > 768 ? 20 : 15,
    backgroundColor: 'rgba(20, 21, 32, 0.7)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.2)',
    minWidth: width > 768 ? 150 : 100,
    flex: width > 768 ? 0 : 1,
  },
  statNumber: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 32 : 24,
    color: '#0EA5E9',
    marginBottom: 10,
    fontWeight: '800',
  },
  statLabel: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 13 : 11,
    color: '#9CA3AF',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default AboutSection;