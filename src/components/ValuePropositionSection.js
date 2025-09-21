import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';

const { width } = Dimensions.get('window');

const ValuePropositionSection = () => {
  return (
    <View style={styles.container}>
      {/* Background effects */}
      <View style={styles.backgroundGlow} />

      <View style={styles.content}>
        {/* The $10K Story */}
        <View style={styles.storySection}>
          <Text style={styles.sectionLabel}>THE $10K I WALKED AWAY FROM</Text>

          <View style={styles.storyCard}>
            <Text style={styles.storyHighlight}>
              I recently turned down $10,000 from an aspiring founder.
            </Text>

            <Text style={styles.storyText}>
              An acquaintance approached me with an idea, immediately asking about cost.
              His only blocker was price, so I quoted $10,000. After 30 minutes of discussion,
              I found the exact idea already existed in the market. The product wasn't successful.
              When I asked about differentiators, he had none.
            </Text>

            <Text style={styles.storyText}>
              I could have easily taken his money, developed the app, and watched it fail.
              He was non-technical and wouldn't have known better.
            </Text>

            <View style={styles.principleBox}>
              <Text style={styles.principleText}>
                But I answer to a higher power.
              </Text>
            </View>

            <Text style={styles.storyConclusion}>
              I don't waste anyone's time on ventures that won't succeed.
              I only build ventures I'd personally invest in.
              This means your success is literally my success.
            </Text>
          </View>
        </View>

        {/* The Comparison */}
        <View style={styles.comparisonSection}>
          <View style={styles.comparisonGrid}>
            <View style={styles.comparisonColumn}>
              <Text style={styles.comparisonHeader}>Traditional Agencies</Text>
              <View style={styles.comparisonItems}>
                <View style={styles.comparisonItem}>
                  <Text style={styles.itemIcon}>✗</Text>
                  <Text style={styles.itemText}>Bill by the hour</Text>
                </View>
                <View style={styles.comparisonItem}>
                  <Text style={styles.itemIcon}>✗</Text>
                  <Text style={styles.itemText}>Build anything for money</Text>
                </View>
                <View style={styles.comparisonItem}>
                  <Text style={styles.itemIcon}>✗</Text>
                  <Text style={styles.itemText}>6+ months timeline</Text>
                </View>
                <View style={styles.comparisonItem}>
                  <Text style={styles.itemIcon}>✗</Text>
                  <Text style={styles.itemText}>No skin in the game</Text>
                </View>
                <View style={styles.comparisonItem}>
                  <Text style={styles.itemIcon}>✗</Text>
                  <Text style={styles.itemText}>Profit from long timelines</Text>
                </View>
              </View>
            </View>

            <View style={styles.vsCircle}>
              <Text style={styles.vsText}>VS</Text>
            </View>

            <View style={[styles.comparisonColumn, styles.highlightColumn]}>
              <Text style={styles.comparisonHeader}>My Approach</Text>
              <View style={styles.comparisonItems}>
                <View style={styles.comparisonItem}>
                  <Text style={[styles.itemIcon, styles.checkIcon]}>✓</Text>
                  <Text style={[styles.itemText, styles.highlightText]}>Take equity partnership</Text>
                </View>
                <View style={styles.comparisonItem}>
                  <Text style={[styles.itemIcon, styles.checkIcon]}>✓</Text>
                  <Text style={[styles.itemText, styles.highlightText]}>Only build winners</Text>
                </View>
                <View style={styles.comparisonItem}>
                  <Text style={[styles.itemIcon, styles.checkIcon]}>✓</Text>
                  <Text style={[styles.itemText, styles.highlightText]}>2-12 weeks with AI</Text>
                </View>
                <View style={styles.comparisonItem}>
                  <Text style={[styles.itemIcon, styles.checkIcon]}>✓</Text>
                  <Text style={[styles.itemText, styles.highlightText]}>Success aligned</Text>
                </View>
                <View style={styles.comparisonItem}>
                  <Text style={[styles.itemIcon, styles.checkIcon]}>✓</Text>
                  <Text style={[styles.itemText, styles.highlightText]}>Profit from your exit</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* The Promise */}
        <View style={styles.promiseSection}>
          <Text style={styles.promiseTitle}>
            When you succeed, I succeed. When you fail, I fail.
          </Text>
          <Text style={styles.promiseSubtitle}>
            That's the difference between a vendor and a venture partner.
          </Text>
        </View>
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
    overflow: 'hidden',
  },
  backgroundGlow: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    width: 600,
    height: 600,
    borderRadius: 300,
    backgroundColor: '#F59E0B',
    opacity: 0.02,
    transform: [{ translateX: -300 }, { translateY: -300 }],
    ...Platform.select({
      web: {
        filter: 'blur(150px)',
      },
    }),
  },
  content: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  storySection: {
    marginBottom: 80,
  },
  sectionLabel: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 12,
    fontWeight: '700',
    color: '#F59E0B',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 32,
  },
  storyCard: {
    backgroundColor: 'rgba(245, 158, 11, 0.02)',
    borderRadius: 24,
    padding: width > 768 ? 56 : 32,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.1)',
    ...Platform.select({
      web: {
        backdropFilter: 'blur(20px)',
      },
    }),
  },
  storyHighlight: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 28 : 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 28,
    lineHeight: width > 768 ? 36 : 30,
  },
  storyText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 18 : 16,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: width > 768 ? 30 : 26,
    marginBottom: 20,
  },
  principleBox: {
    backgroundColor: 'rgba(245, 158, 11, 0.05)',
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
    paddingVertical: 20,
    paddingHorizontal: 28,
    marginVertical: 32,
    borderRadius: 8,
  },
  principleText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 24 : 20,
    fontWeight: '700',
    color: '#F59E0B',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  storyConclusion: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 20 : 17,
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: width > 768 ? 32 : 28,
    textAlign: 'center',
  },
  comparisonSection: {
    marginBottom: 80,
  },
  comparisonGrid: {
    flexDirection: width > 768 ? 'row' : 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: width > 768 ? 40 : 32,
    position: 'relative',
  },
  comparisonColumn: {
    flex: width > 768 ? 1 : undefined,
    maxWidth: 400,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 20,
    padding: width > 768 ? 40 : 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  highlightColumn: {
    backgroundColor: 'rgba(14, 165, 233, 0.03)',
    borderColor: 'rgba(14, 165, 233, 0.2)',
    ...Platform.select({
      web: {
        boxShadow: '0 20px 60px rgba(14, 165, 233, 0.1)',
      },
    }),
  },
  comparisonHeader: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 24 : 20,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 32,
  },
  comparisonItems: {
    gap: 20,
  },
  comparisonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemIcon: {
    fontSize: 18,
    color: '#EF4444',
    fontWeight: '700',
  },
  checkIcon: {
    color: '#10B981',
  },
  itemText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 16 : 14,
    color: 'rgba(255, 255, 255, 0.5)',
    flex: 1,
  },
  highlightText: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  vsCircle: {
    position: width > 768 ? 'absolute' : 'relative',
    left: width > 768 ? '50%' : undefined,
    transform: width > 768 ? [{ translateX: -30 }] : undefined,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#000000',
    borderWidth: 2,
    borderColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    ...Platform.select({
      web: {
        boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)',
      },
    }),
  },
  vsText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 18,
    fontWeight: '900',
    color: '#8B5CF6',
  },
  promiseSection: {
    textAlign: 'center',
    paddingTop: 40,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  promiseTitle: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 36 : 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: width > 768 ? 44 : 36,
  },
  promiseSubtitle: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 18 : 16,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
  },
});

export default ValuePropositionSection;