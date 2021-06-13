const mongoose = require('mongoose');

export class MongoConnector {

  constructor() {
  }

  init(url: string): Promise<void> {
    return new Promise((resolve, reject) =>
      mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }, (err: any) => {
        if (err) reject('Mongo connection throws an error:  ' + err);
        console.log('Mongo connected!')
        resolve();
      })
    );
  }

}