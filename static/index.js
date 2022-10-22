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
        phone: '+880172624658',
        location: [28.18080812098503, -82.49314906164302],

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