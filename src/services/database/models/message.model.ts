import {Structure} from "./structure";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export interface MessageStructure extends Structure {
  _id?: string;
  date?: number | Date;
  message_id?: number;
  text?: string;
  user?: string;
  group?: string;
}

const messageSchema = new mongoose.Schema({
  date: { type: Date },
  message_id: { type: Number },
  text: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group'
  }
}, {
  timestamps: true,
});

export const MessageModel = mongoose.model('Message', messageSchema);