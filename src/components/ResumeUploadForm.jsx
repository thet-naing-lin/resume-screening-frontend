// src/components/ResumeUploadForm.jsx
import { useState, useEffect, useRef } from "react";
import { getJobs } from "../api/jobApi";
import { uploadResume } from "../api/resumeApi";

export default function ResumeUploadForm() {
  const [file, setFile] = useState(null);
  const [jobId, setJobId] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [success, setSuccess] = useState(null); // object: { id, filename }
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    getJobs()
      .then((res) => setJobs(res.data.jobs))
      .catch(() => setError("Could not load job list. Please refresh."))
      .finally(() => setJobsLoading(false));
  }, []);

  // Shared file setter — used by both drag-drop and click
  const handleFileSelect = (selected) => {
    if (!selected) return;
    const ext = selected.name.split(".").pop().toLowerCase();
    if (!["pdf", "docx"].includes(ext)) {
      setFieldErrors((prev) => ({
        ...prev,
        resume_file: ["Only PDF or DOCX files are accepted."],
      }));
      return;
    }
    setFile(selected);
    setFieldErrors((prev) => ({ ...prev, resume_file: null }));
  };

  const handleFileInputChange = (e) => handleFileSelect(e.target.files[0]);

  // Drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = () => setDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFileSelect(e.dataTransfer.files[0]);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(null);
    setFieldErrors({});
    setLoading(true);

    const formData = new FormData();
    formData.append("resume_file", file);
    formData.append("job_description_id", jobId);

    try {
      const res = await uploadResume(formData);
      setSuccess({
        id: res.data.data.id,
        filename: file.name,
      });
      setFile(null);
      setJobId("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      if (err.response?.status === 422) {
        setFieldErrors(err.response.data.errors || {});
      } else if (err.response?.status === 403) {
        setError("You do not have permission to upload resumes.");
      } else {
        setError("Upload failed. Check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ── SUCCESS STATE ──────────────────────────────────────────────
  if (success) {
    return (
      <div className="max-w-2xl mx-auto text-center py-10">
        {/* Green circle check */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Resume Uploaded
        </h2>
        <p className="text-sm text-gray-500 mb-1">
          <span className="font-medium text-gray-700">{success.filename}</span>{" "}
          has been received.
        </p>
        <p className="text-xs text-gray-400 mb-8">
          The system will extract and analyse the resume in the background.
        </p>
        <button
          onClick={() => setSuccess(null)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-2 rounded-lg transition-colors"
        >
          Upload Another
        </button>
      </div>
    );
  }

  // ── FORM STATE ─────────────────────────────────────────────────
  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ── Job Selector ── */}
        <div>
          <label
            htmlFor="job_id"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Job Position <span className="text-red-500">*</span>
          </label>

          {jobsLoading ? (
            <div className="h-10 bg-gray-100 rounded-lg animate-pulse" />
          ) : (
            <select
              id="job_id"
              value={jobId}
              onChange={(e) => setJobId(e.target.value)}
              required
              className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="">— Select a job position —</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </select>
          )}

          {fieldErrors.job_description_id && (
            <p className="text-red-500 text-xs mt-1">
              {fieldErrors.job_description_id[0]}
            </p>
          )}
        </div>

        {/* ── Drag & Drop Zone ── */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Resume File <span className="text-red-500">*</span>
          </label>

          {/* If no file selected — show drop zone */}
          {!file ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`
                relative border-2 border-dashed rounded-xl px-6 py-10 text-center cursor-pointer transition-colors
                ${
                  dragging
                    ? "border-blue-400 bg-blue-50"
                    : "border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50/50"
                }
              `}
            >
              {/* Upload icon */}
              <div className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>

              <p className="text-sm font-medium text-gray-700">
                {dragging ? "Drop it here!" : "Drag & drop your resume here"}
              </p>
              <p className="text-xs text-gray-400 mt-1">or click to browse</p>
              <p className="text-xs text-gray-400 mt-3">
                PDF or DOCX &nbsp;·&nbsp; Max 5 MB
              </p>

              {/* Hidden actual file input */}
              <input
                ref={fileInputRef}
                id="resume_file"
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>
          ) : (
            /* File selected — show preview card */
            <div className="flex items-center gap-3 border border-gray-200 bg-white rounded-xl px-4 py-3 shadow-sm">
              {/* File type icon */}
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0
                ${file.name.endsWith(".pdf") ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}
              >
                {file.name.endsWith(".pdf") ? "PDF" : "DOC"}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-gray-400">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>

              {/* Remove button */}
              <button
                type="button"
                onClick={removeFile}
                className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-50"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}

          {fieldErrors.resume_file && (
            <p className="text-red-500 text-xs mt-1">
              {fieldErrors.resume_file[0]}
            </p>
          )}
        </div>

        {/* ── Error / Global message ── */}
        {error && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
            <svg
              className="w-4 h-4 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </div>
        )}

        {/* ── Submit ── */}
        <button
          type="submit"
          disabled={loading || jobsLoading || !file || !jobId}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Uploading...
            </>
          ) : (
            "Upload Resume"
          )}
        </button>
      </form>
    </div>
  );
}
