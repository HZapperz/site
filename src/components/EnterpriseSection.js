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

const EnterpriseSection = () => {
  const navigate = useNavigate();
  
  const handleBookCall = () => {
    navigate('/book');
  };

  const offerings = [
    {
      icon: '🎓',
      title: 'AI Training Workshops',
      description: 'Hands-on training for your team on ChatGPT, Claude, and other AI tools that actually matter'
    },
    {
      icon: '⚡',
      title: 'Workflow Automation',
      description: 'Implement AI into your existing processes to multiply productivity without disrupting operations'
    },
    {
      icon: '🛠️',
      title: 'Custom AI Solutions',
      description: 'When off-the-shelf isn\'t enough, I build tailored AI solutions for your specific needs'
    },
    {
      icon: '📈',
      title: 'Best Practices Implementation',
      description: 'Learn what works, what doesn\'t, and how to avoid common AI adoption pitfalls'
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>ENTERPRISE AI SOLUTIONS</Text>
      <View style={styles.fireBar} />
      
      <Text style={styles.headline}>
        Your Competition is Using AI. You Should Too.
      </Text>
      
      <Text style={styles.subheadline}>
        It's riskier NOT to use AI at this point. I'll show you how to do it right.
      </Text>
      
      <View style={styles.offeringsGrid}>
        {offerings.map((offering, index) => (
          <View key={index} style={styles.offeringCard}>
            <Text style={styles.offeringIcon}>{offering.icon}</Text>
            <Text style={styles.offeringTitle}>{offering.title}</Text>
            <Text style={styles.offeringDescription}>{offering.description}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.valueSection}>
        <Text style={styles.valueTitle}>The Truth About AI in Business</Text>
        <Text style={styles.valueText}>
          Most companies don't need complex custom AI solutions. They need to know how to use existing AI tools properly. I'll teach your team the practical skills that deliver immediate ROI. And if you do need custom solutions? I build those too.
        </Text>
      </View>
      
      <TouchableOpacity
        style={styles.ctaButton}
        onPress={handleBookCall}
        activeOpacity={0.8}
      >
        <Text style={styles.ctaButtonText}>BOOK YOUR AI STRATEGY SESSION</Text>
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
    borderTopColor: '#4A90E2',
  },
  sectionTitle: {
    fontFamily: Platform.OS === 'web' ? "'Press Start 2P', monospace" : 'monospace',
    fontSize: width > 768 ? 32 : 18,
    color: '#4A90E2',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: width > 768 ? 0 : 10,
  },
  fireBar: {
    height: 4,
    width: 100,
    backgroundColor: '#4A90E2',
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
    maxWidth: 600,
    alignSelf: 'center',
  },
  offeringsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 60,
    maxWidth: 1000,
    alignSelf: 'center',
  },
  offeringCard: {
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    borderWidth: 1,
    borderColor: '#4A90E2',
    borderRadius: 12,
    padding: width > 768 ? 25 : 20,
    width: width > 768 ? 450 : '100%',
    maxWidth: 450,
    alignItems: 'center',
  },
  offeringIcon: {
    fontSize: 40,
    marginBottom: 15,
  },
  offeringTitle: {
    fontFamily: Platform.OS === 'web' ? "'Press Start 2P', monospace" : 'monospace',
    fontSize: width > 768 ? 14 : 12,
    color: '#4A90E2',
    marginBottom: 10,
    textAlign: 'center',
  },
  offeringDescription: {
    fontFamily: Platform.OS === 'web' ? "'Orbitron', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 14 : 12,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 20,
  },
  valueSection: {
    backgroundColor: 'rgba(255, 69, 0, 0.05)',
    borderLeftWidth: 4,
    borderLeftColor: '#FF4500',
    padding: 30,
    marginBottom: 50,
    maxWidth: 800,
    alignSelf: 'center',
  },
  valueTitle: {
    fontFamily: Platform.OS === 'web' ? "'Press Start 2P', monospace" : 'monospace',
    fontSize: width > 768 ? 18 : 14,
    color: '#FF4500',
    marginBottom: 15,
  },
  valueText: {
    fontFamily: Platform.OS === 'web' ? "'Orbitron', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 16 : 14,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  ctaButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: width > 768 ? 20 : 16,
    paddingHorizontal: width > 768 ? 40 : 25,
    borderRadius: 8,
    alignSelf: 'center',
    maxWidth: width > 768 ? 'auto' : width * 0.9,
  },
  ctaButtonText: {
    fontFamily: Platform.OS === 'web' ? "'Press Start 2P', monospace" : 'monospace',
    fontSize: width > 768 ? 14 : 12,
    color: '#000000',
    fontWeight: '900',
  },
});

export default EnterpriseSection;