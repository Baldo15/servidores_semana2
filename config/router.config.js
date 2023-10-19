const express = require('express');
const router = express.Router();
const posts = require("../controllers/post.controller");
const users = require("../controllers/users.controller");
const secure = require("../middlewares/secure.middleware");

router.post("/posts",secure.auth, posts.create);
router.get("/posts",secure.auth, posts.listAll);
router.get("/posts/:id",secure.auth, posts.listId);
router.patch("/posts/:id",secure.auth, posts.update);
// router.delete("/posts/:id", posts.delate);

// users
router.post("/users", users.create);
router.get("/users/:id/validate", users.validate);
router.post("/login", users.login);
router.get("/profile", secure.auth, users.profile);

module.exports = router;