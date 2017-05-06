$(function () {
    $('#home .row .col').hover(function () {
        $(this).children('.shade-img').toggleClass('shade-toggle').children('span').hide().siblings().fadeIn();
    }, function () {
        $(this).children('.shade-img').toggleClass('shade-toggle').children('span').fadeIn().siblings().hide();
    });



});
