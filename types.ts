
export type Theme = 'light' | 'dark';

export interface AnalysisResult {
  diseaseName: string;
  confidenceScore: number;
  description: string;
  recommendedTreatment: string;
}
