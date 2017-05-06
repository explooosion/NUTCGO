$('#build-group #slide-build a').click(function () {

    var _id = '#' + $(this).attr('scroll') + ' img';
    var scroll = $(_id).offset().top;
    $("html, body").animate({
        scrollTop: scroll
    }, 'slow');

});

$(function () {
    $("img.lazy").lazyload({
        threshold: 200
    });
});