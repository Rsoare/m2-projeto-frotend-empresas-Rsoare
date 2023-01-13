import { toast } from './toastfy.js'
import { requestHeaders, red, baseUrl } from './requests.js'


export async function getAllDepartament() {

    const departament = await fetch(`${baseUrl}/departments`, {
        method: 'GET',
        headers: requestHeaders
    })

    const departamentJson = await departament.json()

    return departamentJson

}

export async function createDepartament(data) {
    const departament = await fetch(`${baseUrl}/departments`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(data)
    })

    const departamentJson = await departament.json()

    return departamentJson

}


export async function getDepartamentByCompany(id) {

    const Company = await fetch(`${baseUrl}/departments/${id}`, {
        method: 'GET',
        headers: requestHeaders
    })

    const CompanyJson = await Company.json()

    return CompanyJson

}

export async function deleteDepartaments(id) {

    const Departament = await fetch(`${baseUrl}/departments/${id}`, {
        method: 'DELETE',
        headers: requestHeaders
    })

    const DepartamentJson = await Departament.json()

    return DepartamentJson

}

export async function editDepartaments(id, data) {
    const departament = await fetch(`${baseUrl}/departments/${id}`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(data)
    })

    const departamentJson = await departament.json()

    return departamentJson

}

export async function userOutOfWork() {

    const user = await fetch(`${baseUrl}/admin/out_of_work`, {
        method: 'GET',
        headers: requestHeaders
    })

    const userJson = await user.json()

    return userJson

}

export async function hireUsers(data) {
    const user = await fetch(`${baseUrl}/departments/hire/`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(data)
    })

    const userJson = await user.json()

    return userJson
}

export async function dismissUsers(id) {
    const user = await fetch(`${baseUrl}/departments/dismiss/${id}`, {
        method: "PATCH",
        headers: requestHeaders,
    })

    const userJson = await user.json()

    return userJson

}


