
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from '../components/BottomNavigation';

export default function MediaScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Alle Inhalte' },
    { id: 'articles', name: 'Artikel' },
    { id: 'videos', name: 'Videos' },
    { id: 'audio', name: 'Audio' },
    { id: 'galleries', name: 'Galerien' },
  ];

  const mediaContent = [
    {
      id: 1,
      title: 'Die Psychologie der Freiheit',
      type: 'articles',
      description: 'Verstehe die mentalen Barrieren, die uns daran hindern, wahre Freiheit zu erreichen.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      duration: '8 Min. Lesezeit',
      date: '2024-01-15',
    },
    {
      id: 2,
      title: 'Befreiung: Eine Live-Lesung',
      type: 'videos',
      description: 'Exklusive Videoaufzeichnung einer Live-Lesung mit Diskussion wichtiger Konzepte.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      duration: '45 Min.',
      date: '2024-01-10',
    },
    {
      id: 3,
      title: 'Strategien für finanzielle Unabhängigkeit',
      type: 'audio',
      description: 'Podcast-Episode mit praktischen Schritten zur finanziellen Freiheit.',
      image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop',
      duration: '32 Min.',
      date: '2024-01-08',
    },
    {
      id: 4,
      title: 'Reise zur Freiheit Galerie',
      type: 'galleries',
      description: 'Visuelle Dokumentation von Transformationsgeschichten unserer Community.',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
      duration: '24 Bilder',
      date: '2024-01-05',
    },
    {
      id: 5,
      title: 'Mindset-Transformations-Workshop',
      type: 'videos',
      description: 'Komplette Workshop-Aufzeichnung zur Entwicklung einer freiheitsorientierten Denkweise.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
      duration: '1h 15Min.',
      date: '2024-01-03',
    },
    {
      id: 6,
      title: 'Vermögensaufbau von Null',
      type: 'articles',
      description: 'Schritt-für-Schritt-Anleitung zum Vermögensaufbau ohne Startkapital.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
      duration: '12 Min. Lesezeit',
      date: '2024-01-01',
    },
  ];

  const filteredContent = selectedCategory === 'all' 
    ? mediaContent 
    : mediaContent.filter(item => item.type === selectedCategory);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'articles': return '📄';
      case 'videos': return '🎥';
      case 'audio': return '🎧';
      case 'galleries': return '🖼️';
      default: return '📱';
    }
  };

  const handleContentPress = (content: any) => {
    console.log('Opening content:', content.title);
    // Here you would typically navigate to a detailed view or start playing the content
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView contentContainerStyle={commonStyles.scrollContent}>
        {/* Header */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.title}>Mediathek</Text>
          <Text style={commonStyles.text}>
            Zugang zu exklusiven Artikeln, Videos, Audio-Inhalten und Bildergalerien. Alle Inhalte sind sorgfältig kuratiert, um deine Reise zur Freiheit zu unterstützen.
          </Text>
        </View>

        {/* Featured Content */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>Neueste Veröffentlichung</Text>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop' }}
            style={{ width: '100%', height: 150, borderRadius: 8, marginBottom: 12 }}
            resizeMode="cover"
          />
          <Text style={[commonStyles.subtitle, { fontSize: 16, marginBottom: 8, textAlign: 'left' }]}>
            Befreiung: Eine Live-Lesung
          </Text>
          <Text style={commonStyles.textLeft}>
            Begleite mich zu einer exklusiven Live-Lesung, in der wir die grundlegenden Prinzipien zur Erreichung wahrer Freiheit in der heutigen Welt erkunden.
          </Text>
          <TouchableOpacity
            style={[buttonStyles.primary, { marginTop: 15 }]}
            onPress={() => handleContentPress(mediaContent[1])}
          >
            <Text style={buttonStyles.text}>Jetzt ansehen</Text>
          </TouchableOpacity>
        </View>

        {/* Category Filter */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Inhalte durchsuchen</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={{
                  backgroundColor: selectedCategory === category.id ? colors.primary : colors.backgroundAlt,
                  borderWidth: 1,
                  borderColor: colors.primary,
                  borderRadius: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  marginRight: 10,
                }}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={{
                  color: selectedCategory === category.id ? 'white' : colors.primary,
                  fontWeight: '600',
                }}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Content List */}
        <View style={commonStyles.section}>
          {filteredContent.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={commonStyles.card}
              onPress={() => handleContentPress(item)}
            >
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 100, height: 80, borderRadius: 8, marginRight: 15 }}
                  resizeMode="cover"
                />
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Text style={{ fontSize: 16, marginRight: 8 }}>
                      {getTypeIcon(item.type)}
                    </Text>
                    <Text style={[commonStyles.subtitle, { fontSize: 16, marginBottom: 0, textAlign: 'left', flex: 1 }]}>
                      {item.title}
                    </Text>
                  </View>
                  <Text style={[commonStyles.textLeft, { fontSize: 14, marginBottom: 8 }]}>
                    {item.description}
                  </Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 12, color: colors.textLight }}>
                      {item.duration}
                    </Text>
                    <Text style={{ fontSize: 12, color: colors.textLight }}>
                      {new Date(item.date).toLocaleDateString('de-DE')}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Upload Info */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>Inhalts-Updates</Text>
          <Text style={commonStyles.textLeft}>
            Neue Inhalte werden regelmäßig hinzugefügt, um dich auf deiner Freiheitsreise inspiriert und informiert zu halten. Aktiviere Benachrichtigungen, um kein Update zu verpassen.
          </Text>
          <View style={{ alignItems: 'flex-start', marginTop: 10 }}>
            <Text style={commonStyles.textLeft}>• Wöchentliche Artikel und Einblicke</Text>
            <Text style={commonStyles.textLeft}>• Monatliche Videoaufzeichnungen</Text>
            <Text style={commonStyles.textLeft}>• Exklusive Audio-Inhalte</Text>
            <Text style={commonStyles.textLeft}>• Community-Fotogalerien</Text>
          </View>
        </View>

        {/* Video Player Info */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>Integrierter Media-Player</Text>
          <Text style={commonStyles.textLeft}>
            Alle Videos und Audio-Inhalte können direkt in der App abgespielt werden. Keine externen Player oder Downloads erforderlich.
          </Text>
          <Text style={[commonStyles.textLeft, { fontSize: 14, color: colors.textLight, marginTop: 10 }]}>
            Hinweis: Videowiedergabe erfordert eine Internetverbindung für die beste Erfahrung.
          </Text>
        </View>
      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  );
}
