const axios = require("axios");
require("dotenv").config();

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
const CLAUDE_API_URL = "https://api.anthropic.com/v1/conversations";

async function analyzeContent(content) {
  try {
    const response = await axios.post(
      CLAUDE_API_URL,
      {
        messages: [{ role: "user", content }],
        model: "claude-3-sonnet-20240229",
        max_tokens_to_sample: 1000,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CLAUDE_API_KEY}`,
        },
      },
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    throw new Error(`Failed to analyze content with Claude: ${error.message}`);
  }
}

module.exports = { analyzeContent };
