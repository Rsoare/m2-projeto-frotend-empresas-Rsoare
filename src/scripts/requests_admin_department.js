import { toast } from './toastfy.js'
import { requestHeaders, red, green, baseUrl } from './requests.js'
import { renderCardDepartment } from './admin_department.js'
import { resetRenderModalView,} from './modal__admin__department.js'

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

    if (!departament.ok) {
        toast(departamentJson.error, red)
    } else {
        toast('Departamento criado com susseso', green)

        resetListDepartament()
    }

    return departamentJson

}


export async function getDepartamentByCompany(id) {

    const company = await fetch(`${baseUrl}/departments/${id}`, {
        method: 'GET',
        headers: requestHeaders
    })

    const companyJson = await company.json()

    return companyJson

}

export async function deleteDepartaments(id) {

    const departament = await fetch(`${baseUrl}/departments/${id}`, {
        method: 'DELETE',
        headers: requestHeaders
    })

    const departamentJson = await departament.json()

    return departamentJson

}

export async function editDepartaments(id, data) {
    const departament = await fetch(`${baseUrl}/departments/${id}`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(data)
    })

    const departamentJson = await departament.json()

    if (!departament.ok) {

        toast(departamentJson.error, red)

    } else {
        toast('Departamento editado com sucesso', green)
        resetListDepartament()
    }
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

    if (!user.ok) {
        toast(userJson.error, red)
    } else {
        toast('Usuario contratado com sucesso', green)

        resetRenderModalView()
        
    }
    return userJson
}

export async function dismissUsers(id) {
    const user = await fetch(`${baseUrl}/departments/dismiss/${id}`, {
        method: "PATCH",
        headers: requestHeaders,
    })

    const userJson = await user.json()

    if (!user.ok) {

        toast(userJson.error, red)
    } else {

        toast('Usuario Demitido com sucesso', green)

    }

    return userJson

}


export function resetListDepartament() {
    const ul = document.querySelector('.department__list')
    const modal = document.querySelector('.modal__departament--create')

    ul.innerHTML = " "

    renderCardDepartment()


    modal.close()
}