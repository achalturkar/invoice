const BASE_URL = "http://localhost:8080/api/companies";

/* ============================= */
/* 🔐 AUTH HEADER */
/* ============================= */

const getAuthHeaders = () => {
    const token = localStorage.getItem("accessToken");

    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    };
};



export const createLeaveRequest = async (companyId, employeeId, data) => {

    const response = await fetch(`${BASE_URL}/${companyId}/leave-requests/employees/${employeeId}`,
        {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        }
    )

    if (!response.ok) {
        throw new Error("Leave Request Api not Work");
    }

    return response.json();


}



export const leaveRequestList = async (companyId, employeeId) => {

    const response = await fetch(`${BASE_URL}/${companyId}/leave-requests/employees/${employeeId}`,
        {
            method:"GET",
            headers: getAuthHeaders(),
        }
    )

    if (!response.ok) {
        throw new Error("Failed to load get request");
    }

    return response.json();
}

export const leaveRequestDetail = async (companyId, employeeId, leaveRequestId) => {

    const response = await fetch(`${BASE_URL}/${companyId}/leave-requests/employees/${employeeId}/request/${leaveRequestId}`,
        {
            method:"GET",
            headers: getAuthHeaders(),
        }
    )

    if (!response.ok) {
        throw new Error("Failed to load get request");
    }

    return response.json();
}



export const leaveRequestRecentList = async (companyId, employeeId) => {

    const response = await fetch(`${BASE_URL}/${companyId}/leave-requests/employees/${employeeId}/recent`,
        {
            method:"GET",
            headers: getAuthHeaders(),
        }
    )

    if (!response.ok) {
        throw new Error("Failed to load get request");
    }

    return response.json();
}



export const uploadLeaveFile = async (file) => {

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(
    `${BASE_URL}/leaveFile/upload`,
    {
      method: "POST",
      body: formData
    }
  );

  if (!res.ok) throw new Error("File upload failed");

  return await res.text();
};


