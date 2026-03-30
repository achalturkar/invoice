import js from "@eslint/js";
import { data } from "react-router-dom";


const BASE_URL = "http://localhost:8080/api/companies";

const token = localStorage.getItem("accessToken")

const authHeader = () => ({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
});


//-------------post---------

export const invoiceDesk = async (companyId, data) => {
    const res = await fetch(
        `${BASE_URL}/${companyId}/invoices/desk`,
        {
            method: "POST",
            headers: authHeader(),
            body: JSON.stringify(data),
        }
    )
    if (!res.ok) throw new Error("Failed To Create tax Invoice");
    return res.json();
}

export const updateInvoiceDesk = async(companyId, invoiceId, data) =>{

    const res = await fetch(`${BASE_URL}/${companyId}/invoices/desk/update/${invoiceId}`,
        {
            method: "PUT",
            headers: authHeader(),
            body :JSON.stringify(data)

        })

        if(!res.ok) throw new Error("Failed to Update Invoices");
        return res.json();

}

export const invoiceFinal = async (companyId, invoiceId) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/invoices/desk/${invoiceId}/finalize`,
    {
      method: "POST",
      headers: authHeader(),
    }
  );

  if (!res.ok) {
    throw new Error("Failed To Finalize Invoice");
  }

  return await res.json(); h
};


//-------------GET-------------------

export const getInvoiceDeskPdf = async (companyId, invoiceId) =>{
    const res = await fetch(
        `${BASE_URL}/${companyId}/invoices/desk/${invoiceId}/pdf`,
        {
            headers:authHeader()
        }
    )

    if(!res.ok) throw new Error("Failed to view pdf");
    return res.json();
}

export const allInvoiceDesk = async (companyId) =>{
    const res = await fetch(
        `${BASE_URL}/${companyId}/invoices/desk/all`,
        {
            headers: authHeader()
        }
    )
    if(!res.ok) throw new Error("failed get all InvoicesDesk");
    return res.json();
}



      //view

export const viewInvoice = async (companyId, invoiceId) =>{

    const res = await fetch(`${BASE_URL}/${companyId}/invoices/desk/${invoiceId}/view`,
        {
            headers:authHeader()
        }
    );

    if(!res.ok) throw new Error("Invoice not able to view");
    return res.blob();

}

export const downloadInvoice = async (companyId, invoiceId) =>{

    const res = await fetch(`${BASE_URL}/${companyId}/invoices/desk/${invoiceId}/download`,
        {
            headers:authHeader()
        }
    );

    if(!res.ok) throw new Error("Invoice not able to download");
    return res.blob();

}






// delete

export const deleteInvoiceDesk= async (companyId, invoiceId) =>{

    const res = await fetch(`${BASE_URL}/${companyId}/invoices/desk/${invoiceId}`,
        {
            method: "DELETE",   
            headers : authHeader()            
        }
    );
    if(!res.ok) throw new Error("Failed to delete Invoices ");
}