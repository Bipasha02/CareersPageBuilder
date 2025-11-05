// client/src/pages/RecruiterDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE || "http://localhost:8000";

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: "",
    location: "",
    type: "",
    description: "",
    apply_url: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch jobs from backend
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/jobs`);
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      alert("Failed to fetch jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  // Add a new job (POST to backend)
  const handleAddJob = async (e) => {
    e.preventDefault();
    if (!newJob.title) return alert("Job title is required");
    try {
      await axios.post(`${API}/api/jobs`, newJob);
      setNewJob({
        title: "",
        location: "",
        type: "",
        description: "",
        apply_url: "",
      });
      fetchJobs();
    } catch (err) {
      console.error("Error adding job:", err);
      alert("Failed to add job.");
    }
  };

  // Delete a job (DELETE from backend)
  const handleDelete = async (id) => {
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
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Recruiter Dashboard</h1>

      {/* Add Job Form */}
      <form onSubmit={handleAddJob} className="bg-white shadow-sm p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Job</h2>
        <div className="space-y-3">
          <input
            name="title"
            placeholder="Job Title"
            value={newJob.title}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <input
            name="location"
            placeholder="Location"
            value={newJob.location}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <input
            name="type"
            placeholder="Job Type (e.g. Full-time, Remote)"
            value={newJob.type}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <textarea
            name="description"
            placeholder="Job Description"
            value={newJob.description}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            rows={4}
          />
          <input
            name="apply_url"
            placeholder="Apply URL"
            value={newJob.apply_url}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            ➕ Add Job
          </button>
        </div>
      </form>

      {/* Job List */}
      <h2 className="text-xl font-semibold mb-3">Current Jobs</h2>
      {loading ? (
        <p className="text-gray-500">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-600">No jobs available. Add one above!</p>
      ) : (
        <ul className="space-y-3">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="border p-4 rounded flex justify-between items-start bg-white shadow-sm"
            >
              <div>
                <p className="font-medium text-lg">{job.title}</p>
                <p className="text-sm text-gray-600">
                  {job.location || "Location not specified"} • {job.type || "Type not specified"}
                </p>
                <p className="mt-2 text-gray-700">{job.description}</p>
              </div>
              <button
                onClick={() => handleDelete(job.id)}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                🗑 Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecruiterDashboard;
