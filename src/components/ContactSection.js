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

const ContactSection = () => {
  const navigate = useNavigate();
  
  const handlePress = () => {
    navigate('/book');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Ready to Validate Your Venture?</Text>

      <Text style={styles.sectionSubtitle}>
        I only build what I believe in. Let's see if we're a fit.
      </Text>
      
      <View style={styles.ctaContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handlePress}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Submit Your Venture</Text>
        </TouchableOpacity>
        
        <Text style={styles.responseTime}>
          ⚡ Honest assessment within 24 hours
        </Text>
      </View>
      
      <View style={styles.contactInfo}>
        <Text style={styles.alternativeText}>Or reach out directly:</Text>
        <TouchableOpacity 
          onPress={() => Platform.OS === 'web' && window.open('mailto:hello@zappstudios.com', '_blank')}
          style={styles.emailLink}
        >
          <Text style={styles.emailText}>hello@zappstudios.com</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141520',
    paddingVertical: 100,
    paddingHorizontal: width > 768 ? 40 : 20,
    alignItems: 'center',
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
    fontSize: width > 768 ? 20 : 16,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: 600,
    lineHeight: width > 768 ? 30 : 24,
  },
  ctaContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#0EA5E9',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 16,
    ...Platform.select({
      web: {
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        ':hover': {
          backgroundColor: '#38BDF8',
          transform: 'translateY(-2px)',
          boxShadow: '0 12px 24px rgba(14, 165, 233, 0.4)',
        },
      },
    }),
  },
  primaryButtonText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 18 : 16,
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  responseTime: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 14,
    color: '#0EA5E9',
    marginTop: 8,
  },
  contactInfo: {
    alignItems: 'center',
    paddingTop: 30,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
    width: '100%',
    maxWidth: 400,
  },
  alternativeText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  emailLink: {
    padding: 10,
  },
  emailText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 16,
    color: '#F59E0B',
    textDecorationLine: 'underline',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'color 0.2s ease',
        ':hover': {
          color: '#FBB040',
        },
      },
    }),
  },
});

export default ContactSection;