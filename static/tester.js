// Get element references
var map0 = document.getElementById('map0');
var map1 = document.getElementById('map1');


// Initialize LocationPicker plugin
var lp0 = new locationPicker(map0, {
    setCurrentPosition: true, // You can omit this, defaults to true
    lat: 47.499547506475835,
    lng: 19.05877926994122
}, {
    zoom: 6 // You can set any google map options here, zoom defaults to 15
});

var lp1 = new locationPicker(map1, {
    setCurrentPosition: true, // You can omit this, defaults to true
    lat: 47.499547506475835,
    lng: 19.05877926994122
}, {
    zoom: 6 // You can set any google map options here, zoom defaults to 15
});



function processForm(e) {
    if (e.preventDefault) e.preventDefault();

    // send the form manually
    var formData = new FormData(e.target);

    var map_location_0 = lp0.getMarkerPosition();
    var map_location_1 = lp1.getMarkerPosition();

    formData.append('lat0', map_location_0.lat.toFixed(4));
    formData.append('lng0', map_location_0.lng.toFixed(4));
    formData.append('lat1', map_location_1.lat.toFixed(4));
    formData.append('lng1', map_location_1.lng.toFixed(4));

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/test_data', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            // make the submit button green for a second
            document.getElementById('submit').style.backgroundColor = '#4CAF50';
            setTimeout(function () {
                document.getElementById('submit').style.backgroundColor = '#999';
            }, 1000);
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
