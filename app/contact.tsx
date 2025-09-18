
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from '../components/BottomNavigation';

export default function ContactScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!formData.email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    console.log('Contact form submitted:', formData);
    Alert.alert(
      'Message Sent!',
      'Thank you for reaching out. We will get back to you within 24 hours.',
      [
        {
          text: 'OK',
          onPress: () => {
            setFormData({
              name: '',
              email: '',
              subject: '',
              message: '',
            });
          },
        },
      ]
    );
  };

  const handleDirectMessage = () => {
    console.log('Opening direct message channel');
    Alert.alert(
      'Direct Message',
      'This will open a private chat channel with our team. Would you like to continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes, Continue', onPress: () => console.log('Opening DM channel') },
      ]
    );
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView contentContainerStyle={commonStyles.scrollContent}>
        {/* Header */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.title}>Get in Touch</Text>
          <Text style={commonStyles.text}>
            Have questions about your journey to freedom? Need personalized guidance? We&apos;re here to help you every step of the way.
          </Text>
        </View>

        {/* Contact Methods */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Contact Methods</Text>
          
          <TouchableOpacity
            style={[commonStyles.card, { marginBottom: 15 }]}
            onPress={handleDirectMessage}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <View style={{
                backgroundColor: colors.primary,
                borderRadius: 25,
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 15,
              }}>
                <Text style={{ color: 'white', fontSize: 18 }}>💬</Text>
              </View>
              <Text style={[commonStyles.subtitle, { marginBottom: 0, textAlign: 'left' }]}>
                Direct Message
              </Text>
            </View>
            <Text style={commonStyles.textLeft}>
              Send a private message directly through our chat system for immediate assistance.
            </Text>
          </TouchableOpacity>

          <View style={commonStyles.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <View style={{
                backgroundColor: colors.secondary,
                borderRadius: 25,
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 15,
              }}>
                <Text style={{ color: 'white', fontSize: 18 }}>✉️</Text>
              </View>
              <Text style={[commonStyles.subtitle, { marginBottom: 0, textAlign: 'left' }]}>
                Contact Form
              </Text>
            </View>
            <Text style={commonStyles.textLeft}>
              Use the form below for detailed inquiries or feedback. We respond within 24 hours.
            </Text>
          </View>
        </View>

        {/* Contact Form */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Send us a Message</Text>
          
          <View style={commonStyles.card}>
            <View style={{ marginBottom: 20 }}>
              <Text style={[commonStyles.textLeft, { fontWeight: '600', marginBottom: 8 }]}>
                Name *
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  backgroundColor: colors.backgroundAlt,
                }}
                placeholder="Your full name"
                placeholderTextColor={colors.textLight}
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={[commonStyles.textLeft, { fontWeight: '600', marginBottom: 8 }]}>
                Email *
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  backgroundColor: colors.backgroundAlt,
                }}
                placeholder="your.email@example.com"
                placeholderTextColor={colors.textLight}
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={[commonStyles.textLeft, { fontWeight: '600', marginBottom: 8 }]}>
                Subject
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  backgroundColor: colors.backgroundAlt,
                }}
                placeholder="What is this about?"
                placeholderTextColor={colors.textLight}
                value={formData.subject}
                onChangeText={(value) => handleInputChange('subject', value)}
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={[commonStyles.textLeft, { fontWeight: '600', marginBottom: 8 }]}>
                Message *
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  backgroundColor: colors.backgroundAlt,
                  minHeight: 120,
                  textAlignVertical: 'top',
                }}
                placeholder="Tell us how we can help you on your journey to freedom..."
                placeholderTextColor={colors.textLight}
                value={formData.message}
                onChangeText={(value) => handleInputChange('message', value)}
                multiline
                numberOfLines={6}
              />
            </View>

            <TouchableOpacity
              style={buttonStyles.primary}
              onPress={handleSubmit}
            >
              <Text style={buttonStyles.text}>Send Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Additional Info */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>Why Contact Us?</Text>
          <View style={{ alignItems: 'flex-start' }}>
            <Text style={commonStyles.textLeft}>• Get personalized guidance on your freedom journey</Text>
            <Text style={commonStyles.textLeft}>• Ask questions about our books and courses</Text>
            <Text style={commonStyles.textLeft}>• Request speaking engagements or collaborations</Text>
            <Text style={commonStyles.textLeft}>• Share your success story with our community</Text>
            <Text style={commonStyles.textLeft}>• Report technical issues or suggest improvements</Text>
          </View>
        </View>

        {/* Response Time */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>Response Time</Text>
          <Text style={commonStyles.textLeft}>
            We typically respond to all inquiries within 24 hours during business days. For urgent matters, please use the direct message feature for faster assistance.
          </Text>
          <Text style={[commonStyles.textLeft, { fontSize: 14, color: colors.textLight, marginTop: 10 }]}>
            Business hours: Monday - Friday, 9:00 AM - 6:00 PM (CET)
          </Text>
        </View>

        {/* Privacy Notice */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>Privacy & Data Protection</Text>
          <Text style={commonStyles.textLeft}>
            Your personal information is protected according to GDPR guidelines. We only use your contact details to respond to your inquiry and will never share them with third parties.
          </Text>
        </View>
      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  );
}
