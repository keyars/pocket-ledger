import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { formatCurrency, goalProgress } from '../../src/domain/finance';
import { useLedgerStore } from '../../src/store/useLedgerStore';

export default function Goals() {
  const goals = useLedgerStore((s) => s.goals);
  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.container}><Text style={styles.eyebrow}>SAVINGS GOALS</Text><Text style={styles.title}>Make future plans visible.</Text><Text style={styles.subtitle}>Keep meaningful targets separate from everyday spending.</Text>
    {goals.length === 0 ? <View style={styles.empty}><Text style={styles.icon}>◎</Text><Text style={styles.emptyTitle}>No savings goals yet</Text><Text style={styles.emptyText}>Create goals such as an emergency fund, holiday or major purchase when the goal editor is enabled.</Text></View> : goals.map((goal) => { const progress=goalProgress(goal); return <View key={goal.id} style={styles.card}><View style={styles.row}><View><Text style={styles.name}>{goal.name}</Text><Text style={styles.meta}>{formatCurrency(goal.saved)} saved of {formatCurrency(goal.target)}</Text></View><Text style={styles.percent}>{progress}%</Text></View><View style={styles.track}><View style={[styles.fill,{width:`${progress}%`}]}/></View></View> })}
  </ScrollView></SafeAreaView>;
}
const styles=StyleSheet.create({safe:{flex:1,backgroundColor:'#F7F7F2'},container:{padding:22,gap:14,paddingBottom:30},eyebrow:{fontSize:11,fontWeight:'900',letterSpacing:2,color:'#6D746E',marginTop:8},title:{fontSize:28,lineHeight:34,fontWeight:'800',color:'#17251B'},subtitle:{color:'#697069',lineHeight:20,marginBottom:8},card:{backgroundColor:'#FFF',borderRadius:20,padding:18,gap:12},row:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},name:{fontSize:16,fontWeight:'800',color:'#17251B'},meta:{fontSize:12,color:'#7B817B',marginTop:4},percent:{fontSize:18,fontWeight:'900',color:'#17251B'},track:{height:10,borderRadius:5,backgroundColor:'#E9ECE7',overflow:'hidden'},fill:{height:10,borderRadius:5,backgroundColor:'#17251B'},empty:{marginTop:30,backgroundColor:'#FFF',borderRadius:24,padding:28,alignItems:'center',gap:8},icon:{fontSize:34,color:'#17251B'},emptyTitle:{fontSize:19,fontWeight:'800',color:'#17251B'},emptyText:{color:'#727972',lineHeight:20,textAlign:'center'}}
});
