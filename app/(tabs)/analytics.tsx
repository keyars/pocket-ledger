import { useMemo } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { formatCurrency, spendingByCategory } from '../../src/domain/finance';
import { useLedgerStore } from '../../src/store/useLedgerStore';

export default function AnalyticsScreen() {
  const entries = useLedgerStore((s) => s.entries);
  const income = entries.filter((e) => e.type === 'income').reduce((n, e) => n + e.amount, 0);
  const expenses = entries.filter((e) => e.type === 'expense').reduce((n, e) => n + e.amount, 0);
  const categories = useMemo(() => spendingByCategory(entries), [entries]);
  const max = categories[0]?.[1] ?? 1;
  const savings = income ? Math.round(((income - expenses) / income) * 100) : 0;

  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.eyebrow}>ANALYTICS</Text><Text style={styles.title}>Understand your money.</Text>
    <View style={styles.summary}><Stat label="Income" value={formatCurrency(income)} /><Stat label="Spent" value={formatCurrency(expenses)} /><Stat label="Saved" value={`${Math.max(0, savings)}%`} /></View>
    <Text style={styles.section}>Spending by category</Text>
    {categories.length === 0 ? <Empty text="Add transactions to see your spending pattern." /> : categories.map(([category, value]) => <View key={category} style={styles.row}><View style={styles.rowTop}><Text style={styles.category}>{category}</Text><Text style={styles.amount}>{formatCurrency(value)}</Text></View><View style={styles.track}><View style={[styles.fill, { width: `${Math.max(5, Math.round((value / max) * 100))}%` }]} /></View></View>)}
    <View style={styles.insight}><Text style={styles.insightTitle}>Cash-flow signal</Text><Text style={styles.insightText}>{income === 0 ? 'Record your income to unlock meaningful savings and cash-flow signals.' : expenses > income ? 'Spending is currently above recorded income. Review your largest categories.' : `You are retaining ${Math.max(0, savings)}% of recorded income after expenses.`}</Text></View>
  </ScrollView></SafeAreaView>;
}
function Stat({ label, value }: { label: string; value: string }) { return <View style={styles.stat}><Text style={styles.muted}>{label}</Text><Text style={styles.statValue}>{value}</Text></View>; }
function Empty({ text }: { text: string }) { return <View style={styles.empty}><Text style={styles.muted}>{text}</Text></View>; }
const styles = StyleSheet.create({ safe:{flex:1,backgroundColor:'#F7F7F2'},container:{padding:22,gap:18},eyebrow:{fontSize:12,fontWeight:'800',letterSpacing:2,opacity:.5,paddingTop:10},title:{fontSize:29,fontWeight:'800',lineHeight:35},summary:{flexDirection:'row',gap:10},stat:{flex:1,backgroundColor:'#fff',borderRadius:18,padding:15,gap:7},muted:{fontSize:12,color:'#6F746F',lineHeight:18},statValue:{fontSize:16,fontWeight:'800'},section:{fontSize:19,fontWeight:'800',marginTop:8},row:{backgroundColor:'#fff',borderRadius:18,padding:16,gap:10},rowTop:{flexDirection:'row',justifyContent:'space-between'},category:{fontWeight:'700',fontSize:14},amount:{fontWeight:'800',fontSize:14},track:{height:8,borderRadius:4,backgroundColor:'#ECEEE9',overflow:'hidden'},fill:{height:8,borderRadius:4,backgroundColor:'#17251B'},insight:{backgroundColor:'#E8EEE9',borderRadius:22,padding:19,gap:7},insightTitle:{fontSize:16,fontWeight:'800'},insightText:{color:'#3E4941',lineHeight:20},empty:{backgroundColor:'#fff',borderRadius:18,padding:18}});