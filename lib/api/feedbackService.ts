import { apiClient } from "./client";
import { Feedback, FeedbackRequest } from "@/types/feedback";

export const feedbackService = {
  getAll: () =>
    apiClient.get<Feedback[]>("/feedback"),

  submit: (data: FeedbackRequest) =>
    apiClient.post<Feedback>("/feedback", data),
};