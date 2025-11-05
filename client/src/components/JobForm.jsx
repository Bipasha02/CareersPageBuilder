import React, { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export default function JobForm({ existingJob, onSave }) {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    experience: "",
    salary: "",
    description: "",
    apply_link: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingJob) setJob(existingJob);
  }, [existingJob]);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (existingJob) {
        await axios.put(`${API}/api/jobs/${existingJob._id}`, job);
        alert("✅ Job updated successfully!");
      } else {
        await axios.post(`${API}/api/jobs`, job);
        alert("✅ New job added successfully!");
      }
      onSave();
      setJob({
        title: "",
        company: "",
        location: "",
        type: "",
        experience: "",
        salary: "",
        description: "",
        apply_link: "",
      });
    } catch (err) {
      console.error("Error saving job:", err);
      alert("❌ Failed to save job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 border p-5 rounded-lg bg-white shadow-sm"
    >
      <h3 className="font-semibold text-lg mb-2">
        {existingJob ? "Edit Job" : "Add New Job"}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={job.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={job.company}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={job.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="type"
          placeholder="Job Type (Full-time, Remote, Internship...)"
          value={job.type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="experience"
          placeholder="Experience (e.g., 2+ years or Fresher)"
          value={job.experience}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="salary"
          placeholder="Salary (Optional)"
          value={job.salary}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <textarea
        name="description"
        placeholder="Job Description"
        value={job.description}
        onChange={handleChange}
        className="w-full p-2 border rounded h-28"
      />

      <input
        type="url"
        name="apply_link"
        placeholder="Apply Link (Optional)"
        value={job.apply_link}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full sm:w-auto px-5 py-2 rounded text-white ${
          existingJob
            ? "bg-green-600 hover:bg-green-700"
            : "bg-blue-600 hover:bg-blue-700"
        } disabled:opacity-50`}
      >
        {loading
          ? "Saving..."
          : existingJob
          ? "Update Job"
          : "Add Job"}
      </button>
    </form>
  );
}
