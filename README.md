# MainLibraryBusyBot
An unofficial Telegram bot to check how busy the University of Edinburgh's Main Library is.

## Caveats
```npm start``` starts the chatbot and database-updater concurrently, but there is currently no interaction between the two: the chatbot looks up data from the university each time a request is made. The database-updater was a very crude implementation upon which I wanted to add historical data lookup. I'm not sure I'll ever get around to doing that...

## Credits
This bot was built with the [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) and [the data referenced in this bot](https://www.ed.ac.uk/information-services/library-museum-gallery) is generously publicised by The University of Edinburgh.
