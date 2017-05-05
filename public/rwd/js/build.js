$(function () {

    $('#build .build-img').hover(function () {
        $(this).children().toggleClass('build-panel-toggle');
    });


    $(window).load(function () {

        var width = $(this).width();
        console.log(width);
        if (width <= 768) {
            $('#build .build-img').children().toggleClass('build-panel-toggle');
        }


        $(this).scroll(function () {
            //console.log($(this).width());
            // 暫時先拿掉 mobile performance 差
            if ($(this).width() > 0) {
                return;
            } else {

                var ntop = $(this).scrollTop();
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

    var target = $(".build-img[data-src='" + id + "']").children();

    if (ismove) {
        target.removeClass('build-panel-toggle');
    } else {
        if (!target.hasClass('build-panel-toggle')) {
            target.toggleClass('build-panel-toggle');
        }
    }
}