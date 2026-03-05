const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent // Mesaj içeriğini okumak için gerekli
  ] 
});

const token = process.env.DISCORD_TOKEN; // Railway'de environment variable olarak tanımlanacak

client.once('ready', () => {
  console.log(`${client.user.tag} olarak giriş yapıldı ve aktif!`);
  // Botun durumunu ayarla (opsiyonel)
  client.user.setPresence({ 
    activities: [{ name: 'Railway üzerinde', type: 3 }], // type 3 = WATCHING
    status: 'online' 
  });
});

// Basit bir komut: !ping yazana pong cevabı verir (botun çalıştığını test etmek için)
client.on('messageCreate', message => {
  if (message.author.bot) return;
  if (message.content === '!ping') {
    message.reply('Pong! Bot aktif.');
  }
});

// Bağlantı koptuğunda Railway'in yeniden başlatması için process'ten çık
client.on('disconnect', () => {
  console.log('Bot bağlantısı kesildi, yeniden bağlanılıyor...');
  process.exit(1);
});

// Hataları logla
client.on('error', console.error);

client.login(token);
