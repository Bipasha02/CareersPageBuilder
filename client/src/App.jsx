import React, { useEffect, useState } from "react";
import axios from "axios";
import JobsList from "./components/JobsList";
import AdminPanel from "./components/AdminPanel";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Recruiter from "./pages/Recruiter";

const API = import.meta.env.VITE_API_BASE || "http://localhost:8000";

function MainPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const j = await axios.get(`${API}/api/jobs`);
        setJobs(j.data);
        window.__jobs = j.data;
        setError(null);
      } catch (e) {
        console.error(e);
        setError("Failed to load jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Careers Page Builder</h1>
          <p className="text-sm text-gray-600">
            Browse jobs imported from the spreadsheet
          </p>
        </div>
        <a
          href="/recruiter"
          className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Recruiter Dashboard
        </a>
      </header>

      <main className="space-y-6">
        {error ? (
          <div className="text-red-600 text-sm">{error}</div>
        ) : (
          <JobsList jobs={jobs} loading={loading} />
        )}

        <AdminPanel
          onImported={async () => {
            await axios.post(`${API}/api/import-seed`);
            const j = await axios.get(`${API}/api/jobs`);
            setJobs(j.data);
          }}
        />
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/recruiter" element={<Recruiter />} />
      </Routes>
    </Router>
  );
}

export default App;
