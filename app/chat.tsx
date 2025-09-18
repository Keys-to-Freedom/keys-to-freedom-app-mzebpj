
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from '../components/BottomNavigation';
import SimpleBottomSheet from '../components/BottomSheet';

export default function ChatScreen() {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const channels = [
    {
      name: 'General Discussion',
      description: 'Main community channel for general conversations',
      members: 1247,
      lastMessage: '2 minutes ago',
    },
    {
      name: 'Freedom Strategies',
      description: 'Share and discuss strategies for achieving freedom',
      members: 892,
      lastMessage: '15 minutes ago',
    },
    {
      name: 'Book Club',
      description: 'Discuss recommended books and readings',
      members: 634,
      lastMessage: '1 hour ago',
    },
    {
      name: 'Success Stories',
      description: 'Share your journey and celebrate victories',
      members: 445,
      lastMessage: '3 hours ago',
    },
  ];

  const handleLogin = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    
    console.log('Login attempt with email:', email);
    setIsLoggedIn(true);
    setIsLoginVisible(false);
    Alert.alert('Success', 'Welcome to the Keys to Freedom community!');
  };

  const handleJoinChannel = (channelName: string) => {
    if (!isLoggedIn) {
      setIsLoginVisible(true);
      return;
    }
    console.log('Joining channel:', channelName);
    Alert.alert('Joined!', `You have joined the ${channelName} channel`);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView contentContainerStyle={commonStyles.scrollContent}>
        {/* Header */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.title}>Community Chat</Text>
          <Text style={commonStyles.text}>
            Connect with our community through exclusive channels. Join discussions, share insights, and learn from others on their journey to freedom.
          </Text>
        </View>

        {/* Login Status */}
        {!isLoggedIn ? (
          <View style={commonStyles.card}>
            <Text style={commonStyles.subtitle}>Join the Conversation</Text>
            <Text style={commonStyles.textLeft}>
              Sign in with your email to access our exclusive community channels and start connecting with like-minded individuals.
            </Text>
            <TouchableOpacity
              style={[buttonStyles.primary, { marginTop: 15 }]}
              onPress={() => setIsLoginVisible(true)}
            >
              <Text style={buttonStyles.text}>Sign In / Register</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={commonStyles.card}>
            <Text style={commonStyles.subtitle}>Welcome Back!</Text>
            <Text style={commonStyles.textLeft}>
              You&apos;re connected to the Keys to Freedom community. Choose a channel below to start participating.
            </Text>
          </View>
        )}

        {/* Channels List */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Available Channels</Text>
          {channels.map((channel, index) => (
            <TouchableOpacity
              key={index}
              style={commonStyles.card}
              onPress={() => handleJoinChannel(channel.name)}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <Text style={[commonStyles.subtitle, { marginBottom: 0, textAlign: 'left', flex: 1 }]}>
                  {channel.name}
                </Text>
                <View style={{
                  backgroundColor: colors.primary,
                  borderRadius: 12,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                }}>
                  <Text style={{ color: 'white', fontSize: 12, fontWeight: '600' }}>
                    {channel.members}
                  </Text>
                </View>
              </View>
              <Text style={[commonStyles.textLeft, { marginBottom: 8 }]}>
                {channel.description}
              </Text>
              <Text style={[commonStyles.textLeft, { fontSize: 14, color: colors.textLight, marginBottom: 0 }]}>
                Last activity: {channel.lastMessage}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Features Info */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>Chat Features</Text>
          <View style={{ alignItems: 'flex-start' }}>
            <Text style={commonStyles.textLeft}>• React to messages with emojis</Text>
            <Text style={commonStyles.textLeft}>• Read exclusive content from admins</Text>
            <Text style={commonStyles.textLeft}>• Receive push notifications for new posts</Text>
            <Text style={commonStyles.textLeft}>• Access to multimedia content (images, videos, audio)</Text>
            <Text style={commonStyles.textLeft}>• Direct messaging with community leaders</Text>
          </View>
        </View>
      </ScrollView>

      {/* Login Bottom Sheet */}
      <SimpleBottomSheet
        isVisible={isLoginVisible}
        onClose={() => setIsLoginVisible(false)}
      >
        <View style={{ padding: 20 }}>
          <Text style={[commonStyles.subtitle, { marginBottom: 20 }]}>
            Join Keys to Freedom
          </Text>
          <Text style={[commonStyles.textLeft, { marginBottom: 20 }]}>
            Enter your email address to sign in or create a new account.
          </Text>
          
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 8,
              padding: 12,
              fontSize: 16,
              marginBottom: 20,
              backgroundColor: colors.backgroundAlt,
            }}
            placeholder="Enter your email address"
            placeholderTextColor={colors.textLight}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TouchableOpacity
            style={buttonStyles.primary}
            onPress={handleLogin}
          >
            <Text style={buttonStyles.text}>Continue</Text>
          </TouchableOpacity>
          
          <Text style={[commonStyles.text, { fontSize: 14, marginTop: 15, color: colors.textLight }]}>
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </View>
      </SimpleBottomSheet>

      <BottomNavigation />
    </SafeAreaView>
  );
}
