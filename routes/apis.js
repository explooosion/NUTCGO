var express = require('express');
var router = express.Router();

var sql = require('mssql');
var config = require('../db/config.json');

// 使用者登入
router.post('/login', function (req, res) {

    sql
        .connect(config, function (err) {

            if (err) 
                console.log(err);
            
            var request = new sql.Request();
            request.input('UserID', sql.VarChar(50), req.body.userid).input('PassWord', sql.VarChar(50), req.body.passwd)
                .query('select * from UserList where UserID = @UserID AND PassWord = @PassWord', function (err, recordset) {

                    if (err) {
                        console.log(err)
                        res.send(err);
                    }
                    res.send(recordset[0]);
                });
        });
});

// 新增點位
router.post('/mapadd/', function (req, res) {

    sql
        .connect(config, function (err) {

            if (err) 
                console.log(err);
            
            var request = new sql.Request();
            request.input('MarkerName', sql.NVarChar(50), req.body.name).input('MarkerLat', sql.NVarChar(50), req.body.lat).input('MarkerLng', sql.NVarChar(50), req.body.lng)
                .query("insert into MarkerList ( MarkerName , MarkerLat , MarkerLng ) values ( @MarkerNa" +
                        "me , @MarkerLat , @MarkerLng )",
                function (err, recordset) {

                    if (err) {
                        console.log(err)
                        res.send(err);
                    }
                    res.send(true);
                });
        });
});

// 取得定位資料
router.get('/map/:key', function (req, res) {

    sql
        .connect(config, function (err) {

            if (err) 
                console.log(err);
            
            var request = new sql.Request();
            request.input('key', sql.NVarChar(50), req.params.key)
                .query("select * from MarkerList where MarkerName = @key", function (err, recordset) {

                    if (err) {
                        console.log(err)
                        res.send(err);
                    }
                    res.send(recordset[0]);
                });
        });
});

// 點位列表
router.get('/maplist/', function (req, res) {

    sql
        .connect(config, function (err) {

            if (err) 
                console.log(err);
            
            var request = new sql.Request();
            request.query("select * from MarkerList order by MarkerName", function (err, recordset) {

                if (err) {
                    console.log(err)
                    res.send(err);
                }
                res.send(recordset);
            });

        });
});

// 點位列表 - Search by keyWord
router.post('/maplist/', function (req, res) {

    sql
        .connect(config, function (err) {

            if (err) 
                console.log(err);
            
            var request = new sql.Request();
            request.input('id', sql.NVarChar(50), req.body.id)
                .query("select * from MarkerList where substring(MarkerName,1,1) = @id order by MarkerName", function (err, recordset) {
                    if (err) {
                        console.log(err)
                        res.send(err);
                    }
                    res.send(true);
                });
        });
});

// 點位刪除(by id)
router.post('/mapdel/', function (req, res) {

    sql
        .connect(config, function (err) {

            if (err) 
                console.log(err);
            
            var request = new sql.Request();
            request.input('id', sql.Int(), req.body.id)
                .query("delete from MarkerList where id = @id", function (err, recordset) {
                    if (err) {
                        console.log(err)
                        res.send(err);
                    }
                    res.send(true);
                });
        });
});

router.post('/useradd/', function (req, res) {

    sql
        .connect(config, function (err) {

            if (err) 
                console.log(err);
            if (err) {
                console.log(err)
                res.send(err);
            }
            //res.send(req.body.userid);

            var request = new sql.Request();
            request.input('UserName', sql.NVarChar(50), req.body.UserName).input('UserID', sql.NVarChar(50), req.body.UserID).input('PassWord', sql.NVarChar(50), req.body.PassWord).input('Email', sql.NVarChar(50), req.body.Email)
                .query("insert into UserList ( UserName , UserID , PassWord , Email ) values ( @UserName" +
                        " , @UserID , @PassWord , @Email )",
                function (err, recordset) {

                    if (err) {
                        console.log(err)
                        res.send(err);
                    }
                    res.send(true);
                });
        });
});

module.exports = router;