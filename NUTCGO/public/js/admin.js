$('#admin .col[data-admin]').click(function () {
    var _src = $(this).css('background-image')
        .replace(')', '').replace('(', '')
        .replace('url', '')
        .replace('"', '').replace('"', '');

    console.log(_src);
    var _title = $(this).children().text() + ' － 實景攝影';

    $('#adminModal .modal-title').html(_title);

    var adminModalimg = $('#adminModalimg');
    adminModalimg.hide().next().show();
    adminModalimg.attr('src', _src)
        .load(function () {
            $(this).next().hide();
            $(this).fadeIn();
        });
});

