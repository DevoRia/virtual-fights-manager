import {Bot} from "./modules/bot";
import {MongoConnector} from "./services/database/mongoose";

const token: string = process.env.TOKEN as string;
const mongoUrl: string = process.env.DATABASE as string;

class Application {
  
  private readonly bot: Bot;
  private mongo: MongoConnector;
  
  constructor() {
    this.bot = new Bot(token);
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
      console.log(message);
    })
  }
}

new Application()
  .start();