export interface FeatureRequest {
  id: string;
  title: string;
  description: string;
  email: string | null;
  votes: number;
  createdAt: string;
}

export interface FeatureRequestDto {
  title: string;
  description: string;
  email?: string;
}