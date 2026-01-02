import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import {
  createCandidate,
  getCandidateById,
  updateCandidate
} from "../../../api/candidateApi";

export default function CandidateForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const companyId = localStorage.getItem("companyId");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    skills: "",
    experienceYears: "",
    employmentType: "CONTRACT"
  });

  /* LOAD FOR EDIT */
  useEffect(() => {
    if (!id || !companyId) return;

    setLoading(true);
    getCandidateById(companyId, id)
      .then(data => {
        setForm({
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
          skills: data.skills || "",
          experienceYears: data.experienceYears ?? "",
          employmentType: data.employmentType || "CONTRACT"
        });
      })
      .catch(() => alert("Failed to load candidate"))
      .finally(() => setLoading(false));
  }, [id, companyId]);

  /* SUBMIT */
  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      experienceYears: Number(form.experienceYears) || 0
    };

    try {
      id
        ? await updateCandidate(companyId, id, payload)
        : await createCandidate(companyId, payload);

      navigate("/candidates");
    } catch {
      alert("Failed to save candidate");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <CompanyAdminLayout>
        <div className="text-center py-20 text-gray-500">
          Loading candidate...
        </div>
      </CompanyAdminLayout>
    );
  }

  return (
    <CompanyAdminLayout>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">

        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">
              {id ? "Edit Candidate" : "Add Candidate"}
            </h2>
            <p className="text-sm text-gray-500">
              Candidate basic & professional details
            </p>
          </div>

          <button
            onClick={() => navigate("/candidates")}
            className="border px-4 py-2 rounded hover:bg-gray-50"
          >
            ← Back
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={submit} className="space-y-8">

          <Section title="Basic Information">
            <Input label="Full Name *" required
              value={form.fullName}
              onChange={e => setForm({ ...form, fullName: e.target.value })}
            />
            <Input label="Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            <Input label="Phone"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
            />
          </Section>

          <Section title="Professional Details">
            <Input label="Skills"
              value={form.skills}
              onChange={e => setForm({ ...form, skills: e.target.value })}
            />
            <Input label="Experience (Years)" type="number"
              value={form.experienceYears}
              onChange={e => setForm({ ...form, experienceYears: e.target.value })}
            />
            <Select label="Employment Type"
              value={form.employmentType}
              onChange={e => setForm({ ...form, employmentType: e.target.value })}
            >
              <option value="CONTRACT">Contract</option>
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
            </Select>
          </Section>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/candidates")}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
            >
              {saving ? "Saving..." : "Save Candidate"}
            </button>
          </div>
        </form>
      </div>
    </CompanyAdminLayout>
  );
}

/* UI */
const Section = ({ title, children }) => (
  <div>
    <h3 className="text-sm font-semibold mb-4">{title}</h3>
    <div className="grid md:grid-cols-2 gap-4">{children}</div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-xs text-gray-600">{label}</label>
    <input {...props}
      className="mt-1 w-full border rounded px-3 py-2 text-sm"
    />
  </div>
);

const Select = ({ label, children, ...props }) => (
  <div>
    <label className="text-xs text-gray-600">{label}</label>
    <select {...props}
      className="mt-1 w-full border rounded px-3 py-2 text-sm"
    >
      {children}
    </select>
  </div>
);
