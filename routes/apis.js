var express = require('express');
var router = express.Router();

var sql = require('mssql');

router.post('/images', function (req, res, next) {
    //console.log(res);
    res.end(req);
});




/*
router.get('/login', function (req, res, next) {
    res.json(next);
    sql.connect("mssql://sa:123456@localhost/CampusGuide").then(function () {

        sql.query `select * from UserList where id = 1`.then(function (recordset) {
            res.json(recordset);
        }).catch(function (err) {
            res.json({
                error: err
            });
        });

    }).catch(function (err) {
        res.json({
            error: err
        });
    });

});
*/

module.exports = router;