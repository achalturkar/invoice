import { authHeaders } from "../../config/api";

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


export const createFlow = async (companyId, data) =>{

    const response = await fetch(`${BASE_URL}/${companyId}/approval-flows`,
        {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        }
    )
     if (!response.ok) {
    throw new Error("Failed to create flow");
  }

  return response.json();
}


export const createStep = async (companyId, flowId, data) =>{

    const response = await fetch(`${BASE_URL}/${companyId}/approval-flows/${flowId}/steps`,
        {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)

        }
    )

    if(!response.ok){
        throw new Error("Failed to create approval steps")
    }

    return response.json();
}


export const getStep = async (companyId, flowId) =>{

    const response = await fetch(`${BASE_URL}/${companyId}/approval-flows/${flowId}/steps`,
        {
            method:"GET",
            headers:getAuthHeaders(),
        }
    )

    if(!response.ok){
        throw new Error("Get to all steps")
    }

    return response.json();
}


export const getflow = async (companyId) =>{

    const response = await fetch(`${BASE_URL}/${companyId}/approval-flows`,
        {
            method:"GET",
            headers:getAuthHeaders(),
        }
    )

    if(!response.ok){
        throw new Error("Get to all flow")
    }

    return response.json();
}


export const deleteFlow = async (companyId, flowId) =>{

    const response = await fetch(`${BASE_URL}/${companyId}/approval-flows/${flowId}`,
    {
        method: "DELETE",
        headers: getAuthHeaders()
    })

  if (!response.ok) throw new Error("Delete failed");

}

export const deleteFlowStep = async (companyId, flowId, stepId) =>{

    const response = await fetch(`${BASE_URL}/${companyId}/approval-flows/${flowId}/steps/${stepId}`,
    {
        method: "DELETE",
        headers: getAuthHeaders()
    })

  if (!response.ok) throw new Error("Delete Steps failed");

}



