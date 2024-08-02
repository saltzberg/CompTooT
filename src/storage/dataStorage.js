const fs = require("fs").promises;
const path = require("path");

const DATA_FILE = path.join(__dirname, "data.json");

async function saveData(data) {
  try {
    let existingData = [];
    try {
      const fileContent = await fs.readFile(DATA_FILE, "utf-8");
      existingData = JSON.parse(fileContent);
    } catch (error) {
      // File doesn't exist yet, that's okay
    }
    existingData.push(data);
    await fs.writeFile(DATA_FILE, JSON.stringify(existingData, null, 2));
  } catch (error) {
    throw new Error(`Failed to save data: ${error.message}`);
  }
}

async function queryData(query) {
  try {
    const fileContent = await fs.readFile(DATA_FILE, "utf-8");
    const data = JSON.parse(fileContent);
    // This is a very basic query. You'll need to enhance this based on your needs.
    return data.filter((item) => JSON.stringify(item).includes(query));
  } catch (error) {
    throw new Error(`Failed to query data: ${error.message}`);
  }
}

module.exports = { saveData, queryData };
