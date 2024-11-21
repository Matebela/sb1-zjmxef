import React, { useState } from 'react';
import { useHealthcareStore } from '../store/healthcareStore';
import SubscriberCard from './SubscriberCard';
import { SubscriberData, Transaction, MonthlyTotal } from '../types/healthcare';

const SubscriberCards = () => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const parseHealthcareData = useHealthcareStore(state => state.parseHealthcareData);

  // Process healthcare data to group by subscriber
  const subscribers = Object.entries(
    parseHealthcareData().reduce((acc: Record<string, SubscriberData>, curr) => {
      const amount = curr.ChargeAmount;
      const isRefund = curr.AdjCode?.toUpperCase() === 'TRM';
      const [startDate] = curr.CoverageDates.split('-');
      const monthKey = startDate.substring(0, 7); // YYYY-MM format
      
      if (!acc[curr.ID]) {
        acc[curr.ID] = {
          name: curr.SubscriberName,
          id: curr.ID,
          coverageType: curr.CoverageType,
          plans: new Set(),
          coverageDates: new Set(),
          transactions: [],
          monthlyTotals: {},
          totalCharges: 0,
          totalRefunds: 0,
          netTotal: 0
        };
      }

      // Add transaction
      const transaction: Transaction = {
        date: startDate,
        plan: curr.Plan,
        amount: Math.abs(amount),
        type: isRefund ? 'REFUND' : 'CHARGE',
        policy: curr.Policy,
        status: curr.Status,
        coverageType: curr.CoverageType,
        volume: curr.Volume
      };
      
      // Update monthly totals
      if (!acc[curr.ID].monthlyTotals[monthKey]) {
        acc[curr.ID].monthlyTotals[monthKey] = {
          charges: 0,
          refunds: 0,
          net: 0,
          count: 0
        };
      }

      const monthlyTotal = acc[curr.ID].monthlyTotals[monthKey];
      if (isRefund) {
        monthlyTotal.refunds += amount;
        acc[curr.ID].totalRefunds += amount;
      } else {
        monthlyTotal.charges += amount;
        acc[curr.ID].totalCharges += amount;
      }
      monthlyTotal.net = monthlyTotal.charges - monthlyTotal.refunds;
      monthlyTotal.count++;
      
      acc[curr.ID].transactions.push(transaction);
      acc[curr.ID].netTotal = acc[curr.ID].totalCharges - acc[curr.ID].totalRefunds;
      acc[curr.ID].plans.add(curr.Plan);
      acc[curr.ID].coverageDates.add(curr.CoverageDates);
      
      return acc;
    }, {})
  ).sort(([, a], [, b]) => b.netTotal - a.netTotal); // Sort by net total descending

  const handleCardToggle = (id: string) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {subscribers.map(([id, data]) => (
        <SubscriberCard
          key={id}
          id={id}
          data={{
            ...data,
            transactions: data.transactions.sort((a, b) => 
              new Date(b.date).getTime() - new Date(a.date).getTime()
            )
          }}
          isExpanded={expandedCardId === id}
          onToggle={handleCardToggle}
        />
      ))}
    </div>
  );
};

export default SubscriberCards;