export type Role = "patient" | "clinician";

export type HealthMetric = "heartRate" | "stepCount" | "sleepScore";

export type DateRange = { startDate: Date; endDate: Date };

export type TimeSeriesData = {
  date: Date;
  heartRate: number;
  stepCount: number;
  sleepScore: number;
};

export type Patient = {
  id: string;
  name: string;
  medicalAid: string;
  phone: string;
};
