
import React from "react";
import SuperAdminLayout from "../../../layout/SuperAdminLayout";
import CreateCompanyWithAdmin from "../../../components/SuperAdmin/Companies/CreateCompanyWithAdmin/CreateCompanyWithAdmin";

const AddCompanyAdmin = () =>{


    return(
        <SuperAdminLayout>
        <h1>Add Company Admin</h1>

        <CreateCompanyWithAdmin/>
        
        </SuperAdminLayout>
    )
}

export default AddCompanyAdmin;