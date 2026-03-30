import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import {
  createProject,
  getProjectById,
  updateProject
} from "../../../api/projectApi";
import { useAuth } from "../../../auth/AuthContext";

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    code: "",
    description: "",
    startDate: "",
    endDate: "",
    budget: "",
    status: "ACTIVE"
  });

  const {auth} = useAuth();
  const companyId = auth?.companyId;

  /* ================= LOAD FOR EDIT ================= */

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getProjectById(companyId, id)
      .then(data => {
        setForm({
          name: data.name || "",
          code: data.code || "",
          description: data.description || "",
          startDate: data.startDate || "",
          endDate: data.endDate || "",
          budget: data.budget || "",
          status: data.status || "PLANNED"
        });
      })
      .finally(() => setLoading(false));
  }, [id, companyId]);

  /* ================= SUBMIT ================= */

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      budget: form.budget ? Number(form.budget) : null
    };

    try {
      if (id) {
        await updateProject(companyId, id, payload);
      } else {
        await createProject(companyId, payload);
      }
      navigate("/project");
    } catch (err) {
      alert("Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <CompanyAdminLayout>
        <div className="text-center py-20 text-gray-500">
          Loading project details...
        </div>
      </CompanyAdminLayout>
    );
  }

  return (
    <CompanyAdminLayout>
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold">
              {id ? "Edit Project" : "Create Project"}
            </h2>
            <p className="text-sm text-gray-500">
              Project basic & financial details
            </p>
          </div>

          <button
            onClick={() => navigate("/project")}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            ← Back
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={submit} className="space-y-8">

          {/* BASIC */}
          <Section title="Basic Information">
            <Input
              label="Project Name *"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />

            <Input
              label="Project Code"
              placeholder="PRJ-2025-001"
              value={form.code}
              onChange={e => setForm({ ...form, code: e.target.value })}
            />
          </Section>

          {/* DESCRIPTION */}
          <Section title="Description">
            <Textarea
              label="Project Description"
              value={form.description}
              onChange={e =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </Section>

          {/* TIMELINE */}
          <Section title="Timeline">
            <Input
              label="Start Date"
              type="date"
              value={form.startDate}
              onChange={e => setForm({ ...form, startDate: e.target.value })}
            />

            <Input
              label="End Date"
              type="date"
              value={form.endDate}
              onChange={e => setForm({ ...form, endDate: e.target.value })}
            />
          </Section>

          {/* FINANCE & STATUS */}
          <Section title="Finance & Status">
            <Input
              label="Budget"
              type="number"
              placeholder="₹ 500000"
              value={form.budget}
              onChange={e => setForm({ ...form, budget: e.target.value })}
            />

            <Select
              label="Project Status"
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="ON_HOLD">On Hold</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </Select>
          </Section>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/projects")}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </CompanyAdminLayout>
  );
}

/* ================= UI COMPONENTS ================= */

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-sm font-semibold mb-4 text-gray-700">
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-xs text-gray-600">{label}</label>
    <input
      {...props}
      className="mt-1 w-full border rounded px-3 py-2 text-sm focus:ring focus:ring-indigo-200"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div className="md:col-span-2">
    <label className="text-xs text-gray-600">{label}</label>
    <textarea
      {...props}
      rows="4"
      className="mt-1 w-full border rounded px-3 py-2 text-sm focus:ring focus:ring-indigo-200"
    />
  </div>
);

const Select = ({ label, children, ...props }) => (
  <div>
    <label className="text-xs text-gray-600">{label}</label>
    <select
      {...props}
      className="mt-1 w-full border rounded px-3 py-2 text-sm focus:ring focus:ring-indigo-200"
    >
      {children}
    </select>
  </div>
);
