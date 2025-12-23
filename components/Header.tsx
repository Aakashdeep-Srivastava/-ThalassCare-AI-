import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { colors } from '@/constants/theme';

interface HeaderIcon {
  icon: LucideIcon;
  onPress?: () => void;
}

interface HeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  onIconPress?: () => void;
  rightIcons?: HeaderIcon[];
  compact?: boolean;
}

export default function Header({
  title,
  subtitle,
  icon: Icon,
  onIconPress,
  rightIcons,
  compact = false
}: HeaderProps) {
  if (compact) {
    return (
      <View style={styles.compactHeader}>
        <View>
          <Text style={styles.compactTitle}>{title}</Text>
          {subtitle && <Text style={styles.compactSubtitle}>{subtitle}</Text>}
        </View>
        <View style={styles.iconRow}>
          {rightIcons?.map((item, index) => (
            <Pressable key={index} style={styles.compactIconButton} onPress={item.onPress}>
              <item.icon size={20} color="#FFFFFF" />
            </Pressable>
          ))}
          {Icon && (
            <Pressable style={styles.compactIconButton} onPress={onIconPress}>
              <Icon size={20} color="#FFFFFF" />
            </Pressable>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        <View style={styles.iconRow}>
          {rightIcons?.map((item, index) => (
            <Pressable key={index} style={styles.iconButton} onPress={item.onPress}>
              <View style={styles.iconGlow}>
                <item.icon size={22} color="#FFFFFF" />
              </View>
            </Pressable>
          ))}
          {Icon && (
            <Pressable style={styles.iconButton} onPress={onIconPress}>
              <View style={styles.iconGlow}>
                <Icon size={22} color="#FFFFFF" />
              </View>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: colors.primary,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    marginLeft: 4,
  },
  iconGlow: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Compact styles
  compactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.primary,
  },
  compactTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  compactSubtitle: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  compactIconButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
