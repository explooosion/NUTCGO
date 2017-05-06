$(window).ready(function () {

    // photo default show
    $('#art-group #photo-slider-plant').fadeIn();

    // photo form open
    $('#art-group .photo-box img').click(function () {

        var src = $(this).attr('data-img');
        var title = $(this).attr('data-title');
        $('#art-group .photo-main-img').attr('src', src);
        $('#art-group .photo-main-title').text(title);
        $('#art-group .photo-form').fadeIn();
    });

    // photo form close
    $('#art-group .photo-control').click(function () {
        $('#art-group .photo-form').fadeOut();
    });

    $('#art-group #slide-art a').click(function () {
        $('#art-group #photo-art .photo-slider').hide();
        var data = '#' + $(this).attr('data-id');
        $(data).fadeIn();
    });


});