
const baseUrl ='http://localhost:6278'

const requestHeaders = {
    "Content-Type": "application/json",
    //Authorization: `Bearer ${token}`,
};


export async function getAllcompanies() {
    const companies = await fetch(`${baseUrl}/companies`,{
        method:'GET',
        Headers:requestHeaders,
    })
    const companiesJson = await companies.json()
    
    return companiesJson
}
