const { Router } = require("express");
const { z } = require("zod");
// const { User } = require("../db/models.js");
const jwt = require("jsonwebtoken");

const { User } = require("../../db/models");
const bcrypt = require("bcrypt");

const router = Router();

const createUserCheck = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

router.post("/", async (req, res, next) => {
  try {
    const zodCheck = createUserCheck.safeParse(req.body);
    const { username, password, firstName, lastName } = req.body;
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
        // .error.issues[0].message,
        // Path:zodCheck.error.issues[0].path
      });
    }
    const userExist = await User.findOne({
      username,
    });
    if (userExist) {
      return res.status(200).json({
        msg: "Username already exists",
      });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const dbUser = await User.create({
      username,
      password: encryptedPassword,
      firstName,
      lastName,
    });
    const userId = dbUser._id;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);
    if (dbUser) {
      return res.json({
        msg: "User is created",
        userId,
        token,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
