// client/src/pages/Recruiter.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import JobForm from "../components/JobForm";

const API = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export default function Recruiter() {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/jobs`);
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      alert("Failed to fetch jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const deleteJob = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axios.delete(`${API}/api/jobs/${id}`);
        fetchJobs();
      } catch (err) {
        console.error("Error deleting job:", err);
        alert("Failed to delete job.");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Recruiter Dashboard</h1>

      <button
        onClick={() => {
          setEditingJob(null);
          setShowForm(!showForm);
        }}
        className="mb-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
      >
        {showForm ? "✖ Close Form" : "➕ Add New Job"}
      </button>

      {showForm && (
        <JobForm
          existingJob={editingJob}
          onSave={() => {
            setShowForm(false);
            setEditingJob(null);
            fetchJobs();
          }}
        />
      )}

      <div className="mt-8">
        {loading ? (
          <p className="text-gray-500">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-gray-600">No jobs available. Add a new one above!</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border p-4 rounded-lg shadow-sm mb-4"
            >
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p className="text-sm text-gray-600">
                {job.location || "Location not specified"} •{" "}
                {job.type || "Type not specified"}
              </p>
              <p className="mt-2 text-gray-700">{job.description}</p>

              <div className="mt-3 space-x-2">
                <button
                  onClick={() => {
                    setEditingJob(job);
                    setShowForm(true);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => deleteJob(job.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
