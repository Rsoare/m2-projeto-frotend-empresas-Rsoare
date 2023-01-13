import { login, checkTypeUser,} from './requests.js'

function LoginUser() {
    const inputs = document.querySelectorAll('.form__container > input')
    const buttonLogin = document.querySelector('.form__button--login')
    let dataUser = {}

    buttonLogin.addEventListener('click', async (event) => {
        event.preventDefault()

        inputs.forEach(input => {
            dataUser[input.name] = input.value
        })

        const request = await login(dataUser)

        checkTypeUser(request)
        

        localStorage.setItem("@KenzieEmpresas:user", JSON.stringify(request));

    })
}

function goPagehome() {
    const buttonhome = document.querySelector('.nav__button--home')

    buttonhome.addEventListener('click', () => {
        window.location.replace('../../index.html')
    })
}

function goPageRegister() {
    const buttonRegister = document.querySelector('.nav__button--register')
    const formButtonregister = document.querySelector('.form__button--register')

    buttonRegister.addEventListener('click', () => {
        window.location.replace('../../src/pages/register.html')
    })

    formButtonregister.addEventListener('click', (event) => {
        event.preventDefault()
        window.location.replace('../../src/pages/register.html')
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
goPageRegister()
goPagehome()
LoginUser()

