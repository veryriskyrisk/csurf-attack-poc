var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    console.log(req.headers.csrf);
    console.log(req.cookies);
    console.log(`Cookies ${JSON.stringify(req.cookies)}`);
    console.log(`Signed cookies ${JSON.stringify(req.signedCookies)}`);

    res.render("attack", { title: "Express", csrfToken: req.csrfToken() });
});

module.exports = router;
