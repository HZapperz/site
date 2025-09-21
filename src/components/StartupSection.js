import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';
import { useNavigate } from 'react-router-dom';

const { width } = Dimensions.get('window');

const StartupSection = () => {
  const navigate = useNavigate();
  
  const handleBookCall = () => {
    navigate('/book');
  };

  const benefits = [
    {
      icon: '💰',
      title: 'Fraction of Agency Costs',
      description: 'Get enterprise-quality development at a price that won\'t kill your runway'
    },
    {
      icon: '🎯',
      title: 'VC-Ready MVPs',
      description: 'I know what investors look for because I\'ve been in the room, on the other side of the table'
    },
    {
      icon: '⚡',
      title: 'Ship in Weeks, Not Months',
      description: 'Leveraging AI tools to build faster without sacrificing quality'
    },
    {
      icon: '🏆',
      title: 'Built to Generate Revenue',
      description: 'Not just features - products that actually make money'
    }
  ];

  const process = [
    { step: '1', text: 'We discuss your idea and market opportunity' },
    { step: '2', text: 'I build a POC/MVP focused on core value prop' },
    { step: '3', text: 'You get a product that validates and sells' },
    { step: '4', text: 'Iterate based on real user feedback' }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>STARTUP MVP DEVELOPMENT</Text>
      <View style={styles.fireBar} />
      
      <Text style={styles.headline}>
        From Idea to Funded MVP - At a Fraction of Agency Costs
      </Text>
      
      <Text style={styles.subheadline}>
        I've been coding since 2018, before AI tools existed. Now I use them to build your MVP faster and cheaper than anyone else.
      </Text>
      
      <View style={styles.benefitsGrid}>
        {benefits.map((benefit, index) => (
          <View key={index} style={styles.benefitCard}>
            <Text style={styles.benefitIcon}>{benefit.icon}</Text>
            <Text style={styles.benefitTitle}>{benefit.title}</Text>
            <Text style={styles.benefitDescription}>{benefit.description}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.processSection}>
        <Text style={styles.processTitle}>Simple Process, Real Results</Text>
        <View style={styles.processSteps}>
          {process.map((item, index) => (
            <View key={index} style={styles.processStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{item.step}</Text>
              </View>
              <Text style={styles.stepText}>{item.text}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.differentiatorSection}>
        <Text style={styles.differentiatorTitle}>Why I'm Different</Text>
        <Text style={styles.differentiatorText}>
          VC background from UT Dallas + technical expertise + business acumen = MVPs that get funded. I don't just code; I build products that solve real problems and generate real revenue.
        </Text>
      </View>
      
      <TouchableOpacity
        style={styles.ctaButton}
        onPress={handleBookCall}
        activeOpacity={0.8}
      >
        <Text style={styles.ctaButtonText}>LET'S BUILD YOUR MVP - BOOK A FREE CALL</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A0A0A',
    paddingVertical: 80,
    paddingHorizontal: width > 768 ? 40 : 20,
    borderTopWidth: 2,
    borderTopColor: '#FF4500',
  },
  sectionTitle: {
    fontFamily: Platform.OS === 'web' ? "'Press Start 2P', monospace" : 'monospace',
    fontSize: width > 768 ? 32 : 18,
    color: '#FF4500',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: width > 768 ? 0 : 10,
  },
  fireBar: {
    height: 4,
    width: 100,
    backgroundColor: '#FF4500',
    alignSelf: 'center',
    marginBottom: 40,
    borderRadius: 2,
  },
  headline: {
    fontFamily: Platform.OS === 'web' ? "'Orbitron', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 28 : 20,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '700',
  },
  subheadline: {
    fontFamily: Platform.OS === 'web' ? "'Orbitron', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 18 : 14,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 50,
    maxWidth: 700,
    alignSelf: 'center',
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 60,
    maxWidth: 1000,
    alignSelf: 'center',
  },
  benefitCard: {
    backgroundColor: 'rgba(255, 69, 0, 0.1)',
    borderWidth: 1,
    borderColor: '#FF4500',
    borderRadius: 12,
    padding: width > 768 ? 25 : 20,
    width: width > 768 ? 450 : '100%',
    maxWidth: 450,
    alignItems: 'center',
  },
  benefitIcon: {
    fontSize: 40,
    marginBottom: 15,
  },
  benefitTitle: {
    fontFamily: Platform.OS === 'web' ? "'Press Start 2P', monospace" : 'monospace',
    fontSize: width > 768 ? 14 : 12,
    color: '#FFA500',
    marginBottom: 10,
    textAlign: 'center',
  },
  benefitDescription: {
    fontFamily: Platform.OS === 'web' ? "'Orbitron', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 14 : 12,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 20,
  },
  processSection: {
    backgroundColor: 'rgba(255, 165, 0, 0.05)',
    borderRadius: 12,
    padding: 30,
    marginBottom: 50,
    maxWidth: 800,
    alignSelf: 'center',
  },
  processTitle: {
    fontFamily: Platform.OS === 'web' ? "'Press Start 2P', monospace" : 'monospace',
    fontSize: width > 768 ? 18 : 14,
    color: '#FFA500',
    marginBottom: 25,
    textAlign: 'center',
  },
  processSteps: {
    gap: 15,
  },
  processStep: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF4500',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontFamily: Platform.OS === 'web' ? "'Press Start 2P', monospace" : 'monospace',
    fontSize: 12,
    color: '#000000',
    fontWeight: '900',
  },
  stepText: {
    fontFamily: Platform.OS === 'web' ? "'Orbitron', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 14 : 12,
    color: '#FFFFFF',
    flex: 1,
  },
  differentiatorSection: {
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
    paddingLeft: 20,
    marginBottom: 50,
    maxWidth: 700,
    alignSelf: 'center',
  },
  differentiatorTitle: {
    fontFamily: Platform.OS === 'web' ? "'Press Start 2P', monospace" : 'monospace',
    fontSize: width > 768 ? 18 : 14,
    color: '#FFD700',
    marginBottom: 15,
  },
  differentiatorText: {
    fontFamily: Platform.OS === 'web' ? "'Orbitron', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 16 : 14,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  ctaButton: {
    backgroundColor: '#FF4500',
    paddingVertical: width > 768 ? 20 : 16,
    paddingHorizontal: width > 768 ? 40 : 25,
    borderRadius: 8,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#FFA500',
    maxWidth: width > 768 ? 'auto' : width * 0.9,
  },
  ctaButtonText: {
    fontFamily: Platform.OS === 'web' ? "'Press Start 2P', monospace" : 'monospace',
    fontSize: width > 768 ? 14 : 10,
    color: '#000000',
    fontWeight: '900',
    textAlign: 'center',
  },
});

export default StartupSection;