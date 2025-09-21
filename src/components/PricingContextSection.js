import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';

const { width } = Dimensions.get('window');

const PricingContextSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>The Truth About Pricing</Text>

        <Text style={styles.mainText}>
          Premium work demands premium pricing - but I work with founders at every stage.
        </Text>

        <Text style={styles.explanation}>
          My rates reflect the value delivered: weeks instead of months, validation before development, and ongoing partnership through exit. Every engagement is different. Some founders have capital, others have conviction. We'll structure a deal that works.
        </Text>

        <View style={styles.comparisonBox}>
          <Text style={styles.comparisonTitle}>
            Traditional agencies quote $75,000-150,000 and take 6+ months.
          </Text>
          <Text style={styles.comparisonText}>
            We deliver better, faster, for a fraction of the cost - because AI-native development and aligned incentives change everything.
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>10x</Text>
            <Text style={styles.statLabel}>Faster with AI</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>50%</Text>
            <Text style={styles.statLabel}>Less cost</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>100%</Text>
            <Text style={styles.statLabel}>Aligned incentives</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141520',
    paddingVertical: 60,
    paddingHorizontal: width > 768 ? 40 : 20,
  },
  content: {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 36 : 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: -1,
  },
  mainText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 22 : 18,
    color: '#F59E0B',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
    lineHeight: width > 768 ? 32 : 28,
  },
  explanation: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 17 : 15,
    color: '#D1D5DB',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: width > 768 ? 28 : 24,
  },
  comparisonBox: {
    backgroundColor: 'rgba(14, 165, 233, 0.05)',
    borderRadius: 12,
    padding: width > 768 ? 32 : 24,
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.2)',
    marginBottom: 40,
  },
  comparisonTitle: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 18 : 16,
    color: '#FFFFFF',
    marginBottom: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  comparisonText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 16 : 14,
    color: '#0EA5E9',
    lineHeight: width > 768 ? 26 : 22,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: width > 768 ? 60 : 30,
    flexWrap: 'wrap',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 42 : 32,
    fontWeight: '800',
    color: '#0EA5E9',
    marginBottom: 8,
  },
  statLabel: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 14 : 12,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default PricingContextSection;