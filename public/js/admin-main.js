$('.chosen-select').chosen();
$(window).ready(function () {

    // photo default show
    $('#photo-slider-build1').fadeIn();

    // photo form open
    $('.photo-box img').click(function () {

        let src = $(this).attr('data-img');
        let title = $(this).attr('data-title');
        $('.photo-main-img').attr('src', src);
        $('.photo-main-title').text(title);
        $('.photo-form').fadeIn();
    });

    // photo form close
    $('.photo-control').click(function () {
        $('.photo-form').fadeOut();
    });

    $('#slide-admin a').click(function () {
        $('#photo-admin .photo-slider').hide();
        let data = '#' + $(this).attr('data-id');
        $(data).fadeIn();
    });


});