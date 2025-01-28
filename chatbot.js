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
