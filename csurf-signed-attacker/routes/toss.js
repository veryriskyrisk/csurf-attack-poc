var express = require("express");
var router = express.Router();

/* Toss the cookie */
router.get("/", function (req, res, next) {
    console.log(req.headers.csrf);
    console.log(req.cookies);
    console.log(`Cookies ${JSON.stringify(req.cookies)}`);
    console.log(`Signed cookies ${JSON.stringify(req.signedCookies)}`);

    res.clearCookie('_csrf');

    res.cookie('_csrf', req.query.tossme, { path: '/csrfprotected', domain: '.csrftest.com' });
    res.cookie('_csrf', req.query.tossme);

    res.send('Tossing cookies like a pro!')
});

module.exports = router;
