import {Message} from "../interfaces/message";

const TelegramBot = require('node-telegram-bot-api');

export class Bot {

private readonly bot: any;

  constructor(private token: string) {
    this.bot = new TelegramBot(token, {polling: true});
  }
  
  getBot(): Bot {
    return this.bot;
  }
  
  sendMessage(chatId: number, message: string) {
    this.bot.sendMessage(chatId, message);
  }
  
  onMessage(handler: (message: Message) => void): void {
    this.bot.on('message', handler);
  }
}