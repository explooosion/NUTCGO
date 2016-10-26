$('.slide-nav a').click(function () {

    let _id = '#' + $(this).attr('scroll') + ' img';
    let scroll = $(_id).offset().top;
    $("html, body").animate({
        scrollTop: scroll
    }, 'slow');

});