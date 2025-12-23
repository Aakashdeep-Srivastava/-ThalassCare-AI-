import {
  Patient,
  Doctor,
  HealthMetric,
  VitalSign,
  Transfusion,
  BloodBank,
  BloodRequest,
  Symptom,
  SymptomLog,
  Medication,
  MedicationLog,
  Appointment,
  Article,
  Video,
  SupportGroup,
  FinancialScheme,
  EmergencyContact,
  AIInsight,
} from '@/types';

// Primary Doctor
export const primaryDoctor: Doctor = {
  id: 'doc-1',
  name: 'Dr. Priya Sharma',
  specialty: 'Hematologist',
  hospital: 'Apollo Hospital',
  phone: '+91 98765 43210',
  email: 'priya.sharma@apollo.com',
};

// Patient Data
export const patientData: Patient = {
  id: 'TH-2024-001',
  name: 'Aarav Patel',
  email: 'aarav.patel@email.com',
  phone: '+91 98765 12345',
  bloodType: 'B+',
  diagnosis: 'Beta Thalassemia Major',
  diagnosisDate: '2019-03-15',
  dateOfBirth: '2012-06-20',
  age: 12,
  primaryDoctor: primaryDoctor,
  emergencyContact: {
    name: 'Vikram Patel',
    relationship: 'Father',
    phone: '+91 98765 00001',
  },
  allergies: ['Penicillin'],
};

// Health Metrics
export const healthMetrics: HealthMetric[] = [
  {
    id: 'hb-1',
    name: 'Hemoglobin',
    value: 9.2,
    unit: 'g/dL',
    normalRange: { min: 9.0, max: 11.0 },
    status: 'normal',
    trend: 'stable',
    lastUpdated: '2024-12-20',
  },
  {
    id: 'ferritin-1',
    name: 'Ferritin',
    value: 1850,
    unit: 'ng/mL',
    normalRange: { min: 20, max: 1000 },
    status: 'high',
    trend: 'down',
    lastUpdated: '2024-12-20',
  },
  {
    id: 'iron-1',
    name: 'Serum Iron',
    value: 180,
    unit: 'mcg/dL',
    normalRange: { min: 60, max: 170 },
    status: 'high',
    trend: 'stable',
    lastUpdated: '2024-12-20',
  },
  {
    id: 'tibc-1',
    name: 'TIBC',
    value: 250,
    unit: 'mcg/dL',
    normalRange: { min: 250, max: 400 },
    status: 'normal',
    trend: 'stable',
    lastUpdated: '2024-12-20',
  },
];

// Vital Signs
export const vitalSigns: VitalSign[] = [
  {
    id: 'hr-1',
    type: 'heartRate',
    value: '78',
    unit: 'bpm',
    status: 'normal',
    recordedAt: '2024-12-23T08:00:00',
  },
  {
    id: 'bp-1',
    type: 'bloodPressure',
    value: '110/72',
    unit: 'mmHg',
    status: 'normal',
    recordedAt: '2024-12-23T08:00:00',
  },
  {
    id: 'temp-1',
    type: 'temperature',
    value: '98.4',
    unit: '°F',
    status: 'normal',
    recordedAt: '2024-12-23T08:00:00',
  },
  {
    id: 'spo2-1',
    type: 'oxygenSaturation',
    value: '97',
    unit: '%',
    status: 'normal',
    recordedAt: '2024-12-23T08:00:00',
  },
];

// Blood Banks
export const bloodBanks: BloodBank[] = [
  {
    id: 'bb-1',
    name: 'Red Cross Blood Bank',
    address: 'MG Road, Sector 5',
    phone: '+91 11 2345 6789',
    distance: '2.5 km',
    availableUnits: 8,
    isVerified: true,
  },
  {
    id: 'bb-2',
    name: 'Apollo Blood Center',
    address: 'Apollo Hospital Campus',
    phone: '+91 11 9876 5432',
    distance: '4.2 km',
    availableUnits: 12,
    isVerified: true,
  },
  {
    id: 'bb-3',
    name: 'Government Blood Bank',
    address: 'Civil Hospital',
    phone: '+91 11 5555 1234',
    distance: '6.0 km',
    availableUnits: 5,
    isVerified: true,
  },
];

// Transfusions
export const transfusions: Transfusion[] = [
  {
    id: 'tf-1',
    date: '2024-12-28',
    time: '09:30',
    bloodBank: bloodBanks[0],
    units: 2,
    hemoglobinBefore: 8.5,
    status: 'scheduled',
    confirmed: true,
    notes: 'Regular transfusion',
  },
  {
    id: 'tf-2',
    date: '2024-12-10',
    time: '10:00',
    bloodBank: bloodBanks[1],
    units: 2,
    hemoglobinBefore: 8.2,
    hemoglobinAfter: 10.8,
    status: 'completed',
    confirmed: true,
  },
  {
    id: 'tf-3',
    date: '2024-11-22',
    time: '09:00',
    bloodBank: bloodBanks[0],
    units: 2,
    hemoglobinBefore: 8.0,
    hemoglobinAfter: 10.5,
    status: 'completed',
    confirmed: true,
  },
];

// Blood Request
export const currentBloodRequest: BloodRequest = {
  id: 'br-1',
  bloodType: 'B+',
  unitsNeeded: 2,
  urgency: 'routine',
  status: 'matched',
  requestDate: '2024-12-20',
  requiredBy: '2024-12-28',
  matchedDonors: 3,
};

// Symptoms List
export const symptoms: Symptom[] = [
  { id: 's-1', name: 'Fatigue', icon: 'battery-low', category: 'common' },
  { id: 's-2', name: 'Weakness', icon: 'trending-down', category: 'common' },
  { id: 's-3', name: 'Pale Skin', icon: 'user', category: 'common' },
  { id: 's-4', name: 'Shortness of Breath', icon: 'wind', category: 'warning' },
  { id: 's-5', name: 'Dizziness', icon: 'loader', category: 'warning' },
  { id: 's-6', name: 'Bone Pain', icon: 'activity', category: 'common' },
  { id: 's-7', name: 'Headache', icon: 'frown', category: 'common' },
  { id: 's-8', name: 'Chest Pain', icon: 'heart', category: 'emergency' },
  { id: 's-9', name: 'Fast Heartbeat', icon: 'zap', category: 'warning' },
  { id: 's-10', name: 'Cold Hands/Feet', icon: 'thermometer', category: 'common' },
];

// Today's Symptom Logs
export const todaySymptomLogs: SymptomLog[] = [
  {
    id: 'sl-1',
    symptomId: 's-1',
    severity: 'mild',
    loggedAt: '2024-12-23T09:00:00',
  },
  {
    id: 'sl-2',
    symptomId: 's-3',
    severity: 'mild',
    loggedAt: '2024-12-23T09:00:00',
  },
];

// Medications
export const medications: Medication[] = [
  {
    id: 'med-1',
    name: 'Deferasirox',
    dosage: '500mg',
    frequency: 'Once daily',
    type: 'chelation',
    instructions: 'Take on empty stomach, 30 min before meal',
    startDate: '2023-01-15',
  },
  {
    id: 'med-2',
    name: 'Folic Acid',
    dosage: '5mg',
    frequency: 'Once daily',
    type: 'supplement',
    instructions: 'Take with breakfast',
    startDate: '2019-04-01',
  },
  {
    id: 'med-3',
    name: 'Vitamin D3',
    dosage: '1000 IU',
    frequency: 'Once daily',
    type: 'supplement',
    instructions: 'Take with food',
    startDate: '2022-06-01',
  },
];

// Today's Medication Logs
export const todayMedicationLogs: MedicationLog[] = [
  {
    id: 'ml-1',
    medicationId: 'med-1',
    taken: true,
    scheduledTime: '07:00',
    takenAt: '07:15',
  },
  {
    id: 'ml-2',
    medicationId: 'med-2',
    taken: true,
    scheduledTime: '08:00',
    takenAt: '08:10',
  },
  {
    id: 'ml-3',
    medicationId: 'med-3',
    taken: false,
    scheduledTime: '08:00',
  },
];

// Appointments
export const appointments: Appointment[] = [
  {
    id: 'apt-1',
    doctor: primaryDoctor,
    date: '2024-12-28',
    time: '10:00',
    type: 'transfusion',
    location: 'Apollo Hospital, Room 205',
    status: 'scheduled',
    notes: 'Bring previous lab reports',
  },
  {
    id: 'apt-2',
    doctor: {
      id: 'doc-2',
      name: 'Dr. Rahul Mehta',
      specialty: 'Cardiologist',
      hospital: 'Apollo Hospital',
      phone: '+91 98765 11111',
    },
    date: '2025-01-05',
    time: '11:30',
    type: 'checkup',
    location: 'Apollo Hospital, Room 312',
    status: 'scheduled',
  },
  {
    id: 'apt-3',
    doctor: {
      id: 'doc-3',
      name: 'Dr. Priya Nair',
      specialty: 'Nutritionist',
      hospital: 'Apollo Hospital',
      phone: '+91 98765 22222',
    },
    date: '2025-01-10',
    time: '15:00',
    type: 'video',
    status: 'scheduled',
    notes: 'Diet consultation',
  },
  {
    id: 'apt-4',
    doctor: primaryDoctor,
    date: '2024-12-15',
    time: '09:30',
    type: 'followup',
    location: 'Apollo Hospital, Room 205',
    status: 'completed',
    notes: 'Iron levels discussed. Continue current medication.',
  },
];

// Articles
export const articles: Article[] = [
  {
    id: 'art-1',
    title: 'Understanding Thalassemia',
    summary: 'Learn about the basics of thalassemia, its types, and how it affects your body.',
    category: 'basics',
    readTime: '5 min',
    rating: 4.8,
  },
  {
    id: 'art-2',
    title: 'Managing Iron Overload',
    summary: 'Essential tips for managing iron levels and preventing complications from iron overload.',
    category: 'treatment',
    readTime: '7 min',
    rating: 4.9,
  },
  {
    id: 'art-3',
    title: 'Nutrition Guide for Thalassemia',
    summary: 'Foods to eat and avoid, plus meal planning tips for thalassemia patients.',
    category: 'nutrition',
    readTime: '6 min',
    rating: 4.7,
  },
  {
    id: 'art-4',
    title: 'Preparing for Transfusion',
    summary: 'Step-by-step guide on what to expect and how to prepare for blood transfusions.',
    category: 'treatment',
    readTime: '4 min',
    rating: 4.6,
  },
  {
    id: 'art-5',
    title: 'Exercise and Physical Activity',
    summary: 'Safe exercises and activity guidelines for thalassemia patients.',
    category: 'lifestyle',
    readTime: '5 min',
    rating: 4.5,
  },
];

// Videos
export const videos: Video[] = [
  {
    id: 'vid-1',
    title: 'Living with Thalassemia',
    duration: '12:30',
    category: 'Patient Stories',
  },
  {
    id: 'vid-2',
    title: 'Chelation Therapy Explained',
    duration: '8:45',
    category: 'Treatment',
  },
  {
    id: 'vid-3',
    title: 'Managing Daily Life',
    duration: '10:15',
    category: 'Lifestyle',
  },
  {
    id: 'vid-4',
    title: 'Talking to Your Doctor',
    duration: '6:20',
    category: 'Tips',
  },
];

// Support Groups
export const supportGroups: SupportGroup[] = [
  {
    id: 'sg-1',
    name: 'Thalassemia Warriors India',
    description: 'Connect with fellow patients and caregivers across India',
    memberCount: 5420,
    activeToday: 234,
  },
  {
    id: 'sg-2',
    name: 'Parents Support Circle',
    description: 'For parents of children with thalassemia',
    memberCount: 2180,
    activeToday: 98,
  },
];

// Financial Schemes
export const financialSchemes: FinancialScheme[] = [
  {
    id: 'fs-1',
    name: 'Thalassemia Bal Sewa Yojana',
    description: 'Free treatment support for thalassemia patients under 18',
    coverage: 'Full treatment cost',
    eligibility: 'Children under 18 with thalassemia major',
  },
  {
    id: 'fs-2',
    name: 'Ayushman Bharat',
    description: 'National health insurance scheme',
    coverage: 'Up to ₹5 Lakh per year',
    eligibility: 'BPL families and eligible categories',
  },
  {
    id: 'fs-3',
    name: 'State Health Scheme',
    description: 'State-specific health coverage programs',
    coverage: 'Varies by state',
    eligibility: 'State residents',
  },
];

// Emergency Contacts
export const emergencyContacts: EmergencyContact[] = [
  {
    id: 'ec-1',
    name: 'Vikram Patel',
    relationship: 'Father',
    phone: '+91 98765 00001',
    isPrimary: true,
  },
  {
    id: 'ec-2',
    name: 'Meera Patel',
    relationship: 'Mother',
    phone: '+91 98765 00002',
    isPrimary: false,
  },
  {
    id: 'ec-3',
    name: 'Dr. Priya Sharma',
    relationship: 'Primary Doctor',
    phone: '+91 98765 43210',
    isPrimary: false,
  },
];

// AI Insights
export const aiInsights: AIInsight[] = [
  {
    id: 'ai-1',
    type: 'reminder',
    title: 'Transfusion in 5 days',
    message: 'Your next transfusion is scheduled for Dec 28. Blood bank has confirmed availability.',
    priority: 'high',
    actionLabel: 'View Details',
    actionType: 'transfusion',
  },
  {
    id: 'ai-2',
    type: 'tip',
    title: 'Iron Levels Improving',
    message: 'Your ferritin levels have decreased by 8% this month. Keep up with your chelation therapy!',
    priority: 'low',
  },
  {
    id: 'ai-3',
    type: 'recommendation',
    title: 'Stay Hydrated',
    message: 'Drink plenty of water today. It helps your body prepare for the upcoming transfusion.',
    priority: 'medium',
  },
  {
    id: 'ai-4',
    type: 'alert',
    title: 'Vitamin D3 Missed',
    message: 'You haven\'t taken your Vitamin D3 supplement today. Would you like a reminder?',
    priority: 'medium',
    actionLabel: 'Mark as Taken',
    actionType: 'medication',
  },
];

// Calculate days until next transfusion
export const getDaysUntilTransfusion = (): number => {
  const nextTransfusion = transfusions.find(t => t.status === 'scheduled');
  if (!nextTransfusion) return 0;

  const today = new Date();
  const transfusionDate = new Date(nextTransfusion.date);
  const diffTime = transfusionDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};

// Calculate health score (simplified)
export const calculateHealthScore = (): number => {
  let score = 100;

  // Hemoglobin factor
  const hb = healthMetrics.find(m => m.name === 'Hemoglobin');
  if (hb) {
    if (hb.value < 9) score -= 20;
    else if (hb.value < 10) score -= 10;
  }

  // Ferritin factor (iron overload)
  const ferritin = healthMetrics.find(m => m.name === 'Ferritin');
  if (ferritin) {
    if (ferritin.value > 2500) score -= 25;
    else if (ferritin.value > 1500) score -= 15;
    else if (ferritin.value > 1000) score -= 5;
  }

  // Medication adherence
  const takenMeds = todayMedicationLogs.filter(l => l.taken).length;
  const totalMeds = todayMedicationLogs.length;
  if (totalMeds > 0) {
    score -= (totalMeds - takenMeds) * 5;
  }

  return Math.max(0, Math.min(100, score));
};
