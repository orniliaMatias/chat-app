// Configurar o Firebase
const firebaseConfig = {
    apiKey: "AIzaSyACGfpiN8awGBo73ICLX_sqj-N1BW9Ctik",
    authDomain: "chat-app-c82dc.firebaseapp.com",
    projectId: "chat-app-c82dc",
    storageBucket: "chat-app-c82dc.appspot.com",
    messagingSenderId: "689740159846",
    appId: "1:689740159846:web:02b1bde100a86b778846a7",
    measurementId: "G-4ZJYTZFGZE"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Referenciar o banco de dados do Firebase
  const database = firebase.database();
  
  // Referenciar os elementos do chat
  const messagesElement = document.getElementById('messages');
  const messageInputElement = document.getElementById('messageInput');
  const sendButtonElement = document.getElementById('sendButton');
  
  // Adicionar evento de clique ao botão de envio
  sendButtonElement.addEventListener('click', () => {
    const message = messageInputElement.value;
    if (message.trim() !== '') {
      // Enviar a mensagem para o banco de dados
      const newMessageRef = database.ref('messages').push();
      newMessageRef.set({
        text: message,
        timestamp: Date.now()
      });
      messageInputElement.value = '';
    }
  });
  
  // Monitorar as mensagens adicionadas ao banco de dados
  database.ref('messages').on('child_added', (snapshot) => {
    const message = snapshot.val();
    const messageElement = document.createElement('div');
    messageElement.innerText = message.text;
    messagesElement.appendChild(messageElement);
    messagesElement.scrollTop = messagesElement.scrollHeight;
  });
  