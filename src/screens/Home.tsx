import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import { financialData2025, getMonthlyTotals } from '../constants/Data';
// import financialData2025, { getMonthlyTotals } from './financialData'; // Adjust import path

const Home = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');

  // Get available months
  const availableMonths = Object.keys(financialData2025);

  // Get current month data
  const currentMonthData = financialData2025[selectedMonth] || {
    incomes: {},
    outgoes: {},
    expenses: {
      snacks: [],
      food: [],
      petrol: [],
      travelling_charges: [],
      other_expenses: [],
      self_expenses: [],
      invest: [],
    },
  };

  // Calculate totals
  const monthlyTotals = getMonthlyTotals(currentMonthData);

  // Calculate yearly grand total (all months)
  const yearlyTotals = availableMonths.reduce(
    (acc, month) => {
      const monthData = financialData2025[month];
      const totals = getMonthlyTotals(monthData);
      return {
        income: acc.income + totals.totalIncome,
        expenses: acc.expenses + totals.totalExpenses,
        outgoes: acc.outgoes + totals.totalOutgoes,
      };
    },
    { income: 0, expenses: 0, outgoes: 0 },
  );

  const yearlyGrandTotal =
    yearlyTotals.income - yearlyTotals.expenses - yearlyTotals.outgoes;

  // Format currency
  const formatCurrency = amount => {
    return `₹ ${amount.toLocaleString('en-IN')}`;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Good Morning</Text>
        <Text style={styles.name}>Santhosh</Text>
      </View>

      {/* Month Selector */}
      <View style={styles.monthSelector}>
        {availableMonths.map(month => (
          <TouchableOpacity
            key={month}
            style={[
              styles.monthButton,
              selectedMonth === month && styles.selectedMonthButton,
            ]}
            onPress={() => setSelectedMonth(month)}
          >
            <Text
              style={[
                styles.monthButtonText,
                selectedMonth === month && styles.selectedMonthButtonText,
              ]}
            >
              {month}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Grand Total Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Grand Total</Text>
        <Text style={styles.sectionSubtitle}>All</Text>
      </View>

      {/* Total Cards Row */}
      <View style={styles.cardRow}>
        <View style={[styles.card, styles.grandTotalCard]}>
          <Text style={styles.cardLabel}>Grand Total</Text>
          <Text style={styles.cardYear}>2025</Text>
          <Text style={styles.cardAmount}>
            {formatCurrency(yearlyGrandTotal)}
          </Text>
        </View>

        <View style={[styles.card, styles.monthTotalCard]}>
          <Text style={styles.cardLabel}>Month Total</Text>
          <Text style={styles.cardAmount}>
            {formatCurrency(monthlyTotals.netBalance)}
          </Text>
        </View>
      </View>

      {/* Expense Categories */}
      <View style={styles.expenseGrid}>
        <View style={[styles.card, styles.expenseCard, styles.snacksCard]}>
          <Text style={styles.cardLabel}>Snacks</Text>
          <Text style={styles.cardAmount}>
            {formatCurrency(monthlyTotals.expenseTotals.snacks || 0)}
          </Text>
        </View>

        <View style={[styles.card, styles.expenseCard, styles.foodCard]}>
          <Text style={styles.cardLabel}>Food</Text>
          <Text style={styles.cardAmount}>
            {formatCurrency(monthlyTotals.expenseTotals.food || 0)}
          </Text>
        </View>

        <View style={[styles.card, styles.expenseCard, styles.petrolCard]}>
          <Text style={styles.cardLabel}>Petrol</Text>
          <Text style={styles.cardAmount}>
            {formatCurrency(monthlyTotals.expenseTotals.petrol || 0)}
          </Text>
        </View>

        <View style={[styles.card, styles.expenseCard, styles.travelCard]}>
          <Text style={styles.cardLabel}>Travel</Text>
          <Text style={styles.cardAmount}>
            {formatCurrency(
              monthlyTotals.expenseTotals.travelling_charges || 0,
            )}
          </Text>
        </View>

        <View style={[styles.card, styles.expenseCard, styles.otherCard]}>
          <Text style={styles.cardLabel}>Other</Text>
          <Text style={styles.cardAmount}>
            {formatCurrency(monthlyTotals.expenseTotals.other_expenses || 0)}
          </Text>
        </View>

        <View style={[styles.card, styles.expenseCard, styles.selfCard]}>
          <Text style={styles.cardLabel}>Self</Text>
          <Text style={styles.cardAmount}>
            {formatCurrency(monthlyTotals.expenseTotals.self_expenses || 0)}
          </Text>
        </View>
      </View>

      {/* Summary Info */}
      <View style={styles.summarySection}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Income:</Text>
          <Text style={styles.summaryValue}>
            {formatCurrency(monthlyTotals.totalIncome)}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Outgoes:</Text>
          <Text style={styles.summaryValue}>
            {formatCurrency(monthlyTotals.totalOutgoes)}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Expenses:</Text>
          <Text style={styles.summaryValue}>
            {formatCurrency(monthlyTotals.totalExpenses)}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  monthSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 5,
  },
  monthButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  selectedMonthButton: {
    backgroundColor: '#FF6B6B',
  },
  monthButtonText: {
    color: '#666',
    fontWeight: '500',
  },
  selectedMonthButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  cardRow: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  card: {
    borderRadius: 15,
    padding: 15,
    minHeight: 80,
    justifyContent: 'space-between',
  },
  grandTotalCard: {
    flex: 1.2,
    borderRadius: 15,
    // backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundColor: '#667eea',
  },
  monthTotalCard: {
    flex: 1,
    backgroundColor: '#4A90E2',
  },
  cardLabel: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.9,
  },
  cardYear: {
    color: '#FFF',
    fontSize: 10,
    opacity: 0.7,
  },
  cardAmount: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  expenseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  expenseCard: {
    width: '48%',
    minHeight: 70,
  },
  snacksCard: {
    backgroundColor: '#FF9500',
  },
  foodCard: {
    backgroundColor: '#007AFF',
  },
  petrolCard: {
    backgroundColor: '#8B4513',
  },
  travelCard: {
    backgroundColor: '#34C759',
  },
  otherCard: {
    backgroundColor: '#AF52DE',
  },
  selfCard: {
    backgroundColor: '#FF3B30',
  },
  summarySection: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Home;
