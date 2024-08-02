const { extractContent } = require("../src/server/urlProcessor");

test("extractContent fetches content from a URL", async () => {
  const url = "https://example.com";
  const content = await extractContent(url);
  expect(content).toBeDefined();
  expect(typeof content).toBe("string");
});
