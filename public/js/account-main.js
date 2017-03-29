let uinfo = JSON.parse(GetCookie('account'));
if (uinfo === null) {
    alert('請重新登入');
    location.href = "./";
} else {
    $('.tableaccount #txtUserId').text(uinfo['UserID']);
    $('#txtPwd').val(uinfo['PassWord']);
    $('#txtUserName').val(uinfo['UserName']);
    $('#txtEmail').val(uinfo['Email']);
}



$('#btnAccountSubmit').click(function () {

    let chkVal = true;

    $('.tableaccount input').each(function () {
        if ($(this).val() == '') {
            chkVal = false;
        }
    });

    if (!chkVal) {
        alert('請輸入完整資料');
        return false;
    } else {

        let userid = $('.tableaccount #txtUserId').text();
        let userpwd = $('#txtPwd').val();
        let username = $('#txtUserName').val();
        let email = $('#txtEmail').val();

        $.ajax({
            url: 'http://210.242.86.107/api/userupdate/',
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
                console.log('ajax-ok');
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