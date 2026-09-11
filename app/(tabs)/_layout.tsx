import { Tabs } from 'expo-router';
import { Text } from 'react-native';

const icons: Record<string, string> = { index: '⌂', transactions: '↕', budgets: '◴', goals: '◎' };

export default function TabLayout() {
  return (
    <Tabs screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: '#17251B',
      tabBarInactiveTintColor: '#929790',
      tabBarStyle: { height: 78, paddingTop: 8, paddingBottom: 14, borderTopColor: '#E6E8E2', backgroundColor: '#FFF' },
      tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
      tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>{icons[route.name] ?? '•'}</Text>,
    })}>
      <Tabs.Screen name="index" options={{ title: 'Overview' }} />
      <Tabs.Screen name="transactions" options={{ title: 'Activity' }} />
      <Tabs.Screen name="budgets" options={{ title: 'Budgets' }} />
      <Tabs.Screen name="goals" options={{ title: 'Goals' }} />
    </Tabs>
  );
}
