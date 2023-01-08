import { getAllcompanies } from './requests.js'

async function renderCard() {
    const ul = document.querySelector('.setor__list--container')
    const allCompanies = await getAllcompanies()

    allCompanies.forEach(Companie => {
        const createCompanie = createCard(Companie)
        ul.appendChild(createCompanie)
    });
}

function createCard({name,opening_hours,sectors}) {
    const li = document.createElement('li')
    const h2 = document.createElement('h2')
    const div = document.createElement('div')
    const span = document.createElement('span')
    const p = document.createElement('p')

    li.classList.add('setor__list--item')
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



openMenuButton()
closeMenuButton()
goPageRegister()
goPageLogin()
renderCard() 