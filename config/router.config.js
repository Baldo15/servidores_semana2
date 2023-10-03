const express = require('express');
const router = express.Router();
const posts = require("../controllers/post.controller");

router.post("/posts", posts.create);
router.get("/posts", posts.listAll);
router.get("/posts/:id", posts.listId);
router.patch("/posts/:id", posts.update);
router.delete("/posts/:id", posts.delate);

module.exports = router;