import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Clock, MapPin, Plus, Phone, Video } from 'lucide-react-native';

export default function Appointments() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <LinearGradient
          colors={['#7C3AED', '#6D28D9']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Appointments</Text>
          <Text style={styles.headerSubtitle}>Manage your medical visits</Text>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Pressable style={styles.actionButton}>
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>New Appointment</Text>
          </Pressable>
          
          <Pressable style={[styles.actionButton, { backgroundColor: '#059669' }]}>
            <Video size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Telehealth</Text>
          </Pressable>
        </View>

        {/* Upcoming Appointments */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming</Text>
          
          <View style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <View style={styles.appointmentDate}>
                <Text style={styles.dateDay}>16</Text>
                <Text style={styles.dateMonth}>MAR</Text>
              </View>
              <View style={styles.appointmentInfo}>
                <Text style={styles.doctorName}>Dr. Sarah Wilson</Text>
                <Text style={styles.specialty}>Hematologist</Text>
                <View style={styles.appointmentDetails}>
                  <Clock size={16} color="#6B7280" />
                  <Text style={styles.detailText}>2:00 PM - 2:45 PM</Text>
                </View>
                <View style={styles.appointmentDetails}>
                  <MapPin size={16} color="#6B7280" />
                  <Text style={styles.detailText}>Medical Center, Room 204</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.appointmentActions}>
              <Pressable style={styles.secondaryButton}>
                <Phone size={16} color="#2563EB" />
                <Text style={styles.secondaryButtonText}>Call</Text>
              </Pressable>
              <Pressable style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Check In</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <View style={styles.appointmentDate}>
                <Text style={styles.dateDay}>22</Text>
                <Text style={styles.dateMonth}>MAR</Text>
              </View>
              <View style={styles.appointmentInfo}>
                <Text style={styles.doctorName}>Dr. Michael Chen</Text>
                <Text style={styles.specialty}>Cardiologist</Text>
                <View style={styles.appointmentDetails}>
                  <Clock size={16} color="#6B7280" />
                  <Text style={styles.detailText}>10:30 AM - 11:15 AM</Text>
                </View>
                <View style={styles.appointmentDetails}>
                  <Video size={16} color="#059669" />
                  <Text style={[styles.detailText, { color: '#059669' }]}>Video Consultation</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.appointmentActions}>
              <Pressable style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Reschedule</Text>
              </Pressable>
              <Pressable style={[styles.primaryButton, { backgroundColor: '#059669' }]}>
                <Video size={16} color="#FFFFFF" />
                <Text style={styles.primaryButtonText}>Join Call</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Recent Appointments */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent</Text>
          
          <View style={styles.recentCard}>
            <View style={styles.recentHeader}>
              <Calendar size={20} color="#6B7280" />
              <View style={styles.recentInfo}>
                <Text style={styles.recentDate}>March 8, 2024</Text>
                <Text style={styles.recentDoctor}>Dr. Sarah Wilson - Follow-up</Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Completed</Text>
              </View>
            </View>
            
            <Text style={styles.appointmentNotes}>
              Blood test results reviewed. Hemoglobin levels stable. Continue current medication regimen.
            </Text>
          </View>

          <View style={styles.recentCard}>
            <View style={styles.recentHeader}>
              <Calendar size={20} color="#6B7280" />
              <View style={styles.recentInfo}>
                <Text style={styles.recentDate}>February 28, 2024</Text>
                <Text style={styles.recentDoctor}>Dr. Lisa Rodriguez - Lab Work</Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Completed</Text>
              </View>
            </View>
            
            <Text style={styles.appointmentNotes}>
              Routine blood draw for hemoglobin and ferritin levels. Results to be reviewed next visit.
            </Text>
          </View>
        </View>

        {/* Available Slots */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available This Week</Text>
          
          <View style={styles.slotsContainer}>
            <View style={styles.daySlot}>
              <Text style={styles.slotDay}>Today</Text>
              <Text style={styles.slotDate}>Mar 15</Text>
              <Text style={styles.slotAvailable}>3 slots</Text>
            </View>
            
            <View style={styles.daySlot}>
              <Text style={styles.slotDay}>Tomorrow</Text>
              <Text style={styles.slotDate}>Mar 16</Text>
              <Text style={styles.slotAvailable}>1 slot</Text>
            </View>
            
            <View style={styles.daySlot}>
              <Text style={styles.slotDay}>Monday</Text>
              <Text style={styles.slotDate}>Mar 18</Text>
              <Text style={styles.slotAvailable}>5 slots</Text>
            </View>
            
            <View style={styles.daySlot}>
              <Text style={styles.slotDay}>Tuesday</Text>
              <Text style={styles.slotDate}>Mar 19</Text>
              <Text style={styles.slotAvailable}>2 slots</Text>
            </View>
          </View>
        </View>

        {/* Emergency Contact */}
        <View style={styles.emergencyCard}>
          <Text style={styles.emergencyTitle}>Need Immediate Care?</Text>
          <Text style={styles.emergencyText}>
            Contact your care team or visit the emergency department
          </Text>
          <View style={styles.emergencyButtons}>
            <Pressable style={styles.emergencyButton}>
              <Phone size={18} color="#FFFFFF" />
              <Text style={styles.emergencyButtonText}>Call Doctor</Text>
            </Pressable>
            <Pressable style={[styles.emergencyButton, { backgroundColor: '#DC2626' }]}>
              <Text style={styles.emergencyButtonText}>Emergency</Text>
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
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E9D5FF',
    textAlign: 'center',
    marginTop: 4,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  appointmentHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  appointmentDate: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  dateDay: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2563EB',
  },
  dateMonth: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  appointmentInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  appointmentDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  appointmentActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryButtonText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '600',
  },
  recentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  recentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  recentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  recentDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  recentDoctor: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  appointmentNotes: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  slotsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  daySlot: {
    width: '23%',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  slotDay: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  slotDate: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginVertical: 4,
  },
  slotAvailable: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '600',
  },
  emergencyCard: {
    backgroundColor: '#FEF2F2',
    marginHorizontal: 20,
    marginTop: 24,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#DC2626',
    marginBottom: 8,
  },
  emergencyText: {
    fontSize: 14,
    color: '#7F1D1D',
    marginBottom: 16,
  },
  emergencyButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  emergencyButton: {
    flex: 1,
    backgroundColor: '#F59E0B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  emergencyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});