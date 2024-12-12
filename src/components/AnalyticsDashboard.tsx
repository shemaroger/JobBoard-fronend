import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

interface AnalyticsDashboardProps {
  totalSales: number;
  totalProductsSold: number;
  salesData: number[];
  dateLabels: string[];
}

const AnalyticsDashboard = ({
  totalSales,
  totalProductsSold,
  salesData,
  dateLabels,
}: AnalyticsDashboardProps) => {
  return (
    <ScrollView style={styles.container}>
      {/* KPI Section */}
      <View style={styles.kpiContainer}>
        <View style={styles.kpiBox}>
          <Text style={styles.kpiTitle}>Total Sales</Text>
          <Text style={styles.kpiValue}>${totalSales.toLocaleString()}</Text>
        </View>
        <View style={styles.kpiBox}>
          <Text style={styles.kpiTitle}>Products Sold</Text>
          <Text style={styles.kpiValue}>{totalProductsSold.toLocaleString()}</Text>
        </View>
      </View>

      {/* Sales Trends Line Chart */}
      <Text style={styles.sectionTitle}>Sales Trends</Text>
      <LineChart
        data={{
          labels: dateLabels,
          datasets: [
            {
              data: salesData,
            },
          ],
        }}
        width={screenWidth - 30} // from react-native
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{ marginVertical: 8 }}
      />

      {/* Products Sold Bar Chart */}
      <Text style={styles.sectionTitle}>Products Sold</Text>
      <BarChart
        data={{
          labels: dateLabels,
          datasets: [
            {
              data: salesData,
            },
          ],
        }}
        width={screenWidth - 30} // from react-native
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{ marginVertical: 8 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  kpiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  kpiBox: {
    alignItems: 'center',
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    margin: 5,
  },
  kpiTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  kpiValue: {
    fontSize: 18,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
});

export default AnalyticsDashboard;