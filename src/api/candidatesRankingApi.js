import api from "./axios";

// US-014: Get ranked candidates for a job (with optional filters)
export const getRankings = (params) =>
  api.get("/candidate-rankings", { params });

// Update candidate status (shortlist / reject / under_review)
export const updateCandidateStatus = (resumeId, status) =>
  api.patch(`/candidate-rankings/${resumeId}/status`, { status });
