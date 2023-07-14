let conversation = [
  { role: "user", content: "Hi" },
  { role: "assistant", content: "Hi,how can I help you today?" },
];

document.getElementById("submit-button").addEventListener("click", function () {
  let input_value = document.getElementById("input-text").value;
  console.log("user:", input_value);
});

async function conversationUserAdd(question, sentiment) {
  conversation.push({
    role: "user",
    content:
      "my happiness out of 10:" + sentiment + "my question is:" + question,
  });
}

async function conversationAssistantAdd(response) {
  conversation.push({
    role: "assistant",
    content: response,
  });
}

async function openai_test() {
  let url = "https://api.openai.com/v1/chat/completions";
  let part1 = "sk";
  let part2 = "-uUPayv04E0azuKUx7fqkT3BlbkF";
  let part3 = "JAbsZR6JQELQpKK5nH0bl";

  let allParts = part1 + part2 + part3;

  let data = { model: "gpt-3.5-turbo", messages: conversation };
  let response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${allParts}`,
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("there is an error:", error);
  }

  if (response.ok) {
    const responseData = await response.json();
    const message = responseData.choices[0].message.content;

    conversationAssistantAdd(message);

    const utterance = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(utterance);
    console.log(message);
    return message;
  } else {
    console.log("Request failed with status:", response.status);
  }
}
