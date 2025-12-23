import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Heart, Activity, Thermometer, Wind } from 'lucide-react-native';
import { colors } from '@/constants/theme';
import { VitalSign } from '@/types';

interface VitalCardProps {
  vital: VitalSign;
  onPress?: () => void;
  compact?: boolean;
}

export default function VitalCard({ vital, onPress, compact = false }: VitalCardProps) {
  const getVitalConfig = () => {
    switch (vital.type) {
      case 'heartRate':
        return {
          icon: Heart,
          label: 'Heart Rate',
          color: '#EF4444',
          bgColor: '#FEE2E2',
        };
      case 'bloodPressure':
        return {
          icon: Activity,
          label: 'Blood Pressure',
          color: '#3B82F6',
          bgColor: '#DBEAFE',
        };
      case 'temperature':
        return {
          icon: Thermometer,
          label: 'Temperature',
          color: '#F59E0B',
          bgColor: '#FEF3C7',
        };
      case 'oxygenSaturation':
        return {
          icon: Wind,
          label: 'Oxygen',
          color: '#10B981',
          bgColor: '#D1FAE5',
        };
    }
  };

  const getStatusColor = () => {
    switch (vital.status) {
      case 'normal':
        return colors.success;
      case 'warning':
        return colors.warning;
      case 'critical':
        return colors.error;
    }
  };

  const config = getVitalConfig();
  const Icon = config.icon;

  if (compact) {
    return (
      <Pressable style={styles.compactCard} onPress={onPress}>
        <View style={[styles.compactIcon, { backgroundColor: config.bgColor }]}>
          <Icon size={18} color={config.color} />
        </View>
        <View>
          <Text style={styles.compactValue}>{vital.value}</Text>
          <Text style={styles.compactLabel}>{vital.unit}</Text>
        </View>
        <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
      </Pressable>
    );
  }

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: config.bgColor }]}>
        <Icon size={28} color={config.color} />
      </View>
      <Text style={styles.value}>{vital.value}</Text>
      <Text style={styles.unit}>{vital.unit}</Text>
      <Text style={styles.label}>{config.label}</Text>
      <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  value: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  unit: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 2,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 8,
  },
  statusIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  // Compact styles
  compactCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  compactIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  compactValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  compactLabel: {
    fontSize: 11,
    color: colors.textMuted,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 10,
  },
});
