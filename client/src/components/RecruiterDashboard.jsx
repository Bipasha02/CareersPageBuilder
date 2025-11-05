import React, { useState, useEffect } from "react";

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API}/api/jobs`);
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        setError("Unable to load job data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [API]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-600">
        ⏳ Loading jobs...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 mt-10 font-medium">{error}</div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Recruiter Dashboard
      </h1>

      {jobs.length === 0 ? (
        <p className="text-gray-600 text-center">No jobs found yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Job Title</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr
                  key={job._id || job.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2 font-medium">{job.title}</td>
                  <td className="px-4 py-2">{job.location}</td>
                  <td className="px-4 py-2">{job.type}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {job.description?.slice(0, 80)}...
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
