import { useMemo, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useLedgerStore } from '../src/store/useLedgerStore';
import { calculateSummary, formatCurrency, spendingByCategory, type Category } from '../src/domain/finance';

const demoEntries = [
  { id: 'salary', type: 'income' as const, title: 'Monthly income', amount: 90000, category: 'Other' as Category, date: new Date().toISOString() },
  { id: 'rent', type: 'expense' as const, title: 'Home rent', amount: 22000, category: 'Housing' as Category, date: new Date().toISOString() },
  { id: 'groceries', type: 'expense' as const, title: 'Groceries', amount: 5400, category: 'Food' as Category, date: new Date().toISOString() },
  { id: 'metro', type: 'expense' as const, title: 'Metro & cabs', amount: 2400, category: 'Transport' as Category, date: new Date().toISOString() },
];

export default function HomeScreen() {
  const entries = useLedgerStore((state) => state.entries);
  const addEntry = useLedgerStore((state) => state.addEntry);
  const data = entries.length ? entries : demoEntries;
  const summary = useMemo(() => calculateSummary(data), [data]);
  const categories = useMemo(() => spendingByCategory(data).slice(0, 4), [data]);
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const saveExpense = () => {
    const numericAmount = Number(amount.replace(/,/g, ''));
    if (!title.trim() || !Number.isFinite(numericAmount) || numericAmount <= 0) return;
    addEntry({ type: 'expense', title: title.trim(), amount: numericAmount, category: 'Other', date: new Date().toISOString() });
    setTitle('');
    setAmount('');
    setShowAdd(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>POCKETLEDGER</Text>
            <Text style={styles.title}>Your money, at a glance.</Text>
          </View>
          <Pressable style={styles.addButton} onPress={() => setShowAdd((value) => !value)} accessibilityRole="button" accessibilityLabel="Add expense">
            <Text style={styles.addButtonText}>＋</Text>
          </Pressable>
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.muted}>Available balance</Text>
          <Text style={styles.balance}>{formatCurrency(summary.balance)}</Text>
          <View style={styles.heroFooter}>
            <Text style={styles.heroMeta}>Saved {summary.savingsRate}% of income</Text>
            <Text style={styles.heroMeta}>{formatCurrency(summary.expenses)} spent</Text>
          </View>
        </View>

        <View style={styles.metricsRow}>
          <Metric label="Income" value={formatCurrency(summary.income)} />
          <Metric label="Expenses" value={formatCurrency(summary.expenses)} />
        </View>

        {showAdd && (
          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Add an expense</Text>
            <TextInput style={styles.input} placeholder="What did you spend on?" value={title} onChangeText={setTitle} />
            <TextInput style={styles.input} placeholder="Amount" keyboardType="decimal-pad" value={amount} onChangeText={setAmount} />
            <Pressable style={styles.saveButton} onPress={saveExpense} accessibilityRole="button">
              <Text style={styles.saveButtonText}>Save expense</Text>
            </Pressable>
          </View>
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Where your money goes</Text>
          <Text style={styles.muted}>Top categories</Text>
        </View>
        {categories.map(([category, value]) => (
          <View key={category} style={styles.categoryRow}>
            <View style={styles.categoryLabelWrap}>
              <View style={styles.dot} />
              <Text style={styles.categoryName}>{category}</Text>
            </View>
            <Text style={styles.categoryValue}>{formatCurrency(value)}</Text>
          </View>
        ))}

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>Money insight</Text>
          <Text style={styles.tipText}>
            {summary.balance >= 0
              ? `You are currently keeping ${summary.savingsRate}% of recorded income after expenses.`
              : 'Expenses are ahead of recorded income. Review your recent spending before adding new commitments.'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.muted}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F7F2' },
  container: { padding: 22, gap: 18 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10 },
  eyebrow: { fontSize: 12, fontWeight: '800', letterSpacing: 2, opacity: 0.5 },
  title: { fontSize: 28, lineHeight: 34, fontWeight: '800', marginTop: 6, maxWidth: 285 },
  addButton: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: '#17251B' },
  addButtonText: { color: '#fff', fontSize: 28, lineHeight: 30 },
  heroCard: { backgroundColor: '#17251B', borderRadius: 28, padding: 24, gap: 8 },
  balance: { color: '#fff', fontSize: 36, fontWeight: '800', marginVertical: 6 },
  muted: { color: '#6F746F', fontSize: 13 },
  heroFooter: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, paddingTop: 10, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: 'rgba(255,255,255,0.2)' },
  heroMeta: { color: '#D7DED8', fontSize: 12 },
  metricsRow: { flexDirection: 'row', gap: 14 },
  metricCard: { flex: 1, backgroundColor: '#fff', borderRadius: 20, padding: 18, gap: 8 },
  metricValue: { fontSize: 21, fontWeight: '800' },
  formCard: { backgroundColor: '#fff', borderRadius: 22, padding: 18, gap: 12 },
  input: { borderWidth: 1, borderColor: '#E1E2DE', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 13, fontSize: 15, backgroundColor: '#FBFBF8' },
  saveButton: { borderRadius: 14, paddingVertical: 14, alignItems: 'center', backgroundColor: '#17251B' },
  saveButtonText: { color: '#fff', fontWeight: '800' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  sectionTitle: { fontSize: 18, fontWeight: '800' },
  categoryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderRadius: 18, padding: 16 },
  categoryLabelWrap: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#17251B' },
  categoryName: { fontSize: 15, fontWeight: '700' },
  categoryValue: { fontSize: 15, fontWeight: '800' },
  tipCard: { borderRadius: 22, padding: 20, backgroundColor: '#E8EEE9', gap: 8, marginBottom: 20 },
  tipTitle: { fontSize: 16, fontWeight: '800' },
  tipText: { lineHeight: 20, color: '#3E4941' },
});
