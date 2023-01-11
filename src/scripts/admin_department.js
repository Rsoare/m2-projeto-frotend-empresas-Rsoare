import { getAllDepartament } from './requests_admin_department.js'

import { getAllCompany } from "./requests.js"


async function RenderCompanyOptions() {
    const select = document.querySelector('.department__header--select')
    const AllCompany = await getAllCompany()

    AllCompany.forEach(Company=> {
        
        const renderOptions = createCompanyOptions(Company)

        select.appendChild(renderOptions)
    })
}

async function RenderCreateCompanyOptions() {
    const select = document.querySelector('.departament__select')
    const AllCompany = await getAllCompany()

    AllCompany.forEach(Company=> {
        
        const renderOptions = createCompanyOptions(Company)

        select.appendChild(renderOptions)
    })
}

function createCompanyOptions({uuid,name}) {
    const option = document.createElement('option')

    option.innerText = name
    option.value = uuid

    return option
}

function opemModalCreateDepartment() {
    const button = document.querySelector('.department__button--create')
    const modal = document.querySelector('.modal__departament--create')
    button.addEventListener('click', (event) => {
        event.preventDefault()

        RenderCreateCompanyOptions()

        modal.showModal()
    })
}

async function renderCardDepartment() {
    const ul = document.querySelector('.department__list')
    const Departments = await getAllDepartament()
    Departments.forEach(Department => {

        const rendeCard = createCardDepartment(Department)

        ul.appendChild(rendeCard)
    });
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

RenderCompanyOptions() 
opemModalCreateDepartment()
renderCardDepartment()