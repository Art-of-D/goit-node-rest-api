import express from 'express';
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from '../controllers/contactsControllers.js';
import { isEmpty } from '../helpers/isEmpty.js';

const contactsRouter = express.Router();

contactsRouter.get('/', getAllContacts);

contactsRouter.get('/:id', getOneContact);

contactsRouter.delete('/:id', deleteContact);

contactsRouter.post('/', createContact);

contactsRouter.put('/:id', isEmpty, updateContact);

export default contactsRouter;
