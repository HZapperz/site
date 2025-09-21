import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  Animated
} from 'react-native';

const OfferingsShowcase = ({ selectedPath = 'enterprise', compact = false }) => {
  const { width } = Dimensions.get('window');
  const isTablet = width > 768;
  const isModernPhone = width >= 375 && width <= 430; // Modern iPhone sizes
  
  const enterpriseOfferings = [
    {
      icon: '🎓',
      title: 'AI Training',
      shortDesc: 'Team workshops on ChatGPT & Claude',
      fullDesc: 'Hands-on training for your team on AI tools that actually matter'
    },
    {
      icon: '⚡',
      title: 'Workflow Automation',
      shortDesc: 'AI-powered process optimization',
      fullDesc: 'Multiply productivity without disrupting operations'
    },
    {
      icon: '🛠️',
      title: 'Custom Solutions',
      shortDesc: 'Tailored AI for your needs',
      fullDesc: 'When off-the-shelf isn\'t enough, I build custom'
    },
    {
      icon: '📈',
      title: 'Best Practices',
      shortDesc: 'Avoid common AI pitfalls',
      fullDesc: 'Learn what works and what doesn\'t'
    }
  ];

  const startupOfferings = [
    {
      icon: '💰',
      title: 'Affordable MVPs',
      shortDesc: 'Enterprise quality, startup price',
      fullDesc: 'Fraction of agency costs without sacrificing quality'
    },
    {
      icon: '🎯',
      title: 'VC-Ready Products',
      shortDesc: 'Built to get funded',
      fullDesc: 'I know what investors look for'
    },
    {
      icon: '⚡',
      title: 'Rapid Development',
      shortDesc: 'Ship in weeks, not months',
      fullDesc: 'Leveraging AI to build faster'
    },
    {
      icon: '🏆',
      title: 'Revenue Focus',
      shortDesc: 'Products that make money',
      fullDesc: 'Not just features - real business value'
    }
  ];

  const offerings = selectedPath === 'enterprise' ? enterpriseOfferings : startupOfferings;
  const styles = getStyles(width, isTablet, isModernPhone, compact);

  return (
    <View style={styles.container}>
      {!compact && (
        <Text style={styles.tagline}>
          {selectedPath === 'enterprise' 
            ? 'Your Competition is Using AI. You Should Too.'
            : 'From Idea to Funded MVP - At Startup Prices'}
        </Text>
      )}
      
      <View style={styles.offeringsGrid}>
        {offerings.map((offering, index) => (
          <Animated.View 
            key={index} 
            style={[
              styles.offeringCard,
              selectedPath === 'enterprise' ? styles.enterpriseCard : styles.startupCard
            ]}
          >
            <Text style={styles.offeringIcon}>{offering.icon}</Text>
            <View style={styles.offeringContent}>
              <Text style={[
                styles.offeringTitle,
                selectedPath === 'enterprise' ? styles.enterpriseText : styles.startupText
              ]}>
                {offering.title}
              </Text>
              <Text style={styles.offeringDesc}>
                {compact ? offering.shortDesc : offering.fullDesc}
              </Text>
            </View>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const getStyles = (width, isTablet, isModernPhone, compact) => StyleSheet.create({
  container: {
    paddingVertical: compact ? 20 : 40,
    paddingHorizontal: isTablet ? 40 : 20,
  },
  tagline: {
    fontFamily: Platform.OS === 'web' ? "'Orbitron', sans-serif" : 'sans-serif',
    fontSize: isTablet ? 24 : 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '700',
  },
  offeringsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: compact ? 12 : 16,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  offeringCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: compact ? (isModernPhone ? 14 : 12) : 16,
    borderRadius: 12,
    borderWidth: 1,
    width: isTablet ? 280 : isModernPhone ? '48%' : '100%',
    maxWidth: isTablet ? 280 : '100%',
    minHeight: isModernPhone ? 80 : 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    ...Platform.select({
      web: {
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        ':hover': {
          transform: 'translateY(-2px)',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
        },
      },
    }),
  },
  enterpriseCard: {
    borderColor: 'rgba(74, 144, 226, 0.5)',
    backgroundColor: 'rgba(74, 144, 226, 0.05)',
  },
  startupCard: {
    borderColor: 'rgba(255, 69, 0, 0.5)',
    backgroundColor: 'rgba(255, 69, 0, 0.05)',
  },
  offeringIcon: {
    fontSize: compact ? 24 : 32,
    marginRight: 12,
  },
  offeringContent: {
    flex: 1,
  },
  offeringTitle: {
    fontFamily: Platform.OS === 'web' ? "'Press Start 2P', monospace" : 'monospace',
    fontSize: compact ? 10 : 11,
    marginBottom: 4,
    fontWeight: '700',
  },
  enterpriseText: {
    color: '#4A90E2',
  },
  startupText: {
    color: '#FFA500',
  },
  offeringDesc: {
    fontFamily: Platform.OS === 'web' ? "'Orbitron', sans-serif" : 'sans-serif',
    fontSize: compact ? 11 : 12,
    color: '#CCCCCC',
    lineHeight: compact ? 16 : 18,
  },
});

export default OfferingsShowcase;