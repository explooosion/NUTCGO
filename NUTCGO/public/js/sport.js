$(function () {

    $('#sport .sport-img').hover(function () {
        $(this).children().toggleClass('sport-panel-toggle');
    });


    $(window).load(function () {

        var width = $(window).width();

        if (width <= 768) {
            $('#sport .sport-img').children().toggleClass('sport-panel-toggle');
        }

        $(window).scroll(function () {
            //console.log($(this).width());
            // 暫時先拿掉 mobile performance 差
            if ($(window).width() > 0) {
                return;
            } else {

                var ntop = $(window).scrollTop();
                if (ntop > 100 && ntop < 350) {
                    sportScrollView('b1', false);
                }
                else if (ntop >= 450 && ntop < 700) {
                    sportScrollView('b2', false);
                }
                else if (ntop >= 800 && ntop < 1050) {
                    sportScrollView('b3', false);
                }
                else if (ntop >= 1150 && ntop < 1350) {
                    sportScrollView('b4', false);
                }
                else if (ntop >= 1450 && ntop < 1700) {
                    sportScrollView('b5', false);
                }
                else if (ntop >= 1750 && ntop < 2000) {
                    sportScrollView('b6', false);
                }
                else if (ntop >= 2100 && ntop < 2350) {
                    sportScrollView('b7', false);
                }
                else if (ntop >= 2450 && ntop < 2650) {
                    sportScrollView('b8', false);
                }
                else if (ntop >= 2750 && ntop < 3000) {
                    sportScrollView('b9', false);
                }
                else {
                    for (var i = 1; i < 10; i++) {
                        sportScrollView('b' + i, true);
                    }
                }
            }
        });
    });
});

function sportScrollView(id, ismove) {

    var target = $(".sport-img[data-src='" + id + "']").children();

    if (ismove) {
        target.removeClass('sport-panel-toggle');
    } else {
        if (!target.hasClass('sport-panel-toggle')) {
            target.toggleClass('sport-panel-toggle');
        }
    }
}