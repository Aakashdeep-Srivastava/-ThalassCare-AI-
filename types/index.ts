// Patient Types
export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type DiagnosisType = 'Beta Thalassemia Major' | 'Beta Thalassemia Intermedia' | 'Alpha Thalassemia' | 'Thalassemia Minor';
export type SeverityLevel = 'mild' | 'moderate' | 'severe';
export type TrendDirection = 'up' | 'down' | 'stable';

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  bloodType: BloodType;
  diagnosis: DiagnosisType;
  diagnosisDate: string;
  dateOfBirth: string;
  primaryDoctor: Doctor;
  allergies: string[];
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  phone: string;
  email?: string;
}

// Health Metrics
export interface HealthMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  normalRange: { min: number; max: number };
  status: 'normal' | 'low' | 'high' | 'critical';
  trend: TrendDirection;
  lastUpdated: string;
}

export interface VitalSign {
  id: string;
  type: 'heartRate' | 'bloodPressure' | 'temperature' | 'oxygenSaturation';
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  recordedAt: string;
}

// Transfusion
export interface Transfusion {
  id: string;
  date: string;
  time: string;
  bloodBank: BloodBank;
  units: number;
  hemoglobinBefore: number;
  hemoglobinAfter?: number;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  confirmed?: boolean;
}

export interface BloodBank {
  id: string;
  name: string;
  address: string;
  phone: string;
  distance?: string;
  availableUnits?: number;
  isVerified: boolean;
}

export interface BloodRequest {
  id: string;
  bloodType: BloodType;
  unitsNeeded: number;
  urgency: 'routine' | 'urgent' | 'emergency';
  status: 'pending' | 'matched' | 'fulfilled' | 'cancelled';
  requestDate: string;
  requiredBy: string;
  matchedDonors?: number;
}

// Symptoms
export interface Symptom {
  id: string;
  name: string;
  icon: string;
  category: 'common' | 'warning' | 'emergency';
}

export interface SymptomLog {
  id: string;
  symptomId: string;
  severity: SeverityLevel;
  notes?: string;
  loggedAt: string;
}

// Medications
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  type: 'chelation' | 'supplement' | 'other';
  instructions?: string;
  startDate: string;
  endDate?: string;
}

export interface MedicationLog {
  id: string;
  medicationId: string;
  taken: boolean;
  scheduledTime: string;
  takenAt?: string;
  skippedReason?: string;
}

// Appointments
export interface Appointment {
  id: string;
  doctor: Doctor;
  date: string;
  time: string;
  type: 'checkup' | 'transfusion' | 'consultation' | 'followup' | 'telehealth' | 'video';
  location?: string;
  notes?: string;
  status: 'scheduled' | 'upcoming' | 'completed' | 'cancelled' | 'rescheduled';
}

// Education
export interface Article {
  id: string;
  title: string;
  summary: string;
  category: 'basics' | 'treatment' | 'nutrition' | 'lifestyle' | 'emergency';
  readTime: string;
  rating: number;
}

export interface Video {
  id: string;
  title: string;
  thumbnail?: string;
  duration: string;
  category: string;
}

export interface SupportGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  activeToday: number;
}

// Financial
export interface FinancialScheme {
  id: string;
  name: string;
  description: string;
  coverage: string;
  eligibility: string;
  applicationLink?: string;
}

// Emergency
export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
}

// AI Insights
export interface AIInsight {
  id: string;
  type: 'tip' | 'reminder' | 'alert' | 'recommendation';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  actionLabel?: string;
  actionType?: string;
}
