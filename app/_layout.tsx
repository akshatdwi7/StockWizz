import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import {
  Chrome as Home,
  Search,
  ChartLine as LineChart,
  ChartPie as PieChart,
  User,
  Zap,
  HomeIcon,
  Lightbulb,
  AirVent,
  LightbulbIcon,
  Plus,
  TouchpadOffIcon,
  TornadoIcon,
  ZapOff,
  LogOutIcon,
  Bluetooth,
  Eye,
} from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "#6C5CE7",
        tabBarInactiveTintColor: "#A0A0A0",
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <HomeIcon size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ai"
        options={{
          title: "Pro Tools",
          tabBarIcon: ({ color, size }) => (
            <LightbulbIcon size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="watchlist"
        options={{
          title: "Watchlist",
          tabBarIcon: ({ color, size }) => (
            <LineChart size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="portfolio"
        options={{
          title: "Portfolio",
          tabBarIcon: ({ color, size }) => (
            <PieChart size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 74,
    paddingBottom: 20,
  },
  tabBarLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
  },
});
