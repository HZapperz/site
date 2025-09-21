import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
  Linking
} from 'react-native';

const { width } = Dimensions.get('window');

const JobCard = ({ job, index }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const [isHovered, setIsHovered] = useState(false);

  const handlePressIn = () => {
    setIsHovered(true);
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1.03,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    setIsHovered(false);
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleApply = () => {
    Linking.openURL(job.link);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handleApply}
    >
      <Animated.View
        style={[
          styles.jobCard,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.cardGlow,
            {
              opacity: glowAnim,
            },
          ]}
        />
        
        <View style={styles.cardHeader}>
          <View style={styles.jobTypeContainer}>
            <Text style={styles.jobType}>{job.type}</Text>
          </View>
          <Text style={styles.jobLocation}>{job.location}</Text>
        </View>
        
        <Text style={styles.jobTitle}>{job.title}</Text>
        <Text style={styles.jobDescription}>{job.description}</Text>
        
        <View style={styles.requirementsContainer}>
          <Text style={styles.requirementsTitle}>Key Requirements:</Text>
          {job.requirements.map((req, idx) => (
            <View key={idx} style={styles.requirementItem}>
              <Text style={styles.requirementBullet}>▸</Text>
              <Text style={styles.requirementText}>{req}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.tagsContainer}>
          {job.tags.map((tag, idx) => (
            <View key={idx} style={styles.tagBadge}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        
        <TouchableOpacity
          style={[styles.applyButton, isHovered && styles.applyButtonHovered]}
          onPress={handleApply}
        >
          <Text style={styles.applyButtonText}>APPLY NOW</Text>
          <Text style={styles.applyArrow}>→</Text>
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
};

const HiringSection = () => {
  const fireAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const fireAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(fireAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(fireAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    fireAnimation.start();
    return () => fireAnimation.stop();
  }, [fireAnim]);

  const jobs = [
    {
      id: 1,
      title: 'Full-Stack Developer',
      type: 'FULL-TIME',
      location: 'REMOTE',
      description: 'Fuel our in-house builds with your full-stack expertise. Build scalable applications that ignite business growth.',
      requirements: [
        'React/React Native mastery',
        'Node.js/Python backend skills',
        'Database design experience',
      ],
      tags: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      link: 'https://wellfound.com/jobs/fullstack-dev',
    },
    {
      id: 2,
      title: 'AI/ML Engineer',
      type: 'FULL-TIME',
      location: 'HYBRID',
      description: 'Forge intelligent solutions using cutting-edge AI. Transform business operations with machine learning magic.',
      requirements: [
        'TensorFlow/PyTorch expertise',
        'Production ML deployment',
        'Data pipeline architecture',
      ],
      tags: ['Python', 'TensorFlow', 'MLOps', 'Cloud'],
      link: 'https://wellfound.com/jobs/ai-engineer',
    },
    {
      id: 3,
      title: 'Mobile App Developer',
      type: 'CONTRACT',
      location: 'REMOTE',
      description: 'Create blazing-fast mobile experiences. Build apps that users love and businesses depend on.',
      requirements: [
        'React Native proficiency',
        'iOS/Android native knowledge',
        'API integration skills',
      ],
      tags: ['React Native', 'Firebase', 'Mobile', 'UX'],
      link: 'https://wellfound.com/jobs/mobile-dev',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Animated.Text style={[styles.fireEmoji, { opacity: fireAnim }]}>
          🔥
        </Animated.Text>
        <Text style={styles.sectionTitle}>JOIN THE FIRE</Text>
        <Animated.Text style={[styles.fireEmoji, { opacity: fireAnim }]}>
          🔥
        </Animated.Text>
      </View>
      <Text style={styles.sectionSubtitle}>Careers at Zapp Studios</Text>
      <View style={styles.fireBar} />
      
      <Text style={styles.introText}>
        We're looking for passionate developers who want to build software that matters. 
        Join our team and help businesses level up their operations.
      </Text>
      
      <View style={styles.jobsGrid}>
        {jobs.map((job, index) => (
          <JobCard key={job.id} job={job} index={index} />
        ))}
      </View>
      
      <View style={styles.benefitsContainer}>
        <Text style={styles.benefitsTitle}>Why Join Zapp Studios?</Text>
        <View style={styles.benefitsGrid}>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>💰</Text>
            <Text style={styles.benefitText}>Competitive Compensation</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>🏠</Text>
            <Text style={styles.benefitText}>Remote-First Culture</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>🚀</Text>
            <Text style={styles.benefitText}>Growth Opportunities</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>🎮</Text>
            <Text style={styles.benefitText}>Gamer-Friendly Environment</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A0A0A',
    paddingVertical: 80,
    paddingHorizontal: width > 768 ? 40 : 20,
    borderTopWidth: 2,
    borderTopColor: '#8B0000',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  fireEmoji: {
    fontSize: 32,
    marginHorizontal: 15,
  },
  sectionTitle: {
    fontFamily: Platform.OS === 'web' ? "'Press Start 2P', monospace" : 'monospace',
    fontSize: width > 768 ? 36 : 24,
    color: '#FF4500',
    textAlign: 'center',
    textShadowColor: '#FF4500',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  sectionSubtitle: {
    fontFamily: Platform.OS === 'web' ? "'Orbitron', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 20 : 16,
    color: '#FFA500',
    textAlign: 'center',
    marginBottom: 20,
  },
  fireBar: {
    height: 4,
    width: 100,
    backgroundColor: '#FF4500',
    alignSelf: 'center',
    marginBottom: 30,
    borderRadius: 2,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 20px rgba(255, 69, 0, 0.8)',
      },
      default: {
        shadowColor: '#FF4500',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
      },
    }),
  },
  introText: {
    fontFamily: Platform.OS === 'web' ? "'Orbitron', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 16 : 14,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 50,
    maxWidth: 700,
    alignSelf: 'center',
    lineHeight: 24,
  },
  jobsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 30,
    maxWidth: 1200,
    alignSelf: 'center',
    marginBottom: 60,
  },
  jobCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#8B0000',
    padding: 25,
    width: width > 768 ? 380 : width - 40,
    position: 'relative',
  },
  cardGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FF4500',
    ...Platform.select({
      web: {
        boxShadow: '0 0 30px rgba(255, 69, 0, 0.8)',
      },
      default: {
        shadowColor: '#FF4500',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 30,
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  jobTypeContainer: {
    backgroundColor: 'rgba(255, 69, 0, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FF4500',
  },
  jobType: {
    fontFamily: Platform.OS === 'web' ? "'Orbitron', sans-serif" : 'sans-serif',
    fontSize: 10,
    color: '#FF4500',
    fontWeight: '700',
    letterSpacing: 1,
  },
  jobLocation: {
    fontFamily: Platform.OS === 'web' ? "'Orbitron', sans-serif" : 'sans-serif',
    fontSize: 12,
    color: '#FFA500',
    fontWeight: '600',
  },
  jobTitle: {
    fontFamily: Platform.OS === 'web' ? "'Press Start 2P', monospace" : 'monospace',
    fontSize: width > 768 ? 18 : 16,
    color: '#FFA500',
    marginBottom: 10,
  },
  jobDescription: {
    fontFamily: Platform.OS === 'web' ? "'Orbitron', sans-serif" : 'sans-serif',
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 22,
    marginBottom: 20,
  },
  requirementsContainer: {
    marginBottom: 20,
  },
  requirementsTitle: {
    fontFamily: Platform.OS === 'web' ? "'Orbitron', sans-serif" : 'sans-serif',
    fontSize: 13,
    color: '#FF4500',
    fontWeight: '700',
    marginBottom: 10,
  },
  requirementItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  requirementBullet: {
    color: '#FFA500',
    marginRight: 8,
  },
  requirementText: {
    fontFamily: Platform.OS === 'web' ? "'Orbitron', sans-serif" : 'sans-serif',
    fontSize: 12,
    color: '#AAAAAA',
    flex: 1,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 20,
  },
  tagBadge: {
    backgroundColor: 'rgba(255, 165, 0, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FFA500',
  },
  tagText: {
    fontFamily: Platform.OS === 'web' ? "'Orbitron', sans-serif" : 'sans-serif',
    fontSize: 10,
    color: '#FFD700',
    fontWeight: '600',
  },
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF4500',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFA500',
  },
  applyButtonHovered: {
    backgroundColor: '#FFA500',
  },
  applyButtonText: {
    fontFamily: Platform.OS === 'web' ? "'Press Start 2P', monospace" : 'monospace',
    fontSize: 12,
    color: '#000000',
    fontWeight: '900',
    marginRight: 8,
  },
  applyArrow: {
    fontSize: 18,
    color: '#000000',
  },
  benefitsContainer: {
    backgroundColor: 'rgba(255, 69, 0, 0.05)',
    borderRadius: 12,
    padding: 30,
    maxWidth: 900,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#8B0000',
  },
  benefitsTitle: {
    fontFamily: Platform.OS === 'web' ? "'Press Start 2P', monospace" : 'monospace',
    fontSize: width > 768 ? 20 : 16,
    color: '#FF4500',
    textAlign: 'center',
    marginBottom: 30,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  benefitItem: {
    alignItems: 'center',
    width: width > 768 ? 200 : (width - 80) / 2,
  },
  benefitIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  benefitText: {
    fontFamily: Platform.OS === 'web' ? "'Orbitron', sans-serif" : 'sans-serif',
    fontSize: 13,
    color: '#FFA500',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default HiringSection;