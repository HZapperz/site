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

const ServicesSection = () => {
  const navigate = useNavigate();

  const handleCTAPress = () => {
    navigate('/book');
  };

  const services = [
    {
      id: 'discovery',
      title: 'Discovery Session',
      price: 'Free',
      duration: '30 minutes',
      description: "30 minutes to see if we're a fit. I'll be radically honest about your idea's potential. If it won't work, I'll tell you why and suggest pivots.",
      features: [
        'Honest assessment of your idea',
        'Market opportunity evaluation',
        'Technical feasibility check',
        'Go/No-go recommendation',
        'Pivot suggestions if needed'
      ],
      cta: 'Book Reality Check',
      highlighted: false,
    },
    {
      id: 'validation',
      title: 'Validation Sprint',
      price: '$5,000',
      duration: '3 weeks',
      description: 'Deep market validation before we build anything. I invest far more time than I bill for during validation.',
      features: [
        'Market sizing via IBISWorld',
        'Competitor analysis & gap identification',
        '20+ customer interviews',
        'Root problem analysis',
        'Detailed validation report',
        'Go/No-Go with pivot options'
      ],
      cta: 'Start Validation',
      highlighted: false,
    },
    {
      id: 'venture',
      title: 'Venture Partnership',
      price: '20-50% Equity',
      duration: 'Equity-Heavy',
      description: 'For idea-stage founders needing full partnership. I become your technical co-founder.',
      features: [
        'Full validation through MVP',
        'Reduced cash rates (negotiable)',
        'Ongoing CTO/advisor role',
        'I retain equity through exit',
        'Work with your budget',
        'Success completely aligned'
      ],
      cta: 'Become Partners',
      highlighted: true,
    },
    {
      id: 'build',
      title: 'Build Track',
      price: '2-5% Equity',
      duration: 'Cash-Heavy',
      description: 'For validated ideas or funded startups. Market rates with small equity component.',
      features: [
        '2-5% equity + market rates',
        '4-12 week sprints',
        'Launch-ready product',
        '3 months post-launch support',
        'Option for ongoing partnership',
        'Built to scale & generate revenue'
      ],
      cta: 'Start Building',
      highlighted: false,
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.sectionLabel}>PARTNERSHIP OPTIONS</Text>

        <Text style={styles.headline}>
          Every Founder Starts{' '}
          <Text style={styles.headlineAccent}>Somewhere</Text>
        </Text>

        <Text style={styles.subheadline}>
          Premium service with premium rates, BUT pricing depends on where you are in your journey.
          More equity means less cash. Your budget and my belief in the idea determine the structure.
        </Text>

        {/* Services Grid */}
        <View style={styles.servicesGrid}>
          {services.map((service) => (
            <View
              key={service.id}
              style={[
                styles.serviceCard,
                service.highlighted && styles.highlightedCard
              ]}
            >
              {service.highlighted && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>MOST COMMON</Text>
                </View>
              )}

              <View style={styles.cardHeader}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <View style={styles.pricingInfo}>
                  <Text style={[
                    styles.price,
                    service.highlighted && styles.highlightedPrice
                  ]}>
                    {service.price}
                  </Text>
                  <Text style={styles.duration}>{service.duration}</Text>
                </View>
              </View>

              <Text style={styles.description}>{service.description}</Text>

              <View style={styles.featuresContainer}>
                {service.features.map((feature, idx) => (
                  <View key={idx} style={styles.featureItem}>
                    <View style={styles.featureBullet} />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={[
                  styles.ctaButton,
                  service.highlighted && styles.highlightedButton
                ]}
                onPress={handleCTAPress}
                activeOpacity={0.9}
              >
                <Text style={[
                  styles.ctaButtonText,
                  service.highlighted && styles.highlightedButtonText
                ]}>
                  {service.cta}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Deal Structure Note */}
        <View style={styles.noteSection}>
          <Text style={styles.noteTitle}>Creative Deal Structuring</Text>
          <Text style={styles.noteText}>
            Equity contingent on milestones. Work with founders to see what they can offer.
            We charge premium prices, but they are a function of how much work is required.
            We will work with your budget.
          </Text>
        </View>

        <Text style={styles.disclaimer}>
          * Equity partnerships subject to mutual agreement and due diligence
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#050505',
    paddingVertical: 100,
    paddingHorizontal: width > 768 ? 40 : 20,
    position: 'relative',
  },
  content: {
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
  },
  sectionLabel: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 12,
    fontWeight: '700',
    color: '#8B5CF6',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 24,
  },
  headline: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 56 : 36,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: width > 768 ? 64 : 44,
  },
  headlineAccent: {
    ...Platform.select({
      web: {
        background: 'linear-gradient(135deg, #0EA5E9 0%, #8B5CF6 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
      default: {
        color: '#0EA5E9',
      },
    }),
  },
  subheadline: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 18 : 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 60,
    lineHeight: width > 768 ? 30 : 26,
    maxWidth: 800,
    alignSelf: 'center',
  },
  servicesGrid: {
    display: 'grid',
    ...Platform.select({
      web: {
        gridTemplateColumns: width > 1200 ? 'repeat(4, 1fr)' : width > 768 ? 'repeat(2, 1fr)' : '1fr',
      },
    }),
    gap: 24,
    marginBottom: 60,
  },
  serviceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 24,
    padding: width > 768 ? 32 : 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    ...Platform.select({
      web: {
        backdropFilter: 'blur(20px)',
        transition: 'all 0.3s ease',
        ':hover': {
          transform: 'translateY(-8px)',
          borderColor: 'rgba(14, 165, 233, 0.3)',
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
        },
      },
    }),
  },
  highlightedCard: {
    backgroundColor: 'rgba(139, 92, 246, 0.03)',
    borderColor: 'rgba(139, 92, 246, 0.2)',
    ...Platform.select({
      web: {
        boxShadow: '0 20px 60px rgba(139, 92, 246, 0.15)',
      },
    }),
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  popularText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  cardHeader: {
    marginBottom: 20,
  },
  serviceTitle: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 24 : 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  pricingInfo: {
    flexDirection: 'column',
    gap: 4,
  },
  price: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 28 : 24,
    fontWeight: '900',
    color: '#0EA5E9',
  },
  highlightedPrice: {
    color: '#8B5CF6',
  },
  duration: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.4)',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  description: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 15 : 14,
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: 24,
    marginBottom: 24,
    flex: 1,
  },
  featuresContainer: {
    marginBottom: 28,
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  featureBullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#0EA5E9',
    marginTop: 8,
  },
  featureText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 14 : 13,
    color: 'rgba(255, 255, 255, 0.5)',
    flex: 1,
    lineHeight: 20,
  },
  ctaButton: {
    backgroundColor: 'transparent',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    marginTop: 'auto',
    ...Platform.select({
      web: {
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        ':hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderColor: 'rgba(14, 165, 233, 0.5)',
        },
      },
    }),
  },
  highlightedButton: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  ctaButtonText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 15 : 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '700',
  },
  highlightedButtonText: {
    color: '#FFFFFF',
  },
  noteSection: {
    backgroundColor: 'rgba(245, 158, 11, 0.02)',
    borderRadius: 20,
    padding: width > 768 ? 40 : 28,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.1)',
    marginBottom: 40,
    textAlign: 'center',
  },
  noteTitle: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 24 : 20,
    fontWeight: '800',
    color: '#F59E0B',
    marginBottom: 12,
    textAlign: 'center',
  },
  noteText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 16 : 14,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: width > 768 ? 28 : 24,
    textAlign: 'center',
  },
  disclaimer: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.3)',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default ServicesSection;