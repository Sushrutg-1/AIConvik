import Thread from "../models/Thread.js";
import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newThread = new Thread({
      threadId: "newThread3",
      title: "newThread1_title3",
    });

    let response = await newThread.save();
    console.log(response);
    console.log("saved to db");
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to save in DB" });
  }
});

export default router;
