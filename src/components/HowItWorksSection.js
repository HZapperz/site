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

const ProcessStep = ({ step, index }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(index * 200),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [fadeAnim, slideAnim, index]);

  return (
    <Animated.View
      style={[
        styles.stepContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.stepNumberContainer}>
        <Text style={styles.stepNumber}>{step.number}</Text>
      </View>
      
      <View style={styles.stepContent}>
        <View style={styles.stepHeader}>
          <Text style={styles.stepIcon}>{step.icon}</Text>
          <Text style={styles.stepTitle}>{step.title}</Text>
        </View>
        <Text style={styles.stepDescription}>{step.description}</Text>
      </View>
      
      {index < 4 && (
        <View style={styles.connector}>
          <View style={styles.connectorLine} />
        </View>
      )}
    </Animated.View>
  );
};

const HowItWorksSection = () => {
  const steps = [
    {
      number: '01',
      icon: '🔍',
      title: 'Discovery',
      description: 'Honest assessment of your idea\'s potential. I\'ll tell you the truth - even if it\'s not what you want to hear.',
    },
    {
      number: '02',
      icon: '✅',
      title: 'Validation',
      description: '3-week sprint to verify market demand. We validate before we build - saving time and money.',
    },
    {
      number: '03',
      icon: '🤝',
      title: 'Partnership',
      description: 'Custom deal structure based on your stage. Cash, equity, or hybrid - we\'ll find what works.',
    },
    {
      number: '04',
      icon: '⚡',
      title: 'Build',
      description: '2-12 week AI-native development. Building 10x faster without sacrificing quality.',
    },
    {
      number: '05',
      icon: '📈',
      title: 'Scale',
      description: 'Ongoing support through growth and exit. I\'m with you until the end - because I\'m invested too.',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>The Process</Text>
      
      <Text style={styles.sectionSubtitle}>
        Validation before code. Partnership over transactions.
      </Text>
      
      <View style={styles.stepsContainer}>
        {steps.map((step, index) => (
          <ProcessStep key={index} step={step} index={index} />
        ))}
      </View>
      
      <View style={styles.ctaContainer}>
        <Text style={styles.ctaText}>
          Ready to validate your venture?
        </Text>
        <Text style={styles.ctaSubtext}>
          Let\'s see if we\'re a fit for partnership
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141520',
    paddingVertical: 80,
    paddingHorizontal: width > 768 ? 40 : 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
  sectionTitle: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 42 : 32,
    fontWeight: '800',
    color: '#F3F4F6',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: -1,
  },
  sectionSubtitle: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 18 : 16,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 80,
  },
  stepsContainer: {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 60,
    position: 'relative',
  },
  stepNumberContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(14, 165, 233, 0.1)',
    borderWidth: 2,
    borderColor: '#0EA5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
  },
  stepNumber: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 18,
    fontWeight: '800',
    color: '#0EA5E9',
  },
  stepContent: {
    flex: 1,
    paddingTop: 5,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  stepTitle: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 20 : 18,
    fontWeight: '700',
    color: '#F3F4F6',
  },
  stepDescription: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 16 : 14,
    color: '#9CA3AF',
    lineHeight: width > 768 ? 24 : 22,
    paddingRight: width > 768 ? 0 : 10,
    ...Platform.select({
      web: {
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
      },
    }),
  },
  connector: {
    position: 'absolute',
    top: 60,
    left: 29,
    width: 2,
    height: 60,
  },
  connectorLine: {
    flex: 1,
    backgroundColor: 'rgba(14, 165, 233, 0.2)',
  },
  ctaContainer: {
    alignItems: 'center',
    marginTop: 60,
    paddingTop: 40,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
  ctaText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 24 : 20,
    fontWeight: '700',
    color: '#F3F4F6',
    marginBottom: 12,
    textAlign: 'center',
  },
  ctaSubtext: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 16 : 14,
    color: '#F59E0B',
    textAlign: 'center',
  },
});

export default HowItWorksSection;