var LoginData;

$(window).ready(function () {
    // Check Login
    CheckLogin();
});

$(window).on('resize', function () {

    if ($(window).width() <= 768) {
        $("#wrapper").removeClass("toggled");
        $('.header').removeClass('header-toggled');
    } else {
        $("#wrapper").addClass("toggled");
        $('.header').addClass('header-toggled');
    }

    var prevOfSet = $(window).scrollTop();
    $(window).scroll(function () {

        prevOfSet = HeaderHide(prevOfSet, $(window).scrollTop());

    });

}).trigger('load')


// navcon click
$(".navcon").click(function (e) {
    e.preventDefault();
    PanelControl();
});



// navcon logon close when nav open
$('.nav-dipose').click(function () {
    var _w = $(window).width();
    if (_w <= 768) {
        PanelControl();
    }

    /* reset modal tab to default */

    $('#signup .tab-pane').each(function () {
        $(this).removeClass('in').removeClass('active');
        if ($(this).attr('id') == 'clause') {
            $(this).addClass('in').addClass('active');
        }
    });


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


// 登入
function LoginIn() {

    var userid = $('#txtUserId').val();
    var passwd = $('#txtPWD').val();
    if (userid == "" || passwd == "") {
        alert('帳號密碼請勿留白!');
        return;
    }

    $.ajax({
        url: 'http://robby570.tw/api/login/',
        type: 'POST',
        data: {
            'userid': userid,
            'passwd': passwd
        },
        error: function (xhr) {
            console.log('ajax-error');
            console.log(xhr);
            alert('ajax發生錯誤');
        },
        success: function (response) {

            //console.log(response);
            if (response == '') {
                alert('帳號或密碼錯誤!');
            } else {
                SaveCookie(response);
                location.href = "/";
            }
        }
    });

}

function Logout() {
    DelCookie('account');
    window.location.href = '/logout';
}


function CheckLogin() {

    LoginData = JSON.parse(GetCookie('account'));
    console.log('cookie:', LoginData);
    if (!LoginData) {
    } else {
        // alreay login
        $('#spusername').html(LoginData["UserName"]);
        $('#spemail').html(LoginData["Email"]);
    }
}


/*
console.log("%c", "padding:180px 340px 200px 300px;line-height:300px;background:url('http://cdn.robby570.tw/img/look3small.jpg') no-repeat;");
console.log('ヽ(#`Д´)ﾉ 肥宅哩喜咧跨三小? ');
*/


// 置頂
$(window).scroll(function () {
    var scrollVal = $(this).scrollTop();
    if (scrollVal > 100) {
        $('.gotop').fadeIn();
    } else {
        $('.gotop').fadeOut();
    }
});

$('.gotop').click(function () {
    $("html, body").animate({
        scrollTop: 0
    }, 'slow');
});