$('#art .col[data-art]').click(function () {
    var _src = $(this).css('background-image')
        .replace('.jpg', '_說明.jpg')
        .replace(')', '').replace('(', '')
        .replace('url', '')
        .replace('"', '').replace('"', '');

    // console.log(_src);
    var _title = $(this).children().text() + ' － 標示牌簡介';

    $('#artModal .modal-title').html(_title);

    var artModalimg = $('#artModalimg');
    artModalimg
        .next().show()
        .attr('src', _src)
        .load(function () {
            $(this).next().hide();
            $(this).show();
        });
});

