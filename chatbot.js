const API_KEY = "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"; // Ganti dengan API key Anda
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", () => {
  const message = userInput.value;
  if (message) {
    appendMessage("User ", message);
    userInput.value = "";
    getResponse(message);
  }
});

function appendMessage(sender, message) {
  const messageElement = document.createElement("div");
  messageElement.textContent = `${sender}: ${message}`;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll ke bawah
}

async function getResponse(message) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }]
    })
  });
  const data = await response.json();
  const botMessage = data.choices[0].message.content;
  appendMessage("Bot", botMessage);
}