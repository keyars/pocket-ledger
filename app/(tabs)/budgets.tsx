import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { budgetProgress, formatCurrency } from '../../src/domain/finance';
import { useLedgerStore } from '../../src/store/useLedgerStore';

export default function Budgets() {
  const budgets = useLedgerStore((s) => s.budgets);
  const entries = useLedgerStore((s) => s.entries);
  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.container}><Text style={styles.eyebrow}>BUDGETS</Text><Text style={styles.title}>Give your spending a boundary.</Text><Text style={styles.subtitle}>Track category limits without connecting a bank account.</Text>
    {budgets.length === 0 ? <View style={styles.empty}><Text style={styles.emptyTitle}>No budgets yet</Text><Text style={styles.emptyText}>Budgets will turn your spending history into clear monthly guardrails.</Text></View> : budgets.map((budget) => { const progress = budgetProgress(budget, entries); return <View style={styles.card} key={budget.id}><View style={styles.row}><View><Text style={styles.name}>{budget.category}</Text><Text style={styles.meta}>{budget.month}</Text></View><Text style={styles.value}>{formatCurrency(progress.remaining)} left</Text></View><View style={styles.track}><View style={[styles.fill,{width:`${progress.percent}%`}]}/></View><Text style={styles.meta}>{formatCurrency(progress.spent)} of {formatCurrency(budget.limit)} used</Text></View> })}
  </ScrollView></SafeAreaView>;
}
const styles=StyleSheet.create({safe:{flex:1,backgroundColor:'#F7F7F2'},container:{padding:22,gap:14,paddingBottom:30},eyebrow:{fontSize:11,fontWeight:'900',letterSpacing:2,color:'#6D746E',marginTop:8},title:{fontSize:28,lineHeight:34,fontWeight:'800',color:'#17251B'},subtitle:{color:'#697069',lineHeight:20,marginBottom:8},card:{backgroundColor:'#FFF',borderRadius:20,padding:18,gap:10},row:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},name:{fontSize:16,fontWeight:'800',color:'#17251B'},value:{fontSize:14,fontWeight:'900',color:'#17251B'},meta:{fontSize:12,color:'#7B817B'},track:{height:10,borderRadius:5,backgroundColor:'#E9ECE7',overflow:'hidden'},fill:{height:10,borderRadius:5,backgroundColor:'#17251B'},empty:{marginTop:30,backgroundColor:'#FFF',borderRadius:24,padding:28,gap:8},emptyTitle:{fontSize:19,fontWeight:'800',color:'#17251B'},emptyText:{color:'#727972',lineHeight:20}}
});
