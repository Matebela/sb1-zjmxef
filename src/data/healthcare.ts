import { HealthcareRecord } from '../types/healthcare';

// Parse CSV data into array of records
export const parseHealthcareData = (csvData: string): HealthcareRecord[] => {
  if (!csvData) return [];
  
  return csvData
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
};