import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, Plus, Activity, Thermometer, Zap } from 'lucide-react-native';
import { useState } from 'react';

export default function Health() {
  const [selectedTab, setSelectedTab] = useState('symptoms');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <LinearGradient
          colors={['#059669', '#047857']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Health Tracking</Text>
          <Text style={styles.headerSubtitle}>Monitor your thalassemia journey</Text>
        </LinearGradient>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <Pressable 
            style={[styles.tab, selectedTab === 'symptoms' && styles.activeTab]}
            onPress={() => setSelectedTab('symptoms')}
          >
            <Text style={[styles.tabText, selectedTab === 'symptoms' && styles.activeTabText]}>
              Symptoms
            </Text>
          </Pressable>
          <Pressable 
            style={[styles.tab, selectedTab === 'vitals' && styles.activeTab]}
            onPress={() => setSelectedTab('vitals')}
          >
            <Text style={[styles.tabText, selectedTab === 'vitals' && styles.activeTabText]}>
              Vitals
            </Text>
          </Pressable>
          <Pressable 
            style={[styles.tab, selectedTab === 'labs' && styles.activeTab]}
            onPress={() => setSelectedTab('labs')}
          >
            <Text style={[styles.tabText, selectedTab === 'labs' && styles.activeTabText]}>
              Lab Results
            </Text>
          </Pressable>
        </View>

        {/* Symptoms Tab */}
        {selectedTab === 'symptoms' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Daily Symptoms</Text>
              <Pressable style={styles.addButton}>
                <Plus size={20} color="#FFFFFF" />
              </Pressable>
            </View>

            <View style={styles.symptomCard}>
              <View style={styles.symptomHeader}>
                <Activity size={24} color="#DC2626" />
                <Text style={styles.symptomTitle}>Today's Assessment</Text>
              </View>
              
              <View style={styles.symptomList}>
                <View style={styles.symptomItem}>
                  <View style={[styles.severityDot, { backgroundColor: '#F59E0B' }]} />
                  <Text style={styles.symptomName}>Fatigue</Text>
                  <Text style={styles.severityText}>Moderate</Text>
                </View>
                
                <View style={styles.symptomItem}>
                  <View style={[styles.severityDot, { backgroundColor: '#059669' }]} />
                  <Text style={styles.symptomName}>Breathing</Text>
                  <Text style={styles.severityText}>Normal</Text>
                </View>
                
                <View style={styles.symptomItem}>
                  <View style={[styles.severityDot, { backgroundColor: '#EAB308' }]} />
                  <Text style={styles.symptomName}>Weakness</Text>
                  <Text style={styles.severityText}>Mild</Text>
                </View>
              </View>

              <Text style={styles.aiRecommendation}>
                <Zap size={16} color="#7C3AED" /> AI Recommendation: Consider rest and hydration. Contact doctor if symptoms worsen.
              </Text>
            </View>

            {/* Symptom History */}
            <View style={styles.historyCard}>
              <Text style={styles.historyTitle}>Recent History</Text>
              
              <View style={styles.historyItem}>
                <Text style={styles.historyDate}>Yesterday</Text>
                <View style={styles.historySymptoms}>
                  <View style={[styles.historyDot, { backgroundColor: '#059669' }]} />
                  <Text style={styles.historyText}>No significant symptoms</Text>
                </View>
              </View>
              
              <View style={styles.historyItem}>
                <Text style={styles.historyDate}>2 days ago</Text>
                <View style={styles.historySymptoms}>
                  <View style={[styles.historyDot, { backgroundColor: '#F59E0B' }]} />
                  <Text style={styles.historyText}>Mild fatigue, shortness of breath</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Vitals Tab */}
        {selectedTab === 'vitals' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Vital Signs</Text>
              <Pressable style={styles.addButton}>
                <Plus size={20} color="#FFFFFF" />
              </Pressable>
            </View>

            <View style={styles.vitalsGrid}>
              <View style={styles.vitalCard}>
                <Thermometer size={32} color="#DC2626" />
                <Text style={styles.vitalValue}>98.6°F</Text>
                <Text style={styles.vitalLabel}>Temperature</Text>
                <Text style={styles.vitalTime}>2 hours ago</Text>
              </View>
              
              <View style={styles.vitalCard}>
                <Activity size={32} color="#2563EB" />
                <Text style={styles.vitalValue}>82 bpm</Text>
                <Text style={styles.vitalLabel}>Heart Rate</Text>
                <Text style={styles.vitalTime}>2 hours ago</Text>
              </View>
              
              <View style={styles.vitalCard}>
                <Activity size={32} color="#059669" />
                <Text style={styles.vitalValue}>120/80</Text>
                <Text style={styles.vitalLabel}>Blood Pressure</Text>
                <Text style={styles.vitalTime}>This morning</Text>
              </View>
              
              <View style={styles.vitalCard}>
                <Activity size={32} color="#7C3AED" />
                <Text style={styles.vitalValue}>98%</Text>
                <Text style={styles.vitalLabel}>Oxygen Sat</Text>
                <Text style={styles.vitalTime}>2 hours ago</Text>
              </View>
            </View>
          </View>
        )}

        {/* Labs Tab */}
        {selectedTab === 'labs' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Laboratory Results</Text>
              <Pressable style={styles.addButton}>
                <Plus size={20} color="#FFFFFF" />
              </Pressable>
            </View>

            <View style={styles.labCard}>
              <View style={styles.labHeader}>
                <TrendingUp size={24} color="#2563EB" />
                <Text style={styles.labTitle}>Latest Results</Text>
                <Text style={styles.labDate}>March 15, 2024</Text>
              </View>
              
              <View style={styles.labResults}>
                <View style={styles.labItem}>
                  <Text style={styles.labName}>Hemoglobin</Text>
                  <Text style={[styles.labValue, { color: '#059669' }]}>11.8 g/dL</Text>
                  <Text style={styles.labRange}>Normal</Text>
                </View>
                
                <View style={styles.labItem}>
                  <Text style={styles.labName}>Hematocrit</Text>
                  <Text style={[styles.labValue, { color: '#F59E0B' }]}>35.2%</Text>
                  <Text style={styles.labRange}>Low</Text>
                </View>
                
                <View style={styles.labItem}>
                  <Text style={styles.labName}>Ferritin</Text>
                  <Text style={[styles.labValue, { color: '#DC2626' }]}>125 μg/L</Text>
                  <Text style={styles.labRange}>High</Text>
                </View>
                
                <View style={styles.labItem}>
                  <Text style={styles.labName}>Iron</Text>
                  <Text style={[styles.labValue, { color: '#059669' }]}>85 μg/dL</Text>
                  <Text style={styles.labRange}>Normal</Text>
                </View>
              </View>
            </View>

            {/* Trend Chart Placeholder */}
            <View style={styles.chartCard}>
              <Text style={styles.chartTitle}>Hemoglobin Trends</Text>
              <View style={styles.chartPlaceholder}>
                <TrendingUp size={48} color="#9CA3AF" />
                <Text style={styles.chartText}>Chart visualization coming soon</Text>
              </View>
            </View>
          </View>
        )}
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#D1FAE5',
    textAlign: 'center',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#2563EB',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  addButton: {
    backgroundColor: '#2563EB',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symptomCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  symptomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  symptomTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 8,
  },
  symptomList: {
    marginBottom: 16,
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  severityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  symptomName: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  severityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  aiRecommendation: {
    fontSize: 14,
    color: '#7C3AED',
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  historyItem: {
    marginBottom: 12,
  },
  historyDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  historySymptoms: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  historyText: {
    fontSize: 14,
    color: '#374151',
  },
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  vitalCard: {
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
  vitalValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginVertical: 8,
  },
  vitalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },
  vitalTime: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  labCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  labHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  labTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 8,
    flex: 1,
  },
  labDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  labResults: {
    gap: 12,
  },
  labItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  labName: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  labValue: {
    fontSize: 16,
    fontWeight: '700',
    marginRight: 12,
  },
  labRange: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  chartPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  chartText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
  },
});