
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
      description: 'Tritt unseren exklusiven Kanälen bei und verbinde dich mit Gleichgesinnten auf dem Weg zur Freiheit.',
      icon: 'chatbubbles',
      route: '/chat',
    },
    {
      title: 'Shop',
      description: 'Entdecke Bücher, Kurse und Ressourcen, um deinen Weg zur persönlichen und finanziellen Freiheit zu beschleunigen.',
      icon: 'storefront',
      route: '/shop',
    },
    {
      title: 'Mediathek',
      description: 'Zugang zu exklusiven Inhalten, Artikeln, Videos und Audioaufnahmen unserer Community.',
      icon: 'library',
      route: '/media',
    },
    {
      title: 'Kontakt',
      description: 'Verbinde dich direkt mit unserem Team und Community-Leitern für persönliche Beratung.',
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
            Entfalte dein Potenzial und entdecke den Weg zur wahren Freiheit durch Wissen, Gemeinschaft und persönliches Wachstum.
          </Text>
        </View>

        {/* Welcome Message */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>Willkommen zu deiner Reise</Text>
          <Text style={commonStyles.textLeft}>
            Das ist mehr als nur eine App – es ist dein Tor zu einer Gemeinschaft, die sich dem Durchbrechen von Grenzen und dem Erreichen echter Unabhängigkeit verschrieben hat.
          </Text>
          <Text style={commonStyles.textLeft}>
            Erkunde unsere Ressourcen, verbinde dich mit anderen und mache die ersten Schritte in Richtung der Freiheit, die du verdienst.
          </Text>
        </View>

        {/* Features Grid */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Funktionen entdecken</Text>
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
            <Text style={buttonStyles.text}>Der Community beitreten</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  );
}
