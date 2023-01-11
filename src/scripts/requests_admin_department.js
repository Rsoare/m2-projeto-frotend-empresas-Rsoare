import { toast } from './toastfy.js'
import { requestHeaders, red, baseUrl } from './requests.js'


export async function getAllDepartament() {

    const user = await fetch(`${baseUrl}/departments`, {
        method: 'GET',
        headers: requestHeaders
    })

    const userJson = await user.json()

    return userJson

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