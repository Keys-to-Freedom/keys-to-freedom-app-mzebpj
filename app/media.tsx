
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from '../components/BottomNavigation';

export default function MediaScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Content' },
    { id: 'articles', name: 'Articles' },
    { id: 'videos', name: 'Videos' },
    { id: 'audio', name: 'Audio' },
    { id: 'galleries', name: 'Galleries' },
  ];

  const mediaContent = [
    {
      id: 1,
      title: 'The Psychology of Freedom',
      type: 'articles',
      description: 'Understanding the mental barriers that prevent us from achieving true freedom.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      duration: '8 min read',
      date: '2024-01-15',
    },
    {
      id: 2,
      title: 'Breaking Free: A Live Reading',
      type: 'videos',
      description: 'Exclusive video recording of a live reading session discussing key concepts.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      duration: '45 min',
      date: '2024-01-10',
    },
    {
      id: 3,
      title: 'Financial Independence Strategies',
      type: 'audio',
      description: 'Podcast episode covering practical steps to achieve financial freedom.',
      image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop',
      duration: '32 min',
      date: '2024-01-08',
    },
    {
      id: 4,
      title: 'Journey to Freedom Gallery',
      type: 'galleries',
      description: 'Visual documentation of transformation stories from our community.',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
      duration: '24 images',
      date: '2024-01-05',
    },
    {
      id: 5,
      title: 'Mindset Transformation Workshop',
      type: 'videos',
      description: 'Complete workshop recording on developing a freedom-oriented mindset.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
      duration: '1h 15min',
      date: '2024-01-03',
    },
    {
      id: 6,
      title: 'Building Wealth from Zero',
      type: 'articles',
      description: 'Step-by-step guide for creating wealth without initial capital.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
      duration: '12 min read',
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
          <Text style={commonStyles.title}>Media Library</Text>
          <Text style={commonStyles.text}>
            Access exclusive articles, videos, audio content, and image galleries. All content is carefully curated to support your journey to freedom.
          </Text>
        </View>

        {/* Featured Content */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>Latest Release</Text>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop' }}
            style={{ width: '100%', height: 150, borderRadius: 8, marginBottom: 12 }}
            resizeMode="cover"
          />
          <Text style={[commonStyles.subtitle, { fontSize: 16, marginBottom: 8, textAlign: 'left' }]}>
            Breaking Free: A Live Reading
          </Text>
          <Text style={commonStyles.textLeft}>
            Join me for an exclusive live reading session where we explore the fundamental principles of achieving true freedom in today&apos;s world.
          </Text>
          <TouchableOpacity
            style={[buttonStyles.primary, { marginTop: 15 }]}
            onPress={() => handleContentPress(mediaContent[1])}
          >
            <Text style={buttonStyles.text}>Watch Now</Text>
          </TouchableOpacity>
        </View>

        {/* Category Filter */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Browse Content</Text>
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
                      {new Date(item.date).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Upload Info */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>Content Updates</Text>
          <Text style={commonStyles.textLeft}>
            New content is added regularly to keep you inspired and informed on your freedom journey. Enable notifications to never miss an update.
          </Text>
          <View style={{ alignItems: 'flex-start', marginTop: 10 }}>
            <Text style={commonStyles.textLeft}>• Weekly articles and insights</Text>
            <Text style={commonStyles.textLeft}>• Monthly video recordings</Text>
            <Text style={commonStyles.textLeft}>• Exclusive audio content</Text>
            <Text style={commonStyles.textLeft}>• Community photo galleries</Text>
          </View>
        </View>

        {/* Video Player Info */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>Built-in Media Player</Text>
          <Text style={commonStyles.textLeft}>
            All videos and audio content can be played directly within the app. No need for external players or downloads.
          </Text>
          <Text style={[commonStyles.textLeft, { fontSize: 14, color: colors.textLight, marginTop: 10 }]}>
            Note: Video playback requires an internet connection for the best experience.
          </Text>
        </View>
      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  );
}
