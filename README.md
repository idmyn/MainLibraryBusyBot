# MainLibraryBusyBot
An unofficial Telegram bot to check how busy the University of Edinburgh's Main Library is. **This bot is currently offline** because the University have (understandably) stopped updating the library occupancy data during the Summer break.

## Install
```bash
git clone https://github.com/idmyn/MainLibraryBusyBot
cd MainLibraryBusyBot
npm install
```
NOTE: you'll need to edit chat.js with your Telegram Bot API token for it to work. You can obtain this by talking to [@botfather](t.me/BotFather).

## Usage
```bash
npm start
```

## Caveats
```npm start``` should start the chatbot and database-updater concurrently, but there is currently no interaction between the two: the chatbot looks up data from the university each time a request is made.

I plan to add historical data lookup to the chatbot soon!

## Credits
This bot was built with the [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) and [the data referenced in this bot](https://www.ed.ac.uk/information-services/library-museum-gallery) is generously publicised by The University of Edinburgh.
