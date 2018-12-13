# MainLibraryBusyBot
An unofficial Telegram bot to check how busy the University of Edinburgh's Main Library is. [Check it out!](https://t.me/MainLibraryBusyBot)

## Install
```bash
git clone https://github.com/idmyn/MainLibraryBusyBot
cd MainLibraryBusyBot
npm install
```

## Usage
```bash
node busy.js
```

## Caveats
Running ```node db-update.js``` should update (or create) your local database file, but it currently needs to be manually ran periodically, and has no interaction with the bot. I plan to link the bot and database soon, such that ```node busy.js``` will magically read and update the database regularly in the background!

## Credits
This bot was built with the [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) and [the data referenced in this bot](https://www.ed.ac.uk/information-services/library-museum-gallery) is generously publicised by The University of Edinburgh.
