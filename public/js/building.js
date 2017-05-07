$(function () {

    $('#building .building-img').hover(function () {
        $(this).children().toggleClass('building-panel-toggle');
    });


    $(window).load(function () {

        var width = $(window).width();

        if (width <= 768) {
            $('#building .building-img').children().toggleClass('building-panel-toggle');
        }

        $(window).scroll(function () {
            //console.log($(this).width());
            // 暫時先拿掉 mobile performance 差
            if ($(window).width() > 0) {
                return;
            } else {

                var ntop = $(window).scrollTop();
                if (ntop > 100 && ntop < 350) {
                    buildScrollView('b1', false);
                }
                else if (ntop >= 450 && ntop < 700) {
                    buildScrollView('b2', false);
                }
                else if (ntop >= 800 && ntop < 1050) {
                    buildScrollView('b3', false);
                }
                else if (ntop >= 1150 && ntop < 1350) {
                    buildScrollView('b4', false);
                }
                else if (ntop >= 1450 && ntop < 1700) {
                    buildScrollView('b5', false);
                }
                else if (ntop >= 1750 && ntop < 2000) {
                    buildScrollView('b6', false);
                }
                else if (ntop >= 2100 && ntop < 2350) {
                    buildScrollView('b7', false);
                }
                else if (ntop >= 2450 && ntop < 2650) {
                    buildScrollView('b8', false);
                }
                else if (ntop >= 2750 && ntop < 3000) {
                    buildScrollView('b9', false);
                }
                else {
                    for (var i = 1; i < 10; i++) {
                        buildScrollView('b' + i, true);
                    }
                }
            }
        });
    });
});

function buildScrollView(id, ismove) {

    var target = $(".building-img[data-src='" + id + "']").children();

    if (ismove) {
        target.removeClass('building-panel-toggle');
    } else {
        if (!target.hasClass('building-panel-toggle')) {
            target.toggleClass('building-panel-toggle');
        }
    }
}