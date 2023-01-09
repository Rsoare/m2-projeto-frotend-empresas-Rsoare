
const { token } = getUser()

const baseUrl = 'http://localhost:6278'
const requestHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
};

export function getUser() {
    const user = JSON.parse(localStorage.getItem("@KenzieEmpresas:user")) || {}

    return user
}

export async function getAllCompany() {
    const Company = await fetch(`${baseUrl}/companies`, {
        method: 'GET',
        Headers: requestHeaders,
    })
    const CompanyJson = await Company.json()

    return CompanyJson
}

export async function getAllsectors() {
    const sectors = await fetch(`${baseUrl}/sectors`, {
        method: 'GET',
        Headers: requestHeaders,
    })
    const sectorsJson = await sectors.json()

    return sectorsJson
}

export async function getAllCompanyBysector(sector) {
    const companyBysector = await fetch(`${baseUrl}/companies/${sector}`, {
        method: 'GET',
        headers: requestHeaders,
    })
    const companyBysectorJson = await companyBysector.json()

    return companyBysectorJson
}


export async function login(data) {
    const loginData = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(data),
    })

    const loginDataJson = await loginData.json()


    const verifyUserAdmin = await checkTypeUser()

    console.log(verifyUserAdmin)

    if (!loginData.ok) {
        console.log(loginDataJson.error)
    } else {

        if (verifyUserAdmin == true) {

            window.location.replace('../../src/pages/admin.html')

        } else{
            
            window.location.replace('../../src/pages/userNotHired.html')
        }
    }

    return loginDataJson

}


export async function checkTypeUser() {
    const TypeUser = await fetch(`${baseUrl}/auth/validate_user`, {
        method: 'GET',
        headers: requestHeaders
    })

    const TypeUserJson = await TypeUser.json()


    return TypeUserJson.is_admin
}   
