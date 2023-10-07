// script.js

const baseUrl = 'http://localhost:3000/posts';

function fetchItems() {
    const output = document.getElementById('output');
    output.innerHTML = '';

    fetch(baseUrl)
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.id}: ${item.title}`;
            li.className = 'list-group-item';
            output.appendChild(li);
        });
    })
    .catch(error => console.error('Error fetching items:', error));
}

function performCRUDOperation(method, itemData) {
    fetch(baseUrl, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
    })
    .then(response => response.json())
    .then(data => {
        fetchItems();
    })
    .catch(error => console.error(`Error ${method} item:`, error));
}

function createItem() {
    const createInput = document.getElementById('createInput');
    const newItem = { title: createInput.value };
    performCRUDOperation('POST', newItem);
    createInput.value = '';
}

function updateItem() {
    const updateInput = document.getElementById('updateInput');
    const updateValue = document.getElementById('updateValue').value;
    const itemId = updateInput.value;
    const updatedItem = { title: updateValue };
    performCRUDOperation('PATCH', updatedItem);
    updateInput.value = '';
    updateValue.value = '';
}

function deleteItem() {
    const deleteInput = document.getElementById('deleteInput');
    const itemId = deleteInput.value;
    performCRUDOperation('DELETE', null, itemId);
    deleteInput.value = '';
}

function getAllItems() {
    fetchItems();
}

function getItemById() {
    const getByIdInput = document.getElementById('getByIdInput');
    const itemId = getByIdInput.value;

    fetch(`${baseUrl}/${itemId}`)
    .then(response => response.json())
    .then(item => {
        const output = document.getElementById('output');
        output.innerHTML = '';

        if (item) {
            const li = document.createElement('li');
            li.textContent = `${item.id}: ${item.title}`;
            li.className = 'list-group-item';
            output.appendChild(li);
        } else {
            output.innerHTML = 'Item not found.';
        }
    })
    .catch(error => console.error('Error fetching item by ID:', error));
}


fetchItems();
