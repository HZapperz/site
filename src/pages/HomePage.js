import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Animated
} from 'react-native';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import HeroSection from '../components/HeroSection';
import ValuePropositionSection from '../components/ValuePropositionSection';
import SpeedComparisonSection from '../components/SpeedComparisonSection';
import ServicesSection from '../components/ServicesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import ProjectsSection from '../components/ProjectsSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const HomePage = () => {
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();

  const sectionRefs = {
    home: useRef(null),
    services: useRef(null),
    process: useRef(null),
    ventures: useRef(null),
    about: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const scrollToSection = (sectionName) => {
    // Careers commented out for now
    // if (sectionName === 'careers') {
    //   navigate('/careers');
    //   return;
    // }
    
    setActiveSection(sectionName);
    const sectionRef = sectionRefs[sectionName];
    if (sectionRef && sectionRef.current && scrollViewRef.current) {
      sectionRef.current.measureLayout(
        scrollViewRef.current,
        (x, y) => {
          scrollViewRef.current.scrollTo({ y: y - 80, animated: true });
        },
        () => {}
      );
    }
  };

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    
    Object.entries(sectionRefs).forEach(([name, ref]) => {
      if (ref.current) {
        ref.current.measureLayout(
          scrollViewRef.current,
          (x, y, width, height) => {
            if (scrollY >= y - 100 && scrollY < y + height - 100) {
              setActiveSection(name);
            }
          },
          () => {}
        );
      }
    });
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <NavigationBar 
        activeSection={activeSection} 
        onNavigate={scrollToSection} 
      />
      
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View ref={sectionRefs.home}>
          <HeroSection onCTAPress={() => navigate('/book')} />
        </View>

        <ValuePropositionSection />

        <SpeedComparisonSection />

        <View ref={sectionRefs.services} id="services-section">
          <ServicesSection />
        </View>

        <View ref={sectionRefs.process}>
          <HowItWorksSection />
        </View>

        <View ref={sectionRefs.ventures}>
          <ProjectsSection />
        </View>

        <View ref={sectionRefs.about}>
          <AboutSection />
        </View>
        
        <View ref={sectionRefs.contact} id="contact-section">
          <ContactSection />
        </View>
        
        <Footer />
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0B0F',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default HomePage;