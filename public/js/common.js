
$(window).on('resize', async function () {

    if ($(this).width() < 768) {
        $("#wrapper").removeClass("toggled");
        $('.header').removeClass('header-toggled');
    } else {
        $("#wrapper").addClass("toggled");
        $('.header').addClass('header-toggled');
    }

    var prevOfSet = $(this).scrollTop();
    $(this).scroll(function () {

        prevOfSet = HeaderHide(prevOfSet, $(this).scrollTop());

    });

}).trigger('load')

// navcon click
$(".navcon").click(function (e) {
    e.preventDefault();
    PanelControl();
});



// navcon logon close when nav open
$('#nav-login').click(function () {
    var _w = $(window).width();
    if (_w <= 768) {
        PanelControl();
    }
});


// 面板開關
function PanelControl() {
    $("#wrapper").toggleClass("toggled");
    $('.header').toggleClass('header-toggled');
}

// 標題伸縮
function HeaderHide(prevOfSet, nextOfSet) {
    if (nextOfSet <= prevOfSet) {
        $('.header').css('margin-top', '0');
    } else {
        $('.header').css('margin-top', '-80px');
    }
    return nextOfSet;
}