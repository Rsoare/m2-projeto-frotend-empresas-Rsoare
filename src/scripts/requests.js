import { toast } from './toastfy.js'


export const baseUrl = 'http://localhost:6278'
const { token } = getUser()

export const requestHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
}

export function getUser() {
    const user = JSON.parse(localStorage.getItem("@KenzieEmpresas:user")) || {}

    return user
}

export const red = "#CE4646"

export const green = "#4BA036"


export async function getAllCompany() {
    const company = await fetch(`${baseUrl}/companies`, {
        method: 'GET',
        Headers: requestHeaders,
    })
    const companyJson = await company.json()

    return companyJson
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
        toast(loginDataJson.error, red)
    }

    return loginDataJson

}


export async function checkTypeUser(objToken) {
    const { token } = objToken

    const typeUser = await fetch(`${baseUrl}/auth/validate_user`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })

    const typeUserJson = await typeUser.json()

    const { is_admin } = typeUserJson

    if (is_admin == true) {

        window.location.replace('../../src/pages/admin.html')

    } else if (is_admin == false) {

        window.location.replace('../../src/pages/user_hired.html')
    }

    return typeUserJson
}

export async function createNewUser(data) {
    const newUser = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(data)
    })

    const neWUserJson = await newUser.json()

    if (!newUser.ok) {
        toast(neWUserJson.error, red)

        console.error(neWUserJson.error)
    } else {
        toast("Usuário Criado com sucesso", green)

        setTimeout(() => {
            setTimeoutGoLoginPage()
        }, 1000)
    }
    return neWUserJson
}

function setTimeoutGoLoginPage() {
    return window.location.replace('../../src/pages/login.html')
}
