$('#art .col[data-art]').click(function () {
    var _src = $(this).css('background-image')
        .replace('.jpg', '_說明.jpg').replace(')', '')
        .replace('(', '')
        .replace('url', '')
        .replace('"', '')
        .replace('"', '');

    console.log(_src);
    var _title = $(this).children().html();

    $('#artModal .modal-title').html(_title);
    $('#artModalImg').attr('src', _src);

});
