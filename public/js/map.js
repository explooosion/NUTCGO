
//$('.chosen-select').chosen();

$(window).on('resize', function () {

    $("#wrapper").removeClass("toggled");
    $('.header').removeClass('header-toggled');
    //initMap();

}).trigger('load')


$(window).ready(function () {

    MarkerList();

    $('.layer-control').click(function () {

        layerHandler($(this).hasClass('layer-control-toggle'), $(this));

    });

    if ($(window).width() <= 768) {
        layerHandler(false, $('.layer-control'));
    }
});


function layerHandler(e, obj) {


    if (!e) {
        console.log(e);
        obj.toggleClass('layer-control-toggle').animate({ left: 10 })
            .children().removeClass('icon-triangle-left').addClass('icon-triangle-right');

        $('.layer').toggleClass('layer-toggle').animate({
            overflow: 'hidden',
            padding: 0,
            width: 0,
            height: 0
        });
    } else {
        console.log(e);
        obj.toggleClass('layer-control-toggle').animate({ left: 253 })
            .children().removeClass('icon-triangle-right').addClass('icon-triangle-left');

        if ($(window).width() <= 768) {
            $('.layer').toggleClass('layer-toggle').animate({
                overflow: 'hidden',
                padding: '0 0 0 20px',
                width: 230,
                height: '120px'
            });
        } else {
            $('.layer').toggleClass('layer-toggle').animate({
                overflow: 'hidden',
                padding: '20px 0 20px 20px',
                width: 250,
                height: '50%'
            });
        }

    }
}

