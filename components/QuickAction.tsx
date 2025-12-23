import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { colors } from '@/constants/theme';

interface QuickActionProps {
  icon: LucideIcon;
  label: string;
  sublabel?: string;
  color?: string;
  backgroundColor?: string;
  onPress?: () => void;
  size?: 'small' | 'medium' | 'large';
  urgent?: boolean;
}

export default function QuickAction({
  icon: Icon,
  label,
  sublabel,
  color = colors.primary,
  backgroundColor,
  onPress,
  size = 'medium',
  urgent = false,
}: QuickActionProps) {
  const iconSize = size === 'small' ? 24 : size === 'medium' ? 28 : 32;
  const bgColor = backgroundColor || color + '15';

  return (
    <Pressable
      style={[
        styles.container,
        size === 'small' && styles.containerSmall,
        size === 'large' && styles.containerLarge,
        urgent && styles.urgentBorder,
      ]}
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
        <Icon size={iconSize} color={color} />
      </View>
      <Text
        style={[
          styles.label,
          size === 'small' && styles.labelSmall,
          size === 'large' && styles.labelLarge,
        ]}
        numberOfLines={2}
      >
        {label}
      </Text>
      {sublabel && (
        <Text style={styles.sublabel} numberOfLines={1}>
          {sublabel}
        </Text>
      )}
      {urgent && (
        <View style={styles.urgentDot} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
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
  containerSmall: {
    padding: 12,
    borderRadius: 12,
  },
  containerLarge: {
    padding: 20,
    borderRadius: 20,
  },
  urgentBorder: {
    borderWidth: 2,
    borderColor: colors.error,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  labelSmall: {
    fontSize: 12,
  },
  labelLarge: {
    fontSize: 16,
  },
  sublabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
    textAlign: 'center',
  },
  urgentDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.error,
  },
});
