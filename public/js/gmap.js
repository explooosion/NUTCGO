var map;
var markers = []; // save all marker
var polygons = []; // save all polygon
var polygontmparr = []; // draw polygon tmp result
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
            my: 'center-200',
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

    dialogPolygonAdd = $("#dialogPolygonAdd").dialog({
        autoOpen: false,
        height: 400,
        width: 400,
        position: {
            my: 'center-200',
            at: 'top+350'
        },
        //modal: true, //至頂
        buttons: {
            "儲存": PolygonSave,
            "取消": function () {
                dialogPolygonAdd.dialog("close");
            }
        }
    });

    dialogMarkerList = $("#dialogMarkerList").dialog({
        autoOpen: false,
        height: 500,
        width: 550,
        position: {
            my: 'center-350',
            at: 'top+300'
        }
    });

    dialogPolygonList = $("#dialogPolygonList").dialog({
        autoOpen: false,
        height: 500,
        width: 550,
        position: {
            my: 'center-350',
            at: 'top+300'
        }
    });

    dialogMarkerFavorite = $("#dialogMarkerFavorite").dialog({
        autoOpen: false,
        height: 500,
        width: 550,
        position: {
            my: 'center-350',
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

    var markertree = [
        {
            "text": "建築物",
            "id": "01",
            "state": {
                "opened": true
            },
            "children": [
                {
                    "text": "中正大樓"
                }, {
                    "text": "中商大樓"
                }, {
                    "text": "中技大樓"
                }, {
                    "text": "行政大樓"
                }, {
                    "text": "資訊大樓"
                }, {
                    "text": "弘業樓"
                }, {
                    "text": "奇秀樓"
                }, {
                    "text": "昌明樓"
                }, {
                    "text": "翰英樓"
                }, {
                    "text": "學生活動中心"
                }, {
                    "text": "體育館"
                }, {
                    "text": "男生宿舍"
                }, {
                    "text": "女生宿舍"
                }
            ]

        }, {
            "text": "運動場所",
            "id": "02",
            "state": {
                "opened": false
            },
            "children": [
                {
                    "text": "操場"
                }, {
                    "text": "籃球場"
                }, {
                    "text": "網球場"
                }, {
                    "text": "排球場"
                }, {
                    "text": "壘球場"
                }
            ]
        }, {
            "text": "其他",
            "id": "03",
            "state": {
                "opened": false
            },
            "children": [
                {
                    "text": "停車場"
                }, {
                    "text": "警衛室"
                }, {
                    "text": "資源回收場"
                }
            ]
        }
    ];

    $('#jstree_demo_div').jstree({
        core: {
            data: markertree,
            check_callback: true
        },
        checkbox: {
            three_state: false, // 整個樹狀自動選取
            whole_node: true, // 點選文字即可勾選
            tie_selection: false // 藍框?
        },
            plugins: ['checkbox', 'themes']
    })
        .on("check_node.jstree uncheck_node.jstree", function (e, data) {

            if (data.node.id.substring(0, 1) == 0) {
                return false;
            }

            if (data.node.state.checked) {
                console.log(data.node.id, data.node.text);
                PolygonKeySearch(data.node.text);
            } else {
                // 暫時全部清除
                clearMarkers();
            }

        });

    $('#btnMarkerAdd').click(function () {
        $('#frmMarkerAdd')[0].reset();
        dialogMarkerAdd.dialog("open");
    });

    $('#btnPolygonAdd').click(function () {
        $('#ulPolygon li').remove();
        $('#frmPolygonAdd')[0].reset();
        dialogPolygonAdd.dialog("open");
    });

    $('#btnPolygonList').click(function () {
        PolygonList();
        dialogPolygonList.dialog("open");
    });

    $('#btnMarkerList').click(function () {
        MarkerList();
        dialogMarkerList.dialog("open");
    });

    $('#btnMarkerFavorite').click(function () {
        MarkerFavoriteList();
        dialogMarkerFavorite.dialog("open");
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

        map.setOptions({draggableCursor: 'crosshair', draggingCursor: 'crosshair'});

        $('#frmMarkerAdd')[0].reset();
        deleteMarkers();
        dialogMarkerAdd.dialog("close");

        map.addListener('click', function (event) {

            map.setOptions({draggableCursor: 'openhand', draggingCursor: 'openhand'});
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

    $('#btnPolygonDraw').click(function () {

        var tmppoly = [];
        var tmpmk = [];

        $('#ulPolygon li').remove();
        deleteMarkers();
        dialogPolygonAdd.dialog("close");

        map.setOptions({draggableCursor: 'crosshair', draggingCursor: 'crosshair'});

        map.addListener('click', function (event) {

            addMarker(event.latLng);

            var tp = new google
                .maps
                .LatLng(event.latLng.lat(), event.latLng.lng());

            tmppoly.push(tp);

        });

        map.addListener('rightclick', function (event) {

            map.setOptions({draggableCursor: 'openhand', draggingCursor: 'openhand'});
            deleteMarkers(); // remove template
            addPolygon(tmppoly);

            polygontmparr = tmppoly; // save draw result

            for (let i in tmppoly) {
                $('#ulPolygon').append('<li>Lat：' + tmppoly[i].lat() + '<br />Lng：' + tmppoly[i].lng() + '</li>');
            }

            dialogPolygonAdd.dialog("open");

            // remove listener
            google
                .maps
                .event
                .clearListeners(map, 'click');
            google
                .maps
                .event
                .clearListeners(map, 'rightclick');
        });
    });

    $('#txtMapValue').keyup(function (e) {
        if (e.keyCode == 13) {
            MarkerKeySearch();
        }
    });

});

// 點位-清單列表
function MarkerList() {

    // default table title
    $('#tbMarkerList tr:nth-child(n+2)').remove();

    $.ajax({
        url: 'http://210.242.86.107/api/maplist/',
        type: 'GET',
        error: function (xhr) {
            console.log('ajax-error');
            console.log(xhr);
            //
            console.log('ajax error');
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

// 點位-清單列表(過濾)
function MarkerListSearch() {

    let ddlid = $('#ddlMarkerPlace').val();
    if (ddlid == 0) {
        MarkerList(); // Select All
        return;
    }

    // default table title
    $('#tbMarkerList tr:nth-child(n+2)').remove();

    $.ajax({
        url: 'http://210.242.86.107/api/maplist/',
        type: 'POST',
        data: {
            'id': ddlid
        },
        error: function (xhr) {
            console.log('ajax-error');
            console.log(xhr);
            //
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

// 點位-單一定位
function MarkerKeySearch(value) {
    let key = value;
    if (typeof(key) == "undefined") {
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
            addMarker(marker, key);
            map.panTo(marker);
        }
    });
}

// 點位-指定刪除
function MarkerDelete(id) {
    if (typeof(id) == "undefined") {
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

        },
        success: function (response) {
            console.log('ajax-ok');
            console.log(response);
            alert('點位已經刪除');
            MarkerList();
        }
    });

}

// 點位-新增存檔
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

// 曲面-清單列表
function PolygonList() {
    // default table title
    $('#tbPolygonList tr:nth-child(n+2)').remove();
    $.ajax({
        url: 'http://210.242.86.107/api/polygonlist/',
        type: 'GET',
        error: function (xhr) {
            console.log('ajax-error');
            console.log(xhr);
        },
        success: function (response) {
            console.log('ajax-ok');
            console.log(response);
            for (var i in response) {
                $('#tbPolygonList').append('<tr><td>' + response[i].PolygonGroup + '</td><td>' + response[i].PolygonName + '</td><td><a href="javascript:PolygonKeySearch(' + response[i].id + ');"><i class="fa fa-map-marker fa-lg" aria-hidden="true"></i></a></td><td><a hre' +
                        'f="javascript:PolygonDelete(' + response[i].id + ');"><i class="fa fa-trash fa-lg" aria-hidden="true"></i></a></td></tr>');
            }
        }
    });
}

// 曲面-清單列表(過濾)
function PolygonListSearch() {

    let ddlGrp = $('#ddlPolygonPlace').val();
    if (ddlGrp == '') {
        PolygonList(); // Select All
        return;
    }

    $('#tbPolygonList tr:nth-child(n+2)').remove();

    $.ajax({
        url: 'http://210.242.86.107/api/polygonlist/',
        type: 'POST',
        data: {
            'group': ddlGrp
        },
        error: function (xhr) {
            console.log('ajax-error');
            console.log(xhr);
        },
        success: function (response) {
            console.log('ajax-ok');
            console.log(response);
            for (var i in response) {
                $('#tbPolygonList').append('<tr><td>' + response[i].PolygonGroup + '</td><td>' + response[i].PolygonName + '</td><td><a href="javascript:PolygonKeySearch(' + response[i].id + ');"><i class="fa fa-map-marker fa-lg" aria-hidden="true"></i></a></td><td><a hre' +
                        'f="javascript:PolygonDelete(' + response[i].id + ');"><i class="fa fa-trash fa-lg" aria-hidden="true"></i></a></td></tr>');
            }
        }
    });
}

// 曲面-單一定位
function PolygonKeySearch(value) {
    console.log(value);
    $.ajax({
        url: 'http://210.242.86.107/api/polygonpoint/' + value,
        type: 'GET',
        error: function (xhr) {
            console.log('ajax-error');
            console.log(xhr);

        },
        success: function (response) {
            console.log('ajax-ok');
            console.log(response);

            // var p = 'LINESTRING (24.14991574823603 120.68296909332275, 24.149524154520151
            // 120.68275451660156, 24.14930877746491 120.68321585655212, 24.149803165165615
            // 120.68343311548233)';

            for (var i in response) {
                var p = response[i].PolygonPoint;
                var parr = p
                    .replace('LINESTRING (', '')
                    .replace(')', '')
                    .split(',');
                var polyList = [];
                for (var i in parr) {
                    var po = new google
                        .maps
                        .LatLng(parr[i].trim().split(' ')[0], parr[i].trim().split(' ')[1]);

                    polyList.push(po);
                }
                addPolygon(polyList);
            }
            map.panTo(polyList[0]);
        }
    });
}

// 曲面-新增存檔
function PolygonSave() {

    let ddlgroup = $('#ddlPolygonPlaceAdd').val();
    if (ddlgroup == '') {
        alert('請選擇群組');
        return;
    }

    let name = $('#txtPolygonName').val();
    let poly = [];

    if (name == '' || polygontmparr.length == 0) {
        alert('請確認欄位是否完整');
        return;
    }

    for (let i in polygontmparr) {
        let obj = new Object();
        obj.lat = polygontmparr[i].lat();
        obj.lng = polygontmparr[i].lng();
        poly.push(obj);
    }

    let comfirm = confirm("確定是否保存?");

    if (comfirm == true) {
        $.ajax({
            url: 'http://210.242.86.107/api/polygonadd/',
            type: 'POST',
            data: {
                'name': name,
                'polygon': poly,
                'group': ddlgroup
            },
            error: function (xhr) {
                console.log('ajax-error');
                console.log(xhr);

            },
            success: function (response) {
                console.log('ajax-ok');
                console.log(response);
                alert('曲面新增成功');
                dialogPolygonAdd.dialog("close");
                PolygonList(); // rebind data
            }
        });
    } // end if
}

// 曲面-刪除指定
function PolygonDelete(id) {

    if (typeof(id) == "undefined") {
        alert('查無此筆');
        return;
    }

    let comfirm = confirm("確定是否刪除?");
    if (!comfirm) {
        return;
    }
    $.ajax({
        url: 'http://210.242.86.107/api/polygondel/',
        type: 'POST',
        data: {
            'id': id
        },
        error: function (xhr) {
            console.log('ajax-error');
            console.log(xhr);

        },
        success: function (response) {
            console.log('ajax-ok');
            console.log(response);
            alert('點位已經刪除');
            PolygonList();
        }
    });
}

// 點位-我的最愛清單列表
function MarkerFavoriteList() {

    let isLogin = JSON.parse(GetCookie('account'));
    if (!isLogin) {
        alert('請先登入!');
        Login();
        dialogMarkerFavorite.dialog("close");
        return;
    }

    let ddlid = $('#ddlMarkerFavoritePlace').val();

    // default table title
    $('#tbMarkerFavoriteList tr:nth-child(n+2)').remove();

    $.ajax({
        url: 'http://210.242.86.107/api/mapfavorite/',
        type: 'POST',
        data: {
            'UserID': isLogin["UserID"],
            'id': ddlid
        },
        error: function (xhr) {
            console.log('ajax-error');
            console.log(xhr);
        },
        success: function (response) {
            console.log('ajax-ok');

            for (var i in response) {
                $('#tbMarkerFavoriteList').append('<tr><td>' + response[i].MarkerName + '</td><td>' + response[i].MarkerLat + '</td><td>' + response[i].MarkerLng + '</td><td><a href="javascript:MarkerKeySearch(' + response[i].MarkerName + ');"><i class="fa fa-map-marker fa-lg" aria-hidden="true"></i></a></td><td><a hre' +
                        'f="javascript:MarkerFavoriteDelete(' + response[i].id + ');"><i class="fa fa-trash fa-lg" aria-hidden="true"></i></a></td></tr>');

            }
        }
    });
}

// 點位-我的最愛指定刪除
function MarkerFavoriteDelete(id) {
    if (typeof(id) == "undefined") {
        alert('查無此筆');
        return;
    }

    let comfirm = confirm("確定是否刪除?");
    if (!comfirm) {
        return;
    }
    $.ajax({
        url: 'http://210.242.86.107/api/mapfavoritedel/',
        type: 'POST',
        data: {
            'id': id
        },
        error: function (xhr) {
            console.log('ajax-error');
            console.log(xhr);
        },
        success: function (response) {
            console.log('ajax-ok');
            console.log(response);
            alert('點位已經刪除');
            MarkerFavoriteList();
        }
    });

}

// 點位-我的最愛儲存
function MarkerSaveFavorite(name) {

    let isLogin = JSON.parse(GetCookie('account'));
    if (!isLogin) {
        alert('請先登入!');
        Login();
    } else {

        $.ajax({
            url: 'http://210.242.86.107/api/mapfavoriteadd/',
            type: 'POST',
            data: {
                'UserID': isLogin["UserID"],
                'MarkerName': name
            },
            error: function (xhr) {
                console.log('ajax-error');
                console.log(xhr);
            },
            success: function (response) {
                console.log('ajax-ok');
                console.log(response);
                if (response) {
                    $('.winPop').animate({'top': 0, 'opacity': 1});

                    MarkerFavoriteList();
                    setTimeout(WinPopClose, 2000);
                } else {
                    alert('我的最愛已有!');
                }

            }
        });

    }

}

function WinPopClose() {
    $('.winPop').animate({'top': '-40px', 'opacity': 0});
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
        .Marker({position: location, map: map});
    markers.push(marker);

    var infowindow = new google
        .maps
        .InfoWindow({content: name});

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
    markers = [];
    polygons = [];
}
/**********/