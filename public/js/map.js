$(window).on('resize', async function () {
    console.log(window.location.pathname);
    if (window.location.pathname == '/map') {
        $("#wrapper").removeClass("toggled");
        $('.header').removeClass('header-toggled');
    }

}).trigger('load')

MarkerList();
PolygonListSearch();
//MarkerFavoriteList();