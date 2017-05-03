var LoginData;

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

        var conWidth = $('.container').width() + 220;

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

        var conWidth = $('.container').width() - 220;

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


    $('#txtPWD').keyup(function (e) {
        if (e.keyCode == 13) {
            LoginIn();
        }
    });

});

$(window).resize(function () {
    initialize();
});


function initialize() {
    var h = $(window).height();
    $('.navbar').height(h);
}

function CheckLogin() {

    $('#btnFrmLogOut').hide();
    $('#btnFrmLogIn').hide();
    $('#btnFrmSignUp').hide();

    LoginData = JSON.parse(GetCookie('account'));
    //console.log(LoginData);
    if (!LoginData) {
        //還沒登入
        $('#btnFrmLogIn').show(); // 登入按鈕
        $('#btnFrmSignUp').show();
        $('.nav li:last-child').hide(); // 會員中心
    } else {
        // alreay login
        $('#lbUserName').text('Hello, ' + LoginData["UserName"]);
        $('#btnFrmLogOut').show();
    }
}

function Login() {
    $('.login-modal').fadeIn(200);
    $('.login-modal .login-form input[type=text]').focus();
}


function LoginIn() {

    var userid = $('#txtUserId').val();
    var passwd = $('#txtPWD').val();
    if (userid == "" || passwd == "") {
        alert('帳號密碼請勿留白!');
        return;
    }

    $.ajax({
        url: 'http://210.242.86.107/api/login/',
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


function recaptchaCallback() {
    $('#btnSignSubmit').removeAttr('disabled').removeClass('btn-disabled');
}



/*
console.log("%c", "padding:180px 340px 200px 300px;line-height:300px;background:url('http://cdn.robby570.tw/img/look3small.jpg') no-repeat;");
console.log('ヽ(#`Д´)ﾉ 肥宅哩喜咧跨三小? ');
*/
