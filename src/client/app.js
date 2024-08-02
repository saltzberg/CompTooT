document.getElementById("urlForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = document.getElementById("urlInput").value;
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "Processing...";

  try {
    const response = await fetch("/api/process-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const result = await response.json();
    if (result.success) {
      resultsDiv.innerHTML = `<pre>${JSON.stringify(result.data, null, 2)}</pre>`;
    } else {
      resultsDiv.innerHTML = `Error: ${result.error}`;
    }
  } catch (error) {
    resultsDiv.innerHTML = `Error: ${error.message}`;
  }
});
