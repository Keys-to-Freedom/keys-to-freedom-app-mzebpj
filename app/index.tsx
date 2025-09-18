
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import BottomNavigation from '../components/BottomNavigation';
import EditableText from '../components/EditableText';
import AdminPanel from '../components/AdminPanel';
import { useContent } from '../hooks/useContent';
import { useAuth } from '../hooks/useAuth';

export default function HomeScreen() {
  const router = useRouter();
  const { features } = useContent();
  const { isAdmin } = useAuth();
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView contentContainerStyle={commonStyles.scrollContent}>
        {/* Admin Access */}
        {isAdmin && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 1000,
              backgroundColor: colors.primary,
              borderRadius: 20,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => setShowAdminPanel(true)}
          >
            <Text style={{ color: colors.background, fontSize: 18 }}>⚙️</Text>
          </TouchableOpacity>
        )}

        {/* Hero Section */}
        <View style={commonStyles.section}>
          <Image
            source={{ uri: 'https://prod-finalquest-user-projects-storage-bucket-aws.s3.amazonaws.com/user-projects/93a49908-1355-4a3a-9355-14a37185a434/assets/images/4ba08357-fab1-4c81-8f45-929238154d32.png?AWSAccessKeyId=AKIAVRUVRKQJC5DISQ4Q&Signature=%2Bv0B6I8y4uFzjc6hNiimT2t%2BE3Q%3D&Expires=1758265178' }}
            style={commonStyles.logoLarge}
            resizeMode="contain"
          />
          <EditableText id="home_title" style={commonStyles.title} />
          <EditableText 
            id="home_description" 
            style={commonStyles.text}
            multiline
            placeholder="Beschreibung der App..."
          />
        </View>

        {/* Welcome Message */}
        <View style={commonStyles.card}>
          <EditableText id="home_welcome_title" style={commonStyles.subtitle} />
          <EditableText 
            id="home_welcome_text1" 
            style={commonStyles.textLeft}
            multiline
            placeholder="Willkommensnachricht Teil 1..."
          />
          <EditableText 
            id="home_welcome_text2" 
            style={commonStyles.textLeft}
            multiline
            placeholder="Willkommensnachricht Teil 2..."
          />
        </View>

        {/* Features Grid */}
        <View style={commonStyles.section}>
          <EditableText id="home_features_title" style={commonStyles.subtitle} />
          {features.map((feature, index) => (
            <TouchableOpacity
              key={index}
              style={commonStyles.card}
              onPress={() => router.push(feature.route)}
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
                  <Text style={{ color: 'white', fontSize: 18 }}>
                    {feature.icon === 'chatbubbles' ? '💬' : 
                     feature.icon === 'storefront' ? '🛍️' :
                     feature.icon === 'library' ? '📚' : '✉️'}
                  </Text>
                </View>
                <Text style={[commonStyles.subtitle, { marginBottom: 0, textAlign: 'left' }]}>
                  {feature.title}
                </Text>
              </View>
              <Text style={commonStyles.textLeft}>
                {feature.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Call to Action */}
        <View style={commonStyles.section}>
          <TouchableOpacity
            style={buttonStyles.primary}
            onPress={() => router.push('/chat')}
          >
            <EditableText 
              id="home_cta_button" 
              style={buttonStyles.text}
              placeholder="Call-to-Action Button Text..."
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Admin Panel */}
      <AdminPanel 
        isVisible={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
      />

      <BottomNavigation />
    </SafeAreaView>
  );
}
