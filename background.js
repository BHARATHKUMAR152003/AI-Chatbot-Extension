chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "askChatGPT") {
    (async () => {
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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"
          },
          body: JSON.stringify({
            model: "openai/gpt-4o-mini",
            messages: [{ role: "user", content: request.question }]
          })
        });

        const data = await response.json();
        console.log("Raw API response:", JSON.stringify(data, null, 2));

        if (data.error) {
          console.error("OpenRouter API Error:", JSON.stringify(data.error, null, 2));
          sendResponse({ answer: `Error: ${data.error.message || "Unknown error"}` });
        } else if (data.choices && data.choices.length > 0) {
          sendResponse({ answer: data.choices[0].message.content });
        } else {
          console.error("Unexpected response:", JSON.stringify(data, null, 2));
          sendResponse({ answer: "Unexpected response from OpenRouter." });
        }
      } catch (error) {
        console.error("Fetch error:", error);
        sendResponse({ answer: "Network error or API failure." });
      }
    })();
    return true;
  }
});