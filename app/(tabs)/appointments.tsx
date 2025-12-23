import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Video,
  Droplets,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Building2,
  Navigation,
  Bell,
  Zap,
} from 'lucide-react-native';
import Header from '@/components/Header';
import { usePatient } from '@/context/PatientContext';
import { colors, layout } from '@/constants/theme';
import { transfusions, bloodBanks, appointments } from '@/constants/data';

// Countdown Ring Component
function CountdownRing({ days, maxDays = 21 }: { days: number; maxDays?: number }) {
  const size = 70;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, 1 - days / maxDays);
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View style={styles.countdownRing}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.bloodRedGlow}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.bloodRed}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <View style={styles.countdownCenter}>
        <Text style={styles.countdownNumber}>{days}</Text>
        <Text style={styles.countdownLabel}>days</Text>
      </View>
    </View>
  );
}

export default function Schedule() {
  const { patient, daysUntilTransfusion } = usePatient();
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const nextTransfusion = transfusions.find(t => t.status === 'scheduled');
  const upcomingAppointments = appointments.filter(a => a.status === 'scheduled');
  const pastAppointments = appointments.filter(a => a.status === 'completed').slice(0, 2);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatTime = (timeStr?: string) => {
    if (!timeStr) return '--:--';
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${minutes} ${ampm}`;
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const isTransfusionDay = (day: number | null) => {
    if (!day) return false;
    const checkDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day);
    return transfusions.some(t => {
      const tDate = new Date(t.date);
      return tDate.toDateString() === checkDate.toDateString();
    });
  };

  const isAppointmentDay = (day: number | null) => {
    if (!day) return false;
    const checkDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day);
    return appointments.some(a => {
      const aDate = new Date(a.date);
      return aDate.toDateString() === checkDate.toDateString();
    });
  };

  const isToday = (day: number | null) => {
    if (!day) return false;
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === selectedMonth.getMonth() &&
      today.getFullYear() === selectedMonth.getFullYear()
    );
  };

  const changeMonth = (delta: number) => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(newDate.getMonth() + delta);
    setSelectedMonth(newDate);
  };

  const monthName = selectedMonth.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Schedule" subtitle="Transfusions & Appointments" compact />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Next Transfusion Hero Card */}
        {nextTransfusion && (
          <View style={styles.transfusionCard}>
            <View style={styles.transfusionHeader}>
              <View style={styles.transfusionLeft}>
                <View style={styles.transfusionIconBg}>
                  <Droplets size={20} color={colors.bloodRed} />
                </View>
                <View>
                  <Text style={styles.transfusionLabel}>Next Transfusion</Text>
                  <Text style={styles.transfusionDate}>{formatDate(nextTransfusion.date)}</Text>
                </View>
              </View>
              <CountdownRing days={daysUntilTransfusion} />
            </View>

            <View style={styles.transfusionDetails}>
              <View style={styles.detailChip}>
                <Building2 size={12} color={colors.textMuted} />
                <Text style={styles.detailChipText}>{nextTransfusion.bloodBank.name}</Text>
              </View>
              <View style={styles.detailChip}>
                <Clock size={12} color={colors.textMuted} />
                <Text style={styles.detailChipText}>{formatTime(nextTransfusion.time)}</Text>
              </View>
              <View style={styles.detailChip}>
                <MapPin size={12} color={colors.textMuted} />
                <Text style={styles.detailChipText}>{nextTransfusion.bloodBank.distance}</Text>
              </View>
            </View>

            <View style={styles.transfusionActions}>
              <View style={[
                styles.statusPill,
                { backgroundColor: nextTransfusion.confirmed ? colors.successGlow : colors.warningGlow }
              ]}>
                {nextTransfusion.confirmed ? (
                  <CheckCircle size={12} color={colors.success} />
                ) : (
                  <AlertCircle size={12} color={colors.warning} />
                )}
                <Text style={[
                  styles.statusPillText,
                  { color: nextTransfusion.confirmed ? colors.success : colors.warning }
                ]}>
                  {nextTransfusion.confirmed ? 'Confirmed' : 'Pending'}
                </Text>
              </View>
              <View style={styles.actionBtns}>
                <Pressable style={styles.actionBtn} onPress={() => Linking.openURL('tel:+911234567890')}>
                  <Phone size={16} color={colors.primary} />
                </Pressable>
                <Pressable style={styles.actionBtn} onPress={() => Linking.openURL('https://maps.google.com')}>
                  <Navigation size={16} color={colors.primary} />
                </Pressable>
              </View>
            </View>
          </View>
        )}

        {/* Modern Calendar */}
        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <Pressable onPress={() => changeMonth(-1)} style={styles.calendarNav}>
              <ChevronLeft size={20} color={colors.textSecondary} />
            </Pressable>
            <Text style={styles.monthText}>{monthName}</Text>
            <Pressable onPress={() => changeMonth(1)} style={styles.calendarNav}>
              <ChevronRight size={20} color={colors.textSecondary} />
            </Pressable>
          </View>

          <View style={styles.weekDaysRow}>
            {weekDays.map((day, i) => (
              <Text key={i} style={styles.weekDayText}>{day}</Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {getDaysInMonth(selectedMonth).map((day, index) => {
              const transfusion = isTransfusionDay(day);
              const appointment = isAppointmentDay(day);
              const today = isToday(day);
              const selected = selectedDay === day;

              return (
                <Pressable
                  key={index}
                  style={styles.dayCell}
                  onPress={() => day && setSelectedDay(day)}
                >
                  {day && (
                    <View style={[
                      styles.dayPill,
                      today && styles.todayPill,
                      transfusion && styles.transfusionPill,
                      selected && styles.selectedPill,
                    ]}>
                      <Text style={[
                        styles.dayText,
                        today && styles.todayText,
                        transfusion && styles.transfusionDayText,
                        selected && styles.selectedText,
                      ]}>
                        {day}
                      </Text>
                      {(transfusion || appointment) && (
                        <View style={styles.dotRow}>
                          {transfusion && <View style={[styles.dot, { backgroundColor: colors.bloodRed }]} />}
                          {appointment && !transfusion && <View style={[styles.dot, { backgroundColor: colors.primary }]} />}
                        </View>
                      )}
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>

          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.bloodRed }]} />
              <Text style={styles.legendText}>Transfusion</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
              <Text style={styles.legendText}>Appointment</Text>
            </View>
          </View>
        </View>

        {/* Upcoming Appointments */}
        <Text style={styles.sectionTitle}>Upcoming</Text>
        {upcomingAppointments.map((apt, i) => (
          <View
            key={apt.id}
            style={styles.appointmentCard}
          >
            <View style={[
              styles.aptDateBox,
              apt.type === 'video' && { backgroundColor: colors.successGlow, borderColor: colors.success }
            ]}>
              <Text style={[styles.aptDay, apt.type === 'video' && { color: colors.success }]}>
                {new Date(apt.date).getDate()}
              </Text>
              <Text style={[styles.aptMonth, apt.type === 'video' && { color: colors.success }]}>
                {new Date(apt.date).toLocaleDateString('en-US', { month: 'short' })}
              </Text>
            </View>
            <View style={styles.aptInfo}>
              <Text style={styles.aptDoctor}>{apt.doctor.name}</Text>
              <Text style={styles.aptSpecialty}>{apt.doctor.specialty}</Text>
              <View style={styles.aptMeta}>
                <Clock size={12} color={colors.textMuted} />
                <Text style={styles.aptMetaText}>{formatTime(apt.time)}</Text>
                {apt.type === 'video' ? (
                  <>
                    <Video size={12} color={colors.success} style={{ marginLeft: 10 }} />
                    <Text style={[styles.aptMetaText, { color: colors.success }]}>Video</Text>
                  </>
                ) : (
                  <>
                    <MapPin size={12} color={colors.textMuted} style={{ marginLeft: 10 }} />
                    <Text style={styles.aptMetaText} numberOfLines={1}>{apt.location}</Text>
                  </>
                )}
              </View>
            </View>
            <Pressable style={[
              styles.aptAction,
              apt.type === 'video' && { backgroundColor: colors.success }
            ]}>
              {apt.type === 'video' ? (
                <Video size={16} color="#fff" />
              ) : (
                <ChevronRight size={18} color="#fff" />
              )}
            </Pressable>
          </View>
        ))}

        {/* Blood Banks */}
        <Text style={styles.sectionTitle}>Nearby Blood Banks</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.bankScroll}
        >
          {bloodBanks.map((bank, i) => (
            <View
              key={bank.id}
              style={styles.bankCard}
            >
              <View style={styles.bankHeader}>
                <View style={styles.bankIcon}>
                  <Building2 size={16} color={colors.primary} />
                </View>
                <View style={[
                  styles.availBadge,
                  {
                    backgroundColor: bank.availability === 'high' ? colors.successGlow :
                      bank.availability === 'medium' ? colors.warningGlow : colors.errorGlow
                  }
                ]}>
                  <View style={[
                    styles.availDot,
                    {
                      backgroundColor: bank.availability === 'high' ? colors.success :
                        bank.availability === 'medium' ? colors.warning : colors.error
                    }
                  ]} />
                </View>
              </View>
              <Text style={styles.bankName} numberOfLines={1}>{bank.name}</Text>
              <Text style={styles.bankDistance}>{bank.distance}</Text>
              <View style={styles.bankActions}>
                <Pressable style={styles.bankBtn} onPress={() => Linking.openURL(`tel:${bank.phone}`)}>
                  <Phone size={14} color={colors.primary} />
                </Pressable>
                <Pressable style={styles.bankBtn} onPress={() => Linking.openURL('https://maps.google.com')}>
                  <Navigation size={14} color={colors.primary} />
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Recent Visits */}
        <Text style={styles.sectionTitle}>Recent Visits</Text>
        {pastAppointments.map((apt, i) => (
          <View
            key={apt.id}
            style={styles.pastCard}
          >
            <View style={styles.pastLeft}>
              <Calendar size={16} color={colors.textMuted} />
              <View style={styles.pastInfo}>
                <Text style={styles.pastDate}>{formatDate(apt.date)}</Text>
                <Text style={styles.pastDoctor}>{apt.doctor.name}</Text>
              </View>
            </View>
            <View style={styles.doneBadge}>
              <CheckCircle size={12} color={colors.success} />
            </View>
          </View>
        ))}

        {/* Emergency Card */}
        <View style={styles.emergencyCard}>
          <View style={styles.emergencyHeader}>
            <Zap size={18} color={colors.bloodRed} />
            <Text style={styles.emergencyTitle}>Urgent Blood Need?</Text>
          </View>
          <View style={styles.emergencyBtns}>
            <Pressable style={styles.emergencyBtn} onPress={() => Alert.alert('Blood Request', 'Your urgent blood request has been submitted. Blood banks nearby have been notified.')}>
              <Droplets size={16} color="#fff" />
              <Text style={styles.emergencyBtnText}>Request Blood</Text>
            </Pressable>
            <Pressable style={styles.sosBtn} onPress={() => Linking.openURL('tel:102')}>
              <Phone size={16} color={colors.bloodRed} />
              <Text style={styles.sosBtnText}>SOS</Text>
            </Pressable>
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
    padding: layout.screenPadding,
    paddingBottom: layout.scrollContentPadding,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 20,
    marginBottom: 12,
  },

  // Transfusion Card
  transfusionCard: {
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  transfusionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  transfusionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  transfusionIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.bloodRedLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.bloodRed + '30',
  },
  transfusionLabel: {
    fontSize: 11,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  transfusionDate: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 2,
  },
  countdownRing: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdownCenter: {
    position: 'absolute',
    alignItems: 'center',
  },
  countdownNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.bloodRed,
  },
  countdownLabel: {
    fontSize: 9,
    color: colors.bloodRed,
    marginTop: -2,
  },
  transfusionDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
    marginBottom: 14,
  },
  detailChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 5,
  },
  detailChipText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  transfusionActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 5,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '600',
  },
  actionBtns: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Calendar
  calendarCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  calendarNav: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  weekDaysRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayPill: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  todayPill: {
    backgroundColor: colors.primary,
  },
  todayText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  transfusionPill: {
    backgroundColor: colors.bloodRedGlow,
    borderWidth: 1,
    borderColor: colors.bloodRed + '40',
  },
  transfusionDayText: {
    color: colors.bloodRed,
    fontWeight: '700',
  },
  selectedPill: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  selectedText: {
    color: colors.primary,
    fontWeight: '700',
  },
  dotRow: {
    position: 'absolute',
    bottom: 3,
    flexDirection: 'row',
    gap: 2,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    color: colors.textMuted,
  },

  // Appointments
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  aptDateBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.infoGlow,
    borderWidth: 1,
    borderColor: colors.info + '30',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  aptDay: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.info,
  },
  aptMonth: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.info,
    marginTop: -2,
  },
  aptInfo: {
    flex: 1,
  },
  aptDoctor: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  aptSpecialty: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 1,
  },
  aptMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  aptMetaText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  aptAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Blood Banks
  bankScroll: {
    paddingRight: 20,
  },
  bankCard: {
    width: 140,
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 14,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  bankHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  bankIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryGlow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  availBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  availDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  bankName: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  bankDistance: {
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: 10,
  },
  bankActions: {
    flexDirection: 'row',
    gap: 8,
  },
  bankBtn: {
    flex: 1,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Past Appointments
  pastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pastLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pastInfo: {},
  pastDate: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  pastDoctor: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
  },
  doneBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.successGlow,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Emergency
  emergencyCard: {
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.bloodRed + '30',
    backgroundColor: colors.bloodRedLight,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  emergencyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.bloodRed,
  },
  emergencyBtns: {
    flexDirection: 'row',
    gap: 10,
  },
  emergencyBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
    backgroundColor: colors.bloodRed,
  },
  emergencyBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sosBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.bloodRed + '40',
    gap: 6,
  },
  sosBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.bloodRed,
  },
});
