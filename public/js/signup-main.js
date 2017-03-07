$('#btnSignSubmit')
    .click(function () {

        let chkVal = true;

        $('.tablesign input').each(function () {
            if ($(this).val() == '') {
                chkVal = false;
            }
        });

        if (!chkVal) {
            alert('請輸入完整資料');
            return false;
        } else {

            let userid = $('#txtUserId').val();
            let userpwd = $('#txtPwd').val();
            let username = $('#txtUserName').val();
            let email = $('#txtEmail').val();

            $.ajax({
                url: 'http://210.242.86.107/api/useradd/',
                type: 'POST',
                data: {
                    'UserName': userid,
                    'UserID': userid,
                    'PassWord': userpwd,
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
                        Logout();
                    } else {
                        alert('註冊失敗');
                    }
                }
            });

        }

    });