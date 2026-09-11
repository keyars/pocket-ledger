import { useMemo, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { calculateSummary, formatCurrency, spendingByCategory } from '../../src/domain/finance';
import { categories, useLedgerStore } from '../../src/store/useLedgerStore';

const demoEntries = [
  { id: 'salary', type: 'income' as const, title: 'Monthly income', amount: 90000, category: 'Other' as const, date: new Date().toISOString(), accountId: 'cash' },
  { id: 'rent', type: 'expense' as const, title: 'Home rent', amount: 22000, category: 'Housing' as const, date: new Date().toISOString(), accountId: 'cash' },
  { id: 'groceries', type: 'expense' as const, title: 'Groceries', amount: 5400, category: 'Food' as const, date: new Date().toISOString(), accountId: 'cash' },
  { id: 'metro', type: 'expense' as const, title: 'Metro & cabs', amount: 2400, category: 'Transport' as const, date: new Date().toISOString(), accountId: 'cash' },
];

export default function Overview() {
  const entries = useLedgerStore((s) => s.entries);
  const addEntry = useLedgerStore((s) => s.addEntry);
  const accounts = useLedgerStore((s) => s.accounts);
  const data = entries.length ? entries : demoEntries;
  const summary = useMemo(() => calculateSummary(data, accounts), [data, accounts]);
  const categoriesData = useMemo(() => spendingByCategory(data).slice(0, 4), [data]);
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<(typeof categories)[number]>('Other');

  const saveExpense = () => {
    const numericAmount = Number(amount.replace(/,/g, ''));
    if (!title.trim() || !Number.isFinite(numericAmount) || numericAmount <= 0) return;
    addEntry({ type: 'expense', title: title.trim(), amount: numericAmount, category, date: new Date().toISOString(), accountId: accounts[0]?.id ?? 'cash' });
    setTitle(''); setAmount(''); setShowAdd(false);
  };

  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.container}>
    <View style={styles.header}><View><Text style={styles.eyebrow}>POCKETLEDGER</Text><Text style={styles.title}>Your money, at a glance.</Text></View><Pressable style={styles.add} onPress={() => setShowAdd(!showAdd)}><Text style={styles.addText}>＋</Text></Pressable></View>
    <View style={styles.hero}><Text style={styles.heroMuted}>Total balance</Text><Text style={styles.balance}>{formatCurrency(summary.balance)}</Text><View style={styles.heroRow}><Text style={styles.heroMeta}>{summary.savingsRate}% savings rate</Text><Text style={styles.heroMeta}>{formatCurrency(summary.netCashFlow)} net flow</Text></View></View>
    <View style={styles.metrics}><Metric label="Income" value={formatCurrency(summary.income)} /><Metric label="Spent" value={formatCurrency(summary.expenses)} /></View>
    {showAdd && <View style={styles.card}><Text style={styles.sectionTitle}>Quick expense</Text><TextInput style={styles.input} placeholder="What did you spend on?" value={title} onChangeText={setTitle}/><TextInput style={styles.input} placeholder="Amount" keyboardType="decimal-pad" value={amount} onChangeText={setAmount}/><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>{categories.map((item) => <Pressable key={item} onPress={() => setCategory(item)} style={[styles.chip, category === item && styles.chipActive]}><Text style={[styles.chipText, category === item && styles.chipTextActive]}>{item}</Text></Pressable>)}</ScrollView><Pressable style={styles.primary} onPress={saveExpense}><Text style={styles.primaryText}>Save expense</Text></Pressable></View>}
    <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Where your money goes</Text><Text style={styles.muted}>This month</Text></View>
    {categoriesData.map(([name, value]) => <View key={name} style={styles.categoryRow}><View style={styles.categoryLeft}><View style={styles.dot}/><Text style={styles.categoryName}>{name}</Text></View><Text style={styles.categoryValue}>{formatCurrency(value)}</Text></View>)}
    <View style={styles.insight}><Text style={styles.insightLabel}>POCKET INSIGHT</Text><Text style={styles.insightTitle}>{summary.netCashFlow >= 0 ? 'Your cash flow is positive.' : 'Your spending is running ahead of income.'}</Text><Text style={styles.insightText}>{summary.netCashFlow >= 0 ? `You are retaining ${formatCurrency(summary.netCashFlow)} from recorded activity. Keep fixed costs visible and protect that margin.` : 'Review recent transactions and recurring commitments before adding new spending.'}</Text></View>
  </ScrollView></SafeAreaView>;
}
function Metric({ label, value }: { label: string; value: string }) { return <View style={styles.metric}><Text style={styles.muted}>{label}</Text><Text style={styles.metricValue}>{value}</Text></View>; }
const styles = StyleSheet.create({ safe:{flex:1,backgroundColor:'#F7F7F2'}, container:{padding:22,gap:16,paddingBottom:30},header:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingTop:8},eyebrow:{fontSize:11,fontWeight:'800',letterSpacing:2,color:'#6D746E'},title:{fontSize:27,lineHeight:33,fontWeight:'800',marginTop:5,maxWidth:285,color:'#17251B'},add:{width:48,height:48,borderRadius:24,backgroundColor:'#17251B',alignItems:'center',justifyContent:'center'},addText:{color:'#FFF',fontSize:27},hero:{backgroundColor:'#17251B',borderRadius:28,padding:24,gap:6},heroMuted:{color:'#AEB9B0',fontSize:13},balance:{color:'#FFF',fontSize:36,fontWeight:'800',marginVertical:4},heroRow:{borderTopWidth:StyleSheet.hairlineWidth,borderTopColor:'#536057',paddingTop:12,flexDirection:'row',justifyContent:'space-between'},heroMeta:{color:'#D7DED8',fontSize:12},metrics:{flexDirection:'row',gap:12},metric:{flex:1,backgroundColor:'#FFF',borderRadius:20,padding:18,gap:7},metricValue:{fontSize:20,fontWeight:'800',color:'#17251B'},muted:{color:'#747A74',fontSize:12},card:{backgroundColor:'#FFF',borderRadius:22,padding:18,gap:12},sectionTitle:{fontSize:18,fontWeight:'800',color:'#17251B'},input:{borderWidth:1,borderColor:'#E1E2DE',borderRadius:14,paddingHorizontal:14,paddingVertical:13,fontSize:15,backgroundColor:'#FBFBF8'},chips:{gap:8},chip:{borderWidth:1,borderColor:'#E1E2DE',borderRadius:20,paddingHorizontal:12,paddingVertical:8},chipActive:{backgroundColor:'#17251B',borderColor:'#17251B'},chipText:{fontSize:12,fontWeight:'700',color:'#5C625C'},chipTextActive:{color:'#FFF'},primary:{backgroundColor:'#17251B',borderRadius:14,paddingVertical:14,alignItems:'center'},primaryText:{color:'#FFF',fontWeight:'800'},sectionHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'baseline',marginTop:4},categoryRow:{backgroundColor:'#FFF',borderRadius:18,padding:16,flexDirection:'row',justifyContent:'space-between',alignItems:'center'},categoryLeft:{flexDirection:'row',alignItems:'center',gap:10},dot:{width:10,height:10,borderRadius:5,backgroundColor:'#17251B'},categoryName:{fontSize:15,fontWeight:'700',color:'#252B26'},categoryValue:{fontSize:15,fontWeight:'800',color:'#17251B'},insight:{backgroundColor:'#E8EEE9',borderRadius:22,padding:20,gap:7,marginTop:2},insightLabel:{fontSize:10,fontWeight:'900',letterSpacing:1.5,color:'#6B756D'},insightTitle:{fontSize:17,fontWeight:'800',color:'#17251B'},insightText:{lineHeight:20,color:'#465149',fontSize:13}}
});
