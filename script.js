// script.js

const baseUrl = 'http://localhost:3000/posts'; // Update the URL to match your endpoint

function createItem() {
    const createInput = document.getElementById('createInput');
    const newItem = { title: createInput.value };

    fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
    })
    .then(response => response.json())
    .then(data => {
        createInput.value = '';
        fetchItems();
    })
    .catch(error => console.error('Error creating item:', error));
}

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

function updateItem() {
    const updateInput = document.getElementById('updateInput');
    const updateValue = document.getElementById('updateValue').value;
    const itemId = updateInput.value;

    const updatedItem = { title: updateValue };

    fetch(`${baseUrl}/${itemId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
    })
    .then(response => response.json())
    .then(data => {
        updateInput.value = '';
        updateValue.value = '';
        fetchItems();
    })
    .catch(error => console.error('Error updating item:', error));
}

function deleteItem() {
    const deleteInput = document.getElementById('deleteInput');
    const itemId = deleteInput.value;

    fetch(`${baseUrl}/${itemId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(() => {
        deleteInput.value = '';
        fetchItems();
    })
    .catch(error => console.error('Error deleting item:', error));
}

fetchItems();
