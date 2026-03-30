import React, { useEffect, useState } from "react";
import { useParams, useNavigate, data } from "react-router-dom";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
// import {
//   createEmployee,
//   getEmployeeById,
//   updateEmployee,
// } from "../../../api/employeeApi";
import { useAuth } from "../../../auth/AuthContext";
import { createCandidate, getCandidateById, getCandidates, updateCandidate } from "../../../api/employeeApi";

export default function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const companyId = auth?.companyId;

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [managers, setManagers] = useState([]);
  const [teamLeads, setTeamLeads] = useState([]);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    skills: "",
    department: "",
    designation: "",
    experienceYears: "",
    employmentType: "FULL_TIME",
    managerId: "",
    teamLeadId: ""
  });

  /* LOAD MANAGERS */
  useEffect(() => {
    if (!companyId) return;

    getCandidates(companyId)
      .then(data => setManagers(data))
      // .then(data => setTeamLeads(data))
      .catch(() => console.log("Failed to load managers"));
  }, [companyId]);

  /* LOAD EMPLOYEE FOR EDIT */
  useEffect(() => {
    if (!id || !companyId) return;

    setLoading(true);
    getCandidateById(companyId, id)
      .then(data => {
        setForm({
          fullName: data.fullName || "",
          email: data.email || "",
          password: "",
          phone: data.phone || "",
          skills: data.skills || "",
          department: data.department || "",
          designation: data.designation || "",
          experienceYears: data.experienceYears ?? "",
          employmentType: data.employmentType || "FULL_TIME",
          managerId: data.managerId || "",
          teamLeadId: data.teamLeadId || ""
        });
      })
      .catch(() => alert("Failed to load employee"))
      .finally(() => setLoading(false));
  }, [id, companyId]);

  /* SUBMIT */
  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      experienceYears: Number(form.experienceYears) || 0,
      managerId: form.managerId || null,
      teamLeadId: form.teamLeadId || null
    };

    try {
      id
        ? await updateCandidate(companyId, id, payload)
        : await createCandidate(companyId, payload);

      navigate("/employees");
    } catch {
      alert("Failed to save employee");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <CompanyAdminLayout>
        <div className="text-center py-20 text-gray-500">
          Loading employee...
        </div>
      </CompanyAdminLayout>
    );
  }

  return (
    <CompanyAdminLayout>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">

        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-semibold">
            {id ? "Edit Employee" : "Add Employee"}
          </h2>
          <button
            onClick={() => navigate("/employees")}
            className="border px-4 py-2 rounded"
          >
            ← Back
          </button>
        </div>

        <form onSubmit={submit} className="space-y-6">

          <Section title="Basic Information">
            <Input label="Full Name *" required
              value={form.fullName}
              onChange={e => setForm({ ...form, fullName: e.target.value })}
            />
            <Input label="Email *" required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            {!id && (
              <Input label="Password *" type="password" required
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
              />
            )}
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
            <Input label="Department"
              value={form.department}
              onChange={e => setForm({ ...form, department: e.target.value })}
            />
            <Input label="Designation"
              value={form.designation}
              onChange={e => setForm({ ...form, designation: e.target.value })}
            />
            <Input label="Experience (Years)" type="number"
              value={form.experienceYears}
              onChange={e => setForm({ ...form, experienceYears: e.target.value })}
            />
            <Select label="Employment Type"
              value={form.employmentType}
              onChange={e => setForm({ ...form, employmentType: e.target.value })}
            >
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="CONTRACT">Contract</option>
            </Select>

            {/* Manager Dropdown */}
            <Select label="Assign Manager"
              value={form.managerId}
              onChange={e => setForm({ ...form, managerId: e.target.value })}
            >
              <option value="">-- Select Manager --</option>
              {managers.map(manager => (
                <option key={manager.userId} value={manager.userId}>
                  {manager.fullName}
                </option>
              ))}
            </Select>
            {/* TeamLead Dropdown */}
            <Select label="Assign TeamLead"
              value={form.teamLeadId}
              onChange={e => setForm({ ...form, teamLeadId: e.target.value })}
            >
              <option value="">-- Select TeamLead --</option>
              {managers.map(teamLead => (
                <option key={teamLead.userId} value={teamLead.userId}>
                  {teamLead.fullName}
                </option>
              ))}
            </Select>

          </Section>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/employees")}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-indigo-600 text-white px-6 py-2 rounded"
            >
              {saving ? "Saving..." : "Save Employee"}
            </button>
          </div>

        </form>
      </div>
    </CompanyAdminLayout>
  );
}

/* UI Components */
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
