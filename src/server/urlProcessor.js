const axios = require("axios");

async function extractContent(url) {
  try {
    const response = await axios.get(url);
    // This is a very basic extraction. You'll need to enhance this based on the URL type.
    return response.data;
  } catch (error) {
    throw new Error(`Failed to extract content from ${url}: ${error.message}`);
  }
}

module.exports = { extractContent };
