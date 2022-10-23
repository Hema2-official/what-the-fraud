// Get element references
var confirmBtn = document.getElementById('btnConfirmPosition');
var txtEmail = document.getElementById('txtEmail');
var txtPhone = document.getElementById('txtPhone');
var txtLocation = document.getElementById('txtLocation');
var txtZip = document.getElementById('txtZip');
var onIdlePositionView = document.getElementById('onIdlePositionView');
var map = document.getElementById('map');
var mapSelector = document.getElementById('mapSelector');
var userProfileSelector = document.getElementById('userProfileSelector');

// user profiles predefined
var userProfiles = [
    {
        name: 'user1',
        email: 'junctionx.what.the.fraud@gmail.com',
        phone: '+358 50 123 4567',
        location: [47.499547506475835, 19.05877926994122],
        zip: '1061'
    },
    {
        name: 'user2',
        email: 'temporary@email.lol',
        phone: '+880172924658',
        location: [28.18080812098503, -82.49314906164302],
        zip: '33558'
    }
];


// Initialize LocationPicker plugin
var lp = new locationPicker(map, {
    setCurrentPosition: true, // You can omit this, defaults to true
    lat: 47.499547506475835,
    lng: 19.05877926994122
}, {
    zoom: 6 // You can set any google map options here, zoom defaults to 15
});

var map_location = lp.getMarkerPosition();
var userProfile = 'user1';

confirmBtn.onclick = function () {
    // Get current location and show it in HTML
    map_location = lp.getMarkerPosition();
    txtLocation.value = map_location.lat.toFixed(4) + ',' + map_location.lng.toFixed(4);
    mapSelector.style.display = 'none';
};

function refreshUserProfile() {
    profile = userProfiles.find(function (profile) {
        return profile.name === userProfile;
    });
    txtEmail.value = profile.email;
    txtPhone.value = profile.phone;
    txtZip.value = profile.zip;
    txtLocation.value = profile.location[0].toFixed(4) + ',' + profile.location[1].toFixed(4);
}

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
    // add lat and lng to the form data
    formData.append('lat1', map_location.lat.toFixed(4));
    formData.append('lng1', map_location.lng.toFixed(4));
    formData.delete('location');
    formData.delete('email');
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/purchase', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            alert('Successful transaction!');
        } else {
            alert('Transaction failed!');
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