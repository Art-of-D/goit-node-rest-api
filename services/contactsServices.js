import Contacts from '../db/Contacts.js';

async function listContacts() {
  return await Contacts.find({});
}

async function getContactById(contactId) {
  const contact = await Contacts.findById(contactId);
  if (contact) {
    return contact;
  }
  return null;
}

async function removeContact(contactId) {
  const resp = await Contacts.findByIdAndDelete({ _id: contactId });
  if (resp) {
    return resp;
  }
  return null;
}

async function addContact(name, email, phone, favorite = false) {
  const resp = await Contacts.create({ name, email, phone, favorite });
  if (resp) {
    return resp;
  }
  return null;
}

async function updateContactById(id, data) {
  const resp = await Contacts.findByIdAndUpdate(id, data, {
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
