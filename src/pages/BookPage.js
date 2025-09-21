import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  Linking
} from 'react-native';
import NavigationBar from '../components/NavigationBar';

const { width, height } = Dimensions.get('window');

const BookPage = () => {
  useEffect(() => {
    if (Platform.OS === 'web') {
      // Load Calendly script
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        // Cleanup script on unmount
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, []);

  return (
    <View style={styles.container}>
      <NavigationBar />
      
      <View style={styles.content}>
        {Platform.OS === 'web' ? (
          <>
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/hamzazulquernain1/zapp-studios-consulting"
              style={{
                minWidth: '320px',
                height: '700px',
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto'
              }}
            />
            <View style={styles.fallbackContainer}>
              <Text style={styles.fallbackText}>
                Having trouble with the scheduler above?
              </Text>
              <TouchableOpacity 
                onPress={() => Linking.openURL('https://calendly.com/hamzazulquernain1/zapp-studios-consulting')}
                style={styles.fallbackButton}
              >
                <Text style={styles.fallbackButtonText}>Click here to book directly on Calendly</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.fallback}>
            <Text style={styles.fallbackText}>
              Please visit this page on a web browser to book a consultation.
            </Text>
            <TouchableOpacity 
              onPress={() => Linking.openURL('https://calendly.com/hamzazulquernain1/zapp-studios-consulting')}
              style={styles.fallbackButton}
            >
              <Text style={styles.fallbackButtonText}>Or book directly on Calendly</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F14',
    minHeight: height,
  },
  content: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: width > 768 ? 40 : 20,
    paddingBottom: 40,
  },
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackContainer: {
    marginTop: 40,
    alignItems: 'center',
    paddingVertical: 30,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
  fallbackText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 15,
  },
  fallbackButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: '#14B8A6',
    borderRadius: 8,
    backgroundColor: 'rgba(20, 184, 166, 0.05)',
    ...Platform.select({
      web: {
        transition: 'all 0.2s ease',
        ':hover': {
          backgroundColor: 'rgba(20, 184, 166, 0.1)',
          borderColor: '#10B981',
          transform: 'translateY(-2px)',
        },
      },
    }),
  },
  fallbackButtonText: {
    fontFamily: Platform.OS === 'web' ? "'Inter', sans-serif" : 'sans-serif',
    fontSize: 14,
    color: '#14B8A6',
    fontWeight: '600',
  },
});

export default BookPage;