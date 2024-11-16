const { Router } = require("express");
const router = Router();
const LoginRouter = require("./login");
const SignupRouter = require("./signup");

router.use("/login", LoginRouter);
router.use("/signup", SignupRouter);

module.exports = router;
