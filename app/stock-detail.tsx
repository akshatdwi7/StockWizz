import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import {
  TrendingUp,
  TrendingDown,
  ArrowLeft,
  Info,
  DollarSign,
  BarChart3,
  TrendingUp as Growth,
  FileText,
  Users,
} from "lucide-react-native";
import { LineChart } from "react-native-chart-kit";

const { width } = Dimensions.get("window");

// Add these interfaces at the top of the file
interface SectionTitleProps {
  title: string;
  icon: React.ReactNode;
}

interface StatementRowProps {
  title: string;
  values: string[];
  growth?: number[];
}

interface RatioSectionProps {
  title: string;
  children: React.ReactNode;
}

interface RatioItemProps {
  title: string;
  value: string;
  benchmark: string;
}

interface PeerRowProps {
  company: string;
  value: string;
  change: string;
  isHighest?: boolean;
}

interface NewsItemProps {
  title: string;
  source: string;
  time: string;
}

interface KeyInfoItemProps {
  title: string;
  value: string;
}

interface MetricItemProps {
  title: string;
  value: string;
}

export default function StockDetailScreen() {
  const { symbol, name, logo, price, change } = useLocalSearchParams();
  const router = useRouter();
  const [timeframe, setTimeframe] = useState("1D");
  const [activeTab, setActiveTab] = useState("overview");

  // Sample chart data
  const chartData = {
    labels: ["9:30", "11:30", "1:30", "3:30"],
    datasets: [
      {
        data: [
          Number(price) - 5,
          Number(price) - 2,
          Number(price) + 3,
          Number(price),
        ],
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView>
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ArrowLeft size={24} color="#333" />
          </TouchableOpacity>
          <View style={styles.stockInfo}>
            <Image source={{ uri: logo as string }} style={styles.stockLogo} />
            <View>
              <Text style={styles.stockName}>{name}</Text>
              <Text style={styles.stockSymbol}>{symbol}</Text>
            </View>
          </View>
        </View>

        {/* Price Section */}
        <View style={styles.priceSection}>
          <Text style={styles.price}>${price}</Text>
          <View
            style={[
              styles.changeContainer,
              {
                backgroundColor: Number(change) > 0 ? "#E7F9F0" : "#FDEEEE",
              },
            ]}
          >
            {Number(change) > 0 ? (
              <TrendingUp size={16} color="#00C087" />
            ) : (
              <TrendingDown size={16} color="#FF4D4F" />
            )}
            <Text
              style={[
                styles.changeText,
                {
                  color: Number(change) > 0 ? "#00C087" : "#FF4D4F",
                },
              ]}
            >
              {Number(change) > 0 ? "+" : ""}
              {change}%
            </Text>
          </View>
        </View>

        {/* Chart Section */}
        <View style={styles.chartSection}>
          <View style={styles.timeframeButtons}>
            {["1D", "1W", "1M", "3M", "1Y", "All"].map((tf) => (
              <TouchableOpacity
                key={tf}
                style={[
                  styles.timeframeButton,
                  timeframe === tf && styles.timeframeButtonActive,
                ]}
                onPress={() => setTimeframe(tf)}
              >
                <Text
                  style={[
                    styles.timeframeText,
                    timeframe === tf && styles.timeframeTextActive,
                  ]}
                >
                  {tf}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <LineChart
            data={chartData}
            width={width - 40}
            height={220}
            chartConfig={{
              backgroundColor: "#FFF",
              backgroundGradientFrom: "#FFF",
              backgroundGradientTo: "#FFF",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(108, 92, 231, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>

        {/* Navigation Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabContainer}
          contentContainerStyle={styles.tabContentContainer}
        >
          {[
            "overview",
            "financials",
            "statements",
            "ratios",
            "peers",
            "technicals",
            "news",
          ].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <View style={styles.tabContent}>
            <CompanyOverview />
          </View>
        )}

        {activeTab === "financials" && (
          <View style={styles.tabContent}>
            <FinancialMetrics />
          </View>
        )}

        {activeTab === "statements" && (
          <View style={styles.tabContent}>
            <FinancialStatements />
          </View>
        )}

        {activeTab === "ratios" && (
          <View style={styles.tabContent}>
            <FinancialRatios />
          </View>
        )}

        {activeTab === "peers" && (
          <View style={styles.tabContent}>
            <PeerComparison />
          </View>
        )}

        {activeTab === "technicals" && (
          <View style={styles.tabContent}>
            <TechnicalIndicators />
          </View>
        )}

        {activeTab === "news" && (
          <View style={styles.tabContent}>
            <StockNews />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// Component for Company Overview
const CompanyOverview = () => (
  <View>
    <SectionTitle
      title="About Company"
      icon={<Info size={20} color="#6C5CE7" />}
    />
    <Text style={styles.descriptionText}>
      {/* Replace with actual company description */}
      Leading technology company specializing in consumer electronics, software,
      and services.
    </Text>

    <View style={styles.keyInfoGrid}>
      <KeyInfoItem title="Sector" value="Technology" />
      <KeyInfoItem title="Industry" value="Consumer Electronics" />
      <KeyInfoItem title="Founded" value="1976" />
      <KeyInfoItem title="Employees" value="154,000" />
    </View>
  </View>
);

// Component for Financial Metrics
const FinancialMetrics = () => (
  <View>
    <SectionTitle
      title="Financial Metrics"
      icon={<DollarSign size={20} color="#6C5CE7" />}
    />

    <View style={styles.metricsContainer}>
      <MetricItem title="Market Cap" value="$2.8T" />
      <MetricItem title="P/E Ratio" value="28.5" />
      <MetricItem title="Revenue (TTM)" value="$394.3B" />
      <MetricItem title="EPS (TTM)" value="$6.13" />
      <MetricItem title="Dividend Yield" value="0.52%" />
      <MetricItem title="Profit Margin" value="25.3%" />
      <MetricItem title="ROE" value="145.3%" />
      <MetricItem title="Debt to Equity" value="1.52" />
    </View>
  </View>
);

// Financial Statements Component
const FinancialStatements = () => {
  const [statementType, setStatementType] = useState("income"); // income, balance, cash

  return (
    <View>
      <SectionTitle
        title="Financial Statements"
        icon={<FileText size={20} color="#6C5CE7" />}
      />

      {/* Statement Type Selector */}
      <View style={styles.statementTypeContainer}>
        {["income", "balance", "cash"].map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.statementTypeButton,
              statementType === type && styles.statementTypeActive,
            ]}
            onPress={() => setStatementType(type)}
          >
            <Text
              style={[
                styles.statementTypeText,
                statementType === type && styles.statementTypeTextActive,
              ]}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Statement Data */}
      {statementType === "income" && (
        <View style={styles.statementTable}>
          <StatementRow
            title="Revenue"
            values={["394.3B", "365.8B", "274.5B"]}
            growth={[7.8, 33.2]}
          />
          <StatementRow
            title="Gross Profit"
            values={["170.7B", "152.8B", "104.9B"]}
            growth={[11.7, 45.6]}
          />
          <StatementRow
            title="Operating Income"
            values={["119.4B", "108.9B", "66.3B"]}
            growth={[9.6, 64.2]}
          />
          <StatementRow
            title="Net Income"
            values={["96.9B", "94.7B", "57.4B"]}
            growth={[2.3, 65.0]}
          />
        </View>
      )}

      {/* Add similar sections for balance sheet and cash flow */}
    </View>
  );
};

// Financial Ratios Component
const FinancialRatios = () => {
  return (
    <View>
      <SectionTitle
        title="Financial Ratios"
        icon={<BarChart3 size={20} color="#6C5CE7" />}
      />

      {/* Profitability Ratios */}
      <RatioSection title="Profitability">
        <RatioItem title="Gross Margin" value="43.3%" benchmark="41.2%" />
        <RatioItem title="Operating Margin" value="30.3%" benchmark="28.7%" />
        <RatioItem title="Net Margin" value="24.6%" benchmark="23.1%" />
        <RatioItem title="ROE" value="145.3%" benchmark="132.8%" />
        <RatioItem title="ROA" value="27.5%" benchmark="25.9%" />
      </RatioSection>

      {/* Liquidity Ratios */}
      <RatioSection title="Liquidity">
        <RatioItem title="Current Ratio" value="1.43" benchmark="1.38" />
        <RatioItem title="Quick Ratio" value="1.27" benchmark="1.22" />
        <RatioItem title="Cash Ratio" value="0.85" benchmark="0.76" />
      </RatioSection>

      {/* Efficiency Ratios */}
      <RatioSection title="Efficiency">
        <RatioItem title="Asset Turnover" value="0.89" benchmark="0.83" />
        <RatioItem title="Inventory Turnover" value="64.2" benchmark="58.7" />
        <RatioItem title="Receivables Turnover" value="12.8" benchmark="11.5" />
      </RatioSection>
    </View>
  );
};

// Peer Comparison Component
const PeerComparison = () => {
  const [metric, setMetric] = useState("marketCap");

  return (
    <View>
      <SectionTitle
        title="Peer Comparison"
        icon={<Users size={20} color="#6C5CE7" />}
      />

      {/* Metric Selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.metricSelector}
      >
        {[
          { id: "marketCap", label: "Market Cap" },
          { id: "peRatio", label: "P/E Ratio" },
          { id: "revenue", label: "Revenue" },
          { id: "netMargin", label: "Net Margin" },
          { id: "roe", label: "ROE" },
        ].map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.metricButton,
              metric === item.id && styles.metricButtonActive,
            ]}
            onPress={() => setMetric(item.id)}
          >
            <Text
              style={[
                styles.metricButtonText,
                metric === item.id && styles.metricButtonTextActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Peer Comparison Table */}
      <View style={styles.peerTable}>
        <PeerRow company="AAPL" value="2.8T" change="+1.2%" isHighest={true} />
        <PeerRow company="MSFT" value="2.7T" change="+0.8%" />
        <PeerRow company="GOOGL" value="1.7T" change="-0.5%" />
        <PeerRow company="AMZN" value="1.5T" change="+1.5%" />
      </View>
    </View>
  );
};

// Component for Technical Indicators
const TechnicalIndicators = () => (
  <View>
    <SectionTitle
      title="Technical Indicators"
      icon={<BarChart3 size={20} color="#6C5CE7" />}
    />

    <View style={styles.metricsContainer}>
      <MetricItem title="RSI (14)" value="65.42" />
      <MetricItem title="MACD" value="2.45" />
      <MetricItem title="50 DMA" value="$184.32" />
      <MetricItem title="200 DMA" value="$176.89" />
      <MetricItem title="Volume" value="52.4M" />
      <MetricItem title="Beta" value="1.23" />
    </View>
  </View>
);

// Component for Stock News
const StockNews = () => (
  <View>
    <SectionTitle
      title="Latest News"
      icon={<Growth size={20} color="#6C5CE7" />}
    />

    {/* Add your news items here */}
    <NewsItem
      title="Q1 Earnings Beat Expectations"
      source="Bloomberg"
      time="2 hours ago"
    />
  </View>
);

// Helper Components
const SectionTitle: React.FC<SectionTitleProps> = ({ title, icon }) => (
  <View style={styles.sectionTitleContainer}>
    {icon}
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

const KeyInfoItem: React.FC<KeyInfoItemProps> = ({ title, value }) => (
  <View style={styles.keyInfoItem}>
    <Text style={styles.keyInfoTitle}>{title}</Text>
    <Text style={styles.keyInfoValue}>{value}</Text>
  </View>
);

const MetricItem: React.FC<MetricItemProps> = ({ title, value }) => (
  <View style={styles.metricItem}>
    <Text style={styles.metricTitle}>{title}</Text>
    <Text style={styles.metricValue}>{value}</Text>
  </View>
);

const NewsItem: React.FC<NewsItemProps> = ({ title, source, time }) => (
  <TouchableOpacity style={styles.newsItem}>
    <Text style={styles.newsSource}>{source}</Text>
    <Text style={styles.newsTitle}>{title}</Text>
    <Text style={styles.newsTime}>{time}</Text>
  </TouchableOpacity>
);

const StatementRow: React.FC<StatementRowProps> = ({
  title,
  values,
  growth,
}) => (
  <View style={styles.statementRow}>
    <Text style={styles.statementTitle}>{title}</Text>
    <View style={styles.statementValues}>
      {values.map((value, index) => (
        <View key={index} style={styles.valueContainer}>
          <Text style={styles.statementValue}>{value}</Text>
          {growth && index < growth.length && (
            <Text
              style={[
                styles.growthText,
                { color: growth[index] > 0 ? "#00C087" : "#FF4D4F" },
              ]}
            >
              {growth[index] > 0 ? "+" : ""}
              {growth[index]}%
            </Text>
          )}
        </View>
      ))}
    </View>
  </View>
);

const RatioSection: React.FC<RatioSectionProps> = ({ title, children }) => (
  <View style={styles.ratioSection}>
    <Text style={styles.ratioSectionTitle}>{title}</Text>
    {children}
  </View>
);

const RatioItem: React.FC<RatioItemProps> = ({ title, value, benchmark }) => (
  <View style={styles.ratioItem}>
    <Text style={styles.ratioTitle}>{title}</Text>
    <View style={styles.ratioValues}>
      <Text style={styles.ratioValue}>{value}</Text>
      <Text style={styles.ratioBenchmark}>Industry: {benchmark}</Text>
    </View>
  </View>
);

const PeerRow: React.FC<PeerRowProps> = ({
  company,
  value,
  change,
  isHighest,
}) => (
  <View style={styles.peerRow}>
    <Text style={styles.peerCompany}>{company}</Text>
    <View style={styles.peerValues}>
      <Text style={[styles.peerValue, isHighest && styles.highestValue]}>
        {value}
      </Text>
      <Text
        style={[
          styles.peerChange,
          { color: change.startsWith("+") ? "#00C087" : "#FF4D4F" },
        ]}
      >
        {change}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 15,
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
    fontSize: 18,
    color: "#333",
  },
  stockSymbol: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#666",
  },
  priceSection: {
    padding: 20,
  },
  price: {
    fontFamily: "Poppins-Bold",
    fontSize: 32,
    color: "#333",
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  changeText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    marginLeft: 6,
  },
  chartSection: {
    padding: 20,
  },
  timeframeButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  timeframeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  timeframeButtonActive: {
    backgroundColor: "#6C5CE7",
  },
  timeframeText: {
    fontFamily: "Inter-Medium",
    fontSize: 12,
    color: "#666",
  },
  timeframeTextActive: {
    color: "#FFF",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  tabContainer: {
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#6C5CE7",
  },
  tabText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    color: "#6C5CE7",
  },
  tabContent: {
    padding: 20,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#333",
    marginLeft: 8,
  },
  descriptionText: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  keyInfoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -6,
  },
  keyInfoItem: {
    width: (width - 52) / 2,
    padding: 12,
    backgroundColor: "#FFF",
    borderRadius: 12,
    margin: 6,
  },
  keyInfoTitle: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  keyInfoValue: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#333",
  },
  metricsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -6,
  },
  metricItem: {
    width: (width - 52) / 2,
    padding: 12,
    backgroundColor: "#FFF",
    borderRadius: 12,
    margin: 6,
  },
  metricTitle: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  metricValue: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#333",
  },
  newsItem: {
    padding: 16,
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 12,
  },
  newsSource: {
    fontFamily: "Inter-Medium",
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  newsTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  newsTime: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#666",
  },
  statementTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  statementTypeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statementTypeActive: {
    backgroundColor: "#6C5CE7",
  },
  statementTypeText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: "#666",
  },
  statementTypeTextActive: {
    color: "#FFF",
  },
  statementTable: {
    marginBottom: 16,
  },
  statementRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  statementTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: "#333",
  },
  statementValues: {
    flexDirection: "row",
  },
  valueContainer: {
    alignItems: "flex-end",
    marginLeft: 16,
  },
  statementValue: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#333",
  },
  growthText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
  },
  ratioSection: {
    marginBottom: 16,
  },
  ratioSectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  ratioItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  ratioTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: "#333",
  },
  ratioValues: {
    alignItems: "flex-end",
  },
  ratioValue: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#333",
  },
  ratioBenchmark: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#666",
  },
  metricSelector: {
    marginBottom: 16,
  },
  metricButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  metricButtonActive: {
    backgroundColor: "#6C5CE7",
  },
  metricButtonText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: "#666",
  },
  metricButtonTextActive: {
    color: "#FFF",
  },
  peerTable: {
    marginBottom: 16,
  },
  peerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  peerCompany: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: "#333",
  },
  peerValues: {
    alignItems: "flex-end",
  },
  peerValue: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#333",
  },
  highestValue: {
    color: "#00C087",
  },
  peerChange: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
  },
  tabContentContainer: {
    paddingHorizontal: 10,
  },
});
