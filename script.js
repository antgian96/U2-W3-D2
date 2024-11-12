document.addEventListener('DOMContentLoaded', function() {
    const key = 'notepad-memory';
    let contacts = JSON.parse(localStorage.getItem(key)) || [];

    const saveButton = document.getElementById('save');
    const resetButton = document.getElementById('reset');
    const loadButton = document.getElementById('load');

    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const phoneInput = document.getElementById('phone');

    const saveAlert = document.getElementById('saveAlert');
    const resetAlert = document.getElementById('resetAlert');
    const loadAlert = document.getElementById('loadAlert');
    const noDataAlert = document.getElementById('noDataAlert');
    const cardsRow = document.getElementById('cards-container');

    function showAlert(alertElement) {
        alertElement.classList.remove('d-none');
        setTimeout(() => {
            alertElement.classList.add('d-none');
        }, 2000);
    }

    function renderContacts() {
        cardsRow.innerHTML = ''; // Pulisce il contenitore delle cards
        contacts.forEach((utente) => {
            const newCol = document.createElement('div');
            newCol.classList.add('col', 'col-12', 'col-md-4');
            newCol.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${utente.firstName} ${utente.lastName}</h5>
                        <p class="card-text">Numero di telefono: ${utente.phone}</p>
                    </div>
                </div>`;
            cardsRow.appendChild(newCol);
        });
    }

    // Renderizza i contatti salvati al caricamento della pagina
    renderContacts();

    if (saveButton && resetButton && loadButton && firstNameInput && lastNameInput && phoneInput) {
        saveButton.addEventListener('click', function() {
            const utente = {
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                phone: phoneInput.value
            };
            contacts.push(utente); // Aggiunge l'utente alla lista dei contatti
            localStorage.setItem(key, JSON.stringify(contacts)); // Salva tutti i contatti
            renderContacts(); // Aggiorna la visualizzazione
            showAlert(saveAlert);
        });

        loadButton.addEventListener('click', function() {
            const savedContent = localStorage.getItem(key);
            if (!savedContent) {
                showAlert(noDataAlert);
            } else {
                contacts = JSON.parse(savedContent);
                if (contacts.length > 0) {
                    const lastContact = contacts[contacts.length - 1];
                    firstNameInput.value = lastContact.firstName;
                    lastNameInput.value = lastContact.lastName;
                    phoneInput.value = lastContact.phone;
                    showAlert(loadAlert);
                }
                renderContacts();
            }
        });

        resetButton.addEventListener('click', function() {
            firstNameInput.value = '';
            lastNameInput.value = '';
            phoneInput.value = '';
            localStorage.removeItem(key);
            contacts = []; // Reset della lista dei contatti
            renderContacts(); // Cancella tutte le cards
            showAlert(resetAlert);
        });
    } else {
        console.error("Uno o più elementi non sono stati trovati nel DOM.");
    }
});

document.addEventListener('DOMContentLoaded', function() {
    let secondsElapsed = sessionStorage.getItem('counter') ? parseInt(sessionStorage.getItem('counter')) : 0;
    const timerDisplay = document.getElementById('timer');
    
    function updateCounter() {
        secondsElapsed++;
        timerDisplay.textContent = secondsElapsed;
        sessionStorage.setItem('counter', secondsElapsed);
    }

    setInterval(updateCounter, 1000);
});
