import {Photo} from "./photo.model";
import {Structure} from "./structure";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export interface Document extends Structure{
  file_name: string,
  mime_type: string,
  file_id: string,
  file_unique_id: string,
  file_size: number,
  thumb?: Photo,
  user?: any,
  message?: any
}

const documentSchema = new mongoose.Schema({
  file_name: { type: String },
  mime_type: { type: String },
  file_id: { type: String },
  file_unique_id: { type: String },
  file_size: { type: Number },
  thumb_file_id: { type: String },
  thumb_unique_id: { type: String },
  thumb_file_size: { type: Number },
  thumb_width: { type: Number },
  thumb_height: { type: Number },
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

export const DocumentModel = mongoose.model('Document', documentSchema);