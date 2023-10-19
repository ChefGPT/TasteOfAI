const express = require("express");
require("dotenv").config();
const axios = require("axios");
const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     description: Returns the homepage
 *     responses:
 *       200:
 *         description: hello world
 */
router.get("/", (req, res) => {
  res.send("Hello World 8====D");
});

/**
 * @swagger
 * /OpenAI:
 *   get:
 *     description: Backshots on OpenAI
 *     responses:
 *       200:
 *         description: Holy shit it worked
 *       404:
 *          description: BRUH PLS
 */
router.get("/OpenAI", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        messages: [
          {
            role: "user",
            content: "I have chicken in the fridge, what should I make?",
          },
        ],
        max_tokens: 1000,
        model: "gpt-3.5-turbo",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error(error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      res.status(500).json({ success: false, error: error.response.data });
    } else {
      // Something happened in setting up the request that triggered an Error
      res.status(500).json({ success: false, error: error.message });
    }
  }
});

module.exports = router;
