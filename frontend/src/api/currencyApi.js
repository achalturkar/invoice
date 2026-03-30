const BASE_URL = "http://localhost:8080/api/companies";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  "Content-Type": "application/json"
});



export const createCurrency = async() =>{
    
    const res = await fetch(`${BASE_URL}/currencies`,
        {
            method: "POST",
            headers: authHeader(),
            body : JSON.stringify()
        }
    )

    if(!res.ok) throw new Error("Currency Not able to create");
    return res.json();
}


export const getCurrency = async () =>{
   const res = await fetch(`${BASE_URL}/currencies/active`,
    {
        headers: authHeader()
    }
   )

    if(!res.ok) throw new Error("failed get all currencies");
    return res.json();

}


