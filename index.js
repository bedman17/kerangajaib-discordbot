const Discord = require('discord.js');
const db = require('quick.db');
const bot = new Discord.Client({
  disableEveryone: true
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

bot.on('ready', async () => {
  console.log(`Puja bot ${bot.user.username} ulululu`);
  setInterval(function() {
    bot.user.setPresence({ game: { name: `${bot.guilds.size} servers`, type: 'Watching' }, status: 'online' });
  }, 10000)
});

bot.on('message', async message => {
  if (message.author.bot) return;
  let msg = message.content.toLowerCase();
  msg = msg.replace(/[^a-zA-Z ]/g, "");
  if (msg == 'apakah' || msg == 'apakah bisa' || msg == 'apakah benar') return;
  if (msg.startsWith('apakah')) {
    console.log(`${message.author.tag} menanyakan '${message.content}'`)
    let checkquestionindb = await db.fetch(msg.toString());
    if (checkquestionindb == null) {
      if (msg.includes('bisa')) {
        if (`${getRandomInt(1, 100)}` % 2 === 0) {
          message.reply('Bisa')
          db.set(msg.toString(), {
            answer: 'Bisa',
            askedby: `${message.author.tag}`
          })
          console.log(`Pertanyaan ini ditambahkan kedalam database dengan jawaban 'Bisa'`)
        } else {
          message.reply('Gak')
          db.set(msg.toString(), {
            answer: 'Gak',
            askedby: `${message.author.tag}`
          })
          console.log(`Pertanyaan ini ditambahkan kedalam database dengan jawaban 'Gak'`)
        }
      } else if (msg.includes('benar')) {
        if (`${getRandomInt(1, 100)}` % 2 === 0) {
          message.reply('Benar')
          db.set(msg.toString(), {
            answer: 'Benar',
            askedby: `${message.author.tag}`
          })
          console.log(`Pertanyaan ini ditambahkan kedalam database dengan jawaban 'Benar'`)
        } else {
          message.reply('Salah')
          db.set(msg.toString(), {
            answer: 'Salah',
            askedby: `${message.author.tag}`
          })
          console.log(`Pertanyaan ini ditambahkan kedalam database dengan jawaban 'Salah'`)
        }
      } else if (msg.includes('pernah')) {
        if (`${getRandomInt(1, 100)}` % 2 === 0) {
          message.reply('Pernah')
          db.set(msg.toString(), {
            answer: 'Pernah',
            askedby: `${message.author.tag}`
          })
          console.log(`Pertanyaan ini ditambahkan kedalam database dengan jawaban 'Pernah'`)
        } else {
          message.reply('Nggak')
          db.set(msg.toString(), {
            answer: 'Nggak',
            askedby: `${message.author.tag}`
          })
          console.log(`Pertanyaan ini ditambahkan kedalam database dengan jawaban 'Nggak'`)
        }
      } else {
        if (`${getRandomInt(1, 100)}` % 2 === 0) {
          message.reply('Iya')
          db.set(msg.toString(), {
            answer: 'Iya',
            askedby: `${message.author.tag}`
          })
          console.log(`Pertanyaan ini ditambahkan kedalam database dengan jawaban 'Iya'`)
        } else {
          message.reply('Tidak')
          db.set(msg.toString(), {
            answer: 'Tidak',
            askedby: `${message.author.tag}`
          })
          console.log(`Pertanyaan ini ditambahkan kedalam database dengan jawaban 'Tidak'`)
        }
      }
    } else {
      let jawaban = await db.fetch(msg.toString(), {
        target: '.answer'
      })
      let penanya = await db.fetch(msg.toString(), {
        target: '.askedby'
      })
      message.reply(jawaban)
      console.log(`Pertanyaan ini sudah ada didalam database. Pertama kali ditanyakan oleh ` + penanya)
      console.log("Kerang ajaib akan selalu menjawab pertanyaan ini dengan jawaban '" + jawaban + "'")
    }
  }
  if (message.channel.type === 'dm' && message.author.tag === process.env.OWNER_ID) {
    if (message.content.startsWith('sudo')) {
      let args = message.content.slice('sudo'.length).trim().split('//')
      args[1] = args[1].toLowerCase();
      args[1] = args[1].replace(/[^a-zA-Z ]/g, "");
      db.set(args[1].toString(), args[2].toString(), {
        target: '.answer'
      })
    }
  }
});
bot.login(process.env.BOT_TOKEN);
