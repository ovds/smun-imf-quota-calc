import { directorData, originalShares } from '../data/directorData';

export interface CalculationResult {
  name: string;
  originalShares: number;
  originalPercentage: string;
  newSharesGained: number;
  updatedShares: number;
  finalPercentage: string;
}

export const calculateQuotas = (
  weights: number[],
  compressionFactor: number,
  newSharesTotal: number,
  initialWeights: number[] = [0.30, 0.20, 0.30, 0.15, 0.05],
  initialCompression: number = 0.95
): CalculationResult[] => {
  const rawData: [string, number, number][] = [];
  
  // Calculate final calculated quotas and initial calculated quotas
  for (const row of directorData) {
    const name = row[0] as string;
    const values = row.slice(1) as number[];
    const finalCqs = values.reduce((sum, value, index) => sum + value * weights[index], 0) * compressionFactor;
    const initialCqs = values.reduce((sum, value, index) => sum + value * initialWeights[index], 0) * initialCompression;
    rawData.push([name, finalCqs, initialCqs]);
  }

  // Calculate totals
  const totalFinalVotes = rawData.reduce((sum, entry) => sum + entry[1], 0);
  const totalOriginalVotes = Object.values(originalShares).reduce((sum, votes) => sum + votes, 0);

  // Calculate results
  const tempResults: [string, number, number, number, number][] = rawData.map(([name, finalVotes]) => {
    const votePercentage = finalVotes / totalFinalVotes;
    const newVotesAllocated = Math.round(votePercentage * newSharesTotal);
    const originalVotes = originalShares[name as keyof typeof originalShares] || 0;
    const updatedVotes = originalVotes + newVotesAllocated;
    const originalPercentage = (originalVotes / totalOriginalVotes) * 100;
    return [name, originalVotes, originalPercentage, newVotesAllocated, updatedVotes];
  });

  // Calculate updated total
  const totalUpdatedVotes = tempResults.reduce((sum, row) => sum + row[4], 0);

  // Format results
  const results: CalculationResult[] = tempResults.map(([name, original, origPct, newAlloc, updated]) => {
    const finalPct = (updated / totalUpdatedVotes) * 100;
    return {
      name: name as string,
      originalShares: original,
      originalPercentage: `${origPct.toFixed(2)}%`,
      newSharesGained: newAlloc,
      updatedShares: updated,
      finalPercentage: `${finalPct.toFixed(2)}%`,
    };
  });

  return results;
};