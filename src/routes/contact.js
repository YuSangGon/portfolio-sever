import express from "express";
import { sendToSlack } from "../services/slackService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, title, message } = req.body;
  //   console.log("[email] : " + process.env.SLACK_WEBHOOK_URL);

  await sendToSlack({ email, title, message });

  res.json({ ok: true });
});

export default router;
