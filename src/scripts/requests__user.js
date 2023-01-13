import { requestHeaders, red, baseUrl, } from './requests.js'
import { toast } from './toastfy.js'

export async function userInfo() {
    const user = await fetch(`${baseUrl}/users/profile`, {
        method: 'GET',
        headers: requestHeaders
    })

    const userJson = await user.json()


    return  userJson 
}


export async function editUser(data) {
    const user = await fetch(`${baseUrl}/users`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(data)
    })

    const userJson = await user.json()
    
    if (user.ok == false) {
        
        toast(userJson.error,red)
    }
    return userJson
}

export async function colleagueDepartment () {
    const user = await fetch(`${baseUrl}/users/departments/coworkers`, {
        method: 'GET',
        headers: requestHeaders
    })

    const  userJson  = await user.json()

    return  userJson 
}


export async function departmentUser () {
    const user = await fetch(`${baseUrl}/users/departments`, {
        method: 'GET',
        headers: requestHeaders
    })

    const  userJson  = await user.json()

    return  userJson 
}
