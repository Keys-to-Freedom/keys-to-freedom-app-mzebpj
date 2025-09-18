
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from '../components/BottomNavigation';
import SimpleBottomSheet from '../components/BottomSheet';
import EditableText from '../components/EditableText';
import AdminPanel from '../components/AdminPanel';
import { useAuth } from '../hooks/useAuth';

export default function ChatScreen() {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  
  const { user, isLoading, error, login, register, logout, clearError, isAdmin } = useAuth();

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

  const handleAuth = async () => {
    if (!email.trim()) {
      Alert.alert('Fehler', 'Bitte gib deine E-Mail-Adresse ein');
      return;
    }

    clearError();
    const success = isRegistering 
      ? await register(email)
      : await login(email);

    if (success) {
      setIsLoginVisible(false);
      setEmail('');
      Alert.alert(
        'Erfolgreich!', 
        isRegistering 
          ? 'Willkommen in der Keys to Freedom Community!' 
          : 'Willkommen zurück!'
      );
    }
  };

  const handleJoinChannel = (channelName: string) => {
    if (!user) {
      setIsLoginVisible(true);
      return;
    }
    console.log('Joining channel:', channelName);
    Alert.alert('Beigetreten!', `Du bist dem Kanal ${channelName} beigetreten`);
  };

  const handleLogout = () => {
    Alert.alert(
      'Abmelden',
      'Möchtest du dich wirklich abmelden?',
      [
        { text: 'Abbrechen', style: 'cancel' },
        { text: 'Abmelden', onPress: logout }
      ]
    );
  };

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

        {/* Header */}
        <View style={commonStyles.section}>
          <EditableText id="chat_title" style={commonStyles.title} />
          <EditableText 
            id="chat_description" 
            style={commonStyles.text}
            multiline
            placeholder="Chat-Beschreibung..."
          />
        </View>

        {/* Login Status */}
        {!user ? (
          <View style={commonStyles.card}>
            <EditableText id="chat_login_title" style={commonStyles.subtitle} />
            <EditableText 
              id="chat_login_text" 
              style={commonStyles.textLeft}
              multiline
              placeholder="Login-Beschreibung..."
            />
            <TouchableOpacity
              style={[buttonStyles.primary, { marginTop: 15 }]}
              onPress={() => setIsLoginVisible(true)}
            >
              <Text style={buttonStyles.text}>Anmelden / Registrieren</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={commonStyles.card}>
            <Text style={commonStyles.subtitle}>Willkommen zurück, {user.name}!</Text>
            <Text style={commonStyles.textLeft}>
              Du bist mit der Keys to Freedom Community verbunden. Wähle unten einen Kanal aus, um teilzunehmen.
            </Text>
            {isAdmin && (
              <Text style={[commonStyles.textLeft, { color: colors.primary, fontWeight: 'bold' }]}>
                👑 Admin-Berechtigung aktiv
              </Text>
            )}
            <TouchableOpacity
              style={[buttonStyles.secondary, { marginTop: 15 }]}
              onPress={handleLogout}
            >
              <Text style={buttonStyles.textSecondary}>Abmelden</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Channels List */}
        <View style={commonStyles.section}>
          <EditableText id="chat_channels_title" style={commonStyles.subtitle} />
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

      {/* Login/Register Bottom Sheet */}
      <SimpleBottomSheet
        isVisible={isLoginVisible}
        onClose={() => {
          setIsLoginVisible(false);
          clearError();
        }}
      >
        <View style={{ padding: 20 }}>
          <Text style={[commonStyles.subtitle, { marginBottom: 20 }]}>
            {isRegistering ? 'Registrieren' : 'Anmelden'}
          </Text>
          <Text style={[commonStyles.textLeft, { marginBottom: 20 }]}>
            {isRegistering 
              ? 'Erstelle ein neues Konto mit deiner E-Mail-Adresse.'
              : 'Melde dich mit deiner E-Mail-Adresse an.'
            }
          </Text>
          
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: error ? colors.error : colors.border,
              borderRadius: 8,
              padding: 12,
              fontSize: 16,
              marginBottom: 10,
              backgroundColor: colors.backgroundAlt,
              color: colors.text,
            }}
            placeholder="Gib deine E-Mail-Adresse ein"
            placeholderTextColor={colors.textLight}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isLoading}
          />

          {error && (
            <Text style={{ color: colors.error, fontSize: 14, marginBottom: 15 }}>
              {error}
            </Text>
          )}
          
          <TouchableOpacity
            style={[buttonStyles.primary, { opacity: isLoading ? 0.7 : 1 }]}
            onPress={handleAuth}
            disabled={isLoading}
          >
            <Text style={buttonStyles.text}>
              {isLoading ? 'Wird verarbeitet...' : (isRegistering ? 'Registrieren' : 'Anmelden')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 15 }}
            onPress={() => setIsRegistering(!isRegistering)}
            disabled={isLoading}
          >
            <Text style={[commonStyles.text, { fontSize: 14, color: colors.primary }]}>
              {isRegistering 
                ? 'Bereits ein Konto? Hier anmelden' 
                : 'Noch kein Konto? Hier registrieren'
              }
            </Text>
          </TouchableOpacity>
          
          <Text style={[commonStyles.text, { fontSize: 14, marginTop: 15, color: colors.textLight }]}>
            Durch Fortfahren stimmst du unseren Nutzungsbedingungen und Datenschutzrichtlinien zu.
          </Text>
        </View>
      </SimpleBottomSheet>

      {/* Admin Panel */}
      <AdminPanel 
        isVisible={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
      />

      <BottomNavigation />
    </SafeAreaView>
  );
}
