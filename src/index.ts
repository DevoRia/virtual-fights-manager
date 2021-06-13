import {Bot} from "./modules/bot";
import {MongoConnector} from "./services/database/mongoose";
import {Persistance} from "./services/persistance";

const token: string = process.env.TOKEN as string;
const mongoUrl: string = process.env.DATABASE as string;

class Application {
  
  private readonly bot: Bot;
  private mongo: MongoConnector;
  
  constructor() {
    const persistance = new Persistance();
    this.bot = new Bot(token, persistance);
    this.mongo = new MongoConnector();
  }
  
  async start() {
    await this.init();
    setImmediate(() => this.main());
  }
  
  
  private async init(): Promise<void> {
    try {
      await this.mongo.init(mongoUrl);
    } catch (e) {
      console.error(e)
    }
  }
  
  private main(): void {
    this.bot.onMessage(message => {
      this.bot.sendMessage(message.chat.id, 'I am working!')
    })
  }
}

new Application()
  .start();