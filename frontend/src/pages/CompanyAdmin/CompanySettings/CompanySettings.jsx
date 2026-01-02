
import React from "react";
import LogoutButton from "../../../components/LogoutButton/LogoutButton";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";

const CompanySettings = () =>{


    return(
        <CompanyAdminLayout>
        <h1>Settings</h1>

        <LogoutButton/>
        
        </CompanyAdminLayout>
    )
}

export default CompanySettings;