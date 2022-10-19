var express = require("express");
var router = express.Router();

router.post("/", function (req, res, next) {
  console.log(`Cookies ${JSON.stringify(req.cookies)}`);
  console.log(`Signed cookies ${JSON.stringify(req.signedCookies)}`);
  console.log(`CSRF token: ${req.body._csrf}`);
  res.render("csrf", { title: "Express" });
});

module.exports = router;
