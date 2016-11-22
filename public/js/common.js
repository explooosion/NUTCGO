$(window).ready(function () {

    initialize();

    // nav control color - close
    $('.navbar .control').hover(function () {
        $('.navbar .line').css('background', '#FFF');
    }, function () {
        $('.navbar .line').css('background', '#B1B3B6');
    }).click(function () {

        let conWidth = $('.container').width() + 220;

        $('.container').animate({
            left: 0,
            width: conWidth
        }, 100);

        $('.navbar').animate({
            left: '-220px'
        }, 100, function () {
            $('.navbar').hide();
            $('.container .control').show();
        });
    });


    $('.container .control').click(function () {

        let conWidth = $('.container').width() - 220;

        $('.container').animate({
            left: 220,
            width: conWidth
        }, 100);
        $('.navbar').animate({
            left: '0px'
        }, 100, function () {
            $('.navbar').show();
            $('.container .control').hide();
        });
    });

    // nav item color
    $('.nav-item').click(function () {
        $('.nav-item').removeClass('selected');
        $(this).addClass('selected');
    });


    // build nav item color
    $('.slide a').click(function () {
        $('.slide a').removeClass('selected');
        $(this).addClass('selected');
    });

    $(window).scroll(function () {
        var scrollVal = $(this).scrollTop();
        if (scrollVal > 100) {
            $('.gotop').fadeIn();
        } else {
            $('.gotop').fadeOut();
        }
    });

    $('.gotop').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 'slow');
    });


});

$(window).resize(function () {
    initialize();
});


function initialize() {
    let h = $(window).height();
    $('.navbar').height(h);
}


function Login() {
    $('.login-modal').fadeIn(200);
}

function LoginClose() {
    $('.login-modal').fadeOut(200);
}