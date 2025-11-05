import React, { useState, useEffect } from "react";
import axios from "axios";
import SectionsList from "./SectionsList";

export default function AdminPanel({ onImported }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState({
    theme: false,
    sections: false,
    preview: false,
    save: false,
    share: false,
    filters: false,
    seo: false,
  });

  const API = import.meta.env.VITE_API_BASE || "http://localhost:8000";
  const COMPANY_ID = "default-company"; // you can change later

  // ----------------------------
  // Load existing features
  // ----------------------------
  useEffect(() => {
    async function fetchFeatures() {
      try {
        const res = await axios.get(`${API}/api/get-features/${COMPANY_ID}`);
        if (res.data) setFeatures(res.data);
      } catch (error) {
        console.warn("⚠️ No features saved yet.");
      }
    }
    fetchFeatures();
  }, []);

  // ----------------------------
  // Save selected features
  // ----------------------------
  async function saveFeatures() {
    try {
      await axios.post(
        `${API}/api/save-features`,
        { company_id: COMPANY_ID, ...features }, 
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("✅ Features saved successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Error saving features.");
    }
  }


  // ----------------------------
  // File upload + import functions
  // ----------------------------
  async function handleImport() {
    if (!file) return alert("Please select an .xlsx file first.");
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      await axios.post(`${API}/api/upload-xlsx`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await axios.post(`${API}/api/import-seed`);
      if (onImported) onImported();
      alert("✅ File imported and database updated successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Error while importing. Check console for details.");
    } finally {
      setLoading(false);
    }
  }

  async function importSeed() {
    try {
      setLoading(true);
      await axios.post(`${API}/api/import-seed`);
      if (onImported) onImported();
      alert("✅ Existing seed.json imported successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Error while importing seed file.");
    } finally {
      setLoading(false);
    }
  }

  // ----------------------------
  // Render UI
  // ----------------------------
  return (
    <div className="p-6 border rounded-lg shadow-sm bg-white">
      <h3 className="font-semibold text-lg mb-3">Admin Panel</h3>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded w-full sm:w-auto"
        />
        <button
          onClick={handleImport}
          disabled={loading}
          className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          {loading ? "Importing..." : "Upload & Import XLSX"}
        </button>
        <button
          onClick={importSeed}
          disabled={loading}
          className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 disabled:opacity-50"
        >
          {loading ? "Importing..." : "Import Existing seed.json"}
        </button>
      </div>

      <hr className="my-5" />

      <h4 className="font-semibold mb-2">Feature Management</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {Object.entries({
          theme: "Recruiter Branding",
          sections: "Customizable Sections",
          preview: "Preview Before Publish",
          save: "Save Company Data",
          share: "Public Careers Link",
          filters: "Candidate Filters",
          seo: "SEO Ready Pages",
        }).map(([key, label]) => (
          <label key={key} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={features[key]}
              onChange={(e) =>
                setFeatures({ ...features, [key]: e.target.checked })
              }
            />
            {label}
          </label>
        ))}
      </div>

      {features.sections && <SectionsList companyId={COMPANY_ID} />}

      <button
        onClick={saveFeatures}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Selected Features
      </button>

      <p className="text-sm text-gray-600 mt-3">
        Use this panel to import your spreadsheet or manage recruiter features.
      </p>
    </div>
  );
}
