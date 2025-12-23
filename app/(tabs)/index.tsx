import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';
import {
  Activity,
  Droplets,
  Pill,
  Calendar,
  Phone,
  AlertTriangle,
  Heart,
  Bell,
  Zap,
  TrendingUp,
  Thermometer,
  Wind,
  ChevronRight,
  Sparkles,
  Gamepad2,
} from 'lucide-react-native';
import Header from '@/components/Header';
import { usePatient } from '@/context/PatientContext';
import { colors, layout } from '@/constants/theme';
import { transfusions } from '@/constants/data';

const { width } = Dimensions.get('window');

// Circular Progress Ring Component
function HealthRing({ score }: { score: number }) {
  const size = 100;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = (score / 100) * circumference;

  const getColor = () => {
    if (score >= 80) return colors.success;
    if (score >= 60) return colors.warning;
    return colors.error;
  };

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.border}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${progress} ${circumference}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={{ alignItems: 'center' }}>
        <Text style={[styles.ringScore, { color: getColor() }]}>{score}</Text>
        <Text style={styles.ringLabel}>Health</Text>
      </View>
    </View>
  );
}

// Mini Vital Card Component
function VitalMini({ icon: Icon, value, unit, color, trend }: any) {
  return (
    <View style={styles.vitalMini}>
      <View style={[styles.vitalMiniIcon, { backgroundColor: color + '15' }]}>
        <Icon size={16} color={color} />
      </View>
      <Text style={styles.vitalMiniValue}>{value}</Text>
      <Text style={styles.vitalMiniUnit}>{unit}</Text>
      {trend && (
        <View style={[styles.trendBadge, { backgroundColor: colors.successGlow }]}>
          <TrendingUp size={10} color={colors.success} />
        </View>
      )}
    </View>
  );
}

// Quick Action Pill
function ActionPill({ icon: Icon, label, color, urgent }: any) {
  return (
    <Pressable style={[styles.actionPill, urgent && styles.actionPillUrgent]}>
      <View style={[styles.actionPillIcon, { backgroundColor: urgent ? colors.bloodRed : color + '15' }]}>
        <Icon size={18} color={urgent ? '#fff' : color} />
      </View>
      <Text style={[styles.actionPillLabel, urgent && { color: colors.bloodRed }]}>{label}</Text>
    </Pressable>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const {
    patient,
    daysUntilTransfusion,
    healthScore,
    aiInsights,
  } = usePatient();

  const nextTransfusion = transfusions.find(t => t.status === 'scheduled');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const urgentInsights = aiInsights.filter(i => i.type === 'alert');
  const regularInsights = aiInsights.filter(i => i.type !== 'alert').slice(0, 2);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title={`${getGreeting()}`}
        subtitle={patient.name.split(' ')[0]}
        rightIcons={[
          { icon: Gamepad2, onPress: () => router.push('/games') },
        ]}
        icon={Bell}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section - Health Score + Transfusion */}
        <View style={styles.heroSection}>
          {/* Health Ring Card */}
          <View style={styles.healthCard}>
            <HealthRing score={healthScore} />
            <View style={styles.healthMeta}>
              <View style={styles.healthMetaItem}>
                <Droplets size={14} color={colors.bloodRed} />
                <Text style={styles.healthMetaText}>{patient.bloodType}</Text>
              </View>
              <View style={styles.healthMetaDivider} />
              <View style={styles.healthMetaItem}>
                <Activity size={14} color={colors.primary} />
                <Text style={styles.healthMetaText}>Stable</Text>
              </View>
            </View>
          </View>

          {/* Transfusion Countdown */}
          {nextTransfusion && (
            <View style={styles.countdownCard}>
              <View style={styles.countdownHeader}>
                <Droplets size={14} color={colors.bloodRed} />
                <Text style={styles.countdownTitle}>NEXT</Text>
              </View>
              <Text style={styles.countdownValue}>{daysUntilTransfusion}</Text>
              <Text style={styles.countdownUnit}>days</Text>
              <Text style={styles.countdownDate}>
                {new Date(nextTransfusion.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </Text>
              <View style={styles.countdownStatus}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Confirmed</Text>
              </View>
            </View>
          )}
        </View>

        {/* Vitals Strip */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Vitals</Text>
            <Pressable style={styles.seeAllBtn}>
              <Text style={styles.seeAllText}>See all</Text>
              <ChevronRight size={14} color={colors.primary} />
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.vitalsRow}>
            <VitalMini icon={Heart} value="72" unit="bpm" color={colors.error} trend="up" />
            <VitalMini icon={Activity} value="120/80" unit="mmHg" color={colors.info} />
            <VitalMini icon={Thermometer} value="98.6" unit="°F" color={colors.warning} />
            <VitalMini icon={Wind} value="98" unit="%" color={colors.success} trend="up" />
          </ScrollView>
        </View>

        {/* Urgent Alerts */}
        {urgentInsights.length > 0 && (
          <View style={styles.section}>
            <View style={styles.alertCard}>
              <View style={styles.alertIconPulse}>
                <AlertTriangle size={18} color={colors.error} />
              </View>
              <View style={styles.alertContent}>
                <Text style={styles.alertTitle}>{urgentInsights[0].title}</Text>
                <Text style={styles.alertMessage}>{urgentInsights[0].message}</Text>
              </View>
              <Pressable style={styles.alertAction}>
                <Text style={styles.alertActionText}>View</Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <ActionPill icon={Activity} label="Log Symptoms" color={colors.accentPurple} />
            <ActionPill icon={Droplets} label="Blood Request" color={colors.bloodRed} urgent />
            <ActionPill icon={Pill} label="Medications" color={colors.success} />
            <ActionPill icon={Calendar} label="Appointments" color={colors.info} />
            <ActionPill icon={Phone} label="Call Doctor" color={colors.accentCyan} />
            <ActionPill icon={AlertTriangle} label="Emergency" color={colors.warning} />
          </View>
        </View>

        {/* AI Insights */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Sparkles size={16} color={colors.accentPurple} />
              <Text style={styles.sectionTitle}>AI Insights</Text>
            </View>
          </View>
          {regularInsights.map(insight => (
            <Pressable key={insight.id} style={styles.insightCard}>
              <View style={[styles.insightIcon, { backgroundColor: insight.type === 'tip' ? colors.infoGlow : colors.successGlow }]}>
                <Zap size={14} color={insight.type === 'tip' ? colors.info : colors.success} />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>{insight.title}</Text>
                <Text style={styles.insightMessage} numberOfLines={2}>{insight.message}</Text>
              </View>
              <ChevronRight size={16} color={colors.textMuted} />
            </Pressable>
          ))}
        </View>

        {/* Blood Type Card */}
        <View style={styles.bloodCard}>
          <View style={styles.bloodCardIcon}>
            <Droplets size={18} color={colors.bloodRed} />
          </View>
          <View style={styles.bloodCardInfo}>
            <Text style={styles.bloodCardLabel}>Blood Type</Text>
            <Text style={styles.bloodCardValue}>{patient.bloodType}</Text>
          </View>
          <View style={styles.bloodCardTag}>
            <Text style={styles.bloodCardTagText}>{patient.bloodType}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: layout.scrollContentPadding,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },

  // Hero Section
  heroSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 8,
    gap: 12,
  },
  healthCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  healthMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  healthMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  healthMetaText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  healthMetaDivider: {
    width: 1,
    height: 12,
    backgroundColor: colors.border,
    marginHorizontal: 10,
  },
  ringScore: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -1,
  },
  ringLabel: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '600',
  },

  // Countdown
  countdownCard: {
    width: 110,
    backgroundColor: colors.bloodRedLight,
    borderRadius: 20,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.bloodRed + '20',
  },
  countdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  countdownTitle: {
    fontSize: 9,
    color: colors.bloodRed,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  countdownValue: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.bloodRed,
    letterSpacing: -2,
  },
  countdownUnit: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: -4,
    marginBottom: 4,
  },
  countdownDate: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '500',
    marginBottom: 6,
  },
  countdownStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.successGlow,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  statusText: {
    fontSize: 9,
    color: colors.success,
    fontWeight: '600',
  },

  // Vitals
  vitalsRow: {
    gap: 10,
  },
  vitalMini: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    minWidth: 75,
    borderWidth: 1,
    borderColor: colors.border,
  },
  vitalMiniIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  vitalMiniValue: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  vitalMiniUnit: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 1,
  },
  trendBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Alert
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.errorGlow,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.error + '20',
  },
  alertIconPulse: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.error + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertContent: {
    flex: 1,
    marginHorizontal: 12,
  },
  alertTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.error,
    marginBottom: 2,
  },
  alertMessage: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 15,
  },
  alertAction: {
    backgroundColor: colors.error,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  alertActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },

  // Actions
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
  },
  actionPill: {
    width: (width - 60) / 3,
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionPillUrgent: {
    backgroundColor: colors.bloodRedLight,
    borderColor: colors.bloodRed + '20',
  },
  actionPillIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  actionPillLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },

  // Insights
  insightCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  insightIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insightContent: {
    flex: 1,
    marginHorizontal: 10,
  },
  insightTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 1,
  },
  insightMessage: {
    fontSize: 11,
    color: colors.textMuted,
    lineHeight: 14,
  },

  // Blood Card
  bloodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  bloodCardIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.bloodRedLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bloodCardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  bloodCardLabel: {
    fontSize: 11,
    color: colors.textMuted,
  },
  bloodCardValue: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  bloodCardTag: {
    backgroundColor: colors.bloodRed,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  bloodCardTagText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
  },
});
