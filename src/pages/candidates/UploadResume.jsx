import DashboardLayout from "../../components/layout/DashboardLayout";
import ResumeUploadForm from "../../components/ResumeUploadForm";

export default function UploadResume() {
  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Upload Resume</h1>
          <p className="text-sm text-gray-500 mt-1">
            Upload a candidate's PDF or DOCX resume and link it to a job
            position.
          </p>
        </div>

        {/* Card wrapper */}
        <div className="bg-white rounded-lg shadow p-6">
          <ResumeUploadForm />
        </div>
      </div>
    </DashboardLayout>
  );
}
