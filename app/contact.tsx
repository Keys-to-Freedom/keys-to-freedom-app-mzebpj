
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
      Alert.alert('Fehler', 'Bitte fülle alle Pflichtfelder aus');
      return;
    }

    if (!formData.email.includes('@')) {
      Alert.alert('Fehler', 'Bitte gib eine gültige E-Mail-Adresse ein');
      return;
    }

    console.log('Contact form submitted:', formData);
    Alert.alert(
      'Nachricht gesendet!',
      'Vielen Dank für deine Nachricht. Wir werden uns innerhalb von 24 Stunden bei dir melden.',
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
      'Direktnachricht',
      'Dies öffnet einen privaten Chat-Kanal mit unserem Team. Möchtest du fortfahren?',
      [
        { text: 'Abbrechen', style: 'cancel' },
        { text: 'Ja, fortfahren', onPress: () => console.log('Opening DM channel') },
      ]
    );
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView contentContainerStyle={commonStyles.scrollContent}>
        {/* Header */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.title}>Kontakt aufnehmen</Text>
          <Text style={commonStyles.text}>
            Hast du Fragen zu deiner Reise zur Freiheit? Benötigst du persönliche Beratung? Wir sind hier, um dir bei jedem Schritt zu helfen.
          </Text>
        </View>

        {/* Contact Methods */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Kontaktmöglichkeiten</Text>
          
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
                Direktnachricht
              </Text>
            </View>
            <Text style={commonStyles.textLeft}>
              Sende eine private Nachricht direkt über unser Chat-System für sofortige Hilfe.
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
                Kontaktformular
              </Text>
            </View>
            <Text style={commonStyles.textLeft}>
              Nutze das untenstehende Formular für detaillierte Anfragen oder Feedback. Wir antworten innerhalb von 24 Stunden.
            </Text>
          </View>
        </View>

        {/* Contact Form */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Sende uns eine Nachricht</Text>
          
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
                placeholder="Dein vollständiger Name"
                placeholderTextColor={colors.textLight}
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={[commonStyles.textLeft, { fontWeight: '600', marginBottom: 8 }]}>
                E-Mail *
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
                placeholder="deine.email@beispiel.de"
                placeholderTextColor={colors.textLight}
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={[commonStyles.textLeft, { fontWeight: '600', marginBottom: 8 }]}>
                Betreff
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
                placeholder="Worum geht es?"
                placeholderTextColor={colors.textLight}
                value={formData.subject}
                onChangeText={(value) => handleInputChange('subject', value)}
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={[commonStyles.textLeft, { fontWeight: '600', marginBottom: 8 }]}>
                Nachricht *
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
                placeholder="Erzähle uns, wie wir dir auf deiner Reise zur Freiheit helfen können..."
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
              <Text style={buttonStyles.text}>Nachricht senden</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Additional Info */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>Warum uns kontaktieren?</Text>
          <View style={{ alignItems: 'flex-start' }}>
            <Text style={commonStyles.textLeft}>• Persönliche Beratung auf deiner Freiheitsreise erhalten</Text>
            <Text style={commonStyles.textLeft}>• Fragen zu unseren Büchern und Kursen stellen</Text>
            <Text style={commonStyles.textLeft}>• Vorträge oder Kooperationen anfragen</Text>
            <Text style={commonStyles.textLeft}>• Deine Erfolgsgeschichte mit unserer Community teilen</Text>
            <Text style={commonStyles.textLeft}>• Technische Probleme melden oder Verbesserungen vorschlagen</Text>
          </View>
        </View>

        {/* Response Time */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>Antwortzeit</Text>
          <Text style={commonStyles.textLeft}>
            Wir antworten normalerweise innerhalb von 24 Stunden an Werktagen auf alle Anfragen. Für dringende Angelegenheiten nutze bitte die Direktnachricht-Funktion für schnellere Hilfe.
          </Text>
          <Text style={[commonStyles.textLeft, { fontSize: 14, color: colors.textLight, marginTop: 10 }]}>
            Geschäftszeiten: Montag - Freitag, 9:00 - 18:00 Uhr (MEZ)
          </Text>
        </View>

        {/* Privacy Notice */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>Datenschutz & Datenschutz</Text>
          <Text style={commonStyles.textLeft}>
            Deine persönlichen Informationen werden gemäß den DSGVO-Richtlinien geschützt. Wir verwenden deine Kontaktdaten nur zur Beantwortung deiner Anfrage und geben sie niemals an Dritte weiter.
          </Text>
        </View>
      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  );
}
