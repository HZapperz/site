import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';

const { width } = Dimensions.get('window');

const ServiceGrid = ({ services, variant = 'primary' }) => {
  const styles = getStyles(width, variant);

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {services.map((service, index) => (
          <View key={index} style={styles.serviceCard}>
            <View style={styles.cardInner}>
              <View style={styles.iconContainer}>
                <Text style={styles.serviceIcon}>{service.icon}</Text>
              </View>
              <View style={styles.textContent}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <View style={styles.divider} />
                <Text style={styles.serviceDescription}>{service.description}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const getStyles = (screenWidth, variant) => StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: screenWidth > 768 ? 24 : 16,
  },
  serviceCard: {
    backgroundColor: '#1A1A21',
    borderRadius: 16,
    width: screenWidth > 1024 ? 'calc(50% - 12px)' : screenWidth > 768 ? 'calc(50% - 12px)' : screenWidth > 480 ? '100%' : '100%',
    maxWidth: screenWidth > 1024 ? 580 : screenWidth > 768 ? 480 : '100%',
    minHeight: screenWidth > 768 ? 160 : 140,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.08)',
    position: 'relative',
    overflow: 'hidden',
    ...Platform.select({
      web: {
        background: 'linear-gradient(145deg, #1A1A21 0%, #252530 100%)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'default',
        ':hover': {
          borderColor: 'rgba(20, 184, 166, 0.4)',
          transform: 'translateY(-6px) scale(1.02)',
          boxShadow: '0 12px 32px rgba(20, 184, 166, 0.15), inset 0 1px 0 rgba(20, 184, 166, 0.1)',
        },
      },
    }),
  },
  cardInner: {
    padding: screenWidth > 768 ? 32 : 28,
    position: 'relative',
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: screenWidth > 768 ? 24 : 20,
  },
  iconContainer: {
    width: screenWidth > 768 ? 64 : 56,
    height: screenWidth > 768 ? 64 : 56,
    borderRadius: 12,
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.12)',
    flexShrink: 0,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 8px rgba(99, 102, 241, 0.1)',
      },
    }),
  },
  serviceIcon: {
    fontSize: screenWidth > 768 ? 32 : 28,
  },
  textContent: {
    flex: 1,
    paddingTop: screenWidth > 768 ? 4 : 2,
  },
  serviceTitle: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: screenWidth > 768 ? 20 : 18,
    fontWeight: '700',
    color: '#F3F4F6',
    marginBottom: 12,
    lineHeight: screenWidth > 768 ? 26 : 24,
    letterSpacing: -0.3,
  },
  divider: {
    width: 40,
    height: 3,
    backgroundColor: '#14B8A6',
    marginBottom: 12,
    opacity: 0.7,
    borderRadius: 2,
  },
  serviceDescription: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: screenWidth > 768 ? 15 : 14,
    color: '#9CA3AF',
    lineHeight: screenWidth > 768 ? 22 : 20,
    letterSpacing: 0.2,
  },
});

export default ServiceGrid;