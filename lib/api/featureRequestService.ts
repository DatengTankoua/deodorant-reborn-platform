import { apiClient } from "./client";
import { FeatureRequest, FeatureRequestDto } from "@/types/featureRequest";

export const featureRequestService = {
  getAll: () =>
    apiClient.get<FeatureRequest[]>("/feature-requests"),

  submit: (data: FeatureRequestDto) =>
    apiClient.post<FeatureRequest>("/feature-requests", data),
};