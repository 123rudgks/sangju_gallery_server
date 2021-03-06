const { verify } = require("jsonwebtoken");
require("dotenv").config();

const validateToken = (req, res, next) => {
  const accessToken = req.header("x-auth-token");

  if (!accessToken) {
    res.status(401).json({
      errors: [
        {
          msg: "user not logged in",
        },
      ],
    });

    // return res.json({ error: "user not logged in" });
  } else {
    try {
      const validToken = verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      req.user = validToken;

      if (validToken) {
        return next();
      }
    } catch (err) {
      res.json({ error: err });
    }
  }
};

module.exports = { validateToken };
