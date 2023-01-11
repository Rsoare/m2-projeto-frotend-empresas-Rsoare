export function modalCreateDepartment() {
    const form = document.createElement('form')
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

    labelName.setAttribute('for','name')
    labelName.setAttribute('hidden',"")

    inputName.type = 'text'
    inputName.name = 'name'

    inputName.placeholder = 'Nome do departamento'

    labelDescription.setAttribute('for','description')
    labelDescription.setAttribute('hidden',"")

    inputDescription.type = 'text'
    inputDescription.name = 'description'

    inputDescription.placeholder = 'Descrição'

    select.name = 'company_uuid'

    option.innerText = 'Selecionar empresa'
    option.value =  ''

    button.innerText = 'Criar o Departamento'

    span.innerText = 'X'

    select.appendChild(option)

    form.append(labelName,inputName,labelDescription,inputDescription,select,button,span)

    return form
}

