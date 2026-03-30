import React from "react";

const LocationDropdown = ({ form, setForm, location }) => {
  return (
    <>
      {/* Country */}
      <select
        className="input"
        value={form.countryId || ""}
        onChange={(e) => {
          const id = e.target.value;
          setForm({ ...form, countryId: id, stateId: "", district: "" });
          location.loadStates(id);
        }}
      >
        <option value="">Select Country</option>
        {location.countries.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      {/* State */}
      <select
        className="input"
        value={form.stateId || ""}
        onChange={(e) => {
          const id = e.target.value;
          setForm({ ...form, stateId: id, district: "" });
          location.loadDistricts(id);
        }}
      >
        <option value="">Select State</option>
        {location.states.map(s => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>

      {/* District */}
      <select
        className="input"
        value={form.district || ""}
        onChange={(e) =>
          setForm({ ...form, district: e.target.value })
        }
      >
        <option value="">Select District</option>
        {location.districts.map(d => (
          <option key={d.id} value={d.name}>{d.name}</option>
        ))}
      </select>
    </>
  );
};

export default LocationDropdown;
