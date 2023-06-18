const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')
const filter = document.getElementById('filter')


function displayItems() {
    const itemsFromStorage = getItemsFromStroage();
    itemsFromStorage.forEach(item => addItemToDom(item))
    clearUI()
}


function onAddItemSubmit(e) {
    e.preventDefault()
    const newItem = itemInput.value
    //validate input 
    if(newItem === '') {
        alert('please Add and item')
        return
    }
    // create item to DOM element
    addItemToDom(newItem)

    //Add items to Local Storage
    addItemToStroage(newItem)
    
    clearUI()
    itemInput.value = ''; // to clear the input on each itteration we use name.value = '';

}

//Adding item to dom
function addItemToDom(item) {
    //create the list item
   const li =document.createElement('li')
   li.appendChild(document.createTextNode(item))

   const button = createButton('remove-item btn-link text-red')
   li.appendChild(button)
// Adding the created element to display on the dom 
   itemList.appendChild(li)
}


function createButton(classes) {
    const button = document.createElement('button')
    button.className = classes;
    const icon = createIcon('fa-solid fa-delete-left')
    button.appendChild(icon)
    return button
}

function createIcon (classes) {
    const icon = document.createElement('i')
    icon.className = classes
    return icon;
}


//Adding item to Local storage
function addItemToStroage(item) {
    const itemsFromStorage = getItemsFromStroage()

    //add new items to array list
    itemsFromStorage.push(item)
    //convert to json string and set to local stroage

    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}


function getItemsFromStroage() {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = []
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'))
    }
    return itemsFromStorage
}

function onClickItem(e) {
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement)
    }
}


//function to remove the item using event delegation way
function removeItem(e) {
    if (confirm('Are You Sure?')) {
        //Remove item from DOM
        item.remove()

        //remove item from Local Storage

        removeItemFromStorage(item.textContent)
        clearUI()
    }
}

function removeItemFromStorage(item) {
    const itemsFromStorage = getItemsFromStroage()
    
}


function clearItems() {
    while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild)
    }
    clearUI();
}

function filterItems(e) {
    const items = itemList.querySelectorAll('li')
    const text = e.target.value.toLowerCase()
    
    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase()
        
        if (itemName.indexOf(text) !== -1) {//indexOf() works if its match it wll retuen the true else -1
            item.style.display = 'flex'
        }else {
            item.style.display = 'none'
        }
    })
}


//Function that will remove the clear all and filter when there is no li
function clearUI() {
    const items = itemList.querySelectorAll('li')
    if (items.length === 0) {
        clearBtn.style.display = 'none'
        filter.style.display = 'none'
    } else {
        clearBtn.style.display = 'block'
        filter.style.display = 'block'
    }
}

//all the events in a function coz dont want it to stay in global scope
function init() {
    
    //Adding all event listners 
    itemForm.addEventListener('submit', onAddItemSubmit)
    itemList.addEventListener('click', onClickItem)
    clearBtn.addEventListener('click', clearItems)
    filter.addEventListener('input', filterItems)
    document.addEventListener('DOMContentLoaded', displayItems)
    clearUI();
}

init();




