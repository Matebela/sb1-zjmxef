import { create } from 'zustand';
import { HealthcareRecord } from '../types/healthcare';

interface HealthcareState {
  rawData: string;
  setHealthcareData: (data: string) => void;
  parseHealthcareData: () => HealthcareRecord[];
}

export const useHealthcareStore = create<HealthcareState>((set, get) => ({
  rawData: '',
  
  setHealthcareData: (data: string) => {
    set({ rawData: data });
  },

  parseHealthcareData: () => {
    const { rawData } = get();
    if (!rawData) return [];

    return rawData
      .split('\n')
      .slice(1) // Skip header row
      .map(row => {
        const [
          Policy,
          Plan,
          CustomerDefinedSort,
          SubscriberName,
          CoverageDates,
          ID,
          Status,
          Volume,
          ChargeAmount,
          AdjCode,
          CoverageType,
          BenefitGroup1,
          BenefitGroup2,
          BenefitGroup3
        ] = row.split(',');

        return {
          Policy,
          Plan,
          CustomerDefinedSort,
          SubscriberName,
          CoverageDates,
          ID,
          Status,
          Volume: parseFloat(Volume) || 0,
          ChargeAmount: parseFloat(ChargeAmount) || 0,
          AdjCode,
          CoverageType,
          BenefitGroup1,
          BenefitGroup2,
          BenefitGroup3
        };
      });
  }
}));