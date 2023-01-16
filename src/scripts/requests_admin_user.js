import { toast } from './toastfy.js'
import { requestHeaders, red, baseUrl, green } from './requests.js'
import { renderRegisteredUsers} from './admin_user.js'


export async function registeredUser() {
    const user = await fetch(`${baseUrl}/users`, {
        method: 'GET',
        headers: requestHeaders
    })

    const userJson = await user.json()

    return userJson
}


export async function deleteUsers(id) {
    const user = await fetch(`${baseUrl}/admin/delete_user/${id}`, {
        method: "DELETE",
        headers: requestHeaders
    })

    const userJson = await user.json()

    return userJson
}

export async function requestEditUsers(id, data) {
    const user = await fetch(`${baseUrl}/admin/update_user/${id}`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(data)
    })

    const userJson = await user.json()

    if (!user.ok) {

        toast(userJson.error, red)

    } 
    return userJson
}
