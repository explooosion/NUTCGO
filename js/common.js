$(window).ready(function () {

    initialize();

    // nav control color - close
    $('.navbar .control').hover(function () {
        $('.navbar .line').css('background', '#FFF');
    }, function () {
        $('.navbar .line').css('background', '#B1B3B6');
    }).click(function () {
        $('.container').animate({
            left: 0
        }, 100);
        $('.container .head').animate({
            'padding-right': 0
        });
        $('.navbar').animate({
            left: '-220px'
        }, 100, function () {
            $('.navbar').hide();
            $('.container .control').show();
        });
    });


    $('.container .control').click(function () {
        $('.container').animate({ left: 220 }, 100);
        $('.navbar').animate({ left: '0px' }, 100, function () {
            $('.navbar').show();
            $('.container .control').hide();
        });
    });

    // nav item color
    $('.nav-item').click(function () {
        $('.nav-item').removeClass('selected');
        $(this).addClass('selected');
    });

});

$(window).resize(function () {
    initialize();
});


function initialize() {
    let h = $(window).height();
    $('.navbar').height(h);
}