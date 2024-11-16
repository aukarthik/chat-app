const { Router } = require("express");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { User } = require("../../db/models.js");
const { errorHandler } = require("../utils/errorHandler.js");
const router = Router();

const userCheck = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

router.post("/", async (req, res, next) => {
  try {
    const zodCheck = userCheck.safeParse(req.body);
    const { username, password } = req.body;
    if (!zodCheck.success) {
      const issues = zodCheck.error?.issues || [];
      const errorDetails = issues.map((issue) => {
        const { message, path } = issue;
        const errorName = path.join(".") || "Unknown";
        return {
          error: message,
          path: errorName,
        };
      });
      return res.status(411).json({
        Issue: errorDetails,
      });
    }
    const userExist = await User.findOne({
      username,
    });
    if (!userExist) {
      return next(errorHandler(401, "Invalid Username"));
    }
    const passwordMatched = await bcrypt.compare(password, userExist.password);
    if (!passwordMatched) {
      return next(errorHandler(401, "Invalid Password"));
    }
    const token = jwt.sign({ userId: userExist._id }, process.env.JWT_SECRET);
    if (userExist) {
      return res.status(200).json({
        token,
      });
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
});

module.exports = router;
