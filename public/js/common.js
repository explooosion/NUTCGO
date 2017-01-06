$(window).ready(function () {

    // Initialize
    initialize();

    // Check Login
    CheckLogin();

    // nav control color - close
    $('.navbar .control').hover(function () {
        $('.navbar .line').css('background', '#FFF');
    }, function () {
        $('.navbar .line').css('background', '#B1B3B6');
    }).click(function () {

        let conWidth = $('.container').width() + 220;

        $('.container').animate({
            left: 0,
            width: conWidth
        }, 100);

        $('.navbar').animate({
            left: '-220px'
        }, 100, function () {
            $('.navbar').hide();
            $('.container .control').show();
        });
    });


    $('.container .control').click(function () {

        let conWidth = $('.container').width() - 220;

        $('.container').animate({
            left: 220,
            width: conWidth
        }, 100);
        $('.navbar').animate({
            left: '0px'
        }, 100, function () {
            $('.navbar').show();
            $('.container .control').hide();
        });
    });

    // nav item color
    $('.nav-item').click(function () {
        $('.nav-item').removeClass('selected');
        $(this).addClass('selected');
    });


    // build nav item color
    $('.slide a').click(function () {
        $('.slide a').removeClass('selected');
        $(this).addClass('selected');
    });

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


});

$(window).resize(function () {
    initialize();
});


function initialize() {
    let h = $(window).height();
    $('.navbar').height(h);
}

function CheckLogin() {

    $('#btnFrmLogOut').hide();
    $('#btnFrmLogIn').hide();

    let isLogin = JSON.parse(GetCookie('account'));
    console.log(isLogin);
    if (!isLogin) {
        $('#btnFrmLogIn').show(); // 登入按鈕
        $('.nav li:last-child').hide(); // 會員中心
    } else {
        // alreay login
        $('#lbUserName').text('Hello, ' + isLogin["UserName"]);
        $('#btnFrmLogOut').show();
    }
}

function Login() {
    $('.login-modal').fadeIn(200);
    $('.login-modal .login-form input[type=text]').focus();
}


function LoginIn() {

    let userid = $('#txtUserId').val();
    let passwd = $('#txtPWD').val();
    if (userid == "" || passwd == "") {
        alert('帳號密碼請勿留白!');
        return;
    }

    $.ajax({
        url: 'http://localhost/api/login/',
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
            console.log('ajax-ok');
            if (typeof response["UserName"] == 'undefined') {
                alert('帳號或密碼錯誤!');
            } else {
                console.log(response);
                SaveCookie(response);
                location.href = "/";
            }
        }
    });

}

function Logout() {
    DelCookie('account');
    location.href = "/";
}

function LoginClose() {
    $('.login-modal').fadeOut(200);
}