
import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import BottomNavigation from '../components/BottomNavigation';

export default function HomeScreen() {
  const router = useRouter();

  const features = [
    {
      title: 'Chat Community',
      description: 'Join our exclusive channels and connect with like-minded individuals on the journey to freedom.',
      icon: 'chatbubbles',
      route: '/chat',
    },
    {
      title: 'Shop',
      description: 'Discover books, courses, and resources to accelerate your path to personal and financial freedom.',
      icon: 'storefront',
      route: '/shop',
    },
    {
      title: 'Media Library',
      description: 'Access exclusive content, articles, videos, and audio recordings from our community.',
      icon: 'library',
      route: '/media',
    },
    {
      title: 'Get in Touch',
      description: 'Connect directly with our team and community leaders for personalized guidance.',
      icon: 'mail',
      route: '/contact',
    },
  ];

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView contentContainerStyle={commonStyles.scrollContent}>
        {/* Hero Section */}
        <View style={commonStyles.section}>
          <Image
            source={{ uri: 'https://prod-finalquest-user-projects-storage-bucket-aws.s3.amazonaws.com/user-projects/93a49908-1355-4a3a-9355-14a37185a434/assets/images/4ba08357-fab1-4c81-8f45-929238154d32.png?AWSAccessKeyId=AKIAVRUVRKQJC5DISQ4Q&Signature=%2Bv0B6I8y4uFzjc6hNiimT2t%2BE3Q%3D&Expires=1758265178' }}
            style={commonStyles.logoLarge}
            resizeMode="contain"
          />
          <Text style={commonStyles.title}>Keys to Freedom</Text>
          <Text style={commonStyles.text}>
            Unlock your potential and discover the path to true freedom through knowledge, community, and personal growth.
          </Text>
        </View>

        {/* Welcome Message */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>Welcome to Your Journey</Text>
          <Text style={commonStyles.textLeft}>
            This is more than just an app – it&apos;s your gateway to a community dedicated to breaking free from limitations and achieving genuine independence.
          </Text>
          <Text style={commonStyles.textLeft}>
            Explore our resources, connect with others, and take the first steps toward the freedom you deserve.
          </Text>
        </View>

        {/* Features Grid */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Explore Features</Text>
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
            <Text style={buttonStyles.text}>Join the Community</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  );
}
