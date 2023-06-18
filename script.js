const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')
const filter = document.getElementById('filter')


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
    li.appendChild(button)

    // Adding the created element to display on the dom 
    itemList.appendChild(li)
    clearUI()
    itemInput.value = ''; // to clear the input on each itteration we use name.value = '';
    
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
//function to remove the item using event delegation way

function removeItem(e) {
    if(e.target.parentElement.classList.contains('remove-item')){

        if (confirm('Are You Sure')) { //confirm() is a method on the window object 
            e.target.parentElement.parentElement.remove();
            clearUI()
        }
    }
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




//Adding all event listners 
itemForm.addEventListener('submit', addItem)
itemList.addEventListener('click', removeItem)
clearBtn.addEventListener('click', clearItems)
filter.addEventListener('input', filterItems)

clearUI();