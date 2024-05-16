import express from 'express';
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from '../controllers/contactsControllers.js';
import isIdValid from '../helpers/isIdValid.js';
import isEmpty from '../helpers/isEmpty.js';

const contactsRouter = express.Router();

contactsRouter.get('/', getAllContacts);

contactsRouter.get('/:id', isIdValid, getOneContact);

contactsRouter.delete('/:id', isIdValid, deleteContact);

contactsRouter.post('/', createContact);

contactsRouter.put('/:id', isIdValid, isEmpty, updateContact);

contactsRouter.patch('/:id/favorite', isIdValid, isEmpty, updateStatusContact);

export default contactsRouter;
