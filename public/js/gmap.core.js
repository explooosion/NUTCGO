/* google map api core , do not edit */
var map;
var markers = []; // save all marker
var polygons = []; // save all polygon
var polygontmparr = []; // draw polygon tmp result

google
    .maps
    .event
    .addDomListener(window, 'load', initialize);

function initialize() {
    initMap();
}

function initMap() {
    var defaultMarker = {
        lat: 24.1504536,
        lng: 120.6820641
    };

    map = new google
        .maps
        .Map(document.getElementById('gmap'), {
            zoom: 17,
            center: defaultMarker,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDoubleClickZoom: true
        });

}

function addPolygon(location) {
    var polygon = new google
        .maps
        .Polygon({
            path: location,
            strokeColor: '#5CFF82',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#5CFF82',
            fillOpacity: 0.4,
            map: map
        });

    polygons.push(polygon);
}

function addMarker(location, name) {

    if (name == undefined) {
        name = '';
    }
    name = name + '';

    var marker = new google
        .maps
        .Marker({ position: location, map: map });
    markers.push(marker);

    var infowindow = new google
        .maps
        .InfoWindow({ content: name });

    // info window
    if (name != '') {
        console.log(name);
        infowindow.open(map, marker);
    }

    // click event
    google
        .maps
        .event
        .addListener(marker, 'click', function () {
            console.log('marker');
            // info window
            if (name != '') {
                console.log(name);
                infowindow.open(map, marker);
            }
        });

    // dbclick event
    google
        .maps
        .event
        .addListener(marker, 'dblclick', function () {
            console.log('marker save!');
            $('#winPopMarkerID').text(name);
            MarkerSaveFavorite(name);
        });
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
    for (var i = 0; i < polygons.length; i++) {
        polygons[i].setMap(map);
    }
}

function clearMarkers() {
    setMapOnAll(null);
}

function showMarkers() {
    setMapOnAll(map);
}

function deleteMarkers() {
    clearMarkers();
    $('#txtMapValue').val('');
    markers = [];
    polygons = [];
}