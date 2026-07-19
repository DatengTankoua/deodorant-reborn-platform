export interface Feedback {
  id: string;
  email: string | null;
  message: string;
  rating: number;
  createdAt: string;
}

export interface FeedbackRequest {
  email?: string;
  message: string;
  rating: number;
}