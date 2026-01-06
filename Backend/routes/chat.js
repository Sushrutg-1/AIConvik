import express from "express";
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";

const router = express.Router();

router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 }); //Gives all thread in decending order of updatedAt
    res.json(threads);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to fetch threads" });
  }
});

router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Thread.findOne({ threadId });
    if (!thread) {
      res.status(404).json({ error: "Thread not found" });
    }
    res.json(thread.message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get thread" });
  }
});

router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    let deletedThread = await Thread.findOneAndDelete({ threadId });
    if (!deletedThread) {
      res.status(404).json({ error: "Thread not found" });
    }
    res.status(200).json({ success: "Thread deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete chat" });
  }
});

router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;
  if (!threadId || !message) {
    res.status(400).json({ error: "missing required fields" });
  }
  try {
    let thread = await Thread.findOne({ threadId });
    if (!thread) {
      // for new thread
      thread = new Thread({
        threadId,
        title: message,
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      });
      await thread.save();
    } else {
      // for existing thread
      thread.messages.push({
        role: "user",
        content: message,
      });
    }

    const assistantReply = await getOpenAIAPIResponse(message);
    thread.messages.push({
      role: "assistant",
      content: assistantReply,
    });

    await thread.save();
    res.json({ reply: assistantReply });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
