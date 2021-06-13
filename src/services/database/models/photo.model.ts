import {Structure} from "./structure";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export interface Photo extends Structure{
  file_id: string,
  file_unique_id: string,
  file_size: number,
  width: number,
  height: number,
  user?: any,
  message?: any
}

const photoSchema = new mongoose.Schema({
  file_id: { type: String },
  file_unique_id: { type: String },
  file_size: { type: Number },
  width: { type: Number },
  height: { type: Number },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  message: {
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }
}, {
  timestamps: true,
});

export const PhotoModel = mongoose.model('Photo', photoSchema);