var storage = [];


storage.UserData = null;

storage.Nav = {
    home: {
        id: 'home',
        name: '校園導覽',
    },
    map: {
        id: 'map',
        name: '地圖定位',
    },
    building: {
        id: 'building',
        name: '建物資訊'
    },
    art: {
        id: 'art',
        name: '藝術雕像'
    },
    admin: {
        id: 'admin',
        name: '行政單位'
    },
    traffic: {
        id: 'traffic',
        name: '交通規劃'
    },
    sport: {
        id: 'sport',
        name: '運動休憩'
    },
    account: {
        id: 'account',
        name: '會員中心'
    }
}




/**
 * degulg console.log(storage.nav.home.id);
 */


module.exports = storage;
