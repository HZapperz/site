import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  Animated
} from 'react-native';

const PathToggle = ({ selectedPath, onPathChange, position = 'hero' }) => {
  const [isNotchDevice, setIsNotchDevice] = useState(false);
  const [dimensions, setDimensions] = useState(() => Dimensions.get('window'));
  const animatedValue = new Animated.Value(selectedPath === 'startup' ? 1 : 0);
  
  useEffect(() => {
    const checkNotchDevice = () => {
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        const { width, height } = Dimensions.get('window');
        
        // iPhone notch detection (iPhone X and later) - also check viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        const isIPhoneWithNotch = 
          // Standard dimensions
          (width === 375 && height === 812) || // iPhone X, XS, 11 Pro, 12 mini, 13 mini
          (width === 390 && height === 844) || // iPhone 12, 12 Pro, 13, 13 Pro, 14
          (width === 393 && height === 852) || // iPhone 14 Pro, 15, 15 Pro
          (width === 414 && height === 896) || // iPhone XR, XS Max, 11, 11 Pro Max
          (width === 428 && height === 926) || // iPhone 12 Pro Max, 13 Pro Max, 14 Plus
          (width === 430 && height === 932) || // iPhone 14 Pro Max, 15 Plus, 15 Pro Max
          // Viewport dimensions (accounting for browser UI)
          (viewportWidth >= 375 && viewportWidth <= 430 && viewportHeight >= 700) ||
          // Dynamic Island devices
          (width === 402 && height === 874) || // iPhone 16
          (width === 440 && height === 956);   // iPhone 16 Pro Max
        
        // Also check for CSS environment variables (safer notch detection)
        const hasNotchCSS = window.CSS && window.CSS.supports && 
          window.CSS.supports('padding-top', 'env(safe-area-inset-top)');
        
        setIsNotchDevice(isIPhoneWithNotch || hasNotchCSS);
      }
    };
    
    checkNotchDevice();
    
    const updateDimensions = () => {
      setDimensions(Dimensions.get('window'));
      checkNotchDevice();
    };
    
    if (Platform.OS === 'web') {
      window.addEventListener('resize', updateDimensions);
    }
    
    const subscription = Dimensions.addEventListener('change', updateDimensions);
    
    return () => {
      if (Platform.OS === 'web') {
        window.removeEventListener('resize', updateDimensions);
      }
      subscription?.remove();
    };
  }, []);
  
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: selectedPath === 'startup' ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [selectedPath]);
  
  const { width } = dimensions;
  const isMobile = width <= 768;
  const showInNotch = position === 'notch' && isNotchDevice && isMobile;
  const showInHero = position === 'hero';
  
  // Don't render if conditions aren't met
  if (position === 'notch' && !showInNotch) return null;
  if (position === 'hero' && showInNotch) return null;
  
  const styles = getStyles(width, isMobile, showInNotch);
  
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, isMobile ? 120 : 140],
  });
  
  return (
    <View style={[
      styles.container,
      showInNotch && styles.notchContainer
    ]}>
      {showInNotch && (
        <Text style={styles.notchLabel}>I am a:</Text>
      )}
      <View style={styles.toggleWrapper}>
        <View style={styles.toggleBackground}>
          <Animated.View 
            style={[
              styles.toggleSlider,
              {
                transform: [{ translateX }],
              },
            ]}
          />
          
          <TouchableOpacity
            style={styles.toggleOption}
            onPress={() => onPathChange('enterprise')}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.toggleText,
              selectedPath === 'enterprise' && styles.activeText
            ]}>
              {isMobile ? '🏢 Business' : '🏢 Enterprise'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.toggleOption}
            onPress={() => onPathChange('startup')}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.toggleText,
              selectedPath === 'startup' && styles.activeText
            ]}>
              {isMobile ? '🚀 Startup' : '🚀 Startup'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {!showInNotch && (
        <Text style={styles.helperText}>
          {selectedPath === 'enterprise' 
            ? 'AI integration for established businesses'
            : 'MVP development for startups'}
        </Text>
      )}
    </View>
  );
};

const getStyles = (width, isMobile, isNotch) => StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: isNotch ? 0 : 20,
    zIndex: 1000,
  },
  notchContainer: {
    position: 'absolute',
    top: Platform.select({
      web: 'max(env(safe-area-inset-top), 44px)',
      default: 44,
    }),
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    zIndex: 9999,
    ...Platform.select({
      web: {
        position: 'fixed',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.3)',
      },
    }),
  },
  notchLabel: {
    fontFamily: Platform.OS === 'web' ? "'Orbitron', sans-serif" : 'sans-serif',
    fontSize: 12,
    color: '#FFFFFF',
    marginRight: 10,
    fontWeight: '600',
  },
  toggleWrapper: {
    position: 'relative',
  },
  toggleBackground: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  toggleSlider: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: isMobile ? 120 : 140,
    height: isMobile ? 32 : 36,
    backgroundColor: '#FF4500',
    borderRadius: 21,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 8px rgba(255, 69, 0, 0.4)',
      },
      default: {
        shadowColor: '#FF4500',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
      },
    }),
  },
  toggleOption: {
    paddingHorizontal: isMobile ? 16 : 20,
    paddingVertical: isMobile ? 6 : 8,
    width: isMobile ? 120 : 140,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  toggleText: {
    fontFamily: Platform.OS === 'web' ? "'Press Start 2P', monospace" : 'monospace',
    fontSize: isMobile ? 10 : 11,
    color: '#999999',
    fontWeight: '600',
  },
  activeText: {
    color: '#000000',
    fontWeight: '800',
  },
  helperText: {
    fontFamily: Platform.OS === 'web' ? "'Orbitron', sans-serif" : 'sans-serif',
    fontSize: isMobile ? 12 : 14,
    color: '#CCCCCC',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default PathToggle;