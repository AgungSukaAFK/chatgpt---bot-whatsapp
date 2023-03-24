// const qrcode = require('qrcode-terminal'); // qrcode
// import { Client, LocalAuth} from "whatsapp-web.js" // wweb
import qrcode from 'qrcode-terminal'
import { ChatGPTAPI } from 'chatgpt' // chatgpt
import pkg from "whatsapp-web.js"
const {Client, LocalAuth} = pkg

// const client = new Client();
const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();
 
//variabel global
const GL_namaBot = "AoBot";
const GL_developer = "Agung"
const GL_prefix = "."
const GL_versiBot = "0.2.1 2023";
// End variabel global

// bagian Menu
client.on('message', (message) => {
    if (message.body.toLowerCase() === '.menu') {
      message.reply(
  `*AoBot by @AoGung shap melayani*
  ~~ Fitur ~~
  ‣ tag everyone: @everyone _(hati-hati)_
  ‣ Bikin stiker: .stiker _(kirim gambar beserta command-nya)_
  ‣ info: ao
  ‣ Main Menu: .menu
  ‣ Cek Ping server: .ping
  ‣ ChaGPT: .gpt (masukan pertanyaan)
  ‣ Fitur tambahan
  .sapa
  .hi
  .versi
  `);
    const media = MessageMedia.fromFilePath("img/hqdefault.jpg");
    client.sendMessage(message.from,media, {sendMediaAsSticker: true});
    }
  
  });

 // bagian summon
client.on("message", (m) => {
    if(m.body.toLowerCase() === "ao"){
      let date = new Date();
      let text = `Sekarang jam ${date.getHours()}:${date.getMinutes()} WIB`
      client.sendMessage( m.from, `Shap bos 🤡\nAda apa yah?`)
    }
  })
  
  // bagian cek versi 
  client.on("message", m => {
    if(m.body.toLowerCase() === ".versi"){
      m.reply(`${GL_developer} ‣ ${GL_namaBot} • ${GL_versiBot}`);
    }
  })

// bagian mention @everyone 
client.on('message', async (msg) => {
    if(msg.body === '@everyone') {
      const chat = await msg.getChat();
      
      let text = "";
      let mentions = [];
      
      for(let participant of chat.participants) {
        const contact = await client.getContactById(participant.id._serialized);
            
        mentions.push(contact);
        text += `@${participant.id.user} `;
      }
      
      await chat.sendMessage(text, { mentions });
    }
  });
  
  // bagian ping
  
  client.on('message', (message) => {
    if (message.body === '.ping') {
      let rand = Math.floor(Math.random()*1000);
      let text = `Pong! Lt ${rand}ms`
      message.reply(text);
    }
  });

// bagian bikin stiker 
client.on('message', async msg => {
    if(msg.hasMedia &&  msg.body.toLowerCase() === ".stiker") {
        const media = await msg.downloadMedia();
        // media setelah didonglot
        console.log("media downloaded")
        try {
          client.sendMessage(msg.from, media, {sendMediaAsSticker: true})
        } catch {
          client.sendMessage(msg.from, "Nope")
        }
         
    }
  });

  // test button

  // test dalle

  // Bagian chatGPT
  // apikey wisma23 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
client.on('message', (message) => {
  if (message.body.substring(0, 4) === '.gpt') {
    let context = message.body.substring(5, message.body.length)
    // client.sendMessage(`inisialisasi untuk "${context}"`)
    // message.reply(`triggered, konten: ${context}`);
    
      let balesan = chatgpt(context).then(n => {
        console.log(n)
        message.reply(n)
      })
      console.log(balesan)

    // message.reply(balesan)
  }
});

async function chatgpt(msg) {
  const api = new ChatGPTAPI({
    // apiKey: process.env.OPENAI_API_KEY
    apiKey: "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"
  })

  let res = await api.sendMessage(msg)
  // console.log(res.text)
  // message.reply(res.text)
  return res.text
}