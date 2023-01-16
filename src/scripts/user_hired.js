import { editUser, userInfo, colleagueDepartment, departmentUser } from "./requests__user.js"
import {getUser} from './requests.js'

export async function validateUserPage() {
    const user = getUser()
    
    if (user.token == undefined ) {
        window.location.replace('../../index.html')
    }
}
async function infoUserPage() {
    const name = document.querySelector('.user__name')
    const emailUser = document.querySelector('.user__list--Email')
    const professionalLevel = document.querySelector('.user__list--level')
    const kindOfWork = document.querySelector('.user__list--time')

    const { username, email, professional_level, kind_of_work } = await userInfo()

    name.innerHTML = username
    emailUser.innerHTML = `Email: ${email}`
    professionalLevel.innerHTML = professional_level
    kindOfWork.innerHTML = kind_of_work
}


function userLogout() {
    const button = document.querySelector('.header__button--logout')

    button.addEventListener('click', () => {

        localStorage.clear()

        window.location.replace('../../index.html')
    })
}

async function renderUserHired() {
    const usersList = await colleagueDepartment()
    const { users, name } = usersList[0]
    const section = document.querySelector('.section__company--container')

    const renderHeader = await createHeaderListHired(name)

    section.appendChild(renderHeader)

    section.insertAdjacentHTML('beforeend', '<ul class="company__employee--list"></ul>')

    const ul = document.querySelector('.company__employee--list')

    users.forEach(user => {
        const { username, professional_level } = user

        const renderCard = createCardColleagueDepartment(username, professional_level)


        ul.appendChild(renderCard)
    })
}

async function renderUserNotHired() {

    const { department_uuid } = await userInfo()

    if (department_uuid == null) {

        const sectionTitle = document.querySelector('.section__company--container')

        const renderTagP = notHired()

        sectionTitle.appendChild(renderTagP)


    } else {

        renderUserHired()
    }
}

function createCardColleagueDepartment(name, level) {
    const li = document.createElement('li')
    const p = document.createElement('p')
    const span = document.createElement('span')

    li.classList.add('company__employee')

    p.innerText = name
    span.innerText = level

    li.append(p, span)

    return li
}

function notHired() {

    const p = document.createElement('p')

    p.innerText = "Você ainda não foi contratado"

    return p
}

async function createHeaderListHired(nameDepartment) {
    const { name } = await departmentUser()


    const div = document.createElement('div')
    const p = document.createElement('p')

    div.classList.add('company__title--container')

    p.innerText = `${nameDepartment} - ${name}`


    div.appendChild(p)

    return div
}

function editInfoUser() {
    const inputs = document.querySelectorAll('.form__departament--container > input')
    const buttonCreate = document.querySelector('.form__button--createform')
    const modal = document.querySelector('.modal__container')
    let dataUser = {}

    buttonCreate.addEventListener('click', (event) => {
        event.preventDefault()

        inputs.forEach(input => {
            dataUser[input.name] = input.value
        })

        editUser(dataUser)

        modal.close()

        setTimeout(() => {
            window.location.reload()
        }, 1200)
    })
}

function renderModalEditUser() {
    const buttonOpenModal = document.querySelector('.user__icon--edit')
    const modal = document.querySelector('.modal__container')

    buttonOpenModal.addEventListener('click', () => {
        modal.innerHTML = " "

        const renderModal = createModalEditUser()

        modal.appendChild(renderModal)

        modal.showModal()

        editInfoUser()

        buttonCloseModal()
    })
}


function createModalEditUser() {

    const form = document.createElement('form')
    const p = document.createElement('p')
    const labelName = document.createElement('label')
    const inputName = document.createElement('input')

    const labelpassword = document.createElement('label')
    const inputpassword = document.createElement('input')

    const labelEmail = document.createElement('label')
    const inputEmail = document.createElement('input')

    const button = document.createElement('button')
    const span = document.createElement('span')

    form.classList.add('form__departament--container')

    inputName.classList.add('form__input--name')

    inputpassword.classList.add('form__input--password')

    inputEmail.classList.add('form__input--Email')

    button.classList.add('form__button--createform')

    p.innerText = "Edita Perfil"

    labelName.setAttribute('for', 'username')
    labelName.setAttribute('hidden', "")

    inputName.type = 'text'
    inputName.name = 'username'
    inputName.placeholder = "Seu nome"

    labelpassword.setAttribute('for', 'password')
    labelpassword.setAttribute('hidden', "")

    inputpassword.type = 'text'
    inputpassword.name = 'password'
    inputpassword.placeholder = "Seu e-mail"

    labelEmail.setAttribute('for', 'email')
    labelEmail.setAttribute('hidden', "")

    inputEmail.type = 'text'
    inputEmail.name = 'email'
    inputEmail.placeholder = "Sua senha"

    button.innerText = 'Editar Usuario'

    span.innerText = 'X'


    form.append(p, labelName, inputName, labelEmail, inputEmail, labelpassword, inputpassword, button, span)

    return form
}

function buttonCloseModal() {
    const buttonClose = document.querySelector('.modal__container > form > span')
    const modal = document.querySelector('.modal__container')

    buttonClose.addEventListener('click', () => {
        modal.close()
    })
}

renderModalEditUser()
renderUserNotHired()
infoUserPage()
userLogout()
validateUserPage()
