const createError = require("http-errors");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports.create = (req, res, next) => {
  User.create({
    ...req.body,
    valid: false,
  })
    .then((user) => {
      res.json(user);
    })
    .catch(next);
};

module.exports.profile = (req, res, next) => {
  res.json(req.user);
};

module.exports.validate = (req, res, next) => {
  User.findByIdAndUpdate(
    req.params.id,
    { valid: true },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        next(createError(404, "user not found"));
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ username, valid: true })
    .then((user) => {
      if (user) {
        user.checkPassword(password).then((match) => {
          if (match) {
            const token = jwt.sign(
              { sub: user.id, exp: Date.now() / 1000 + 3600 },
              "super secret!"
            );

            res.json({ token });
          } else {
            next(createError(401, "unauthorized"));
          }
        });
      } else {
        next(createError(401, "unauthorized"));
      }
    })
    .catch(next);
};
