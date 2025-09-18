
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';

const BottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', icon: 'home', route: '/' },
    { name: 'Chat', icon: 'chatbubbles', route: '/chat' },
    { name: 'Shop', icon: 'storefront', route: '/shop' },
    { name: 'Media', icon: 'library', route: '/media' },
    { name: 'Contact', icon: 'mail', route: '/contact' },
  ];

  return (
    <View style={commonStyles.bottomNavigation}>
      <View style={styles.navContainer}>
        {navItems.map((item) => {
          const isActive = pathname === item.route;
          return (
            <TouchableOpacity
              key={item.name}
              style={commonStyles.navItem}
              onPress={() => router.push(item.route)}
            >
              <Icon
                name={item.icon as any}
                size={24}
                color={isActive ? colors.primary : colors.textLight}
              />
              <Text style={isActive ? commonStyles.navTextActive : commonStyles.navText}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});

export default BottomNavigation;
