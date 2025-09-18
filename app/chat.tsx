
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
      name: 'Allgemeine Diskussion',
      description: 'Haupt-Community-Kanal für allgemeine Gespräche',
      members: 1247,
      lastMessage: 'vor 2 Minuten',
    },
    {
      name: 'Freiheits-Strategien',
      description: 'Teile und diskutiere Strategien zum Erreichen von Freiheit',
      members: 892,
      lastMessage: 'vor 15 Minuten',
    },
    {
      name: 'Buchclub',
      description: 'Diskutiere empfohlene Bücher und Lektüren',
      members: 634,
      lastMessage: 'vor 1 Stunde',
    },
    {
      name: 'Erfolgsgeschichten',
      description: 'Teile deine Reise und feiere Erfolge',
      members: 445,
      lastMessage: 'vor 3 Stunden',
    },
  ];

  const handleLogin = () => {
    if (!email) {
      Alert.alert('Fehler', 'Bitte gib deine E-Mail-Adresse ein');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Fehler', 'Bitte gib eine gültige E-Mail-Adresse ein');
      return;
    }
    
    console.log('Login attempt with email:', email);
    setIsLoggedIn(true);
    setIsLoginVisible(false);
    Alert.alert('Erfolgreich', 'Willkommen in der Keys to Freedom Community!');
  };

  const handleJoinChannel = (channelName: string) => {
    if (!isLoggedIn) {
      setIsLoginVisible(true);
      return;
    }
    console.log('Joining channel:', channelName);
    Alert.alert('Beigetreten!', `Du bist dem Kanal ${channelName} beigetreten`);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView contentContainerStyle={commonStyles.scrollContent}>
        {/* Header */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.title}>Community Chat</Text>
          <Text style={commonStyles.text}>
            Verbinde dich mit unserer Community durch exklusive Kanäle. Nimm an Diskussionen teil, teile Erkenntnisse und lerne von anderen auf ihrer Reise zur Freiheit.
          </Text>
        </View>

        {/* Login Status */}
        {!isLoggedIn ? (
          <View style={commonStyles.card}>
            <Text style={commonStyles.subtitle}>An der Unterhaltung teilnehmen</Text>
            <Text style={commonStyles.textLeft}>
              Melde dich mit deiner E-Mail an, um Zugang zu unseren exklusiven Community-Kanälen zu erhalten und dich mit Gleichgesinnten zu verbinden.
            </Text>
            <TouchableOpacity
              style={[buttonStyles.primary, { marginTop: 15 }]}
              onPress={() => setIsLoginVisible(true)}
            >
              <Text style={buttonStyles.text}>Anmelden / Registrieren</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={commonStyles.card}>
            <Text style={commonStyles.subtitle}>Willkommen zurück!</Text>
            <Text style={commonStyles.textLeft}>
              Du bist mit der Keys to Freedom Community verbunden. Wähle unten einen Kanal aus, um teilzunehmen.
            </Text>
          </View>
        )}

        {/* Channels List */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Verfügbare Kanäle</Text>
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
                Letzte Aktivität: {channel.lastMessage}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Features Info */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>Chat-Funktionen</Text>
          <View style={{ alignItems: 'flex-start' }}>
            <Text style={commonStyles.textLeft}>• Auf Nachrichten mit Emojis reagieren</Text>
            <Text style={commonStyles.textLeft}>• Exklusive Inhalte von Admins lesen</Text>
            <Text style={commonStyles.textLeft}>• Push-Benachrichtigungen für neue Beiträge erhalten</Text>
            <Text style={commonStyles.textLeft}>• Zugang zu Multimedia-Inhalten (Bilder, Videos, Audio)</Text>
            <Text style={commonStyles.textLeft}>• Direktnachrichten mit Community-Leitern</Text>
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
            Keys to Freedom beitreten
          </Text>
          <Text style={[commonStyles.textLeft, { marginBottom: 20 }]}>
            Gib deine E-Mail-Adresse ein, um dich anzumelden oder ein neues Konto zu erstellen.
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
            placeholder="Gib deine E-Mail-Adresse ein"
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
            <Text style={buttonStyles.text}>Weiter</Text>
          </TouchableOpacity>
          
          <Text style={[commonStyles.text, { fontSize: 14, marginTop: 15, color: colors.textLight }]}>
            Durch Fortfahren stimmst du unseren Nutzungsbedingungen und Datenschutzrichtlinien zu.
          </Text>
        </View>
      </SimpleBottomSheet>

      <BottomNavigation />
    </SafeAreaView>
  );
}
