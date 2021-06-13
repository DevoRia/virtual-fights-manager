import {Structure} from "./structure";

const mongoose = require('mongoose');

export interface UserStructure extends Structure {
  _id?: string;
  id?: number;
  is_bot?: boolean;
  first_name?: string;
  username?: string;
  language_code?: string;
}

const userSchema = new mongoose.Schema({
  id: { type: Number },
  is_bot: { type: Boolean },
  first_name: { type: String },
  username: { type: String },
  language_code: { type: String },
}, {
  timestamps: true,
});

export const UserModel = mongoose.model('User', userSchema);