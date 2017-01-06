var map;
var markers = [];
var dialog;
google.maps.event.addDomListener(window, 'load', initialize);

$(function () {

    dialog = $("#dialogMarker").dialog({
        autoOpen: false,
        height: 360,
        width: 350,
        position: { my: 'center-500', at: 'top+350' },
        //modal: true, //至頂
        buttons: {
            "儲存": MarkerSave,
            "取消": function () {
                dialog.dialog("close");
            },
        }
    });

    $('#btnMarkerAdd').click(function () {
        dialog.dialog("open");
    });

    $('#btnMarkerDraw').click(function () {

        $('#frmMarkerAdd')[0].reset();
        deleteMarkers();

        map.addListener('click', function (event) {

            addMarker(event.latLng);
            $('#txtMarkerLat').val(event.latLng.lat());
            $('#txtMarkerLng').val(event.latLng.lng());

            // remove listener
            google.maps.event.clearListeners(map, 'click');
        });
    });

});


function MarkerSave() {

    let name = $('#txtMarkerName').val();
    let lat = $('#txtMarkerLat').val();
    let lng = $('#txtMarkerLng').val();

    if (name == '' || lat == '' || lng == '') {
        alert('請確認欄位是否完整');
        return;
    }

    let comfirm = confirm("確定是否保存?");

    $.ajax({
        url: 'http://localhost/api/map/' + name,
        type: 'GET',
        error: function (xhr) {
            console.log('ajax-error');
            console.log(xhr);
            alert('ajax發生錯誤');
        },
        success: function (response) {
            console.log('ajax-ok');
            console.log(response);

            if (response != '') {
                alert('點位已存在');
            } else {

                if (comfirm == true) {
                    $.ajax({
                        url: 'http://localhost/api/mapadd/',
                        type: 'POST',
                        data: {
                            'name': name,
                            'lat': lat,
                            'lng': lng
                        },
                        error: function (xhr) {
                            console.log('ajax-error');
                            console.log(xhr);
                            alert('ajax發生錯誤');
                        },
                        success: function (response) {
                            console.log('ajax-ok');
                            console.log(response);
                            alert('點位新增成功');
                        }
                    });
                } // end if

            } // end if

        }
    });



}


function MarkerKeySearch() {

    let key = $('#txtMapValue').val();
    if (key == '') {
        alert('請確認輸入之關鍵字');
        return;
    }
    $.ajax({
        url: 'http://localhost/api/map/' + key,
        type: 'GET',
        error: function (xhr) {
            console.log('ajax-error');
            console.log(xhr);
            alert('ajax發生錯誤');
        },
        success: function (response) {
            console.log('ajax-ok');
            console.log(response);

            if (response == '') {
                alert('查無此點');
                return;
            }
            var marker = {
                lat: response.MarkerLat,
                lng: response.MarkerLng
            };
            addMarker(marker);
            
        }
    });
}



/* google map api , do not edit */
function initialize() {
    initMap();
}

function initMap() {
    var defaultMarker = {
        lat: 24.1504536,
        lng: 120.6820641
    };

    map = new google.maps.Map(document.getElementById('gmap'), {
        zoom: 18,
        center: defaultMarker,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

}

function addMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    markers.push(marker);
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
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
    markers = [];
}
/**********/