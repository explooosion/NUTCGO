var map;
var markers = [];

google.maps.event.addDomListener(window, 'load', initialize);

function initialize() {
    initMap();
}

function findMarker() {

    var txtMapValue = document.getElementById('txtMapValue').value;
    var marker = null;

    switch (txtMapValue) {
        case ('1'):
            marker = {
                lat: 24.1501536,
                lng: 120.6840641
            };
            break;
        case ('2'):
            marker = {
                lat: 24.1502536,
                lng: 120.6860641
            };
            break;
    }

    addMarker(marker);
}

function doorMarker() {
    var marker = {
        lat: 24.1501536,
        lng: 120.6840641
    };
    addMarker(marker);
}

function initMap() {
    var defaultMarker = {
        lat: 24.1504536,
        lng: 120.6820641
    };

    map = new google.maps.Map(document.getElementById('gmap'), {
        zoom: 17,
        center: defaultMarker,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // This event listener will call addMarker() when the map is clicked.
    //map.addListener('click', function (event) {
    //    addMarker(event.latLng);
    //});

    // Adds a marker at the center of the map.
    addMarker(defaultMarker);
}

// Adds a marker to the map and push to the array.
function addMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}