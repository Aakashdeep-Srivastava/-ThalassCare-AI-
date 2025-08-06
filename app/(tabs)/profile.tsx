import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Settings, Bell, Shield, FileText, Phone, LogOut, ChevronRight } from 'lucide-react-native';

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <LinearGradient
          colors={['#6366F1', '#4F46E5']}
          style={styles.header}
        >
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <User size={40} color="#FFFFFF" />
            </View>
            <Text style={styles.userName}>Sarah Johnson</Text>
            <Text style={styles.userEmail}>sarah.johnson@email.com</Text>
            <Text style={styles.patientId}>Patient ID: TH-2024-001</Text>
          </View>
        </LinearGradient>

        {/* Health Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Health Summary</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>Beta Thalassemia Major</Text>
              <Text style={styles.summaryLabel}>Diagnosis</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>Dr. Sarah Wilson</Text>
              <Text style={styles.summaryLabel}>Primary Doctor</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>March 2019</Text>
              <Text style={styles.summaryLabel}>Diagnosed</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>Type A+</Text>
              <Text style={styles.summaryLabel}>Blood Type</Text>
            </View>
          </View>
        </View>

        {/* Current Treatment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Treatment</Text>
          <View style={styles.treatmentCard}>
            <View style={styles.treatmentItem}>
              <Text style={styles.treatmentName}>Deferoxamine (Desferal)</Text>
              <Text style={styles.treatmentDosage}>500mg • 5 days/week</Text>
            </View>
            <View style={styles.treatmentItem}>
              <Text style={styles.treatmentName}>Folic Acid</Text>
              <Text style={styles.treatmentDosage}>5mg • Daily</Text>
            </View>
            <View style={styles.treatmentItem}>
              <Text style={styles.treatmentName}>Blood Transfusions</Text>
              <Text style={styles.treatmentDosage}>Every 3-4 weeks</Text>
            </View>
          </View>
        </View>

        {/* Settings Menu */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <View style={styles.menuCard}>
            <Pressable style={styles.menuItem}>
              <Bell size={20} color="#6B7280" />
              <Text style={styles.menuText}>Notifications</Text>
              <ChevronRight size={20} color="#6B7280" />
            </Pressable>
            
            <Pressable style={styles.menuItem}>
              <Shield size={20} color="#6B7280" />
              <Text style={styles.menuText}>Privacy & Security</Text>
              <ChevronRight size={20} color="#6B7280" />
            </Pressable>
            
            <Pressable style={styles.menuItem}>
              <FileText size={20} color="#6B7280" />
              <Text style={styles.menuText}>Medical Records</Text>
              <ChevronRight size={20} color="#6B7280" />
            </Pressable>
            
            <Pressable style={styles.menuItem}>
              <Phone size={20} color="#6B7280" />
              <Text style={styles.menuText}>Emergency Contacts</Text>
              <ChevronRight size={20} color="#6B7280" />
            </Pressable>
            
            <Pressable style={styles.menuItem}>
              <Settings size={20} color="#6B7280" />
              <Text style={styles.menuText}>App Settings</Text>
              <ChevronRight size={20} color="#6B7280" />
            </Pressable>
          </View>
        </View>

        {/* Emergency Contacts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Contacts</Text>
          
          <View style={styles.contactsCard}>
            <View style={styles.contactItem}>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>Dr. Sarah Wilson</Text>
                <Text style={styles.contactRole}>Primary Hematologist</Text>
              </View>
              <Pressable style={styles.callButton}>
                <Phone size={16} color="#FFFFFF" />
              </Pressable>
            </View>
            
            <View style={styles.contactItem}>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>Medical Center ER</Text>
                <Text style={styles.contactRole}>Emergency Department</Text>
              </View>
              <Pressable style={styles.callButton}>
                <Phone size={16} color="#FFFFFF" />
              </Pressable>
            </View>
            
            <View style={styles.contactItem}>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>John Johnson</Text>
                <Text style={styles.contactRole}>Emergency Contact</Text>
              </View>
              <Pressable style={styles.callButton}>
                <Phone size={16} color="#FFFFFF" />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Medical ID Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medical ID</Text>
          
          <View style={styles.medicalIdCard}>
            <Text style={styles.medicalIdTitle}>Emergency Medical Information</Text>
            <Text style={styles.medicalIdText}>
              Beta Thalassemia Major • Blood Type: A+ • Iron Chelation Therapy
            </Text>
            <Text style={styles.medicalIdText}>
              Allergies: None • Current Medications: Deferoxamine, Folic Acid
            </Text>
            <Pressable style={styles.downloadButton}>
              <FileText size={16} color="#FFFFFF" />
              <Text style={styles.downloadButtonText}>Download Card</Text>
            </Pressable>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>App Version</Text>
              <Text style={styles.infoValue}>1.0.0</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Last Updated</Text>
              <Text style={styles.infoValue}>March 15, 2024</Text>
            </View>
          </View>
        </View>

        {/* Sign Out */}
        <View style={styles.signOutSection}>
          <Pressable style={styles.signOutButton}>
            <LogOut size={20} color="#DC2626" />
            <Text style={styles.signOutText}>Sign Out</Text>
          </Pressable>
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
    paddingVertical: 40,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#E0E7FF',
    marginBottom: 8,
  },
  patientId: {
    fontSize: 14,
    color: '#C7D2FE',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryItem: {
    width: '48%',
    marginBottom: 16,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  treatmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  treatmentItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  treatmentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  treatmentDosage: {
    fontSize: 14,
    color: '#6B7280',
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
  },
  contactsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  contactRole: {
    fontSize: 14,
    color: '#6B7280',
  },
  callButton: {
    backgroundColor: '#059669',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medicalIdCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: '#FECACA',
  },
  medicalIdTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#DC2626',
    marginBottom: 12,
  },
  medicalIdText: {
    fontSize: 14,
    color: '#7F1D1D',
    lineHeight: 20,
    marginBottom: 8,
  },
  downloadButton: {
    backgroundColor: '#DC2626',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
    gap: 8,
  },
  downloadButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  signOutSection: {
    marginHorizontal: 20,
    marginTop: 24,
  },
  signOutButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    gap: 12,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC2626',
  },
});