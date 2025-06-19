import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Vibration,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  TrendingUp,
  TrendingDown,
  Bell,
  ArrowRight,
  Zap,
  ChartBar as BarChart3,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <StatusBar style="dark" />
          <View>
            <Text style={styles.greeting}>Good morning :)</Text>
            <Text style={styles.username}>Akshat</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#333" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Portfolio Summary */}
        <LinearGradient
          colors={["#6C5CE7", "#8E7CF3"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.portfolioCard}
        >
          <View style={styles.portfolioHeader}>
            <Text style={styles.portfolioTitle}>Your Portfolio</Text>
            <Text style={styles.portfolioDate}>March 5, 2025</Text>
          </View>
          <Text style={styles.portfolioValue}>₹9,24,685.75</Text>
          <View style={styles.portfolioChange}>
            <TrendingUp size={20} color="#FFFFFF" />
            <Text style={styles.changeText}>+₹12,234.56 (5.2%)</Text>
          </View>
          <TouchableOpacity style={styles.viewDetailsButton}>
            <Text style={styles.viewDetailsText}>View Details</Text>
            <ArrowRight size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </LinearGradient>

        {/* Market Trends */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Market Trends</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.trendsScrollView}
        >
          {marketTrends.map((trend, index) => (
            <TouchableOpacity
              key={index}
              style={styles.trendCard}
              onPress={() =>
                router.push({
                  pathname: "/stock-detail",
                  params: {
                    symbol: trend.symbol,
                    name: trend.name,
                    logo: trend.logo,
                    price: trend.price,
                    change: trend.change,
                  },
                })
              }
            >
              <View style={styles.trendHeader}>
                <Image source={{ uri: trend.logo }} style={styles.trendLogo} />
                <Text style={styles.trendSymbol}>{trend.symbol}</Text>
              </View>
              <Text style={styles.trendPrice}>${trend.price}</Text>
              <View
                style={[
                  styles.trendChange,
                  { backgroundColor: trend.change > 0 ? "#E7F9F0" : "#FDEEEE" },
                ]}
              >
                {trend.change > 0 ? (
                  <TrendingUp size={12} color="#00C087" />
                ) : (
                  <TrendingDown size={12} color="#FF4D4F" />
                )}
                <Text
                  style={[
                    styles.trendChangeText,
                    { color: trend.change > 0 ? "#00C087" : "#FF4D4F" },
                  ]}
                >
                  {trend.change > 0 ? "+" : ""}
                  {trend.change}%
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* AI Insights */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Zap size={18} color="#6C5CE7" />
            <Text style={styles.sectionTitle}>
              Ai Insights about your stocks 🔎
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.insightsContainer}>
          {aiInsights.map((insight, index) => (
            <TouchableOpacity key={index} style={styles.insightCard}>
              <View style={styles.insightIconContainer}>
                <BarChart3 size={20} color="#6C5CE7" />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>{insight.title}</Text>
                <Text style={styles.insightDescription}>
                  {insight.description}
                </Text>
              </View>
              <ArrowRight size={16} color="#6C5CE7" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Watchlist Preview */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Watchlist</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.watchlistContainer}>
          {watchlistStocks.map((stock, index) => (
            <TouchableOpacity key={index} style={styles.watchlistItem}>
              <View style={styles.stockInfo}>
                <Image source={{ uri: stock.logo }} style={styles.stockLogo} />
                <View>
                  <Text style={styles.stockName}>{stock.name}</Text>
                  <Text style={styles.stockSymbol}>{stock.symbol}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.stockPrice}>${stock.price}</Text>
                <View style={styles.stockChangeContainer}>
                  {stock.change > 0 ? (
                    <TrendingUp size={12} color="#00C087" />
                  ) : (
                    <TrendingDown size={12} color="#FF4D4F" />
                  )}
                  <Text
                    style={[
                      styles.stockChangeText,
                      { color: stock.change > 0 ? "#00C087" : "#FF4D4F" },
                    ]}
                  >
                    {stock.change > 0 ? "+" : ""}
                    {stock.change}%
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* News Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Latest News</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.newsContainer}>
          {newsItems.map((news, index) => (
            <TouchableOpacity key={index} style={styles.newsItem}>
              <Image source={{ uri: news.image }} style={styles.newsImage} />
              <View style={styles.newsContent}>
                <Text style={styles.newsSource}>{news.source}</Text>
                <Text style={styles.newsTitle}>{news.title}</Text>
                <Text style={styles.newsTime}>{news.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom padding */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// Sample data
const marketTrends = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=100&auto=format&fit=crop",
    price: "189.84",
    change: 1.25,
  },
  {
    symbol: "MSFT",
    name: "Microsoft",
    logo: "https://images.unsplash.com/photo-1583339793403-3d9b001b6008?q=80&w=100&auto=format&fit=crop",
    price: "415.50",
    change: 0.75,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet",
    logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=100&auto=format&fit=crop",
    price: "175.20",
    change: -0.32,
  },
  {
    symbol: "AMZN",
    name: "Amazon",
    logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?q=80&w=100&auto=format&fit=crop",
    price: "182.30",
    change: 2.15,
  },
  {
    symbol: "TSLA",
    name: "Tesla",
    logo: "https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=100&auto=format&fit=crop",
    price: "177.50",
    change: -1.45,
  },
];

const aiInsights = [
  {
    title: "Tech Sector Analysis",
    description: "AI predicts 12% growth in tech sector over next quarter",
  },
  {
    title: "Fundamental Analaysis",
    description: "Mrs Bector Foods Shows Good ROE AND ROCE% ",
  },
  {
    title: "Market Volatility Alert",
    description: "Increased volatility expected due to upcoming SEBI meeting",
  },
];

const watchlistStocks = [
  {
    symbol: "NVDA",
    name: "NVIDIA",
    logo: "https://images.unsplash.com/photo-1551808525-51a94da548ce?q=80&w=100&auto=format&fit=crop",
    price: "950.02",
    change: 3.45,
  },
  {
    symbol: "META",
    name: "Meta Platforms",
    logo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=100&auto=format&fit=crop",
    price: "487.95",
    change: 1.23,
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase",
    logo: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?q=80&w=100&auto=format&fit=crop",
    price: "198.45",
    change: -0.78,
  },
];

const newsItems = [
  {
    source: "Bloomberg",
    title: "Fed Signals Potential Rate Cut in September Meeting",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=200&auto=format&fit=crop",
    time: "2 hours ago",
  },
  {
    source: "CNBC",
    title: "NVIDIA Unveils Next-Gen AI Chips, Stock Surges 5%",
    image:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=200&auto=format&fit=crop",
    time: "4 hours ago",
  },
  {
    source: "Wall Street Journal",
    title: "Tech Giants Face New Antitrust Regulations in EU",
    image:
      "https://images.unsplash.com/photo-1491336477066-31156b5e4f35?q=80&w=200&auto=format&fit=crop",
    time: "6 hours ago",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  greeting: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#666",
  },
  username: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: "#333",
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF4D4F",
  },
  portfolioCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  portfolioHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  portfolioTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#FFF",
  },
  portfolioDate: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
  },
  portfolioValue: {
    fontFamily: "Poppins-Bold",
    fontSize: 28,
    color: "#FFF",
    marginBottom: 5,
  },
  portfolioChange: {
    flexDirection: "row",
    alignItems: "center",
  },
  changeText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: "#FFF",
    marginLeft: 5,
  },
  viewDetailsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 15,
  },
  viewDetailsText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: "#FFF",
    marginRight: 5,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
    marginTop: 5,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#333",
    marginLeft: 5,
  },
  seeAllText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: "#6C5CE7",
  },
  trendsScrollView: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  trendCard: {
    width: 120,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  trendHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  trendLogo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6,
  },
  trendSymbol: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#333",
  },
  trendPrice: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  trendChange: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  trendChangeText: {
    fontFamily: "Inter-Medium",
    fontSize: 12,
    marginLeft: 4,
  },
  insightsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  insightCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  insightIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(108, 92, 231, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
  },
  insightDescription: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#666",
  },
  watchlistContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  watchlistItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  stockInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  stockLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  stockName: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#333",
  },
  stockSymbol: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#666",
  },
  stockPrice: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#333",
    textAlign: "right",
  },
  stockChangeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  stockChangeText: {
    fontFamily: "Inter-Medium",
    fontSize: 12,
    marginLeft: 4,
  },
  newsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  newsItem: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  newsImage: {
    width: 100,
    height: 100,
  },
  newsContent: {
    flex: 1,
    padding: 12,
  },
  newsSource: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    color: "#6C5CE7",
    marginBottom: 4,
  },
  newsTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  newsTime: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#999",
  },
});
