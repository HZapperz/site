import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';
import { useNavigate, useLocation } from 'react-router-dom';

const { width } = Dimensions.get('window');

const NavigationBar = ({ activeSection, onNavigate, isEnterprise }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleBookNow = () => {
    navigate('/book');
  };
  
  const handleLogoClick = () => {
    navigate('/');
    setTimeout(() => {
      if (Platform.OS === 'web') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const handleEnterpriseClick = () => {
    navigate('/enterprise');
  };

  const handleContactClick = () => {
    if (location.pathname === '/') {
      // If on home page, scroll to contact section
      if (onNavigate) {
        onNavigate('contact');
      }
    } else {
      // If on other pages, navigate to home and then scroll
      navigate('/');
      setTimeout(() => {
        const contactSection = document.getElementById('contact-section');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const isEnterprisePage = location.pathname === '/enterprise';

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity 
          style={styles.logoContainer}
          onPress={handleLogoClick}
          activeOpacity={0.7}
        >
          <Text style={styles.logo}>ZAPP</Text>
          <Text style={styles.logoAccent}>STUDIOS</Text>
        </TouchableOpacity>
        
        <View style={styles.navLinks}>
          {width > 768 && (
            <>
              {/* Enterprise temporarily commented out
              <TouchableOpacity
                style={styles.navLink}
                onPress={handleEnterpriseClick}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.navLinkText,
                  isEnterprisePage && styles.navLinkActive
                ]}>
                  Enterprise Solutions
                </Text>
              </TouchableOpacity>
              */}

              <TouchableOpacity
                style={styles.navLink}
                onPress={handleContactClick}
                activeOpacity={0.7}
              >
                <Text style={styles.navLinkText}>Contact</Text>
              </TouchableOpacity>
            </>
          )}
          
          <TouchableOpacity
            style={styles.bookButton}
            onPress={handleBookNow}
            activeOpacity={0.8}
          >
            <Text style={styles.bookButtonText}>
              Submit Your Venture
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(10, 11, 15, 0.95)',
    ...Platform.select({
      web: {
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      },
    }),
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width > 768 ? 40 : 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    cursor: Platform.OS === 'web' ? 'pointer' : 'default',
  },
  logo: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 24 : 20,
    color: '#F3F4F6',
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  logoAccent: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 24 : 20,
    color: '#F59E0B',
    fontWeight: '800',
    marginLeft: 8,
    letterSpacing: -0.5,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width > 768 ? 30 : 15,
  },
  navLink: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  navLinkText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 15,
    color: '#9CA3AF',
    fontWeight: '500',
    ...Platform.select({
      web: {
        transition: 'color 0.2s ease',
        ':hover': {
          color: '#F3F4F6',
        },
      },
    }),
  },
  navLinkActive: {
    color: '#0EA5E9',
  },
  bookButton: {
    backgroundColor: '#0EA5E9',
    paddingVertical: 12,
    paddingHorizontal: width > 768 ? 24 : 20,
    borderRadius: 6,
    ...Platform.select({
      web: {
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        ':hover': {
          backgroundColor: '#38BDF8',
          transform: 'translateY(-1px)',
        },
      },
    }),
  },
  bookButtonText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: width > 768 ? 14 : 13,
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

export default NavigationBar;