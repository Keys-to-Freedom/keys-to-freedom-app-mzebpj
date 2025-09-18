
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from '../components/BottomNavigation';

export default function ShopScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Alle Produkte' },
    { id: 'books', name: 'Bücher' },
    { id: 'courses', name: 'Kurse' },
    { id: 'resources', name: 'Ressourcen' },
  ];

  const products = [
    {
      id: 1,
      name: 'Keys to Freedom - Der komplette Leitfaden',
      price: '€29.99',
      category: 'books',
      description: 'Ein umfassender Leitfaden zum Erreichen persönlicher und finanzieller Freiheit.',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
      featured: true,
    },
    {
      id: 2,
      name: 'Freiheits-Mindset Masterclass',
      price: '€149.99',
      category: 'courses',
      description: 'Transformiere dein Denken und entfalte dein Potenzial mit diesem intensiven Kurs.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=400&fit=crop',
      featured: false,
    },
    {
      id: 3,
      name: 'Finanzielle Unabhängigkeit Arbeitsbuch',
      price: '€19.99',
      category: 'resources',
      description: 'Praktische Übungen und Vorlagen zum Aufbau von Wohlstand und finanzieller Freiheit.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=400&fit=crop',
      featured: false,
    },
    {
      id: 4,
      name: 'Mentale Barrieren durchbrechen',
      price: '€24.99',
      category: 'books',
      description: 'Überwinde limitierende Glaubenssätze und erschaffe das Leben, das du wirklich willst.',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
      featured: true,
    },
    {
      id: 5,
      name: 'Unternehmer-Freiheits-Blueprint',
      price: '€199.99',
      category: 'courses',
      description: 'Schritt-für-Schritt-System zum Aufbau eines Unternehmens, das dir wahre Freiheit gibt.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
      featured: false,
    },
    {
      id: 6,
      name: 'Tägliches Freiheits-Journal',
      price: '€15.99',
      category: 'resources',
      description: 'Verfolge deinen Fortschritt und bleibe fokussiert auf deiner Reise zur Freiheit.',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=300&h=400&fit=crop',
      featured: false,
    },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const featuredProducts = products.filter(product => product.featured);

  const handlePurchase = (productName: string, price: string) => {
    console.log('Purchase initiated for:', productName, price);
    Alert.alert(
      'Kauf',
      `Möchtest du "${productName}" für ${price} kaufen?`,
      [
        { text: 'Abbrechen', style: 'cancel' },
        { 
          text: 'Jetzt kaufen', 
          onPress: () => {
            console.log('Redirecting to payment...');
            Alert.alert('Zahlung', 'Weiterleitung zum sicheren Zahlungsgateway...');
          }
        },
      ]
    );
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView contentContainerStyle={commonStyles.scrollContent}>
        {/* Header */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.title}>Freiheits-Shop</Text>
          <Text style={commonStyles.text}>
            Entdecke Bücher, Kurse und Ressourcen, die deine Reise zur persönlichen und finanziellen Freiheit beschleunigen.
          </Text>
        </View>

        {/* Featured Products */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Empfohlene Produkte</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
            {featuredProducts.map((product) => (
              <View key={product.id} style={{
                backgroundColor: colors.card,
                borderRadius: 12,
                padding: 15,
                marginRight: 15,
                width: 250,
                boxShadow: `0px 2px 8px ${colors.shadow}`,
                elevation: 3,
              }}>
                <Image
                  source={{ uri: product.image }}
                  style={{ width: '100%', height: 120, borderRadius: 8, marginBottom: 12 }}
                  resizeMode="cover"
                />
                <Text style={[commonStyles.subtitle, { fontSize: 16, marginBottom: 8, textAlign: 'left' }]}>
                  {product.name}
                </Text>
                <Text style={[commonStyles.textLeft, { fontSize: 14, marginBottom: 12 }]}>
                  {product.description}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.primary }}>
                    {product.price}
                  </Text>
                  <TouchableOpacity
                    style={[buttonStyles.primary, { paddingHorizontal: 16, paddingVertical: 8 }]}
                    onPress={() => handlePurchase(product.name, product.price)}
                  >
                    <Text style={[buttonStyles.text, { fontSize: 14 }]}>Jetzt kaufen</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Category Filter */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Nach Kategorie durchsuchen</Text>
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

        {/* Products Grid */}
        <View style={commonStyles.section}>
          {filteredProducts.map((product) => (
            <View key={product.id} style={commonStyles.card}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={{ uri: product.image }}
                  style={{ width: 80, height: 100, borderRadius: 8, marginRight: 15 }}
                  resizeMode="cover"
                />
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.subtitle, { fontSize: 16, marginBottom: 8, textAlign: 'left' }]}>
                    {product.name}
                  </Text>
                  <Text style={[commonStyles.textLeft, { fontSize: 14, marginBottom: 12 }]}>
                    {product.description}
                  </Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.primary }}>
                      {product.price}
                    </Text>
                    <TouchableOpacity
                      style={[buttonStyles.primary, { paddingHorizontal: 16, paddingVertical: 8 }]}
                      onPress={() => handlePurchase(product.name, product.price)}
                    >
                      <Text style={[buttonStyles.text, { fontSize: 14 }]}>Jetzt kaufen</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* My Books Section */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>Meine Büchersammlung</Text>
          <Text style={commonStyles.textLeft}>
            Erkunde meine persönliche Sammlung von Büchern, die mein Verständnis von Freiheit und Erfolg geprägt haben. Jedes Buch kommt mit exklusiven Einblicken und Diskussionsleitfäden.
          </Text>
          <TouchableOpacity
            style={[buttonStyles.secondary, { marginTop: 15 }]}
            onPress={() => setSelectedCategory('books')}
          >
            <Text style={buttonStyles.textSecondary}>Alle Bücher anzeigen</Text>
          </TouchableOpacity>
        </View>

        {/* Payment Info */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>Sichere Zahlung</Text>
          <Text style={commonStyles.textLeft}>
            Wir akzeptieren PayPal, Kreditkarten und andere sichere Zahlungsmethoden. Alle Transaktionen sind verschlüsselt und geschützt.
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Text style={{ marginRight: 15, fontSize: 24 }}>💳</Text>
            <Text style={{ marginRight: 15, fontSize: 24 }}>🅿️</Text>
            <Text style={{ marginRight: 15, fontSize: 24 }}>🔒</Text>
          </View>
        </View>
      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  );
}
