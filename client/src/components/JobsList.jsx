import React, { useState, useMemo } from "react";

export default function JobList({ jobs = [], loading = false }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  // Extract unique locations and job types dynamically
  const locations = useMemo(() => {
    return Array.from(new Set(jobs.map((job) => job.location).filter(Boolean)));
  }, [jobs]);

  const jobTypes = useMemo(() => {
    return Array.from(new Set(jobs.map((job) => job.type).filter(Boolean)));
  }, [jobs]);

  // Filter logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const title = job.title?.toLowerCase() || "";
      const location = job.location || "";
      const type = job.type || "";
      const matchesSearch = title.includes(searchTerm.toLowerCase());
      const matchesLocation = locationFilter ? location === locationFilter : true;
      const matchesType = typeFilter ? type === typeFilter : true;
      return matchesSearch && matchesLocation && matchesType;
    });
  }, [jobs, searchTerm, locationFilter, typeFilter]);

  if (loading) {
    return (
      <p className="text-gray-600 text-center mt-6">
        ⏳ Loading jobs, please wait...
      </p>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Available Jobs</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <input
          type="text"
          placeholder="🔍 Search by job title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full sm:w-64"
        />

        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="border p-2 rounded w-full sm:w-48"
        >
          <option value="">🌍 All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border p-2 rounded w-full sm:w-48"
        >
          <option value="">💼 All Job Types</option>
          {jobTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Job Cards */}
      <ul className="space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <li
              key={job._id || job.id}
              className="border rounded-lg p-5 hover:shadow-lg transition bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {job.title}
                </h3>
                {job.company && (
                  <span className="text-sm text-gray-500 italic">
                    {job.company}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">
                📍 {job.location} | 🕒 {job.type || "N/A"}
              </p>
              <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                {job.description?.slice(0, 180)}...
              </p>

              {job.salary && (
                <p className="text-sm text-gray-600 mt-1">
                  💰 <b>Salary:</b> {job.salary}
                </p>
              )}

              {job.apply_link && (
                <a
                  href={job.apply_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Apply Now →
                </a>
              )}
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center">No jobs found.</p>
        )}
      </ul>
    </div>
  );
}
