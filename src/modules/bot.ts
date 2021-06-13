import {Message} from "../interfaces/message";
import {Persistance} from "../services/persistance";
import {Utils} from "./message.utils";
import {MessageModel, MessageStructure} from "../services/database/models/message.model";
import {UserModel, UserStructure} from "../services/database/models/user.model";
import moment from "moment";
const mongoose = require('mongoose');
import {PhotoModel} from "../services/database/models/photo.model";
import {DocumentModel} from "../services/database/models/document.model";

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
      const userStructure = Utils.mapUser(message);
      const messageStructure = Utils.mapMessage(message);
      handler(message);
      await this.persistMessage(userStructure, messageStructure);
      this.messageLog(userStructure, messageStructure);
    });
  }
  
  async persistMessage(userStructure: UserStructure, messageStructure: MessageStructure): Promise<void> {
    const user = await this.persistance.upsert(userStructure, UserModel);
  
    const messageId = mongoose.Types.ObjectId();
  
    (messageStructure.photos || []).map(async photo => {
      await this.persistance.save({ user: user._id, message: messageId, ...photo}, PhotoModel);
    });
    
    (messageStructure.documents || []).map(async document => {
      await this.persistance.save({ user: user._id, message: messageId, ...document}, DocumentModel);
    });
  
    await this.persistance.save({_id: messageId, user: user._id, ...messageStructure}, MessageModel);
  }
  
  messageLog(userStructure: UserStructure, messageStructure: MessageStructure): void {
    console.log(moment().format('YYYY-MM-DD HH:mm:ss'), '|',
      userStructure.id,
      userStructure.first_name, '|',
      messageStructure.message_id,
      messageStructure.text
        ? messageStructure.text
        : messageStructure.photos || messageStructure.documents
          ? 'Attachment'
          : 'NONE'
    );
  }
}