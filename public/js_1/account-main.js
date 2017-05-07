var uinfo = JSON.parse(GetCookie('account'));
var dirpath = window.location.pathname;
if (uinfo === null && dirpath == '/account') {
    alert('請重新登入');
    location.href = "./";
} else if (dirpath == '/account') {
    $('#account-group .tableaccount #txtUserId').text(uinfo['UserID']);
    $('#account-group #txtPwd').val(uinfo['PassWord']);
    $('#account-group #txtUserName').val(uinfo['UserName']);
    $('#account-group #txtEmail').val(uinfo['Email']);
}



$('#account-group #btnAccountSubmit').click(function () {

    var chkVal = true;

    $('#account-group .tableaccount input').each(function () {
        if ($(this).val() == '') {
            chkVal = false;
        }
    });

    if (!chkVal) {
        alert('請輸入完整資料');
        return false;
    } else {

        var userid = $('#account-group .tableaccount #txtUserId').text();
        var userpwd = $('#account-group #txtPwd').val();
        var username = $('#account-group #txtUserName').val();
        var email = $('#account-group #txtEmail').val();

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
                console.log('//console.log('ajax-ok');');
                if (response == true) {
                    alert('更新成功,請重新登入');
                    Logout();
                } else {
                    alert('更新失敗');
                }
            }
        });

    }

});