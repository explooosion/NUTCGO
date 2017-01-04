$('.chosen-select').chosen();
$(window).ready(function () {

    // photo default show
    $('#photo-slider-plant').fadeIn();

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

    $('#slide-art a').click(function () {
        $('#photo-art .photo-slider').hide();
        let data = '#' + $(this).attr('data-id');
        $(data).fadeIn();
    });


});