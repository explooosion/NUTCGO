var storage = [];


storage.UserData = null;

storage.Nav = {
    home: {
        id: 'home',
        name: '校園導覽',
        title: '歡迎使用本系統',
        msg: '對校園還不熟悉嗎？本系統提供校園各大景點以及便捷的地圖定位系統，讓您不在本校迷路。'
    },
    map: {
        id: 'map',
        name: '地圖定位',
    },
    building: {
        id: 'building',
        name: '建物資訊',
        title: '不熟悉學校大樓嗎?',
        msg: '來到學校一定要熟悉環境，滑過圖片來增加對校園的知識吧！'
    },
    art: {
        id: 'art',
        name: '藝術雕像',
        title: '藝術無所不在',
        msg: '本校有許多典雅的園藝與雕塑，輕點圖片來欣賞一番吧！'
    },
    admin: {
        id: 'admin',
        name: '行政單位',
        title: '找不到辦公室嗎？',
        msg: '對於校區的行政單位往往與我們密不可分，輕點圖片放大檢視吧！'
    },
    traffic: {
        id: 'traffic',
        name: '交通規劃',
        title: '如何到學校呢？',
        msg: '到本校地理位置相當便捷，公車班次滿滿唷！'
    },
    sport: {
        id: 'sport',
        name: '運動休憩',
        title: '想打球嗎？',
        msg: '青春熱血的你，熟悉場地是一定要的！'
    },
}




/**
 * degulg console.log(storage.nav.home.id);
 */


module.exports = storage;
