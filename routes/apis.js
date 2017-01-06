var express = require('express');
var router = express.Router();

var sql = require('mssql');
var config = require('../db/config.json');


// user login
router.post('/login', function (req, res) {

    sql.connect(config, function (err) {

        if (err) console.log(err);

        var request = new sql.Request();
        request.input('UserID', sql.VarChar(50), req.body.userid)
            .input('PassWord', sql.VarChar(50), req.body.passwd)
            .query('select * from UserList where UserID = @UserID AND PassWord = @PassWord', function (err, recordset) {

                if (err) {
                    console.log(err)
                    res.send(err);
                }
                res.send(recordset[0]);

            });
    });

});

// map add new marker
router.post('/mapadd/', function (req, res) {

    sql.connect(config, function (err) {

        if (err) console.log(err);

        var request = new sql.Request();
        request.input('MarkerName', sql.NVarChar(50), req.body.name)
            .input('MarkerLat', sql.NVarChar(50), req.body.lat)
            .input('MarkerLng', sql.NVarChar(50), req.body.lng)
            .query("insert into MarkerList ( MarkerName , MarkerLat , MarkerLng ) values ( @MarkerName , @MarkerLat , @MarkerLng )", function (err, recordset) {

                if (err) {
                    console.log(err)
                    res.send(err);
                }
                res.send(true);
            });
    });

});

// map get marker info
router.get('/map/:key', function (req, res) {

    sql.connect(config, function (err) {

        if (err) console.log(err);

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

module.exports = router;