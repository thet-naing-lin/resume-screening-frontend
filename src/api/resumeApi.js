import api from "./axios";

// Upload a resume — must use FormData for file uploads
export const uploadResume = (formData) => {
  return api.post("/resumes", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Get all resumes uploaded by the logged-in HR user
export const getResumes = () => {
  return api.get("/resumes");
};
