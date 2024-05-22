import Contact from '../db/Contact.js';

async function listContacts({ filter, fields, settings }) {
  return await Contact.find(filter, fields, settings).populate(
    'owner',
    'email subscription'
  );
}

async function getContactById(filter) {
  const contact = await Contact.findOne(filter);
  if (contact) {
    return contact;
  }
  return null;
}

async function removeContact(filter) {
  const resp = await Contact.findOneAndDelete(filter);
  if (resp) {
    return resp;
  }
  return null;
}

async function addContact({ name, email, phone, owner }) {
  const resp = await Contact.create({ name, email, phone, owner });
  if (resp) {
    return resp;
  }
  return null;
}

async function updateContactById(filter, data) {
  const resp = await Contact.findOneAndUpdate(filter, data, {
    new: true,
    runValidators: true,
  });
  if (resp) {
    return resp;
  }
  return null;
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
