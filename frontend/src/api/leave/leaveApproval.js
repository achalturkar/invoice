const BASE_URL = "http://localhost:8080/api/companies";

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};



// APPROVE LEAVE
export const approveLeave = async (companyId, leaveRequestId, approverId, data) => {
  const response = await fetch(
    `${BASE_URL}/${companyId}/leave-approvals/${leaveRequestId}/approve/${approverId}`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to approve leave");
  }

  return response.json();
};



// REJECT LEAVE
export const rejectLeave = async (companyId, leaveRequestId, approverId, data) => {
  const response = await fetch(
    `${BASE_URL}/${companyId}/leave-approvals/${leaveRequestId}/reject/${approverId}`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to reject leave");
  }

  return response.json();
};



// GET PENDING APPROVALS
export const getPendingApprovals = async (companyId, approvalId) => {
  const response = await fetch(
    `${BASE_URL}/${companyId}/leave-approvals/pending/${approvalId}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load pending approvals");
  }

  return response.json();
};



// GET MY APPROVAL HISTORY
export const getMyApprovalHistory = async (companyId, approverId) => {
  const response = await fetch(
    `${BASE_URL}/${companyId}/leave-approvals/my-history/${approverId}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load approval history");
  }

  return response.json();
};



// GET LEAVE REQUEST HISTORY (TIMELINE)
export const getLeaveRequestHistory = async (companyId, leaveRequestId) => {
  const response = await fetch(
    `${BASE_URL}/${companyId}/leave-approvals/history/${leaveRequestId}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load leave history");
  }

  return response.json();
};



// GET REQUEST DETAILS
export const getLeaveRequestDetails = async (companyId, leaveRequestId) => {
  const response = await fetch(
    `${BASE_URL}/${companyId}/leave-requests/${leaveRequestId}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load leave details");
  }

  return response.json();
};



// HR - GET ALL REQUESTS
export const getAllLeaveRequests = async (companyId) => {
  const response = await fetch(
    `${BASE_URL}/${companyId}/leave-requests`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load leave requests");
  }

  return response.json();
};



// ADMIN DELETE REQUEST
export const deleteLeaveRequest = async (companyId, leaveRequestId) => {
  const response = await fetch(
    `${BASE_URL}/${companyId}/leave-requests/${leaveRequestId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete leave request");
  }

  return true;
};
