import { green } from './requests.js'
import { getAllDepartament, deleteDepartaments, editDepartaments, userOutOfWork, hireUsers, dismissUsers, resetListDepartament } from './requests_admin_department.js'
import { registeredUser } from './requests_admin_user.js'
import { toast } from './toastfy.js'


export function modalCreateDepartment() {
    const form = document.createElement('form')
    const p = document.createElement('p')
    const labelName = document.createElement('label')
    const inputName = document.createElement('input')
    const labelDescription = document.createElement('label')
    const inputDescription = document.createElement('input')
    const select = document.createElement('select')
    const option = document.createElement('option')
    const button = document.createElement('button')
    const span = document.createElement('span')

    form.classList.add('form__departament--container')

    inputName.classList.add('departament__input--name')

    inputDescription.classList.add('departament__input--description')

    select.classList.add('departament__select')

    button.classList.add('departament__button--create')

    labelName.setAttribute('for', 'name')
    labelName.setAttribute('hidden', "")

    inputName.type = 'text'
    inputName.name = 'name'

    inputName.placeholder = 'Nome do departamento'

    labelDescription.setAttribute('for', 'description')
    labelDescription.setAttribute('hidden', "")

    inputDescription.type = 'text'
    inputDescription.name = 'description'

    inputDescription.placeholder = 'Descrição'

    select.name = 'company_uuid'

    option.innerText = 'Selecionar empresa'
    option.value = ''

    button.innerText = 'Criar o Departamento'

    p.innerText = 'Criar Departamento'

    span.innerText = 'X'

    select.appendChild(option)

    form.append(p, labelName, inputName, labelDescription, inputDescription, select, button, span)

    return form
}

function createModalDelete(departmentName) {
    const div = document.createElement('div')
    const p = document.createElement('p')
    const button = document.createElement('button')
    const buttonCloseModal = document.createElement('button')


    button.classList.add('modal__button--deleteDepartament')
    buttonCloseModal.classList.add('modal__close--deleteDepartament')

    p.innerText = `Realmente deseja deletar o Departamento ${departmentName} e demitir seus funcionários?`
    button.innerText = 'Confirmar'
    buttonCloseModal.innerText = 'X'
    div.append(p, button, buttonCloseModal)

    return div
}

export async function modalDeleteDepartament() {
    const openModalDelete = document.querySelectorAll('.department__icon--delete')
    const modal = document.querySelector('.modal__container--deleteDdepartament')
    const listDepartament = await getAllDepartament()


    openModalDelete.forEach((button, index) => {
        let { uuid, name } = listDepartament[index]


        button.addEventListener('click', () => {

            modal.innerHTML = " "

            const renderModal = createModalDelete(name)

            modal.appendChild(renderModal)

            modal.showModal()

            deleteDepartament(uuid)

            closeModalDelete()
        })
    })
}

function deleteDepartament(id) {
    const modal = document.querySelector('.modal__container--deleteDdepartament')
    const buttonDelete = document.querySelector('.modal__button--deleteDepartament')

    buttonDelete.addEventListener('click', () => {

        deleteDepartaments(id)

        modal.close()

        toast('Departamento deletado com sucesso', green)

        resetListDepartament()

    })
}

function closeModalDelete() {
    const button = document.querySelector('.modal__close--deleteDepartament')
    const modal = document.querySelector('.modal__container--deleteDdepartament')

    button.addEventListener('click', () => {
        modal.close()
    })
}

function editDepartament(id, description) {

    const buttonEdit = document.querySelector('.form__edit--button')
    const modal = document.querySelector('.modal__departament--edit')
    const input = document.querySelector('.form__Departament--edit')
    let departamentData = {}

    if (input.name == 'description') {
        input.value = description
    }

    buttonEdit.addEventListener('click', () => {

        departamentData[input.name] = input.value

        editDepartaments(id, departamentData)c
        modal.close()

    })

}
export async function modalEditDepartament() {
    const openModalEdit = document.querySelectorAll('.department__icon--edit')
    const modal = document.querySelector('.modal__departament--edit')
    const listUser = await getAllDepartament()


    openModalEdit.forEach((button, index) => {
        let { uuid, description } = listUser[index]

        button.addEventListener('click', () => {

            modal.innerHTML = " "

            const renderModal = createModalEdit()

            modal.appendChild(renderModal)

            modal.showModal()

            editDepartament(uuid, description)

            closeModalEdit()
        })
    })
}

function createModalEdit() {
    const div = document.createElement('div')
    const p = document.createElement('p')
    const label = document.createElement('label')
    const text = document.createElement('textarea')
    const button = document.createElement('button')
    const span = document.createElement('span')

    div.classList.add('form__container')
    text.classList.add('form__Departament--edit')
    button.classList.add('form__edit--button')
    span.classList.add('modal__close--edit--Departament')

    label.setAttribute('for', 'description')
    label.setAttribute('hidden', "")

    text.name = "description"

    span.innerText = "X"

    p.innerText = "Editar Departamento"
    button.innerText = "Salvar alterações"

    div.append(p, label, text, button, span)

    return div
}

function closeModalEdit() {
    const button = document.querySelector('.modal__close--edit--Departament')
    const modal = document.querySelector('.modal__departament--edit')

    button.addEventListener('click', () => {
        modal.close()
    })
}

export async function renderListViewDismissUser(id) {
    const ul = document.querySelector('.modal__list--view')
    const users = await registeredUser()


    users.forEach(user => {
        let { username, uuid, professional_level, department_uuid } = user

        if (id == department_uuid) {

            const renderUser = listViewDismissUser(username, professional_level, uuid)

            ul.appendChild(renderUser)

        }
        
    })
    dismissUser(id)
}

function listViewDismissUser(username, professional_level, uuid) {
    const li = document.createElement('li')
    const h2 = document.createElement('h2')
    const span = document.createElement('span')
    const h3 = document.createElement('h3')
    const button = document.createElement('button')

    li.classList.add('modal__list--iten')
    button.classList.add('modal__button--dismiss')

    h2.innerText = username
    span.innerText = professional_level
    h3.innerText = ""
    button.innerText = "Desligar"
    button.value = uuid

    li.append(h2, span, h3, button)

    return li

}

function hireUser(companyid) {
    const select = document.querySelector('.modal__select--Visualize')
    const button = document.querySelector('.modal__button--hire')

    let userData = {}


    select.addEventListener('change', () => {
        userData[select.name] = select.value
    })

    button.addEventListener('click', async () => {

        userData['department_uuid'] = companyid

        resetRenderModalView(companyid)
        hireUsers(userData)

    })

}

async function renderOptionsViewDepartaments() {
    const select = document.querySelector('.modal__select--Visualize')
    const users = await userOutOfWork()

    select.innerHTML = " "

    select.insertAdjacentHTML('afterbegin',
        '<option value="" class="modal__select--Visualize">Selecione um usuario</option>'
    )
    users.forEach(user => {
        let { username, uuid } = user

        const renderOptions = createOptionsViewDepartaments(username, uuid)

        select.appendChild(renderOptions)

    })
}

function createOptionsViewDepartaments(name, id) {
    const options = document.createElement('option')

    options.innerText = name
    options.value = id

    return options
}

function createModalviewDepartaments(name, description, companies,) {
    const div = document.createElement('div')
    const h2Title = document.createElement('h2')
    const pSubTitle = document.createElement('p')
    const h3 = document.createElement('h3')
    const select = document.createElement('select')
    const buttonHire = document.createElement('button')
    const ul = document.createElement('ul')
    const span = document.createElement('span')

    div.classList.add('modal__info--container')
    select.classList.add('modal__select--Visualize')
    buttonHire.classList.add('modal__button--hire')

    ul.classList.add('modal__list--view')

    h2Title.innerText = name
    pSubTitle.innerText = description
    h3.innerText = companies.name

    select.name = "user_uuid"

    buttonHire.innerText = "Contratar"

    span.innerText = "X"

    div.append(h2Title, pSubTitle, h3, select, buttonHire, ul, span)

    return div
}

export async function modalviewDepartaments() {
    const openModalview = document.querySelectorAll('.department__icon--view')
    const modal = document.querySelector('.modal__departament--view')
    const listDepartament = await getAllDepartament()

    openModalview.forEach((button, index) => {
        let { companies, name, description, uuid } = listDepartament[index]


        button.addEventListener('click', (event) => {

            modal.innerHTML = " "

            const renderModal = createModalviewDepartaments(name, description, companies, uuid)

            modal.appendChild(renderModal)

            renderOptionsViewDepartaments()

            renderListViewDismissUser(uuid)

            hireUser(uuid)

            closeModalViewEdit()

            modal.showModal()

        })
    })
}


function dismissUser(idCompany) {
    const buttons = document.querySelectorAll('.modal__button--dismiss')

    buttons.forEach(button => {
        button.addEventListener('click', () => {

            let { value } = button

            dismissUsers(value)
            resetRenderModalView(idCompany)
        })
    })
    closeModalViewEdit()
}

export async function resetRenderModalView(company) {
    const modal = document.querySelector('.modal__departament--view')
    const listDepartament = await getAllDepartament()


    listDepartament.forEach(departament => {
        let { companies, name, description, uuid } = departament
        
        if (uuid == company) {

            modal.innerHTML = " "
            
            const renderModal = createModalviewDepartaments(name, description, companies, uuid)

            modal.appendChild(renderModal)

            renderOptionsViewDepartaments()

            renderListViewDismissUser(uuid)

            hireUser(uuid)

            closeModalViewEdit()

        }

    })

}

export function closeModalViewEdit() {
    const button = document.querySelector('.modal__departament--view > div > span')
    const modal = document.querySelector('.modal__departament--view ')

    button.addEventListener('click', () => {
        modal.close()
    })
}