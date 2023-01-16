import { createNewUser } from './requests.js'

function createUser() {
    const inputs = document.querySelectorAll('.form__container > input')
    const select = document.querySelector('.form__options')
    const buttonRegister = document.querySelector('.form__button--register')

    let userData = {}

    select.addEventListener('change', (event) => {
        let selectValue = select.value
        userData[select.name] = selectValue 
    })

    buttonRegister.addEventListener('click',async (event) => {
        event.preventDefault()
        inputs.forEach(input => {
            userData[input.name] = input.value
        });
        
        const request = await createNewUser(userData)

    })
}

function goPagehome() {
    const buttonhome = document.querySelector('.nav__button--home')

    buttonhome.addEventListener('click', () => {
        window.location.replace('../../index.html')
    })
}

function goPagelogin() {
    const buttonlogin = document.querySelector('.nav__button--login')
    const formButtonlogin = document.querySelector('.form__button--login')

    buttonlogin.addEventListener('click', () => {
        window.location.replace('../../src/pages/login.html')
    })
    formButtonlogin.addEventListener('click', (event) => {
        event.preventDefault()
        window.location.replace('../../src/pages/login.html')
    })
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

openMenuButton()
closeMenuButton()
goPagelogin()
goPagehome()
createUser()