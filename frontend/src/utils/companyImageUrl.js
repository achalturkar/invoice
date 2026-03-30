import { API_BASE } from "../config/api";

export const companyImageUrl = (companyId, type) =>
  `${API_BASE}/api/company/${companyId}/image/${type}`;
