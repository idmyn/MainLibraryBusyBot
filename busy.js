process.env.NTBA_FIX_319 = 1
// prevents error message (https://github.com/yagop/node-telegram-bot-api/issues/540)

const TelegramBot = require('node-telegram-bot-api')

// replace the value below with the Telegram token you receive from @BotFather
const token = 'TOKEN'

const bot = new TelegramBot(token, {polling: true})

// here we go!
bot.onText(/./, (msg) => {

  // is the user asking for help?
  if (/help/i.test(msg.text)) {
    const help = `
This is bot to check how busy the University of Edinburgh's Main Library is. \
You prompted this response by sending a message containing 'help'. \
Any message without the word 'help' should trigger a response with \
information about how busy the library is.

*If you're in a group chat, you'll need to prefix commands \
with a forward slash* (try '/busy').

If you have any problems, or further questions, get in touch! \
My email address is hello@davidmyno.rs 👨‍💻
    `
    bot.sendMessage(msg.chat.id, help, {parse_mode: 'Markdown'})
  }

  // I guess they're not asking for help...
  else {
    const request = require('request')
    request.get('https://lac-edwebtools.is.ed.ac.uk/discovered/occupy/MainLibrary.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const obj = JSON.parse(body)

            // the percentage and "level" aren't always in the same place
            let i = 0
            while (obj.states[i].percent === undefined && i < 4){
              i++
            }

            const time = obj.time
            const percent = obj.states[i].percent + '%'

            let level = obj.states[i].level
            if (obj.states[i].level === 'increasing') {
              level = '(and ' + level + ').'
            } else {
              level = '(but ' + level + '!)'
            }

            const data = 'As of ' + time + ' the library is *' +
                         percent + ' full* ' + level

            const aside = "\nNeed help? Type 'help'!"
            const response = data + aside

            bot.sendMessage(msg.chat.id, response, {parse_mode: 'Markdown'})
        } else {
          const error = "Something's gone wrong... Please contact hello@davidmyno.rs"
          bot.sendMessage(msg.chat.id, error)
        }
    })
  }
})
