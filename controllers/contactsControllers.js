import {
  getContactById,
  listContacts,
  removeContact,
  addContact,
  updateContactById,
} from '../services/contactsServices.js';
import validateBody from '../helpers/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../schemas/contactsSchemas.js';
import { errorHandling } from '../helpers/errorHandling.js';
import { responseWrapper } from '../helpers/responseWrapper.js';

export const getAllContacts = errorHandling(async (req, res, next) => {
  const list = await listContacts();
  responseWrapper(list, 404, res, 200);
});

export const getOneContact = errorHandling(async (req, res, next) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  responseWrapper(contact, 404, res, 200);
});

export const deleteContact = errorHandling(async (req, res, next) => {
  const { id } = req.params;
  const contact = await removeContact(id);
  responseWrapper(contact, 404, res, 200);
});
export const createContact = errorHandling(async (req, res, next) => {
  const { name, email, phone } = req.body;
  const validate = validateBody(createContactSchema);
  await validate(req, res, next);

  const contact = await addContact(name, email, phone);
  responseWrapper(contact, 404, res, 201);
});

export const updateContact = errorHandling(async (req, res, next) => {
  const { id } = req.params;
  const validate = validateBody(updateContactSchema);
  await validate(req, res, next);
  const contact = await updateContactById(id, req.body);
  responseWrapper(contact, 404, res, 200);
});

export default {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
