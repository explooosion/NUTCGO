$('.traffic-title').click(function () {
    var _tracon = $(this).next();
    var _tracon_h = $(this).next().height();

    if (_tracon_h > 0) {
        $(_tracon).animate({
            height: 0
        });
    } else {
        $(_tracon).animate({
            height: '100%'
        });
    }

});