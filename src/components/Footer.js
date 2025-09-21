import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';

const { width } = Dimensions.get('window');

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.brandSection}>
          <Text style={styles.logo}>ZAPP STUDIOS</Text>
          <Text style={styles.tagline}>From Idea to Funded MVP in Weeks</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.bottomSection}>
          <Text style={styles.copyright}>
            © {currentYear} Zapp Studios. All Rights Reserved.
          </Text>
          
          <Text style={styles.builtWith}>
            I only build ventures I'd invest in
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A0B0F',
    paddingVertical: 60,
    paddingHorizontal: width > 768 ? 40 : 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
  content: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 24 : 20,
    color: '#F3F4F6',
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  tagline: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 14,
    color: '#0EA5E9',
    fontWeight: '500',
  },
  divider: {
    width: 80,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    marginVertical: 30,
  },
  bottomSection: {
    alignItems: 'center',
  },
  copyright: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 12,
    textAlign: 'center',
  },
  builtWith: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 12,
    color: '#F59E0B',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default Footer;