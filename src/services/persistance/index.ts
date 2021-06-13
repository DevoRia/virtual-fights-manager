import {Structure} from "../database/models/structure";

export class Persistance {
  
  async save(entity: Structure, model: any): Promise<any> {
    return await new model(entity).save();
  }
  
  async upsert(entity: Structure, model: any) {
  
    const query: any = {};
  
    if (entity.id) {
      query.id = entity.id;
    } else {
      return;
    }
    
    const update = entity;
    const options: any = {upsert: true, new: true, setDefaultsOnInsert: true};
    return await model.findOneAndUpdate(query, update, options);
  }
}