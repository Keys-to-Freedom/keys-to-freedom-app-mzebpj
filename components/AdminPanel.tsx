
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { useContent } from '../hooks/useContent';
import SimpleBottomSheet from './BottomSheet';

interface AdminPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isVisible, onClose }: AdminPanelProps) {
  const { 
    isEditing, 
    setIsEditing, 
    resetContent, 
    exportContent, 
    importContent,
    content,
    features 
  } = useContent();
  
  const [activeTab, setActiveTab] = useState('content');
  const [importText, setImportText] = useState('');

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
    Alert.alert(
      isEditing ? 'Bearbeitungsmodus deaktiviert' : 'Bearbeitungsmodus aktiviert',
      isEditing 
        ? 'Du kannst jetzt keine Inhalte mehr bearbeiten' 
        : 'Tippe auf beliebige Texte, um sie zu bearbeiten'
    );
  };

  const handleReset = () => {
    Alert.alert(
      'Inhalte zurücksetzen',
      'Möchtest du alle Inhalte auf die Standardwerte zurücksetzen? Diese Aktion kann nicht rückgängig gemacht werden.',
      [
        { text: 'Abbrechen', style: 'cancel' },
        { 
          text: 'Zurücksetzen', 
          style: 'destructive',
          onPress: () => {
            resetContent();
            Alert.alert('Erfolg', 'Alle Inhalte wurden zurückgesetzt');
          }
        }
      ]
    );
  };

  const handleExport = () => {
    const exportData = exportContent();
    Alert.alert(
      'Inhalte exportiert',
      'Die Inhalte wurden in die Konsole exportiert. In einer echten App würden diese als Datei gespeichert oder an einen Server gesendet.',
      [{ text: 'OK' }]
    );
  };

  const handleImport = () => {
    try {
      const importData = JSON.parse(importText);
      importContent(importData);
      setImportText('');
      Alert.alert('Erfolg', 'Inhalte wurden erfolgreich importiert');
    } catch (error) {
      Alert.alert('Fehler', 'Ungültiges JSON-Format');
    }
  };

  const contentByScreen = {
    home: content.filter(c => c.screen === 'home'),
    chat: content.filter(c => c.screen === 'chat'),
    shop: content.filter(c => c.screen === 'shop'),
    media: content.filter(c => c.screen === 'media'),
    contact: content.filter(c => c.screen === 'contact'),
  };

  return (
    <SimpleBottomSheet isVisible={isVisible} onClose={onClose}>
      <View style={{ padding: 20, maxHeight: 600 }}>
        <Text style={[commonStyles.subtitle, { marginBottom: 20 }]}>
          Admin-Panel
        </Text>

        {/* Tab Navigation */}
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <TouchableOpacity
            style={[
              buttonStyles.secondary,
              { 
                flex: 1, 
                marginRight: 10,
                backgroundColor: activeTab === 'content' ? colors.primary : colors.backgroundAlt 
              }
            ]}
            onPress={() => setActiveTab('content')}
          >
            <Text style={[
              buttonStyles.textSecondary,
              { color: activeTab === 'content' ? colors.background : colors.primary }
            ]}>
              Inhalte
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              buttonStyles.secondary,
              { 
                flex: 1,
                backgroundColor: activeTab === 'settings' ? colors.primary : colors.backgroundAlt 
              }
            ]}
            onPress={() => setActiveTab('settings')}
          >
            <Text style={[
              buttonStyles.textSecondary,
              { color: activeTab === 'settings' ? colors.background : colors.primary }
            ]}>
              Einstellungen
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={{ maxHeight: 400 }}>
          {activeTab === 'content' && (
            <View>
              <Text style={[commonStyles.subtitle, { fontSize: 16, marginBottom: 15 }]}>
                Inhaltsverwaltung
              </Text>
              
              <TouchableOpacity
                style={[buttonStyles.primary, { marginBottom: 15 }]}
                onPress={handleToggleEdit}
              >
                <Text style={buttonStyles.text}>
                  {isEditing ? 'Bearbeitung beenden' : 'Inhalte bearbeiten'}
                </Text>
              </TouchableOpacity>

              {Object.entries(contentByScreen).map(([screen, items]) => (
                <View key={screen} style={{ marginBottom: 20 }}>
                  <Text style={[commonStyles.textLeft, { fontWeight: 'bold', marginBottom: 10 }]}>
                    {screen.charAt(0).toUpperCase() + screen.slice(1)} ({items.length} Elemente)
                  </Text>
                  {items.slice(0, 3).map(item => (
                    <View key={item.id} style={{ marginBottom: 8, paddingLeft: 15 }}>
                      <Text style={[commonStyles.textLeft, { fontSize: 14, color: colors.textLight }]}>
                        {item.type}: {item.content.substring(0, 50)}...
                      </Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {activeTab === 'settings' && (
            <View>
              <Text style={[commonStyles.subtitle, { fontSize: 16, marginBottom: 15 }]}>
                Datenmanagement
              </Text>

              <TouchableOpacity
                style={[buttonStyles.secondary, { marginBottom: 15 }]}
                onPress={handleExport}
              >
                <Text style={buttonStyles.textSecondary}>Inhalte exportieren</Text>
              </TouchableOpacity>

              <View style={{ marginBottom: 15 }}>
                <Text style={[commonStyles.textLeft, { marginBottom: 8 }]}>
                  Inhalte importieren (JSON):
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: 8,
                    padding: 12,
                    fontSize: 14,
                    backgroundColor: colors.backgroundAlt,
                    color: colors.text,
                    minHeight: 80,
                    textAlignVertical: 'top',
                  }}
                  placeholder="JSON-Daten hier einfügen..."
                  placeholderTextColor={colors.textLight}
                  value={importText}
                  onChangeText={setImportText}
                  multiline
                />
                <TouchableOpacity
                  style={[buttonStyles.primary, { marginTop: 10 }]}
                  onPress={handleImport}
                  disabled={!importText.trim()}
                >
                  <Text style={buttonStyles.text}>Importieren</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[buttonStyles.secondary, { borderColor: colors.error }]}
                onPress={handleReset}
              >
                <Text style={[buttonStyles.textSecondary, { color: colors.error }]}>
                  Auf Standard zurücksetzen
                </Text>
              </TouchableOpacity>

              <View style={{ marginTop: 20 }}>
                <Text style={[commonStyles.textLeft, { fontSize: 14, color: colors.textLight }]}>
                  Statistiken:
                </Text>
                <Text style={[commonStyles.textLeft, { fontSize: 14, color: colors.textLight }]}>
                  • {content.length} Textelemente
                </Text>
                <Text style={[commonStyles.textLeft, { fontSize: 14, color: colors.textLight }]}>
                  • {features.length} Feature-Karten
                </Text>
                <Text style={[commonStyles.textLeft, { fontSize: 14, color: colors.textLight }]}>
                  • Bearbeitungsmodus: {isEditing ? 'Aktiv' : 'Inaktiv'}
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </SimpleBottomSheet>
  );
}
