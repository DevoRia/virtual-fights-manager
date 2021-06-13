import {Message} from "../interfaces/message";
import {GroupStructure} from "../services/database/models/group.model";
import {UserStructure} from "../services/database/models/user.model";
import {MessageStructure} from "../services/database/models/message.model";

export class Utils {
  static getChatId(message: Message): number {
    return message.chat.id;
  }

  static getFirstName(message: Message): string {
    return message.from.first_name;
  }

  static mapGroup(message: Message): GroupStructure {
    return {
      id: message.chat.id,
      title: message.chat.title,
    }
  }

  static mapUser(message: Message): UserStructure {
    return {
      id: message.from.id,
      first_name: message.from.first_name,
      is_bot: message.from.is_bot,
      username: message.from.username,
      language_code: message.from.language_code,
    }
  }

  static mapMessage(message: Message, user?: any, group?: any): MessageStructure {
    return {
      message_id: message.message_id,
      text: message.text,
      date: message.date,
      group: group ? group._id : undefined,
      user: user ? user._id : undefined,
    }
  }

}