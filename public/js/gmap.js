function initialize() {

    var mapProp = {
        center: new google.maps.LatLng(24.1504536, 120.6820641),
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("gmap"), mapProp);


    var myCenter = new google.maps.LatLng(24.1504536, 120.6820641);
    var marker = new google.maps.Marker({
        position: myCenter,
        animation: google.maps.Animation.DROP,
        // animation: google.maps.Animation.BOUNCE,
    });

    marker.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);
