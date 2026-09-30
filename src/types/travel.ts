export interface TripFormData {
  startingLocation: string;
  destination: string;
  numberOfDays: number | string;
  numberOfTravelers: number | string;
  budget: number | string;
  email: string;
  preferences?: string;
  travelStyle?: string;
}

export interface SubmissionRecord {
  id: string;
  timestamp: string;
  startingLocation: string;
  destination: string;
  numberOfDays: number;
  numberOfTravelers: number;
  budget: number;
  email: string;
  status: 'delivered' | 'pending' | 'failed';
  n8nStatus?: number;
}

export interface CuratedDestination {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  recommendedDays: number;
  estimatedBudget: number;
  startingFrom: string;
  tags: string[];
  description: string;
}
