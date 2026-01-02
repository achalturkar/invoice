
import React from "react";
import { AuthProvider } from "./auth/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import { useSilentRefresh } from "./auth/useSilentRefresh";

function App() {

  useSilentRefresh()
  return (

    <AuthProvider>
      <AppRoutes/>
    </AuthProvider>
   
  )
  
}

export default App;
