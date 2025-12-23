import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Droplets, MapPin, CheckCircle, Clock } from 'lucide-react-native';
import { colors } from '@/constants/theme';

interface CountdownCardProps {
  daysLeft: number;
  date: string;
  bloodBankName: string;
  status: 'confirmed' | 'pending' | 'urgent';
  onPress?: () => void;
  onFindBlood?: () => void;
}

export default function CountdownCard({
  daysLeft,
  date,
  bloodBankName,
  status,
  onPress,
  onFindBlood,
}: CountdownCardProps) {
  const getStatusColor = () => {
    if (daysLeft <= 2) return ['#EF4444', '#DC2626'];
    if (daysLeft <= 5) return ['#F59E0B', '#D97706'];
    return ['#4ECDC4', '#44A08D'];
  };

  const getStatusInfo = () => {
    switch (status) {
      case 'confirmed':
        return { icon: CheckCircle, text: 'Blood Confirmed', color: colors.success };
      case 'pending':
        return { icon: Clock, text: 'Awaiting Confirmation', color: colors.warning };
      case 'urgent':
        return { icon: Droplets, text: 'Blood Needed', color: colors.error };
    }
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  return (
    <LinearGradient
      colors={getStatusColor()}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <Pressable style={styles.content} onPress={onPress}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Droplets size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.title}>Next Transfusion</Text>
        </View>

        <View style={styles.countdownSection}>
          <Text style={styles.daysNumber}>{daysLeft}</Text>
          <Text style={styles.daysLabel}>days left</Text>
        </View>

        <Text style={styles.date}>{date}</Text>

        <View style={styles.locationRow}>
          <MapPin size={16} color="rgba(255,255,255,0.8)" />
          <Text style={styles.location}>{bloodBankName}</Text>
        </View>

        <View style={styles.statusRow}>
          <StatusIcon size={18} color={statusInfo.color} />
          <Text style={[styles.statusText, { color: statusInfo.color }]}>
            {statusInfo.text}
          </Text>
        </View>

        {status !== 'confirmed' && (
          <Pressable style={styles.findButton} onPress={onFindBlood}>
            <Text style={styles.findButtonText}>Find Blood Nearby</Text>
          </Pressable>
        )}
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 20,
    overflow: 'hidden',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  countdownSection: {
    alignItems: 'center',
    marginBottom: 12,
  },
  daysNumber: {
    fontSize: 64,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 72,
  },
  daysLabel: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
    marginTop: -8,
  },
  date: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  location: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 6,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  findButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  findButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#44A08D',
  },
});
