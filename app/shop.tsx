
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from '../components/BottomNavigation';

export default function ShopScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'books', name: 'Books' },
    { id: 'courses', name: 'Courses' },
    { id: 'resources', name: 'Resources' },
  ];

  const products = [
    {
      id: 1,
      name: 'Keys to Freedom - The Complete Guide',
      price: '€29.99',
      category: 'books',
      description: 'A comprehensive guide to achieving personal and financial freedom.',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
      featured: true,
    },
    {
      id: 2,
      name: 'Freedom Mindset Masterclass',
      price: '€149.99',
      category: 'courses',
      description: 'Transform your thinking and unlock your potential with this intensive course.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=400&fit=crop',
      featured: false,
    },
    {
      id: 3,
      name: 'Financial Independence Workbook',
      price: '€19.99',
      category: 'resources',
      description: 'Practical exercises and templates for building wealth and achieving financial freedom.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=400&fit=crop',
      featured: false,
    },
    {
      id: 4,
      name: 'Breaking Mental Barriers',
      price: '€24.99',
      category: 'books',
      description: 'Overcome limiting beliefs and create the life you truly desire.',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
      featured: true,
    },
    {
      id: 5,
      name: 'Entrepreneur&apos;s Freedom Blueprint',
      price: '€199.99',
      category: 'courses',
      description: 'Step-by-step system for building a business that gives you true freedom.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
      featured: false,
    },
    {
      id: 6,
      name: 'Daily Freedom Journal',
      price: '€15.99',
      category: 'resources',
      description: 'Track your progress and maintain focus on your freedom journey.',
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
      'Purchase',
      `Would you like to purchase "${productName}" for ${price}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Buy Now', 
          onPress: () => {
            console.log('Redirecting to payment...');
            Alert.alert('Payment', 'Redirecting to secure payment gateway...');
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
          <Text style={commonStyles.title}>Freedom Shop</Text>
          <Text style={commonStyles.text}>
            Discover books, courses, and resources designed to accelerate your journey to personal and financial freedom.
          </Text>
        </View>

        {/* Featured Products */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Featured Products</Text>
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
                    <Text style={[buttonStyles.text, { fontSize: 14 }]}>Buy Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Category Filter */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Browse by Category</Text>
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
                      <Text style={[buttonStyles.text, { fontSize: 14 }]}>Buy Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* My Books Section */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>My Books Collection</Text>
          <Text style={commonStyles.textLeft}>
            Explore my personal collection of books that have shaped my understanding of freedom and success. Each book comes with exclusive insights and discussion guides.
          </Text>
          <TouchableOpacity
            style={[buttonStyles.secondary, { marginTop: 15 }]}
            onPress={() => setSelectedCategory('books')}
          >
            <Text style={buttonStyles.textSecondary}>View All Books</Text>
          </TouchableOpacity>
        </View>

        {/* Payment Info */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>Secure Payment</Text>
          <Text style={commonStyles.textLeft}>
            We accept PayPal, credit cards, and other secure payment methods. All transactions are encrypted and protected.
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
