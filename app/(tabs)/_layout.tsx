import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { AC_LABELS } from '@/constants/AccessibilityLabels';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#F79000',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Basic',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
          tabBarAccessibilityLabel: AC_LABELS.HOME_TAB,
        }}
      />
      <Tabs.Screen
        name="advance"
        options={{
          title: 'Advance',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarAccessibilityLabel: AC_LABELS.ADVANCE_TAB,
        }}
      />
    </Tabs>
  );
}
