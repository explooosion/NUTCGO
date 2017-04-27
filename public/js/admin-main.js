$('.chosen-select').chosen();
$(window).ready(function () {

    // photo default show
    $('#admin-group #photo-slider-build1').fadeIn();

    // photo form open
    $('#admin-group .photo-box img').click(function () {

        var src = $(this).attr('data-img');
        var title = $(this).attr('data-title');
        $('#admin-group .photo-main-img').attr('src', src);
        $('#admin-group .photo-main-title').text(title);
        $('#admin-group .photo-form').fadeIn();
    });

    // photo form close
    $('#admin-group .photo-control').click(function () {
        $('#admin-group .photo-form').fadeOut();
    });

    $('#admin-group  #slide-admin a').click(function () {
        $('#admin-group #photo-admin .photo-slider').hide();
        var data = '#' + $(this).attr('data-id');
        $(data).fadeIn();
    });


});