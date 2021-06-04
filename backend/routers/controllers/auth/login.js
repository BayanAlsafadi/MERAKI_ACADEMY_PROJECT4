const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("./../../../db/models/user");
const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email.toLowerCase() })
    .then((result) => {
      if (!result) {
        res.status = 404;
        res.json("The email doesn't exist");
      } else {
        const payload = {
          userId: result._id,
          role: result.role._id,
        };
        const options = {
          expiresIn: "4h",
        };
        const secret = process.env.SECRET;
        const token = jwt.sign(payload, secret, options);
        bcrypt.compare(password, result.password, (err, result_2) => {
          if (result_2) {
            res.status = 200;
            res.json(token);
          } else {
            res.status = 403;
            res.json("The password you’ve entered is incorrect");
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports = {
  login,
};
