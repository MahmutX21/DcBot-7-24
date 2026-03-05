const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ] 
});

// Değişen satır:
const token = process.env.TOKEN;

if (!token) {
  console.error('❌ TOKEN environment variable bulunamadı!');
  process.exit(1);
}

client.once('ready', () => {
  console.log(`✅ ${client.user.tag} olarak giriş yapıldı ve aktif!`);
  client.user.setPresence({ 
    activities: [{ name: 'Railway üzerinde', type: 3 }],
    status: 'online' 
  });
});

client.on('messageCreate', message => {
  if (message.author.bot) return;
  if (message.content === '!ping') {
    message.reply('Pong! Bot aktif.');
  }
});

client.on('disconnect', () => {
  console.log('⚠️ Bot bağlantısı kesildi, yeniden başlatılıyor...');
  process.exit(1);
});

client.on('error', console.error);

client.login(token).catch(err => {
  console.error('❌ Giriş yapılamadı:', err.message);
  process.exit(1);
});
