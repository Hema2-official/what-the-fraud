// Initialize socket.io
const socket = io();

attempts = [];

socket.on('attempts', (data) => {
    console.log(data);
    attempts = data;
    renderAllAttempts();
});

function renderAllAttempts() {
    attempts.forEach((attempt) => {
        renderAttempt(attempt);
    });
}

function renderAttempt(attempt) {
    const attemptsContainer = document.getElementById('attempts');
    const attemptDiv = document.createElement('div');
    attemptDiv.className = 'attempt';
    attemptDiv.innerHTML = `
        <h2 class="attempt__name">${attempt[0]}</h2>
        <h3 class="attempt__email">Near ${attempt[1]}</h3>
        <h3 class="attempt__phone">${attempt[2] == 0 ? 'Successful transaction' : 'Interrupted activity'}</h3>
        `
    attemptsContainer.appendChild(attemptDiv);
}




function showMapSelector(e) {
    e.preventDefault();
    mapSelector.style.display = 'block';
}

function processForm(e) {
    if (e.preventDefault) e.preventDefault();

    // send the form manually
    var formData = new FormData(e.target);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/purchase', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            alert('');
        } else {
            alert('There was a problem with the request.');
        }
    };
    xhr.send(formData);

    // You must return false to prevent the default form behavior
    return false;
}

var form = document.getElementById('fakery');
if (form.attachEvent) {
    form.attachEvent("submit", processForm);
} else {
    form.addEventListener("submit", processForm);
}

refreshUserProfile();