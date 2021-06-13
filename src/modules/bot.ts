import {Message} from "../interfaces/message";
import {Persistance} from "../services/persistance";
import {Utils} from "./message.utils";
import {MessageModel} from "../services/database/models/message.model";
import {UserModel} from "../services/database/models/user.model";

const TelegramBot = require('node-telegram-bot-api');

export class Bot {

  private readonly bot: any;

  constructor(private token: string, private readonly persistance: Persistance) {
    this.bot = new TelegramBot(token, {polling: true});
  }
  
  getBot(): Bot {
    return this.bot;
  }
  
  sendMessage(chatId: number, message: string) {
    this.bot.sendMessage(chatId, message);
  }
  
  onMessage(handler: (message: Message) => void): void {
    this.bot.on('message', async (message: Message) => {
      handler(message);
      await this.persistMessage(message);
    });
  }
  
  async persistMessage(message: Message) {
    const user = await this.persistance.upsert(Utils.mapUser(message), UserModel);
    await this.persistance.save(Utils.mapMessage(message, user), MessageModel);
  }
}