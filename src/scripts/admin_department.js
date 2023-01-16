import { getAllDepartament, createDepartament, getDepartamentByCompany,} from './requests_admin_department.js'

import { getAllCompany } from './requests.js'

import { modalCreateDepartment,modalDeleteDepartament,modalEditDepartament,modalviewDepartaments} from './modal__admin__department.js'



function renderDepartamentByCompany(departaments) {
    const ul = document.querySelector('.department__list')

    ul.innerHTML = " "

    departaments.forEach(departament => {
        
        const renderDepartaments = createCardDepartment(departament)

        ul.appendChild(renderDepartaments)
    })
    modalDeleteDepartament()
    modalEditDepartament()
    modalviewDepartaments()
}

function departamentByCompany() {
    const selectMain = document.querySelector('.department__header--select')

    selectMain.addEventListener('change', async () => {
        let selectValue = selectMain.value
        
        const departaments = await getDepartamentByCompany(selectValue)

        renderDepartamentByCompany(departaments)
    })
}

function createDepartment() {
    const inputName = document.querySelector('.departament__input--name')
    const inputDescription = document.querySelector('.departament__input--description')
    const select = document.querySelector('.departament__select')
    const button = document.querySelector('.departament__button--create')


    let departmentData = {}

    select.addEventListener('change', () => {
        departmentData[select.name] = select.value

    })

    button.addEventListener('click', (event) => {
        event.preventDefault()

        departmentData[inputName.name] = inputName.value
        departmentData[inputDescription.name] = inputDescription.value

        
        createDepartament(departmentData)
        
    })
}

async function renderCompanyOptions() {
    const select = document.querySelector('.department__header--select')
    const allCompany = await getAllCompany()

    allCompany.forEach(company => {

        const renderOptions = createCompanyOptions(company)

        select.appendChild(renderOptions)
    })
}

async function renderCreateCompanyOptions() {
    const select = document.querySelector('.departament__select')
    const allCompany = await getAllCompany()

    allCompany.forEach(company => {
        const renderOptions = createCompanyOptions(company)

        select.appendChild(renderOptions)

    })
}

function createCompanyOptions({ uuid, name }) {
    const option = document.createElement('option')

    option.innerText = name
    option.value = uuid

    return option
}

function openModalCreateDepartment() {
    const button = document.querySelector('.department__button--create')
    const modal = document.querySelector('.modal__departament--create')


    button.addEventListener('click', (event) => {
        event.preventDefault()

        modal.innerHTML = " "

        const formModal = modalCreateDepartment()

        modal.appendChild(formModal)

        renderCreateCompanyOptions()

        createDepartment()

        modal.showModal()

        closeModal()

    })
}

export async function renderCardDepartment() {
    const ul = document.querySelector('.department__list')
    const departments = await getAllDepartament()
    
    departments.forEach(department => {

        const rendeCard = createCardDepartment(department)

        ul.appendChild(rendeCard)
    })
    modalDeleteDepartament()
    modalEditDepartament()
    modalviewDepartaments()
}

function createCardDepartment({ companies, description, name }) {
    const li = document.createElement('li')
    const h3 = document.createElement('h3')
    const p = document.createElement('p')
    const h2 = document.createElement('h2')
    const div = document.createElement('div')
    const imgView = document.createElement('img')
    const imgEdit = document.createElement('img')
    const imgDelete = document.createElement('img')

    li.classList.add('department__list--item')
    h3.classList.add('department__list--name')
    p.classList.add('department__list--description')
    h2.classList.add('department__list--company')

    div.classList.add('department__icon--container')

    imgView.classList.add('department__icon--view')
    imgEdit.classList.add('department__icon--edit')
    imgDelete.classList.add('department__icon--delete')
    

    imgView.src = "../assets/icon/Vector (2).svg"
    imgEdit.src = "../assets/icon/Vector (3).svg"
    imgDelete.src = "../assets/icon/Vector (4).svg"

    imgView.alt = "Visualizar "
    imgEdit.alt = " Editar"
    imgDelete.alt = " Deletar"

    imgView.ariaLabel = "Botão para mais imformações do departamento "
    imgEdit.ariaLabel = "Botão para editar Departamento "
    imgDelete.ariaLabel = "Botão para Deletar Departamento"

    h3.innerText = name
    p.innerText = description
    h2.innerText = companies.name

    div.append(imgView, imgEdit, imgDelete)
    li.append(h3, p, h2, div)


    return li

}
function closeModal() {
    const button = document.querySelector('.form__departament--container > span')
    const modal = document.querySelector('.modal__departament--create')
    button.addEventListener('click', () => {
        modal.close()
    })
}

departamentByCompany()
renderCompanyOptions()
openModalCreateDepartment()
renderCardDepartment()