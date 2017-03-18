var express = require('express');
var router = express.Router();

var sql = require('mssql');
var config = require('../db/config.json');

// 使用者-登入(回傳基本資料)
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

// 使用者-新增
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

// 使用者-更新資料
router.post('/userupdate/', function (req, res) {

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
                .query("update UserList set UserName = @UserName , PassWord = @PassWord , Email = @Email" +
                        " where UserID = @UserID",
                function (err, recordset) {

                    if (err) {
                        console.log(err)
                        res.send(err);
                    }
                    res.send(true);
                });
        });
});

// 點位-新增
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

// 點位-取得資料
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

// 點位-列表
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

// 點位-列表 - Search by keyWord
router.post('/maplist/', function (req, res) {

    sql
        .connect(config, function (err) {

            if (err) 
                console.log(err);
            
            var request = new sql.Request();
            request.input('id', sql.NVarChar(50), req.body.id)
                .query("select * from MarkerList where substring(MarkerName,1,1) = @id order by MarkerNa" +
                        "me",
                function (err, recordset) {

                    if (err) {
                        console.log(err)
                        res.send(err);
                    }
                    res.send(recordset);
                });
        });
});

// 點位-刪除(by id)
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

// 曲面-資料 - Search by keyWord
router.get('/polygonlist/', function (req, res) {

    sql
        .connect(config, function (err) {

            if (err) 
                console.log(err);
            
            var request = new sql.Request();
            request.query("select id,PolygonName,PolygonGroup from PolygonList order by PolygonGroup , id", function (err, recordset) {

                if (err) {
                    console.log(err)
                    res.send(err);
                }
                res.send(recordset);
            });
        });
});

// 曲面-列表 - Search by keyWord
router.post('/polygonpoint/', function (req, res) {

    sql
        .connect(config, function (err) {

            if (err) 
                console.log(err);
            
            var request = new sql.Request();
            request
                .input('id', sql.Int, req.body.id)
                .query("select PolygonPoint.STAsText() AS [PolygonPoint] from PolygonList where id=@id", function (err, recordset) {

                    if (err) {
                        console.log(err)
                        res.send(err);
                    }
                    res.send(recordset);
                });
        });
});

// 點位-新增
router.post('/polygonadd/', function (req, res) {

    let polystr = 'LINESTRING(';
    let polygon = req.body;
    let index = 0;
    let lat,
        lng;
    for (let i in req.body) {
        if (i != 'name' && i != 'group') {
            if (index % 2 == 0) {
                lat = polygon[i];
            } else {
                lng = polygon[i];
            }
            index++;
            if (index % 2 == 0) {
                polystr += lat + ' ' + lng + ',';
            }
        }
    }
    polystr = polystr.substr(0, polystr.length - 1) + ')';

    sql.connect(config, function (err) {

        if (err) 
            console.log(err);
        
        var request = new sql.Request();
        request.input('PolygonName', sql.NVarChar(50), req.body.name).input('PolygonPoint', sql.NVarChar(50), polystr).input('PolygonGroup', sql.NVarChar(50), req.body.group)
            .query("insert into PolygonList ( PolygonName , PolygonPoint , PolygonGroup ) values ( @" +
                    "PolygonName , @PolygonPoint , @PolygonGroup )",
            function (err, recordset) {

                if (err) {
                    console.log(err)
                    res.send(err);
                }
                res.send(true);
            });
    });

    //res.send(polystr);

});

module.exports = router;