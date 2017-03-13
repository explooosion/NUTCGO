var map;
var markers = [];
var dialog;
google
    .maps
    .event
    .addDomListener(window, 'load', initialize);

$('.chosen-select').chosen();

$(function () {

    dialogMarkerAdd = $("#dialogMarkerAdd").dialog({
        autoOpen: false,
        height: 300,
        width: 350,
        position: {
            my: 'center',
            at: 'top+350'
        },
        //modal: true, //至頂
        buttons: {
            "儲存": MarkerSave,
            "取消": function () {
                dialogMarkerAdd.dialog("close");
            }
        }
    });

    dialogMarkerList = $("#dialogMarkerList").dialog({
        autoOpen: false,
        height: 500,
        width: 550,
        position: {
            my: 'center',
            at: 'top+300'
        }
    });

    dialogMarkerTree = $("#dialogMarkerTree").dialog({
        autoOpen: false,
        height: 520,
        width: 280,
        position: {
            my: 'center-550',
            at: 'top+420'
        },
        show: {
            effect: "drop",
            duration: 300
        },
        hide: {
            effect: "drop",
            duration: 300
        }
    });

    var markertree = [{
        "text": "建築物",
        "state": {
            "opened": true
        },
        "children": [{
            "text": "資訊大樓"
        }, {
            "text": "中正大樓"
        }, {
            "text": "昌明樓"
        }, {
            "text": "翰英樓"
        }, {
            "text": "弘業樓"
        }, {
            "text": "中商大樓"
        }]
    }, {
        "text": "運動場所",
        "state": {
            "opened": false
        },
        "children": [{
            "text": "操場"
        }, {
            "text": "籃球場"
        }, {
            "text": "網球場"
        }, {
            "text": "排球場"
        }, {
            "text": "壘球場"
        }, {
            "text": "活動中心"
        }]
    }, {
        "text": "其他",
        "state": {
            "opened": false
        },
        "children": [{
            "text": "停車場"
        }, {
            "text": "警衛室"
        }, {
            "text": "資源回收場"
        }]
    }];

    $('#jstree_demo_div').jstree({
        core: {
            data: markertree,
            check_callback: false
        },
        checkbox: {
            three_state: true, // 整個樹狀自動選取
            whole_node: true, // 點選文字即可勾選
            tie_selection: false // 藍框?
        },
        plugins: ['checkbox', 'themes']
    });

    $('#btnMarkerAdd').click(function () {
        dialogMarkerAdd.dialog("open");
    });

    $('#btnMarkerList').click(function () {
        //MarkerList();
        dialogMarkerList.dialog("open");
    });

    $('#btnMarkerTree').click(function () {
        let diaMkTree = dialogMarkerTree.dialog("isOpen");
        if (diaMkTree) {
            dialogMarkerTree.dialog("close");
        } else {
            dialogMarkerTree.dialog("open");
        }
    });

    $('#btnMarkerDraw').click(function () {

        $('#frmMarkerAdd')[0].reset();
        deleteMarkers();
        dialogMarkerAdd.dialog("close");

        map.addListener('click', function (event) {

            addMarker(event.latLng);
            $('#txtMarkerLat').val(event.latLng.lat());
            $('#txtMarkerLng').val(event.latLng.lng());

            dialogMarkerAdd.dialog("open");
            // remove listener
            google
                .maps
                .event
                .clearListeners(map, 'click');
        });
    });

    $('#txtMapValue').keyup(function (e) {
        if (e.keyCode == 13) {
            MarkerKeySearch();
        }
    });

});

function MarkerList() {

    // default table title
    $('#tbMarkerList tr:nth-child(n+2)').remove();

    $.ajax({
        url: 'http://210.242.86.107/api/maplist/',
        type: 'GET',
        error: function (xhr) {
            console.log('ajax-error');
            console.log(xhr);
            alert('ajax發生錯誤');
        },
        success: function (response) {
            console.log('ajax-ok');

            for (var i in response) {
                $('#tbMarkerList').append('<tr><td>' + response[i].MarkerName + '</td><td>' + response[i].MarkerLat + '</td><td>' + response[i].MarkerLng + '</td><td><a href="javascript:MarkerKeySearch(' + response[i].MarkerName + ');"><i class="fa fa-map-marker fa-lg" aria-hidden="true"></i></a></td><td><a hre' +
                    'f="javascript:MarkerDelete(' + response[i].id + ');"><i class="fa fa-trash fa-lg" aria-hidden="true"></i></a></td></tr>');

            }
        }
    });

}

function MarkerListSearch() {

    // default table title
    $('#tbMarkerList tr:nth-child(n+2)').remove();

    $.ajax({
        url: 'http://210.242.86.107/api/maplist/',
        type: 'GET',
        error: function (xhr) {
            console.log('ajax-error');
            console.log(xhr);
            alert('ajax發生錯誤');
        },
        success: function (response) {
            console.log('ajax-ok');

            for (var i in response) {
                $('#tbMarkerList').append('<tr><td>' + response[i].MarkerName + '</td><td>' + response[i].MarkerLat + '</td><td>' + response[i].MarkerLng + '</td><td><a href="javascript:MarkerKeySearch(' + response[i].MarkerName + ');"><i class="fa fa-map-marker fa-lg" aria-hidden="true"></i></a></td><td><a hre' +
                    'f="javascript:MarkerDelete(' + response[i].id + ');"><i class="fa fa-trash fa-lg" aria-hidden="true"></i></a></td></tr>');

            }
        }
    });

}

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
        url: 'http://210.242.86.107/api/map/' + name,
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
                        url: 'http://210.242.86.107/api/mapadd/',
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
                            dialogMarkerAdd.dialog("close");
                        }
                    });
                } // end if

            } // end if

        }
    });
}

function MarkerKeySearch(value) {
    let key = value;
    if (typeof (key) == "undefined") {
        key = $('#txtMapValue').val();
    }

    if (key == '') {
        alert('請確認輸入之關鍵字');
        return;
    }
    $.ajax({
        url: 'http://210.242.86.107/api/map/' + key,
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
            map.panTo(marker);
        }
    });
}

function MarkerDelete(id) {
    if (typeof (id) == "undefined") {
        alert('查無此筆');
        return;
    }

    let comfirm = confirm("確定是否刪除?");
    if (!comfirm) {
        return;
    }
    $.ajax({
        url: 'http://210.242.86.107/api/mapdel/',
        type: 'POST',
        data: {
            'id': id
        },
        error: function (xhr) {
            console.log('ajax-error');
            console.log(xhr);
            alert('ajax發生錯誤');
        },
        success: function (response) {
            console.log('ajax-ok');
            console.log(response);
            alert('點位已經刪除');
            MarkerList();
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

    map = new google
        .maps
        .Map(document.getElementById('gmap'), {
            zoom: 17,
            center: defaultMarker,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

}

function addMarker(location) {
    var marker = new google
        .maps
        .Marker({
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