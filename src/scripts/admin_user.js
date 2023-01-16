import { green, getUser, checkTypeUser } from './requests.js'
import { registeredUser, deleteUsers, requestEditUsers } from './requests_admin_user.js'
import { toast } from './toastfy.js'


export async function validateUserPage() {
    const user = getUser()
    if (user.token == undefined ) {
        window.location.replace('../../index.html')
    }
}

export async function renderRegisteredUsers() {
    const ulUser = document.querySelector('.user__list')
    const listUser = await registeredUser()

    ulUser.innerHTML = " "

    listUser.forEach(user => {
        let { is_admin } = user

        if (is_admin == false) {

            const renderCard = createCardregisteredUsers(user)

            ulUser.appendChild(renderCard)
        }

    })
    modalEditUser()
    modalDeleteUser()
}

async function editUser(id) {
    const selectWork = document.querySelector('.modal__select--work')
    const selectProfessional = document.querySelector('.modal__select--professional')
    const buttonEdit = document.querySelector('.modal__button--edit')
    const modal = document.querySelector('.modal__container--edit')

    let userData = {}

    selectWork.addEventListener('change', () => {
        userData[selectWork.name] = selectWork.value
    })
    selectProfessional.addEventListener('change', () => {
        userData[selectProfessional.name] = selectProfessional.value
    })

    buttonEdit.addEventListener('click', () => {

        requestEditUsers(id, userData)

        window.location.reload()

        modal.close()
    })

}

async function modalEditUser() {
    const openModalEdit = document.querySelectorAll('.user__icon--edit')
    const modal = document.querySelector('.modal__container--edit')
    const listUser = await registeredUser()


    openModalEdit.forEach((button, index) => {

        let { uuid, } = listUser[index + 1]

        button.addEventListener('click', () => {

            editUser(uuid)

            modal.showModal()

            closeModalEdit()
        })


    })
}


function deleteUser(id) {
    const ul = document.querySelector('.user__list')
    const modal = document.querySelector('.modal__container--delete')
    const buttonDelete = document.querySelector('.modal__button--delete')

    buttonDelete.addEventListener('click', () => {

        deleteUsers(id)

        toast('Ususario deletado com sucesso', green)

        setTimeout(() => {
            window.location.reload()

        }, 1000)

        modal.close()
    })
}

async function modalDeleteUser() {
    const openModalDelete = document.querySelectorAll('.user__icon--delete')
    const modal = document.querySelector('.modal__container--delete')
    const listUser = await registeredUser()

    openModalDelete.forEach((button, index) => {

        button.addEventListener('click', () => {

            let { uuid, username } = listUser[index + 1]


            modal.innerHTML = " "

            const renderModal = createModalDelete(username)

            modal.appendChild(renderModal)

            modal.showModal()

            closeModalDelete()

            deleteUser(uuid)
        })
    })
}

function createModalDelete(username) {
    const div = document.createElement('div')
    const p = document.createElement('p')
    const button = document.createElement('button')
    const buttonCloseModal = document.createElement('button')


    button.classList.add('modal__button--delete')
    buttonCloseModal.classList.add('modal__close--delete')

    p.innerText = `Realmente deseja remover o usuário ${username} ?`
    button.innerText = 'Deletar'
    buttonCloseModal.innerText = 'X'
    div.append(p, button, buttonCloseModal)

    return div
}

function createCardregisteredUsers({ username, professional_level }) {
    const li = document.createElement('li')
    const h3 = document.createElement('h3')
    const p = document.createElement('p')
    const h2 = document.createElement('h2')
    const div = document.createElement('div')
    const imgEdit = document.createElement('img')
    const imgDelete = document.createElement('img')

    li.classList.add('user__list--item')
    h3.classList.add('user__list--name')
    p.classList.add('user__list--office')
    h2.classList.add('user__list--company')

    div.classList.add('department__icon--container')

    imgEdit.classList.add('user__icon--edit')
    imgDelete.classList.add('user__icon--delete')


    imgEdit.src = "../assets/icon/Vector (1).svg"
    imgDelete.src = "../assets/icon/Vector (4).svg"

    imgEdit.alt = " Editar"
    imgDelete.alt = " Deletar"

    imgEdit.ariaLabel = "Botão para editar Usuario "
    imgDelete.ariaLabel = "Botão para Deletar Usuario"

    h3.innerText = username
    p.innerText = professional_level
    h2.innerText = ''

    div.append(imgEdit, imgDelete)
    li.append(h3, p, h2, div)


    return li
}

function userLogout() {
    const buttonLogout = document.querySelector('.header__button--logout')

    buttonLogout.addEventListener('click', () => {
        localStorage.clear()
        window.location.replace('../../index.html')
    })
}

function closeModalDelete() {
    const button = document.querySelector('.modal__close--delete')
    const modal = document.querySelector('.modal__container--delete')

    button.addEventListener('click', () => {
        modal.close()
        window.location.reload()
    })
}

function closeModalEdit() {
    const button = document.querySelector('.modal__button--closeModal')
    const modal = document.querySelector('.modal__container--edit')

    button.addEventListener('click', () => {
        modal.close()

        window.location.reload()
    })
}

validateUserPage()
userLogout()
renderRegisteredUsers()
