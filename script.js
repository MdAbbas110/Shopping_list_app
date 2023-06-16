const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')

//adding functions

function addItem(e) {
    e.preventDefault()
    const newItem = itemInput.value
    //validate input 
    if(newItem === '') {
        alert('please Add and item')
        return
    }
    //create the list item
    const li =document.createElement('li')
    li.appendChild(document.createTextNode(newItem))
    
    const button = createButton('remove-item btn-link text-red')
}

function createButton(classes) {
    const button = document.createElement('button')
    button.className = classes;
    const icon = createIcon('X-img')
    button.appendChild(icon)
    return button
}

function createIcon (classes) {
    const icon = document.createElement('img')
    icon.className = classes
    return icon
}




//Adding all event listners 
itemForm.addEventListener('submit', addItem)