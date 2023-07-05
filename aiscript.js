const chatDisplay = document.getElementById('chat-display');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', sendMessage);

function sendMessage() {
  const userMessage = userInput.value;
  if (userMessage.trim() !== '') {
    displayUserMessage(userMessage);
    userInput.value = '';
    scrollToBottom();
    sendRequestToServer(userMessage);
  }
}

function displayUserMessage(message) {
  const userDiv = document.createElement('div');
  userDiv.className = 'user-message';
  userDiv.textContent = message;
  chatDisplay.appendChild(userDiv);
}

function displayBotMessage(message) {
  const botDiv = document.createElement('div');
  botDiv.className = 'bot-message';
  botDiv.textContent = message;
  chatDisplay.appendChild(botDiv);
  scrollToBottom();
}

function scrollToBottom() {
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

function sendRequestToServer(message) {
  const request = new XMLHttpRequest();
  request.open('POST', 'server.php');
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      displayBotMessage(request.responseText);
    }
  };
  request.send(`message=${message}`);
}
