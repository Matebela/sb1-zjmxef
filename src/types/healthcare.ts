export interface HealthcareRecord {
  Policy: string;
  Plan: string;
  CustomerDefinedSort: string;
  SubscriberName: string;
  CoverageDates: string;
  ID: string;
  Status: string;
  Volume: number;
  ChargeAmount: number;
  AdjCode: string;
  CoverageType: string;
  BenefitGroup1: string;
  BenefitGroup2: string;
  BenefitGroup3: string;
}

export interface SubscriberData {
  name: string;
  id: string;
  coverageType: string;
  plans: Set<string>;
  coverageDates: Set<string>;
  transactions: Transaction[];
  monthlyTotals: Record<string, MonthlyTotal>;
  totalCharges: number;
  totalRefunds: number;
  netTotal: number;
}

export interface Transaction {
  date: string;
  plan: string;
  amount: number;
  type: 'CHARGE' | 'REFUND';
  policy: string;
  status: string;
  coverageType: string;
  volume: number;
}

export interface MonthlyTotal {
  charges: number;
  refunds: number;
  net: number;
  count: number;
}