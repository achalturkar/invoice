import React, { useEffect, useState } from "react";

const API = "http://localhost:8080/api/location";

export default function LocationFormTailwind() {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [talukas, setTalukas] = useState([]);

    const [form, setForm] = useState({
        countryId: "",
        stateId: "",
        districtId: "",
        talukaId: ""
    });

    // LOAD COUNTRIES
    useEffect(() => {
        fetch(`${API}/countries`)
            .then(res => res.json())
            .then(setCountries)
            .catch(console.error);
    }, []);

    // COUNTRY
    const onCountry = async (id) => {
        setForm({
            countryId: id,
            stateId: "",
            districtId: "",
            talukaId: ""
        });

        setStates([]);
        setDistricts([]);
        setTalukas([]);

        if (!id) return;

        const res = await fetch(`${API}/states?countryId=${id}`);
        setStates(await res.json());
    };

    // STATE
    const onState = async (id) => {
        setForm(prev => ({
            ...prev,
            stateId: id,
            districtId: "",
            talukaId: ""
        }));

        setDistricts([]);
        setTalukas([]);

        if (!id) return;

        const res = await fetch(`${API}/districts?stateId=${id}`);
        setDistricts(await res.json());
    };

    // DISTRICT
    const onDistrict = async (id) => {
        setForm(prev => ({
            ...prev,
            districtId: id,
            talukaId: ""
        }));

        setTalukas([]);

        if (!id) return;

        const res = await fetch(`${API}/talukas?districtId=${id}`);
        setTalukas(await res.json());
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Location Details</h2>

                <select className="w-full border p-2 rounded mb-3"
                    value={form.countryId}
                    onChange={e => onCountry(e.target.value)}>
                    <option value="">Select Country</option>
                    {countries.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>

                <select className="w-full border p-2 rounded mb-3"
                    disabled={!states.length}
                    value={form.stateId}
                    onChange={e => onState(e.target.value)}>
                    <option value="">Select State</option>
                    {states.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                </select>

                <select className="w-full border p-2 rounded mb-3"
                    disabled={!districts.length}
                    value={form.districtId}
                    onChange={e => onDistrict(e.target.value)}>
                    <option value="">Select District</option>
                    {districts.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                </select>

                <select
                    className="w-full border p-2 rounded"
                    disabled={!talukas.length}
                    value={form.talukaId}
                    onChange={(e) =>
                        setForm(prev => ({
                            ...prev,
                            talukaId: e.target.value
                        }))
                    }
                >
                    <option value="">Select Taluka</option>
                    {talukas.map(t => (
                        <option key={t.id} value={t.id}>
                            {t.name}
                        </option>
                    ))}
                </select>

            </div>
        </div>
    );
}
