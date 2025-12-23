import { View, Text, StyleSheet, Pressable } from 'react-native';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react-native';
import { colors } from '@/constants/theme';
import { HealthMetric } from '@/types';

interface HealthCardProps {
  metric: HealthMetric;
  onPress?: () => void;
}

export default function HealthCard({ metric, onPress }: HealthCardProps) {
  const getStatusColor = () => {
    switch (metric.status) {
      case 'normal':
        return colors.success;
      case 'high':
        return colors.warning;
      case 'low':
        return colors.warning;
      case 'critical':
        return colors.error;
      default:
        return colors.textMuted;
    }
  };

  const getTrendIcon = () => {
    const iconProps = { size: 16, color: getStatusColor() };
    switch (metric.trend) {
      case 'up':
        return <TrendingUp {...iconProps} />;
      case 'down':
        return <TrendingDown {...iconProps} />;
      default:
        return <Minus {...iconProps} />;
    }
  };

  const getStatusLabel = () => {
    switch (metric.status) {
      case 'normal':
        return 'Normal';
      case 'high':
        return 'High';
      case 'low':
        return 'Low';
      case 'critical':
        return 'Critical';
      default:
        return '';
    }
  };

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.name}>{metric.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {getStatusLabel()}
          </Text>
        </View>
      </View>

      <View style={styles.valueRow}>
        <Text style={styles.value}>{metric.value}</Text>
        <Text style={styles.unit}>{metric.unit}</Text>
        <View style={styles.trendContainer}>
          {getTrendIcon()}
        </View>
      </View>

      <Text style={styles.range}>
        Normal: {metric.normalRange.min} - {metric.normalRange.max} {metric.unit}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  value: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  unit: {
    fontSize: 16,
    color: colors.textMuted,
    marginLeft: 4,
  },
  trendContainer: {
    marginLeft: 'auto',
  },
  range: {
    fontSize: 12,
    color: colors.textLight,
  },
});
