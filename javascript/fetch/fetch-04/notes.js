
const noteForm = document.getElementById('note-form');
const noteList = document.getElementById('note-list');
const noteInput = document.getElementById('note-input');

const updateNoteModal = new bootstrap.Modal(document.getElementById('updateNoteModal'));
const updateNoteForm = document.getElementById('update-note-form');
const updateNoteInput = document.getElementById('update-note-input');
let notes = [];
let currentNoteId = null;
document.addEventListener('DOMContentLoaded', () => {

    //fetch to get notes from backend api
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            notes = data;
            notes.forEach(note => {
                addNoteToDOM(note);
            })
        })
        .catch(error => {
            console.error('Error:', error);
        });


    updateNoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const updatedNoteText = updateNoteInput.value.trim();
        if (updatedNoteText !== '' && currentNoteId !== null) {
            updateNoteFromApi(currentNoteId, updatedNoteText);
        }
    })

    noteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newNote = noteInput.value.trim();
        if (newNote !== '') {
            addNoteFromApi(newNote);
            noteInput.value = '';
        }
    });
});

function addNoteFromApi(noteText) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: noteText,
            body: '',
            userId: 1
        })
    })
        .then(response => response.json())
        .then(newNote => {
            notes.push(newNote);
            addNoteToDOM(newNote);
        })
}
function addNoteToDOM(note) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.textContent = note.title

    const buttonGroup = document.createElement('div');

    const updateButton = document.createElement('button');
    updateButton.className = 'btn btn-secondary btn-sm mr-2';
    updateButton.textContent = 'Update';
    updateButton.addEventListener('click', () => {
        currentNoteId = note.id;
        updateNoteInput.value = note.title;
        updateNoteModal.show();
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        deleteNoteFromApi(note.id, li);  //bir modal aç ve emin misiniz de, evet deyince bu methoda gönder.
    });

    buttonGroup.appendChild(updateButton);
    buttonGroup.appendChild(deleteButton);

    li.appendChild(buttonGroup);
    noteList.appendChild(li);
}

function deleteNoteFromApi(noteId, noteElement) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${noteId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(() => {
            notes = notes.filter(note => note.id !== noteId);
            noteElement.remove();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function updateNoteFromApi(noteId, noteText) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${noteId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: noteText,
            body: '',
            userId: 1
        })
    })
        .then(response => response.json())
        .then(updatedNote => {
            const note = notes.find(note => note.id === noteId);
            const noteIndex = notes.findIndex(note => note.id === noteId);
            const oldNote = note.title;
            if (noteIndex !== -1) {
                notes[noteIndex].title = noteText;
                updateNoteInDOM(oldNote, updatedNote);
                updateNoteModal.hide();
            }
        });
}

function updateNoteInDOM(oldNote, updatedNote) {
    const noteElements = noteList.getElementsByTagName('li');
    for (let noteElement of noteElements) {
        if (noteElement.textContent.includes(oldNote)) {
            noteElement.firstChild.textContent = updatedNote.title;
        }
    }
}