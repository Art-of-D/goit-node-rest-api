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
  favoriteContactSchema,
} from '../schemas/contactsSchemas.js';
import { errorHandling } from '../decorators/errorHandling.js';
import { responseWrapper } from '../decorators/responseWrapper.js';

export const getAllContacts = errorHandling(async (req, res, next) => {
  let filter;
  const fields = '';
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite = null } = req.query;
  favorite !== null ? (filter = { owner, favorite }) : (filter = { owner });
  const skip = (page - 1) * limit;
  const settings = { skip, limit };

  const list = await listContacts({ filter, fields, settings });
  responseWrapper(list, 404, res, 200);
});

export const getOneContact = errorHandling(async (req, res, next) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const contact = await getContactById({ owner, _id: id });
  responseWrapper(contact, 404, res, 200);
});

export const deleteContact = errorHandling(async (req, res, next) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const contact = await removeContact({ owner, _id: id });
  responseWrapper(contact, 404, res, 200);
});
export const createContact = errorHandling(async (req, res, next) => {
  const { _id: owner } = req.user;
  const validate = validateBody(createContactSchema);
  await validate(req, res, next);
  const { name, email, phone } = req.body;

  const contact = await addContact({ name, email, phone, owner });
  responseWrapper(contact, 404, res, 201);
});

export const updateContact = errorHandling(async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const validate = validateBody(updateContactSchema);
  await validate(req, res, next);

  const contact = await updateContactById({ owner, _id: id }, req.body);
  responseWrapper(contact, 404, res, 200);
});

export const updateStatusContact = errorHandling(async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const validate = validateBody(favoriteContactSchema);
  await validate(req, res, next);

  const { favorite } = req.body;
  const contact = await updateContactById({ owner, _id: id }, { favorite });
  responseWrapper(contact, 404, res, 200);
});

export default {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
};
