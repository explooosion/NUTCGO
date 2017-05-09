// var uinfo = JSON.parse(GetCookie('account'));
// var dirpath = window.location.pathname;
// if (uinfo === null && dirpath == '/account') {
//     alert('請重新登入');
//     location.href = "./";
// } else if (dirpath == '/account') {
//     $('#account-group .tableaccount #txtUserId').text(uinfo['UserID']);
//     $('#account-group #txtPwd').val(uinfo['PassWord']);
//     $('#account-group #txtUserName').val(uinfo['UserName']);
//     $('#account-group #txtEmail').val(uinfo['Email']);
// }

// 驗證
function recaptchaAccountCallback() {
    $('#btnAccountSubmit').removeAttr('disabled').toggleClass('btn-disabled');
}


function accountUpdate() {

    var chkVal = true;

    $('.accountmodal-container input').each(function () {
        if ($(this).val() == '') {
            chkVal = false;
        }
    });

    if (!chkVal) {
        alertWindow(true, '請輸入完整資料');
        return false;
    } else {

        var userid = $('#txtUserId').text();
        var userpwd = $('#txtPwd').val();
        var username = $('#txtUserName').val();
        var email = $('#txtEmail').val();

        $.ajax({
            url: 'http://robby570.tw/api/userupdate/',
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
                alert('ajax發生錯誤');
            },
            success: function (response) {
                if (response == true) {
                    alertWindow(true, '更新成功,請重新登入！');
                    Logout();
                } else {
                    alertWindow(true, '更新失敗');
                }
            }
        });

    }

};