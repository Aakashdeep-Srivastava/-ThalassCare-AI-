import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Lightbulb, Bell, AlertTriangle, Sparkles, X } from 'lucide-react-native';
import { colors } from '@/constants/theme';
import { AIInsight } from '@/types';

interface InsightCardProps {
  insight: AIInsight;
  onAction?: () => void;
  onDismiss?: () => void;
}

export default function InsightCard({ insight, onAction, onDismiss }: InsightCardProps) {
  const getTypeStyles = () => {
    switch (insight.type) {
      case 'tip':
        return {
          icon: Lightbulb,
          bgColor: '#E0F2FE',
          iconColor: '#0EA5E9',
          borderColor: '#BAE6FD',
        };
      case 'reminder':
        return {
          icon: Bell,
          bgColor: '#FEF3C7',
          iconColor: '#F59E0B',
          borderColor: '#FDE68A',
        };
      case 'alert':
        return {
          icon: AlertTriangle,
          bgColor: '#FEE2E2',
          iconColor: '#EF4444',
          borderColor: '#FECACA',
        };
      case 'recommendation':
        return {
          icon: Sparkles,
          bgColor: '#E0F7F5',
          iconColor: '#14B8A6',
          borderColor: '#99F6E4',
        };
    }
  };

  const typeStyles = getTypeStyles();
  const Icon = typeStyles.icon;

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: typeStyles.bgColor, borderColor: typeStyles.borderColor },
      ]}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: typeStyles.iconColor + '20' }]}>
          <Icon size={20} color={typeStyles.iconColor} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{insight.title}</Text>
          <Text style={styles.message}>{insight.message}</Text>
        </View>
        {onDismiss && (
          <Pressable style={styles.dismissButton} onPress={onDismiss}>
            <X size={18} color={colors.textMuted} />
          </Pressable>
        )}
      </View>

      {insight.actionLabel && (
        <Pressable
          style={[styles.actionButton, { backgroundColor: typeStyles.iconColor }]}
          onPress={onAction}
        >
          <Text style={styles.actionText}>{insight.actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  dismissButton: {
    padding: 4,
    marginLeft: 8,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
