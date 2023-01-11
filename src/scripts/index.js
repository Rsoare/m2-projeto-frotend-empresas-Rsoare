import { getAllCompany, getAllsectors, getAllCompanyBysector } from './requests.js'


function openSelectMenu() {
    const buttonOpen = document.querySelector('.fa-arrow-down')
    const select = document.querySelector('.sector__optios--container')


    buttonOpen.addEventListener('click', () => {

        select.classList.toggle('open__menu')


        if (select.classList.contains('open__menu')) {
            select.innerHTML = " "

            select.insertAdjacentHTML('afterbegin',
                '<option value="" class="sector__option">Selecione um setor</option>'
            )
            getCompanyBysector()
            renderOptionsSector()
        } else {
            renderCard()
        }
    })
}
function getCompanyBysector() {
    const select = document.querySelector('.sector__optios--container')
    select.addEventListener('change', async () => {
        let selectValue = select.value

        const CompanyBysector = await getAllCompanyBysector(selectValue)

        renderCompanyBysector(CompanyBysector)

    })
}

function renderCompanyBysector(Companys) {
    const ul = document.querySelector('.sector__list--container')

    ul.innerHTML = " "
    Companys.forEach(Company => {

        const renderCompanys = createCard(Company)

        ul.appendChild(renderCompanys)
    })
}

async function renderOptionsSector() {
    const select = document.querySelector('.sector__optios--container')
    const allSectors = await getAllsectors()

    allSectors.forEach(sector => {
        const renderSector = createOptionsSector(sector)

        select.appendChild(renderSector)

    })

}

function createOptionsSector({ description }) {
    const option = document.createElement('option')

    option.classList.add('sector__option')

    option.value = description
    option.innerText = description

    return option
}

async function renderCard() {
    const ul = document.querySelector('.sector__list--container')
    const allCompanys = await getAllCompany()

    allCompanys.forEach(Company => {
        const createCompany = createCard(Company)
        ul.appendChild(createCompany)
    });
}

function createCard({ name, opening_hours, sectors }) {
    const li = document.createElement('li')
    const h2 = document.createElement('h2')
    const div = document.createElement('div')
    const span = document.createElement('span')
    const p = document.createElement('p')

    li.classList.add('sector__list--item')
    h2.classList.add('list__item--title')
    div.classList.add('list__tag--container')
    span.classList.add('list__tag--hours')
    p.classList.add('list__tag--name')

    h2.innerText = name
    span.innerText = opening_hours
    p.innerText = sectors.description

    div.append(span, p)
    li.append(h2, div)

    return li
}

function openMenuButton() {
    const buttonOpen = document.querySelector('#buttonOpen')
    const dropdownMenu = document.querySelector('#menuNav')
    const buttonClose = document.querySelector('#buttonClose')
    buttonOpen.addEventListener('click', () => {
        dropdownMenu.classList.toggle('open__menu')
        buttonOpen.style.display = 'none'
        buttonClose.style.display = 'block'
    })
}

function closeMenuButton() {
    const buttonOpen = document.querySelector('#buttonOpen')
    const dropdownMenu = document.querySelector('#menuNav')
    const buttonClose = document.querySelector('#buttonClose')

    buttonClose.addEventListener('click', () => {
        dropdownMenu.classList.toggle('open__menu')
        buttonOpen.style.display = 'block'
        buttonClose.style.display = 'none'
    })
}

function goPageLogin() {
    const buttonLogin = document.querySelector('.nav__button--login')

    buttonLogin.addEventListener('click', () => {
        window.location.replace('../../src/pages/login.html')
    })
}

function goPageRegister() {
    const buttonregister = document.querySelector('.nav__button--register')

    buttonregister.addEventListener('click', () => {
        window.location.replace('../../src/pages/register.html')
    })
}


openSelectMenu()
goPageLogin()
goPageRegister()
closeMenuButton()
openMenuButton()
renderCard() 