import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Patient,
  HealthMetric,
  VitalSign,
  Transfusion,
  BloodRequest,
  SymptomLog,
  MedicationLog,
  Appointment,
  AIInsight,
} from '@/types';
import {
  patientData,
  healthMetrics as initialHealthMetrics,
  vitalSigns as initialVitalSigns,
  transfusions as initialTransfusions,
  currentBloodRequest,
  todaySymptomLogs as initialSymptomLogs,
  todayMedicationLogs as initialMedicationLogs,
  appointments as initialAppointments,
  aiInsights as initialAiInsights,
  getDaysUntilTransfusion,
  calculateHealthScore,
} from '@/constants/data';

interface PatientContextType {
  // Patient Data
  patient: Patient;
  setPatient: (patient: Patient) => void;

  // Health Metrics
  healthMetrics: HealthMetric[];
  updateHealthMetric: (id: string, value: number) => void;

  // Vital Signs
  vitalSigns: VitalSign[];
  addVitalSign: (vital: VitalSign) => void;

  // Transfusions
  transfusions: Transfusion[];
  daysUntilTransfusion: number;

  // Blood Request
  bloodRequest: BloodRequest;

  // Symptoms
  symptomLogs: SymptomLog[];
  addSymptomLog: (log: SymptomLog) => void;
  removeSymptomLog: (id: string) => void;

  // Medications
  medicationLogs: MedicationLog[];
  toggleMedicationTaken: (id: string) => void;

  // Appointments
  appointments: Appointment[];

  // AI Insights
  aiInsights: AIInsight[];
  dismissInsight: (id: string) => void;

  // Computed Values
  healthScore: number;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export function PatientProvider({ children }: { children: ReactNode }) {
  const [patient, setPatient] = useState<Patient>(patientData);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>(initialHealthMetrics);
  const [vitalSigns, setVitalSigns] = useState<VitalSign[]>(initialVitalSigns);
  const [transfusions] = useState<Transfusion[]>(initialTransfusions);
  const [bloodRequest] = useState<BloodRequest>(currentBloodRequest);
  const [symptomLogs, setSymptomLogs] = useState<SymptomLog[]>(initialSymptomLogs);
  const [medicationLogs, setMedicationLogs] = useState<MedicationLog[]>(initialMedicationLogs);
  const [appointments] = useState<Appointment[]>(initialAppointments);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>(initialAiInsights);

  const updateHealthMetric = (id: string, value: number) => {
    setHealthMetrics(prev =>
      prev.map(metric =>
        metric.id === id
          ? {
              ...metric,
              value,
              status:
                value < metric.normalRange.min
                  ? 'low'
                  : value > metric.normalRange.max
                  ? 'high'
                  : 'normal',
              lastUpdated: new Date().toISOString().split('T')[0],
            }
          : metric
      )
    );
  };

  const addVitalSign = (vital: VitalSign) => {
    setVitalSigns(prev => [vital, ...prev.slice(0, 9)]);
  };

  const addSymptomLog = (log: SymptomLog) => {
    setSymptomLogs(prev => [...prev, log]);
  };

  const removeSymptomLog = (id: string) => {
    setSymptomLogs(prev => prev.filter(log => log.id !== id));
  };

  const toggleMedicationTaken = (id: string) => {
    setMedicationLogs(prev =>
      prev.map(log =>
        log.id === id
          ? {
              ...log,
              taken: !log.taken,
              takenAt: !log.taken ? new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : undefined,
            }
          : log
      )
    );
  };

  const dismissInsight = (id: string) => {
    setAiInsights(prev => prev.filter(insight => insight.id !== id));
  };

  const value: PatientContextType = {
    patient,
    setPatient,
    healthMetrics,
    updateHealthMetric,
    vitalSigns,
    addVitalSign,
    transfusions,
    daysUntilTransfusion: getDaysUntilTransfusion(),
    bloodRequest,
    symptomLogs,
    addSymptomLog,
    removeSymptomLog,
    medicationLogs,
    toggleMedicationTaken,
    appointments,
    aiInsights,
    dismissInsight,
    healthScore: calculateHealthScore(),
  };

  return (
    <PatientContext.Provider value={value}>
      {children}
    </PatientContext.Provider>
  );
}

export function usePatient() {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error('usePatient must be used within a PatientProvider');
  }
  return context;
}
