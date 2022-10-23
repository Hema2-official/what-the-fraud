// Initialize socket.io
const socket = io();

socket.on('attempts', (data) => {
    console.log(data);
    Alpine.store('attempts', data);
});


// Get element references
var map = document.getElementById('map');
var userProfileSelector = document.getElementById('userProfileSelector');


// // Initialize LocationPicker plugin
// var lp = new locationPicker(map, {
//     setCurrentPosition: true, // You can omit this, defaults to true
//     lat: 47.499547506475835,
//     lng: 19.05877926994122
// }, {
//     zoom: 6 // You can set any google map options here, zoom defaults to 15
// });

// var map_location = lp.getMarkerPosition();
var userProfile = 'user1';


// function refreshUserProfile() {
//     profile = userProfiles.find(function (profile) {
//         return profile.name === userProfile;
//     });
//     txtEmail.value = profile.email;
//     txtPhone.value = profile.phone;
//     txtZip.value = profile.zip;
//     txtLocation.value = profile.location[0].toFixed(4) + ',' + profile.location[1].toFixed(4);
// }

// event listener for profile selector dropdown
userProfileSelector.addEventListener('change', function (e) {
    userProfile = e.target.value;
    refreshUserProfile();
    console.log('Profile changed to ' + userProfile);
});

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