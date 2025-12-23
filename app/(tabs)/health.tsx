import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import Svg, { Circle } from 'react-native-svg';
import {
  Droplets,
  Activity,
  Pill,
  Heart,
  Plus,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Check,
  X,
  Zap,
  Thermometer,
  Wind,
} from 'lucide-react-native';
import Header from '@/components/Header';
import { usePatient } from '@/context/PatientContext';
import { colors, layout } from '@/constants/theme';
import { symptoms, medications, transfusions } from '@/constants/data';

type TabType = 'bloodwork' | 'symptoms' | 'medications' | 'vitals';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// Mini Ring Progress Component
function MiniRing({
  progress,
  size = 52,
  strokeWidth = 5,
  color = colors.primary
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={colors.surfaceLight}
        strokeWidth={strokeWidth}
        fill="transparent"
      />
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
    </Svg>
  );
}

// Metric Card Component
function MetricCard({
  label,
  value,
  unit,
  progress,
  status,
  trend
}: {
  label: string;
  value: number;
  unit: string;
  progress: number;
  status: 'normal' | 'low' | 'high';
  trend?: 'up' | 'down' | 'stable';
}) {
  const statusColor = status === 'normal' ? colors.success : status === 'high' ? colors.error : colors.warning;

  return (
    <View style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <Text style={styles.metricLabel}>{label}</Text>
        {trend && (
          <View style={[styles.trendBadge, { backgroundColor: trend === 'up' ? colors.successGlow : trend === 'down' ? colors.errorGlow : colors.surfaceLight }]}>
            {trend === 'up' ? (
              <TrendingUp size={10} color={colors.success} />
            ) : trend === 'down' ? (
              <TrendingDown size={10} color={colors.error} />
            ) : null}
          </View>
        )}
      </View>
      <View style={styles.metricBody}>
        <MiniRing progress={progress} color={statusColor} />
        <View style={styles.metricValues}>
          <Text style={styles.metricValue}>{value}</Text>
          <Text style={styles.metricUnit}>{unit}</Text>
        </View>
      </View>
      <View style={[styles.statusBar, { backgroundColor: statusColor + '30' }]}>
        <View style={[styles.statusFill, { width: `${progress * 100}%`, backgroundColor: statusColor }]} />
      </View>
    </View>
  );
}

// Vital Card Component
function VitalMiniCard({
  icon: Icon,
  label,
  value,
  unit,
  color = colors.primary
}: {
  icon: any;
  label: string;
  value: string;
  unit: string;
  color?: string;
}) {
  return (
    <View style={styles.vitalMiniCard}>
      <View style={[styles.vitalIconBg, { backgroundColor: color + '15' }]}>
        <Icon size={18} color={color} />
      </View>
      <Text style={styles.vitalMiniLabel}>{label}</Text>
      <View style={styles.vitalMiniValueRow}>
        <Text style={styles.vitalMiniValue}>{value}</Text>
        <Text style={styles.vitalMiniUnit}>{unit}</Text>
      </View>
    </View>
  );
}

// Medication Toggle Card
function MedCard({
  name,
  dose,
  time,
  taken,
  onToggle
}: {
  name: string;
  dose: string;
  time: string;
  taken: boolean;
  onToggle: () => void;
}) {
  return (
    <View style={[styles.medCard, taken && styles.medCardTaken]}>
      <Pressable style={styles.medToggle} onPress={onToggle}>
        <View style={[styles.medCheck, taken && styles.medCheckActive]}>
          {taken && <Check size={14} color="#fff" />}
        </View>
      </Pressable>
      <View style={styles.medInfo}>
        <Text style={[styles.medName, taken && styles.medNameTaken]}>{name}</Text>
        <Text style={styles.medDose}>{dose}</Text>
      </View>
      <View style={styles.medTimeBox}>
        <Text style={styles.medTime}>{time}</Text>
      </View>
    </View>
  );
}

// Symptom Quick Add Button
function SymptomQuickAdd({
  name,
  onAdd
}: {
  name: string;
  onAdd: (severity: 'mild' | 'moderate' | 'severe') => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.symptomQuickAdd}>
      <Pressable
        style={styles.symptomQuickBtn}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.symptomQuickText}>{name}</Text>
        <Plus size={14} color={colors.textMuted} />
      </Pressable>
      {expanded && (
        <View style={styles.severityRow}>
          <Pressable
            style={[styles.severityPill, { backgroundColor: colors.success + '20' }]}
            onPress={() => { onAdd('mild'); setExpanded(false); }}
          >
            <Text style={[styles.severityPillText, { color: colors.success }]}>Mild</Text>
          </Pressable>
          <Pressable
            style={[styles.severityPill, { backgroundColor: colors.warning + '20' }]}
            onPress={() => { onAdd('moderate'); setExpanded(false); }}
          >
            <Text style={[styles.severityPillText, { color: colors.warning }]}>Mod</Text>
          </Pressable>
          <Pressable
            style={[styles.severityPill, { backgroundColor: colors.error + '20' }]}
            onPress={() => { onAdd('severe'); setExpanded(false); }}
          >
            <Text style={[styles.severityPillText, { color: colors.error }]}>Severe</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

export default function Health() {
  const [selectedTab, setSelectedTab] = useState<TabType>('bloodwork');
  const {
    patient,
    healthMetrics,
    vitalSigns,
    symptomLogs,
    addSymptomLog,
    removeSymptomLog,
    medicationLogs,
    toggleMedicationTaken,
  } = usePatient();

  const tabs: { key: TabType; label: string; icon: any }[] = [
    { key: 'bloodwork', label: 'Blood', icon: Droplets },
    { key: 'symptoms', label: 'Symptoms', icon: Activity },
    { key: 'medications', label: 'Meds', icon: Pill },
    { key: 'vitals', label: 'Vitals', icon: Heart },
  ];

  const lastTransfusion = transfusions.find(t => t.status === 'completed');
  const nextTransfusion = transfusions.find(t => t.status === 'scheduled');

  const handleAddSymptom = (symptomId: string, severity: 'mild' | 'moderate' | 'severe') => {
    const newLog = {
      id: `sl-${Date.now()}`,
      symptomId,
      severity,
      loggedAt: new Date().toISOString(),
    };
    addSymptomLog(newLog);
  };

  const getSymptomName = (symptomId: string) => {
    return symptoms.find(s => s.id === symptomId)?.name || '';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return colors.success;
      case 'moderate': return colors.warning;
      case 'severe': return colors.error;
      default: return colors.textMuted;
    }
  };

  const getMetricProgress = (metric: typeof healthMetrics[0]) => {
    const range = metric.normalRange.max - metric.normalRange.min;
    const pos = (metric.value - metric.normalRange.min) / range;
    return Math.max(0, Math.min(1, pos));
  };

  const takenCount = medicationLogs.filter(l => l.taken).length;
  const totalMeds = medicationLogs.length;
  const medProgress = totalMeds > 0 ? takenCount / totalMeds : 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Health" subtitle="Track your wellness" compact />

      {/* Modern Pill Tab Navigation */}
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = selectedTab === tab.key;
          return (
            <Pressable
              key={tab.key}
              style={[styles.tab, isActive && styles.activeTab]}
              onPress={() => setSelectedTab(tab.key)}
            >
              <Icon size={16} color={isActive ? '#FFFFFF' : colors.textMuted} />
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Blood Work Tab */}
        {selectedTab === 'bloodwork' && (
          <>
            {/* Transfusion Summary Card */}
            <View style={styles.transfusionCard}>
              <View style={styles.transfusionRow}>
                <View style={styles.transfusionItem}>
                  <Text style={styles.transfusionLabel}>Last</Text>
                  <Text style={styles.transfusionValue}>
                    {lastTransfusion ? new Date(lastTransfusion.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '--'}
                  </Text>
                  {lastTransfusion && (
                    <View style={styles.hbChange}>
                      <TrendingUp size={10} color={colors.success} />
                      <Text style={styles.hbText}>
                        {lastTransfusion.hemoglobinBefore}→{lastTransfusion.hemoglobinAfter}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.bloodBadge}>
                  <Text style={styles.bloodBadgeText}>{patient.bloodType}</Text>
                </View>

                <View style={styles.transfusionItem}>
                  <Text style={styles.transfusionLabel}>Next</Text>
                  <Text style={styles.transfusionValue}>
                    {nextTransfusion ? new Date(nextTransfusion.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '--'}
                  </Text>
                  <View style={[styles.confirmBadge, { backgroundColor: colors.successGlow }]}>
                    <Check size={10} color={colors.success} />
                    <Text style={styles.confirmText}>Confirmed</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Metrics Grid */}
            <Text style={styles.sectionTitle}>Lab Results</Text>
            <View style={styles.metricsGrid}>
              {healthMetrics.map((metric, i) => (
                <MetricCard
                  key={metric.id}
                  label={metric.name}
                  value={metric.value}
                  unit={metric.unit}
                  progress={getMetricProgress(metric)}
                  status={metric.status}
                  trend={i === 0 ? 'up' : i === 1 ? 'down' : 'stable'}
                />
              ))}
            </View>

            {/* Iron Alert */}
            {healthMetrics.find(m => m.name === 'Ferritin')?.status === 'high' && (
              <View style={styles.alertCard}>
                <View style={styles.alertIcon}>
                  <AlertCircle size={20} color={colors.warning} />
                </View>
                <View style={styles.alertContent}>
                  <Text style={styles.alertTitle}>Iron Overload Alert</Text>
                  <Text style={styles.alertText}>
                    Ferritin elevated. Continue chelation therapy.
                  </Text>
                </View>
              </View>
            )}
          </>
        )}

        {/* Symptoms Tab */}
        {selectedTab === 'symptoms' && (
          <>
            {/* Today's Symptoms */}
            <Text style={styles.sectionTitle}>Today's Log</Text>
            {symptomLogs.length > 0 ? (
              <View style={styles.symptomLogList}>
                {symptomLogs.map(log => (
                  <View
                    key={log.id}
                    style={styles.symptomLogCard}
                  >
                    <View style={[styles.severityDot, { backgroundColor: getSeverityColor(log.severity) }]} />
                    <Text style={styles.symptomLogName}>{getSymptomName(log.symptomId)}</Text>
                    <Text style={[styles.symptomSeverityTag, { color: getSeverityColor(log.severity) }]}>
                      {log.severity}
                    </Text>
                    <Pressable onPress={() => removeSymptomLog(log.id)} style={styles.removeBtn}>
                      <X size={14} color={colors.textMuted} />
                    </Pressable>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.emptyCard}>
                <View style={styles.emptyIcon}>
                  <Check size={28} color={colors.success} />
                </View>
                <Text style={styles.emptyTitle}>Feeling Good!</Text>
                <Text style={styles.emptyText}>No symptoms logged today</Text>
              </View>
            )}

            {/* Quick Add Grid */}
            <Text style={styles.sectionTitle}>Log Symptom</Text>
            <View style={styles.symptomGrid}>
              {symptoms.slice(0, 6).map(symptom => (
                <SymptomQuickAdd
                  key={symptom.id}
                  name={symptom.name}
                  onAdd={(severity) => handleAddSymptom(symptom.id, severity)}
                />
              ))}
            </View>
          </>
        )}

        {/* Medications Tab */}
        {selectedTab === 'medications' && (
          <>
            {/* Progress Ring */}
            <View style={styles.medProgressCard}>
              <View style={styles.medRingContainer}>
                <MiniRing
                  progress={medProgress}
                  size={70}
                  strokeWidth={6}
                  color={medProgress === 1 ? colors.success : colors.primary}
                />
                <View style={styles.medRingCenter}>
                  <Text style={styles.medRingValue}>{takenCount}/{totalMeds}</Text>
                </View>
              </View>
              <View style={styles.medProgressInfo}>
                <Text style={styles.medProgressTitle}>Daily Progress</Text>
                <Text style={styles.medProgressSub}>
                  {medProgress === 1 ? 'All medications taken!' : `${totalMeds - takenCount} remaining`}
                </Text>
              </View>
            </View>

            {/* Medication List */}
            <Text style={styles.sectionTitle}>Today's Schedule</Text>
            {medications.map(med => {
              const log = medicationLogs.find(l => l.medicationId === med.id);
              return (
                <MedCard
                  key={med.id}
                  name={med.name}
                  dose={med.dosage}
                  time={med.schedule[0]?.time || '8:00 AM'}
                  taken={log?.taken || false}
                  onToggle={() => log && toggleMedicationTaken(log.id)}
                />
              );
            })}

            {/* Info Card */}
            <View style={styles.infoCard}>
              <Zap size={18} color={colors.primary} />
              <Text style={styles.infoText}>
                Consistent chelation therapy prevents iron overload complications
              </Text>
            </View>
          </>
        )}

        {/* Vitals Tab */}
        {selectedTab === 'vitals' && (
          <>
            <Text style={styles.sectionTitle}>Current Vitals</Text>
            <View style={styles.vitalsGrid}>
              <VitalMiniCard
                icon={Heart}
                label="Heart Rate"
                value={vitalSigns.find(v => v.type === 'heartRate')?.value.toString() || '--'}
                unit="bpm"
                color={colors.error}
              />
              <VitalMiniCard
                icon={Activity}
                label="Blood Pressure"
                value={vitalSigns.find(v => v.type === 'bloodPressure')?.value.toString() || '--'}
                unit="mmHg"
                color={colors.info}
              />
              <VitalMiniCard
                icon={Thermometer}
                label="Temperature"
                value={vitalSigns.find(v => v.type === 'temperature')?.value.toString() || '--'}
                unit="°F"
                color={colors.warning}
              />
              <VitalMiniCard
                icon={Wind}
                label="SpO2"
                value={vitalSigns.find(v => v.type === 'oxygenSaturation')?.value.toString() || '--'}
                unit="%"
                color={colors.success}
              />
            </View>

            {/* Log Vital Button */}
            <Pressable style={styles.logVitalBtn}>
              <Plus size={18} color="#fff" />
              <Text style={styles.logVitalText}>Log Vitals</Text>
            </Pressable>

            {/* Tips */}
            <View style={styles.tipsCard}>
              <Text style={styles.tipsTitle}>Monitoring Tips</Text>
              <Text style={styles.tipItem}>• Check pulse daily before transfusions</Text>
              <Text style={styles.tipItem}>• Monitor fever for infection signs</Text>
              <Text style={styles.tipItem}>• Track SpO2 if short of breath</Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    gap: 4,
    overflow: 'hidden',
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: layout.screenPadding,
    paddingBottom: layout.scrollContentPadding,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
    marginTop: 16,
  },

  // Transfusion Card
  transfusionCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  transfusionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  transfusionItem: {
    alignItems: 'center',
    flex: 1,
  },
  transfusionLabel: {
    fontSize: 11,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  transfusionValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 4,
  },
  hbChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
    backgroundColor: colors.successGlow,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  hbText: {
    fontSize: 10,
    color: colors.success,
    fontWeight: '600',
  },
  bloodBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.bloodRedGlow,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.bloodRed,
  },
  bloodBadgeText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.bloodRed,
  },
  confirmBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  confirmText: {
    fontSize: 10,
    color: colors.success,
    fontWeight: '600',
  },

  // Metrics Grid
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: '47%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '500',
  },
  trendBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricBody: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },
  metricValues: {
    flex: 1,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  metricUnit: {
    fontSize: 11,
    color: colors.textMuted,
  },
  statusBar: {
    height: 4,
    borderRadius: 2,
    marginTop: 12,
  },
  statusFill: {
    height: '100%',
    borderRadius: 2,
  },

  // Alert Card
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warningGlow,
    borderRadius: 14,
    padding: 14,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.warning + '40',
  },
  alertIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.warning + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertContent: {
    flex: 1,
    marginLeft: 12,
  },
  alertTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.warning,
  },
  alertText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },

  // Symptom Log
  symptomLogList: {
    gap: 8,
  },
  symptomLogCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  severityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  symptomLogName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  symptomSeverityTag: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
    marginRight: 8,
  },
  removeBtn: {
    padding: 4,
  },
  emptyCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 28,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.successGlow,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  emptyText: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 4,
  },

  // Symptom Grid
  symptomGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  symptomQuickAdd: {
    width: '48%',
  },
  symptomQuickBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  symptomQuickText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  severityRow: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 6,
  },
  severityPill: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  severityPillText: {
    fontSize: 10,
    fontWeight: '600',
  },

  // Medication Progress
  medProgressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 16,
  },
  medRingContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  medRingCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  medRingValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  medProgressInfo: {
    flex: 1,
  },
  medProgressTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  medProgressSub: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },

  // Medication Card
  medCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  medCardTaken: {
    opacity: 0.7,
    borderColor: colors.success + '40',
  },
  medToggle: {
    marginRight: 12,
  },
  medCheck: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medCheckActive: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  medInfo: {
    flex: 1,
  },
  medName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  medNameTaken: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  medDose: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  medTimeBox: {
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  medTime: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryGlow,
    borderRadius: 12,
    padding: 14,
    marginTop: 12,
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },

  // Vitals Grid
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  vitalMiniCard: {
    width: '47%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  vitalIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  vitalMiniLabel: {
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: 4,
  },
  vitalMiniValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 3,
  },
  vitalMiniValue: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  vitalMiniUnit: {
    fontSize: 11,
    color: colors.textMuted,
  },
  logVitalBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    padding: 16,
    marginTop: 16,
    gap: 8,
    backgroundColor: colors.primary,
  },
  logVitalText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  tipsCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  tipItem: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
