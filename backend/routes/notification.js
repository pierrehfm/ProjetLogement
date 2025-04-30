const express = require("express");
const router = express.Router();
const { Notification } = require("../models");

router.get("/:userId", async (req, res) => {
  const notifications = await Notification.findAll({
    where: { userId: req.params.userId },
    order: [["createdAt", "DESC"]],
  });
  res.json(notifications);
});

module.exports = router;
