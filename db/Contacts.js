import { Schema, model } from 'mongoose';
import { handleChangeError } from './hooks.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

contactSchema.post('save', handleChangeError);

contactSchema.post('findOneAndUpdate', handleChangeError);

const Contacts = model('contacts', contactSchema);

export default Contacts;
