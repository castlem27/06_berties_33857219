var express = require('express');
var router = express.Router();

router.get('/books', function (req, res, next) {
    let sqlquery = "SELECT * FROM books";
    let conditions = [];
    let params = [];

    if (req.query.search) {
        conditions.push("name LIKE ?");
        params.push('%' + req.query.search + '%');
    }

    if (req.query.minprice) {
        conditions.push("price >= ?");
        params.push(req.query.minprice);
    }

    if (req.query.max_price) {
        conditions.push("price <= ?");
        params.push(req.query.max_price);
    }

    if (conditions.length > 0) {
        sqlquery += " WHERE " + conditions.join(" AND ");
    }

    if (req.query.sort === 'name') {
        sqlquery += " ORDER BY name";
    } else if (req.query.sort === 'price') {
        sqlquery += " ORDER BY price";
    }

    db.query(sqlquery, params, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return next(err);
        } else {
            res.json(result);
        }
    });
});
module.exports = router;
