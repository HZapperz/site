import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';

const { width } = Dimensions.get('window');

const SpeedComparisonSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.sectionLabel}>AI-NATIVE DEVELOPMENT</Text>

        <Text style={styles.headline}>
          You No Longer Wait{' '}
          <Text style={styles.headlineAccent}>6-12 Months</Text>{' '}
          for Complex Software
        </Text>

        <Text style={styles.subheadline}>
          My team is AI-native. We think and build differently.
          Everyone at my company leverages AI to work at 10x speed.
        </Text>

        {/* Timeline Comparison */}
        <View style={styles.timelineSection}>
          <View style={styles.timelineCard}>
            <Text style={styles.cardLabel}>TRADITIONAL AGENCIES</Text>
            <View style={styles.timelineBar}>
              <View style={[styles.timelineFill, styles.traditionalFill]} />
              <Text style={styles.timelineText}>6-12 MONTHS</Text>
            </View>
            <View style={styles.cardDetails}>
              <Text style={styles.detailItem}>• $75,000 - $150,000</Text>
              <Text style={styles.detailItem}>• Waterfall development</Text>
              <Text style={styles.detailItem}>• Bloated timelines</Text>
              <Text style={styles.detailItem}>• Bill by the hour</Text>
            </View>
          </View>

          <View style={[styles.timelineCard, styles.highlightCard]}>
            <Text style={[styles.cardLabel, styles.highlightLabel]}>MY APPROACH</Text>
            <View style={styles.timelineBar}>
              <View style={[styles.timelineFill, styles.myFill]} />
              <Text style={[styles.timelineText, styles.highlightText]}>2-12 WEEKS</Text>
            </View>
            <View style={styles.cardDetails}>
              <Text style={[styles.detailItem, styles.highlightDetail]}>• $5,000 - $50,000</Text>
              <Text style={[styles.detailItem, styles.highlightDetail]}>• AI-native development</Text>
              <Text style={[styles.detailItem, styles.highlightDetail]}>• Rapid iteration</Text>
              <Text style={[styles.detailItem, styles.highlightDetail]}>• Equity partnership</Text>
            </View>
          </View>
        </View>

        {/* Speed Breakdown */}
        <View style={styles.speedGrid}>
          <View style={styles.speedItem}>
            <Text style={styles.speedTime}>2 weeks</Text>
            <Text style={styles.speedLabel}>Simple POC</Text>
            <Text style={styles.speedDesc}>Working prototype to validate concept</Text>
          </View>

          <View style={styles.speedItem}>
            <Text style={styles.speedTime}>3 months</Text>
            <Text style={styles.speedLabel}>Revenue MVP</Text>
            <Text style={styles.speedDesc}>Maximum for complex, revenue-generating product</Text>
          </View>

          <View style={styles.speedItem}>
            <Text style={styles.speedTime}>10x</Text>
            <Text style={styles.speedLabel}>Faster with AI</Text>
            <Text style={styles.speedDesc}>Same quality, fraction of the time</Text>
          </View>
        </View>

        {/* The Secret */}
        <View style={styles.secretBox}>
          <Text style={styles.secretTitle}>The Difference?</Text>
          <Text style={styles.secretText}>
            Aligned incentives and modern development. Traditional agencies profit from long timelines.
            I profit from your success. They use outdated methods. I use AI to build at lightspeed.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    paddingVertical: 100,
    paddingHorizontal: width > 768 ? 40 : 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  content: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  sectionLabel: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 12,
    fontWeight: '700',
    color: '#0EA5E9',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 24,
  },
  headline: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 48 : 32,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: width > 768 ? 56 : 40,
  },
  headlineAccent: {
    color: '#EF4444',
    textDecorationLine: 'line-through',
    textDecorationColor: '#EF4444',
  },
  subheadline: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 20 : 17,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 60,
    lineHeight: width > 768 ? 32 : 28,
    maxWidth: 700,
    alignSelf: 'center',
  },
  timelineSection: {
    gap: 32,
    marginBottom: 80,
  },
  timelineCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 20,
    padding: width > 768 ? 40 : 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 24,
  },
  highlightCard: {
    backgroundColor: 'rgba(14, 165, 233, 0.03)',
    borderColor: 'rgba(14, 165, 233, 0.2)',
  },
  cardLabel: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: 2,
    marginBottom: 20,
  },
  highlightLabel: {
    color: '#0EA5E9',
  },
  timelineBar: {
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 30,
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 28,
    justifyContent: 'center',
  },
  timelineFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 30,
  },
  traditionalFill: {
    width: '100%',
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  myFill: {
    width: '20%',
    backgroundColor: 'rgba(14, 165, 233, 0.4)',
  },
  timelineText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 24 : 20,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    zIndex: 1,
  },
  highlightText: {
    color: '#0EA5E9',
  },
  cardDetails: {
    gap: 12,
  },
  detailItem: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 16 : 14,
    color: 'rgba(255, 255, 255, 0.4)',
    lineHeight: 24,
  },
  highlightDetail: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  speedGrid: {
    flexDirection: width > 768 ? 'row' : 'column',
    gap: 32,
    marginBottom: 60,
    justifyContent: 'center',
  },
  speedItem: {
    flex: width > 768 ? 1 : undefined,
    alignItems: 'center',
    maxWidth: 300,
  },
  speedTime: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 48 : 36,
    fontWeight: '900',
    color: '#10B981',
    marginBottom: 12,
  },
  speedLabel: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  speedDesc: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    lineHeight: 20,
  },
  secretBox: {
    backgroundColor: 'rgba(139, 92, 246, 0.03)',
    borderRadius: 20,
    padding: width > 768 ? 48 : 32,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    textAlign: 'center',
  },
  secretTitle: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 28 : 24,
    fontWeight: '800',
    color: '#8B5CF6',
    marginBottom: 16,
    textAlign: 'center',
  },
  secretText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 18 : 16,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: width > 768 ? 30 : 26,
    textAlign: 'center',
  },
});

export default SpeedComparisonSection;