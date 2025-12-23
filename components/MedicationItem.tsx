import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Pill, Check, Clock, AlertCircle } from 'lucide-react-native';
import { colors } from '@/constants/theme';
import { Medication, MedicationLog } from '@/types';

interface MedicationItemProps {
  medication: Medication;
  log?: MedicationLog;
  onToggle?: () => void;
}

export default function MedicationItem({ medication, log, onToggle }: MedicationItemProps) {
  const isTaken = log?.taken ?? false;
  const isMissed = !isTaken && log && isTimePassed(log.scheduledTime);

  function isTimePassed(time: string): boolean {
    const [hours, minutes] = time.split(':').map(Number);
    const now = new Date();
    const scheduledDate = new Date();
    scheduledDate.setHours(hours, minutes, 0, 0);
    return now > scheduledDate;
  }

  const getTypeColor = () => {
    switch (medication.type) {
      case 'chelation':
        return '#7C3AED';
      case 'supplement':
        return '#10B981';
      default:
        return colors.primary;
    }
  };

  return (
    <View style={[styles.card, isTaken && styles.cardTaken, isMissed && styles.cardMissed]}>
      <Pressable style={styles.content} onPress={onToggle}>
        <View style={[styles.iconContainer, { backgroundColor: getTypeColor() + '20' }]}>
          <Pill size={24} color={getTypeColor()} />
        </View>

        <View style={styles.info}>
          <Text style={[styles.name, isTaken && styles.nameTaken]}>{medication.name}</Text>
          <Text style={styles.dosage}>{medication.dosage} • {medication.frequency}</Text>
          {medication.instructions && (
            <Text style={styles.instructions}>{medication.instructions}</Text>
          )}
        </View>

        <View style={styles.statusContainer}>
          {isTaken ? (
            <View style={styles.takenBadge}>
              <Check size={16} color="#FFFFFF" />
              <Text style={styles.takenText}>Taken</Text>
            </View>
          ) : isMissed ? (
            <View style={styles.missedBadge}>
              <AlertCircle size={16} color="#FFFFFF" />
              <Text style={styles.missedText}>Missed</Text>
            </View>
          ) : (
            <View style={styles.scheduledBadge}>
              <Clock size={16} color={colors.textMuted} />
              <Text style={styles.scheduledText}>{log?.scheduledTime || '--:--'}</Text>
            </View>
          )}
        </View>
      </Pressable>

      {log?.takenAt && (
        <Text style={styles.takenAtText}>Taken at {log.takenAt}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  cardTaken: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  cardMissed: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  nameTaken: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  dosage: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  instructions: {
    fontSize: 12,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  statusContainer: {
    marginLeft: 12,
  },
  takenBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  takenText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  missedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.error,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  missedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  scheduledBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  scheduledText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
    marginLeft: 4,
  },
  takenAtText: {
    fontSize: 12,
    color: colors.success,
    paddingHorizontal: 16,
    paddingBottom: 12,
    marginTop: -8,
  },
});
