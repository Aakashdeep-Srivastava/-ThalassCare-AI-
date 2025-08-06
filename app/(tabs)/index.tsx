import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, CircleAlert as AlertCircle, Calendar, Pill, Activity, Shield } from 'lucide-react-native';

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <LinearGradient
          colors={['#2563EB', '#1D4ED8']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>Good morning!</Text>
            <Text style={styles.userName}>Sarah Johnson</Text>
            <Text style={styles.subtitle}>Let's monitor your health today</Text>
          </View>
        </LinearGradient>

        {/* AI Insights Card */}
        <View style={styles.aiCard}>
          <View style={styles.aiHeader}>
            <Shield size={24} color="#059669" />
            <Text style={styles.aiTitle}>AI Health Insights</Text>
          </View>
          <Text style={styles.aiText}>
            Your recent blood work shows stable hemoglobin levels. Continue current treatment plan.
          </Text>
          <View style={styles.aiStatus}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Health Status: Stable</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <Pressable style={styles.actionCard}>
              <Activity size={32} color="#2563EB" />
              <Text style={styles.actionTitle}>Log Symptoms</Text>
              <Text style={styles.actionSubtitle}>Track daily symptoms</Text>
            </Pressable>
            
            <Pressable style={styles.actionCard}>
              <TrendingUp size={32} color="#059669" />
              <Text style={styles.actionTitle}>Blood Tests</Text>
              <Text style={styles.actionSubtitle}>View lab results</Text>
            </Pressable>
            
            <Pressable style={styles.actionCard}>
              <Pill size={32} color="#7C3AED" />
              <Text style={styles.actionTitle}>Medications</Text>
              <Text style={styles.actionSubtitle}>Manage prescriptions</Text>
            </Pressable>
            
            <Pressable style={styles.actionCard}>
              <Calendar size={32} color="#DC2626" />
              <Text style={styles.actionTitle}>Appointments</Text>
              <Text style={styles.actionSubtitle}>Schedule visits</Text>
            </Pressable>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: '#EFF6FF' }]}>
                <TrendingUp size={20} color="#2563EB" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Blood Test Results</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: '#F0FDF4' }]}>
                <Pill size={20} color="#059669" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Medication Taken</Text>
                <Text style={styles.activityTime}>4 hours ago</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: '#FEF2F2' }]}>
                <AlertCircle size={20} color="#DC2626" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Appointment Reminder</Text>
                <Text style={styles.activityTime}>Tomorrow at 2:00 PM</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Health Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Metrics</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>11.8</Text>
              <Text style={styles.metricUnit}>g/dL</Text>
              <Text style={styles.metricLabel}>Hemoglobin</Text>
              <View style={[styles.trendIndicator, { backgroundColor: '#059669' }]} />
            </View>
            
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>125</Text>
              <Text style={styles.metricUnit}>μg/L</Text>
              <Text style={styles.metricLabel}>Ferritin</Text>
              <View style={[styles.trendIndicator, { backgroundColor: '#F59E0B' }]} />
            </View>
            
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>82</Text>
              <Text style={styles.metricUnit}>bpm</Text>
              <Text style={styles.metricLabel}>Heart Rate</Text>
              <View style={[styles.trendIndicator, { backgroundColor: '#059669' }]} />
            </View>
            
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>98%</Text>
              <Text style={styles.metricUnit}>SpO2</Text>
              <Text style={styles.metricLabel}>Oxygen</Text>
              <View style={[styles.trendIndicator, { backgroundColor: '#059669' }]} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#E0E7FF',
    fontWeight: '500',
  },
  userName: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: '700',
    marginVertical: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#C7D2FE',
  },
  aiCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  aiTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 8,
  },
  aiText: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 16,
  },
  aiStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#059669',
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginTop: 8,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  activityTime: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
  },
  metricValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  metricUnit: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
    marginTop: 8,
  },
  trendIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});