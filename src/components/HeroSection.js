import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Platform
} from 'react-native';
import { useNavigate } from 'react-router-dom';

const HeroSection = ({ onCTAPress }) => {
  const [dimensions, setDimensions] = useState(() => {
    const { width, height } = Dimensions.get('window');
    return { width, height };
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const navigate = useNavigate();

  useEffect(() => {
    const updateDimensions = () => {
      const { width, height } = Dimensions.get('window');
      setDimensions({ width, height });
    };

    if (Platform.OS === 'web') {
      window.addEventListener('resize', updateDimensions);
    }

    const subscription = Dimensions.addEventListener('change', updateDimensions);

    return () => {
      if (Platform.OS === 'web') {
        window.removeEventListener('resize', updateDimensions);
      }
      subscription?.remove();
    };
  }, []);

  useEffect(() => {
    // Main entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous pulse animation for CTA
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.03,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim, slideAnim, pulseAnim]);

  const handleCTAPress = () => {
    navigate('/book');
  };

  const { width, height } = dimensions;
  const styles = getStyles(width, height);

  return (
    <View style={styles.container}>
      {/* Rich background layers */}
      <View style={styles.backgroundGradient} />
      <View style={styles.meshGradient} />
      <View style={styles.noiseOverlay} />

      <Animated.View style={[
        styles.content,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}>
        {/* Main Hero Content */}
        <View style={styles.heroMain}>
          <View style={styles.tagline}>
            <View style={styles.taglineDot} />
            <Text style={styles.taglineText}>TECHNICAL VENTURE PARTNER</Text>
          </View>

          <Text style={styles.headline}>
            I Only Build
          </Text>
          <Text style={[styles.headline, styles.headlineAccent]}>
            What I Believe In
          </Text>

          <Text style={styles.subheadline}>
            Not a development agency. I'm a technical co-founder with a venture capitalist's lens.
            From idea validation to funded MVP in weeks, not months.
          </Text>

          {/* Key differentiators */}
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>$10K</Text>
              <Text style={styles.statLabel}>Recently Declined</Text>
              <Text style={styles.statDetail}>Won't build what won't work</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statValue}>2-12</Text>
              <Text style={styles.statLabel}>Weeks to MVP</Text>
              <Text style={styles.statDetail}>Not 6+ months</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statValue}>20-50%</Text>
              <Text style={styles.statLabel}>Equity Partnership</Text>
              <Text style={styles.statDetail}>When you win, I win</Text>
            </View>
          </View>

          {/* Primary CTA */}
          <View style={styles.ctaContainer}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <TouchableOpacity
                style={styles.primaryCTA}
                onPress={handleCTAPress}
                activeOpacity={0.9}
              >
                <Text style={styles.primaryCTAText}>Submit Your Venture</Text>
                <View style={styles.ctaIconContainer}>
                  <Text style={styles.ctaIcon}>→</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>

            <Text style={styles.ctaSubtext}>
              Free 30-minute reality check on your idea
            </Text>
          </View>
        </View>

        {/* Philosophy Statement */}
        <View style={styles.philosophySection}>
          <View style={styles.philosophyCard}>
            <Text style={styles.philosophyQuote}>
              "Traditional development was disrupted the day ChatGPT launched. I saw it coming.
              While others clung to coding, I studied the other half - the business side."
            </Text>
            <View style={styles.philosophyDivider} />
            <Text style={styles.philosophyText}>
              CS degree + 7 years building + VC training + multiple ventures =
              I validate markets, identify opportunities, and only build winners.
            </Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const getStyles = (width, height) => StyleSheet.create({
  container: {
    width: width,
    minHeight: height,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#000000',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    ...Platform.select({
      web: {
        background: `
          radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(14, 165, 233, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 20%, rgba(245, 158, 11, 0.08) 0%, transparent 50%),
          linear-gradient(180deg, #000000 0%, #050505 100%)
        `,
      },
    }),
  },
  meshGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.4,
    ...Platform.select({
      web: {
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 100 0 L 0 0 0 100' fill='none' stroke='rgba(255,255,255,0.02)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)' /%3E%3C/svg%3E")`,
      },
    }),
  },
  noiseOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.02,
    ...Platform.select({
      web: {
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1' /%3E%3C/svg%3E")`,
      },
    }),
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: width > 768 ? 40 : 20,
    zIndex: 1,
    paddingTop: 120,
    paddingBottom: 60,
  },
  heroMain: {
    maxWidth: 1200,
    width: '100%',
    alignItems: 'center',
    marginBottom: 80,
  },
  tagline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: 'rgba(139, 92, 246, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  taglineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#8B5CF6',
    marginRight: 10,
    ...Platform.select({
      web: {
        boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)',
      },
    }),
  },
  taglineText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 12,
    fontWeight: '700',
    color: '#8B5CF6',
    letterSpacing: 2,
  },
  headline: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 80 : width > 430 ? 56 : 42,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 28,
    letterSpacing: -3,
    lineHeight: width > 768 ? 88 : width > 430 ? 64 : 50,
  },
  headlineAccent: {
    marginTop: -10,
    color: '#0EA5E9',
    textShadowColor: 'rgba(14, 165, 233, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
  },
  subheadline: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 22 : 18,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 56,
    lineHeight: width > 768 ? 34 : 28,
    maxWidth: 800,
    paddingHorizontal: 20,
  },
  statsGrid: {
    flexDirection: width > 768 ? 'row' : 'column',
    gap: 24,
    marginBottom: 56,
    width: '100%',
    maxWidth: 900,
    justifyContent: 'center',
  },
  statCard: {
    flex: width > 768 ? 1 : undefined,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    ...Platform.select({
      web: {
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        ':hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          borderColor: 'rgba(14, 165, 233, 0.2)',
          transform: 'translateY(-4px)',
        },
      },
    }),
  },
  statValue: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 36 : 28,
    fontWeight: '900',
    color: '#0EA5E9',
    marginBottom: 8,
  },
  statLabel: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statDetail: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
  },
  ctaContainer: {
    alignItems: 'center',
    gap: 16,
  },
  primaryCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingLeft: 36,
    paddingRight: 8,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      web: {
        boxShadow: `
          0 0 0 1px rgba(255, 255, 255, 0.1),
          0 10px 40px rgba(14, 165, 233, 0.2),
          0 30px 80px rgba(0, 0, 0, 0.4)
        `,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        ':hover': {
          transform: 'translateY(-2px)',
          boxShadow: `
            0 0 0 1px rgba(255, 255, 255, 0.2),
            0 20px 60px rgba(14, 165, 233, 0.3),
            0 40px 100px rgba(0, 0, 0, 0.5)
          `,
        },
      },
    }),
  },
  primaryCTAText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 18 : 16,
    fontWeight: '700',
    color: '#000000',
    marginRight: 20,
    letterSpacing: 0.3,
  },
  ctaIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  ctaSubtext: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 8,
  },
  philosophySection: {
    width: '100%',
    maxWidth: 1000,
    paddingTop: 60,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  philosophyCard: {
    backgroundColor: 'rgba(139, 92, 246, 0.03)',
    borderRadius: 24,
    padding: width > 768 ? 48 : 32,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.1)',
    ...Platform.select({
      web: {
        backdropFilter: 'blur(20px)',
      },
    }),
  },
  philosophyQuote: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 20 : 17,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: width > 768 ? 32 : 28,
    textAlign: 'center',
    marginBottom: 24,
    fontStyle: 'italic',
  },
  philosophyDivider: {
    width: 60,
    height: 2,
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    alignSelf: 'center',
    marginBottom: 24,
  },
  philosophyText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 16 : 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default HeroSection;