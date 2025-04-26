import express from "express";

const router = express.Router();

router.get("/conversations", (req, res) => {
  res.send("List of conversations");
});

export default router;
