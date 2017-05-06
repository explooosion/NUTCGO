$(function () {
    $('#home .row .col').hover(function () {
        $(this).find('.shade-img').toggleClass('shade-toggle').children('span').hide().siblings().fadeIn();
    }, function () {
        $(this).find('.shade-img').toggleClass('shade-toggle').children('span').fadeIn().siblings().hide();
    });



    $(window).on('resize', function () {
        if ($(this).width() < 768) {
            $('.shade-img span').siblings().fadeIn();
        } else {
            $('.shade-img span').fadeIn().siblings().hide();
        }
    }).trigger('resize')


});

