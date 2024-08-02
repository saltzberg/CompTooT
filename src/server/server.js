const express = require("express");
const path = require("path");
const urlProcessor = require("./urlProcessor");
const claudeIntegration = require("./claudeIntegration");
const dataStorage = require("../storage/dataStorage");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));

app.post("/api/process-url", async (req, res) => {
  try {
    const { url } = req.body;
    const extractedContent = await urlProcessor.extractContent(url);
    const analysisResult =
      await claudeIntegration.analyzeContent(extractedContent);
    await dataStorage.saveData(analysisResult);
    res.json({ success: true, data: analysisResult });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/api/query", async (req, res) => {
  try {
    const { query } = req.query;
    const results = await dataStorage.queryData(query);
    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
