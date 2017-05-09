
// 驗證
function recaptchaSignupCallback() {
    $('#btnSignSubmit').removeAttr('disabled').toggleClass('btn-disabled');
}

function signup() {

    var chkVal = true;

    $('.signupmodal-container input').each(function () {
        if ($(this).val() == '') {
            chkVal = false;
        }
    });

    if (!chkVal) {
        alertWindow(true, '請輸入完整資料');
        return false;
    } else {

        var userid = $('#txtUId').val();
        var userpwd = $('#txtPwd').val();
        var username = $('#txtUserName').val();
        var email = $('#txtEmail').val();

        $.ajax({
            url: 'http://robby570.tw/api/useradd/',
            type: 'POST',
            data: {
                'UserID': userid,
                'PassWord': userpwd,
                'UserName': username,
                'Email': email
            },
            error: function (xhr) {
                console.log('ajax-error');
                console.log(xhr);
                alertWindow(true, 'ajax發生錯誤');
            },
            success: function (response) {

                if (response == true) {
                    alertWindow(true, '註冊成功,請重新登入');
                    Logout();
                } else {
                    alertWindow(true, '註冊失敗');
                    return true;
                }
            }
        });

    }
}