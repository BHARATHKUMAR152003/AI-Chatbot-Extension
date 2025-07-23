document.getElementById("askBtn").addEventListener("click", () => {
  const question = document.getElementById("question").value;
  document.getElementById("answer").textContent = "Thinking...";

  chrome.runtime.sendMessage({ action: "askChatGPT", question }, (response) => {
    document.getElementById("answer").textContent = response.answer;
  });
});