import React, { useEffect, useState } from "react";
import { uploadDocument, getDocuments } from "../../../api/candidateApi";
import { useParams } from "react-router-dom";

const TYPES = ["AADHAR", "PAN", "RESUME", "DEGREE", "BGV"];

export default function CandidateDocuments() {
  const { id } = useParams();
  const companyId = localStorage.getItem("companyId");

  const [docs, setDocs] = useState([]);

  const load = () =>
    getDocuments(companyId, id).then(res => setDocs(res.data));

  useEffect(load, []);

  const upload = (type, file) => {
    uploadDocument(companyId, id, type, file).then(load);
  };

  return (
    <div>
      <h2>Candidate Documents</h2>

      {TYPES.map(t => (
        <div key={t}>
          <b>{t}</b>
          <input type="file" onChange={e => upload(t, e.target.files[0])} />
        </div>
      ))}

      <hr />

      {docs.map(d => (
        <div key={d.id}>
          {d.documentType} - {d.verificationStatus}
          <a href={d.documentUrl} target="_blank"> View</a>
        </div>
      ))}
    </div>
  );
}
