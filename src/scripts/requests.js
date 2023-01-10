import {toast} from './Toastfy.js'

const { token } = getUser() || {}

const baseUrl = 'http://localhost:6278'
const requestHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
};

const red = "#CE4646";
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

    if (!loginData.ok) {
        toast(loginDataJson.error,red)
    }

    return loginDataJson

}


export async function checkTypeUser(objToken) {
    const{token} = objToken

    const TypeUser = await fetch(`${baseUrl}/auth/validate_user`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })

    const TypeUserJson = await TypeUser.json()

    const { is_admin } = TypeUserJson

    if (is_admin == true) {
        window.location.replace('../../src/pages/admin.html')

    } else if (is_admin == false) {
        window.location.replace('../../src/pages/userNotHired.html')
    }

    return TypeUserJson
}

