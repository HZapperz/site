import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions,
  Platform
} from 'react-native';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const { width } = Dimensions.get('window');

const EnterprisePage = () => {
  const navigate = useNavigate();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  useEffect(() => {
    // Scroll to top on mount
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: false });
    }
    
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleBookCall = () => {
    navigate('/book');
  };

  const handleBackToStartup = () => {
    navigate('/');
  };

  const services = [
    {
      icon: '🎓',
      title: 'AI Team Training',
      description: 'Hands-on workshops for ChatGPT, Claude, and other essential AI tools. Your team learns practical applications they can use immediately.',
      benefits: ['Custom curriculum for your industry', 'Hands-on exercises', 'Best practices guide']
    },
    {
      icon: '⚙️',
      title: 'Workflow Automation',
      description: 'Identify and automate repetitive tasks with AI. Multiply productivity without disrupting your existing operations.',
      benefits: ['Process audit & mapping', 'Custom automation setup', 'Team training included']
    },
    {
      icon: '🛠️',
      title: 'Custom AI Solutions',
      description: 'When off-the-shelf tools aren\'t enough, I build tailored AI solutions that integrate seamlessly with your systems.',
      benefits: ['API integrations', 'Custom chatbots', 'Data analysis tools']
    },
    {
      icon: '📊',
      title: 'Strategic Consulting',
      description: 'Navigate the AI landscape with confidence. Get expert guidance on tool selection, implementation strategy, and ROI measurement.',
      benefits: ['Technology roadmap', 'Vendor evaluation', 'Success metrics']
    }
  ];

  const processSteps = [
    { number: '01', title: 'Discovery', description: 'We analyze your current workflows and identify AI opportunities' },
    { number: '02', title: 'Strategy', description: 'Develop a practical implementation plan with clear ROI targets' },
    { number: '03', title: 'Implementation', description: 'Deploy AI solutions with minimal disruption to operations' },
    { number: '04', title: 'Training', description: 'Ensure your team is confident and productive with new tools' }
  ];

  const styles = getStyles(width);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <NavigationBar isEnterprise={true} />
      
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <TouchableOpacity onPress={handleBackToStartup} style={styles.backLink}>
            <Text style={styles.backLinkText}>← Startup Solutions</Text>
          </TouchableOpacity>
          
          <Text style={styles.heroHeadline}>
            AI Integration for Established Businesses
          </Text>
          <Text style={styles.heroSubheadline}>
            Transform your operations with practical AI implementation that delivers immediate ROI
          </Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>7+</Text>
              <Text style={styles.statLabel}>Years Experience</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>AI</Text>
              <Text style={styles.statLabel}>Expert Implementation</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>Fast</Text>
              <Text style={styles.statLabel}>Deployment</Text>
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.heroCTA}
            onPress={handleBookCall}
            activeOpacity={0.8}
          >
            <Text style={styles.heroCTAText}>Book AI Strategy Call</Text>
          </TouchableOpacity>
        </View>

        {/* Services Section */}
        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>How I Help Enterprises</Text>
          <View style={styles.servicesGrid}>
            {services.map((service, index) => (
              <View key={index} style={styles.serviceCard}>
                <Text style={styles.serviceIcon}>{service.icon}</Text>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
                <View style={styles.benefitsList}>
                  {service.benefits.map((benefit, idx) => (
                    <View key={idx} style={styles.benefitItem}>
                      <Text style={styles.benefitBullet}>•</Text>
                      <Text style={styles.benefitText}>{benefit}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Process Section */}
        <View style={styles.processSection}>
          <Text style={styles.sectionTitle}>The Implementation Process</Text>
          <View style={styles.processSteps}>
            {processSteps.map((step, index) => (
              <View key={index} style={styles.processStep}>
                <View style={styles.stepNumberContainer}>
                  <Text style={styles.stepNumber}>{step.number}</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Why Choose Section */}
        <View style={styles.whySection}>
          <Text style={styles.sectionTitle}>Why Work With Me</Text>
          <View style={styles.whyGrid}>
            <View style={styles.whyItem}>
              <Text style={styles.whyTitle}>Practical Focus</Text>
              <Text style={styles.whyText}>
                No buzzwords or hype. Just practical AI solutions that your team can actually use.
              </Text>
            </View>
            <View style={styles.whyItem}>
              <Text style={styles.whyTitle}>Industry Experience</Text>
              <Text style={styles.whyText}>
                I've implemented AI across finance, healthcare, retail, and manufacturing sectors.
              </Text>
            </View>
            <View style={styles.whyItem}>
              <Text style={styles.whyTitle}>Full-Stack Expertise</Text>
              <Text style={styles.whyText}>
                From strategy to implementation to training - I handle the entire journey.
              </Text>
            </View>
            <View style={styles.whyItem}>
              <Text style={styles.whyTitle}>ROI Guaranteed</Text>
              <Text style={styles.whyText}>
                Clear metrics and measurable outcomes. If it doesn't deliver value, we pivot.
              </Text>
            </View>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaHeadline}>
            Ready to Lead Your Industry in AI Adoption?
          </Text>
          <Text style={styles.ctaSubtext}>
            Let's discuss how AI can transform your specific business challenges
          </Text>
          <TouchableOpacity
            style={styles.finalCTA}
            onPress={handleBookCall}
            activeOpacity={0.8}
          >
            <Text style={styles.finalCTAText}>Schedule Your Strategy Call</Text>
          </TouchableOpacity>
        </View>

        <Footer />
      </ScrollView>
    </Animated.View>
  );
};

const getStyles = (screenWidth) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F14',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroSection: {
    paddingTop: 120,
    paddingBottom: 80,
    paddingHorizontal: screenWidth > 768 ? 40 : 20,
    alignItems: 'center',
    background: Platform.OS === 'web' ? 
      'linear-gradient(135deg, #0F0F14 0%, #1A1A21 50%, #252530 100%)' : '#1A1A21',
    backgroundColor: '#1A1A21',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(99, 102, 241, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  backLink: {
    alignSelf: 'flex-start',
    marginBottom: 30,
  },
  backLinkText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 14,
    color: '#14B8A6',
    fontWeight: '500',
  },
  heroHeadline: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: screenWidth > 768 ? 48 : 32,
    fontWeight: '800',
    color: '#F3F4F6',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: screenWidth > 768 ? 56 : 40,
    letterSpacing: -1,
    ...Platform.select({
      web: {
        background: 'linear-gradient(135deg, #F3F4F6 0%, #14B8A6 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
    }),
  },
  heroSubheadline: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: screenWidth > 768 ? 20 : 16,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: 700,
    lineHeight: screenWidth > 768 ? 30 : 24,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 40,
    gap: 30,
  },
  statItem: {
    alignItems: 'center',
    minWidth: 120,
  },
  statNumber: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 36,
    fontWeight: '800',
    color: '#14B8A6',
    marginBottom: 5,
    ...Platform.select({
      web: {
        textShadow: '0 0 20px rgba(20, 184, 166, 0.5)',
      },
    }),
  },
  statLabel: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  heroCTA: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    ...Platform.select({
      web: {
        transition: 'all 0.2s ease',
        boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)',
        ':hover': {
          backgroundColor: '#34D399',
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 30px rgba(16, 185, 129, 0.4)',
        },
      },
    }),
  },
  heroCTAText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 16,
    fontWeight: '700',
    color: '#0F0F14',
  },
  servicesSection: {
    paddingVertical: 80,
    paddingHorizontal: screenWidth > 768 ? 40 : 20,
    backgroundColor: '#0F0F14',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
  sectionTitle: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: screenWidth > 768 ? 36 : 28,
    fontWeight: '800',
    color: '#F3F4F6',
    textAlign: 'center',
    marginBottom: 50,
    letterSpacing: -0.5,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  serviceCard: {
    backgroundColor: '#1A1A21',
    borderRadius: 16,
    padding: 30,
    width: screenWidth > 768 ? 'calc(50% - 10px)' : '100%',
    maxWidth: screenWidth > 768 ? 580 : '100%',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.1)',
    position: 'relative',
    overflow: 'hidden',
    ...Platform.select({
      web: {
        background: 'linear-gradient(135deg, #1A1A21 0%, #252530 100%)',
        transition: 'all 0.3s ease',
        ':hover': {
          borderColor: '#6366F1',
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 30px rgba(99, 102, 241, 0.2)',
        },
      },
    }),
  },
  serviceIcon: {
    fontSize: 40,
    marginBottom: 20,
  },
  serviceTitle: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 24,
    fontWeight: '700',
    color: '#6366F1',
    marginBottom: 15,
  },
  serviceDescription: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 16,
    color: '#9CA3AF',
    lineHeight: 24,
    marginBottom: 20,
  },
  benefitsList: {
    marginTop: 10,
  },
  benefitItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  benefitBullet: {
    color: '#14B8A6',
    marginRight: 10,
    fontSize: 16,
  },
  benefitText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 14,
    color: '#9CA3AF',
    flex: 1,
  },
  processSection: {
    paddingVertical: 80,
    paddingHorizontal: screenWidth > 768 ? 40 : 20,
    backgroundColor: '#1A1A21',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
  processSteps: {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  processStep: {
    flexDirection: 'row',
    marginBottom: 40,
    alignItems: 'flex-start',
  },
  stepNumberContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderWidth: 2,
    borderColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    ...Platform.select({
      web: {
        boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
      },
    }),
  },
  stepNumber: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 18,
    fontWeight: '800',
    color: '#6366F1',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 20,
    fontWeight: '700',
    color: '#F3F4F6',
    marginBottom: 8,
  },
  stepDescription: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 16,
    color: '#9CA3AF',
    lineHeight: 24,
  },
  whySection: {
    paddingVertical: 80,
    paddingHorizontal: screenWidth > 768 ? 40 : 20,
    backgroundColor: '#0F0F14',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
  whyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 30,
    maxWidth: 1000,
    alignSelf: 'center',
    width: '100%',
  },
  whyItem: {
    width: screenWidth > 768 ? 'calc(50% - 15px)' : '100%',
    maxWidth: 485,
  },
  whyTitle: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 20,
    fontWeight: '700',
    color: '#14B8A6',
    marginBottom: 10,
  },
  whyText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 16,
    color: '#9CA3AF',
    lineHeight: 24,
  },
  ctaSection: {
    paddingVertical: 100,
    paddingHorizontal: screenWidth > 768 ? 40 : 20,
    background: Platform.OS === 'web' ? 
      'linear-gradient(135deg, #1A1A21 0%, #252530 100%)' : '#1A1A21',
    backgroundColor: '#1A1A21',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(99, 102, 241, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  ctaHeadline: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: screenWidth > 768 ? 36 : 28,
    fontWeight: '800',
    color: '#F3F4F6',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  ctaSubtext: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 18,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 40,
  },
  finalCTA: {
    backgroundColor: '#10B981',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 8,
    ...Platform.select({
      web: {
        transition: 'all 0.2s ease',
        boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)',
        ':hover': {
          backgroundColor: '#34D399',
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 30px rgba(16, 185, 129, 0.4)',
        },
      },
    }),
  },
  finalCTAText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 18,
    fontWeight: '700',
    color: '#0F0F14',
  },
});

export default EnterprisePage;