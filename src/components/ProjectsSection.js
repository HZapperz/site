import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';

const { width } = Dimensions.get('window');

const ProjectCard = ({ project, index }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1.02,
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

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.projectCard,
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
        
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>{project.icon}</Text>
            <Text style={styles.cardTitle}>{project.title}</Text>
          </View>
          
          <Text style={styles.cardDescription}>{project.description}</Text>
          
          {project.tech && (
            <View style={styles.techStack}>
              {project.tech.map((tech, idx) => (
                <View key={idx} style={styles.techBadge}>
                  <Text style={styles.techText}>{tech}</Text>
                </View>
              ))}
            </View>
          )}
          
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      icon: '🥗',
      title: 'DietAI - 7-FIGURE EXIT',
      description: 'Witnessed firsthand: execution beats perfection. Joined to fix critical issues, helped achieve 7-figure exit. Key lesson: ship fast, iterate, win.',
      tech: ['Swift', 'React Native', 'Python'],
    },
    {
      id: 2,
      icon: '🏢',
      title: 'B2B SaaS - Onboarding Platform',
      description: 'Active venture. Validating enterprise demand while building MVP. 3-week validation sprint confirmed market need. Now in build phase with equity partnership.',
      tech: ['React Native', 'Python', 'Golang'],
    },
    {
      id: 3,
      icon: '🤖',
      title: 'AI Supply Chain Consulting',
      description: 'Validation success story. Showed founder how to leverage AI before building custom solutions. Saved $50K+ in unnecessary development.',
      tech: null,
    },
    {
      id: 4,
      icon: '⛳',
      title: 'Dawn Patrol - Golf App',
      description: 'Built in 6 weeks what agencies quoted 6 months for. AI-native development proved the speed thesis. Revenue generating from day one.',
      tech: ['React Native', 'Firebase', 'Golang', 'Custom UI'],
    },
    {
      id: 5,
      icon: '🐾',
      title: 'Royal Paws - Pet Grooming',
      description: 'Equity partnership model in action. Built scalable architecture for rapid expansion. Aligned incentives mean I win when they scale.',
      tech: ['Next.js', 'React Native', 'PostgreSQL', 'Stripe', 'Golang'],
    },
    {
      id: 6,
      icon: '💬',
      title: 'ECS-ChatBot - University MVP',
      description: 'Early AI validation. Built before ChatGPT hype to prove the thesis: AI changes everything about development speed and capability.',
      tech: ['LangChain', 'Pinecone', 'Python', 'OpenAI API'],
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Ventures & Validation</Text>

      <Text style={styles.sectionSubtitle}>
        Every project validates the thesis: AI-native development + equity alignment = success
      </Text>
      
      <View style={styles.projectsGrid}>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A0B0F',
    paddingVertical: 80,
    paddingHorizontal: width > 768 ? 40 : 20,
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
    fontSize: width > 768 ? 18 : 16,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 60,
  },
  projectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: width > 768 ? 24 : 16,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: width > 768 ? 0 : 10,
  },
  projectCard: {
    backgroundColor: 'rgba(20, 21, 32, 0.7)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    overflow: 'hidden',
    width: width > 768 ? 480 : width > 400 ? '90%' : '95%',
    maxWidth: width > 768 ? 500 : width - 40,
    position: 'relative',
    marginHorizontal: width > 768 ? 0 : 'auto',
    ...Platform.select({
      web: {
        transition: 'all 0.3s ease',
        ':hover': {
          borderColor: '#0EA5E9',
        },
      },
    }),
  },
  cardGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    ...Platform.select({
      web: {
        boxShadow: '0 0 40px rgba(20, 184, 166, 0.3), inset 0 0 20px rgba(20, 184, 166, 0.1)',
      },
    }),
  },
  cardContent: {
    padding: 28,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  cardTitle: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 18 : 16,
    fontWeight: '700',
    color: '#0EA5E9',
    flex: 1,
  },
  cardDescription: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 15 : 14,
    color: '#9CA3AF',
    lineHeight: width > 768 ? 24 : 22,
    marginBottom: 20,
    ...Platform.select({
      web: {
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
      },
    }),
  },
  techStack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  techBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  techText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '600',
  },
});

export default ProjectsSection;