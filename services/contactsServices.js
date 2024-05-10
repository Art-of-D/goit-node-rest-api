import fs from 'fs/promises';
import path from 'path';
import { default as detectEncodeLanguage } from 'detect-file-encoding-and-language';
import { v4 as uuidv4 } from 'uuid';

const contactsPath = path.resolve('db', 'contacts.json');
const encoding = detectEncodeLanguage(contactsPath);

const readFile = async () => {
  const data = await fs.readFile(contactsPath, encoding);
  if (!data) {
    return [];
  }
  return JSON.parse(data);
};

const writeFile = async data => {
  await fs.writeFile(contactsPath, JSON.stringify(data), encoding);
};

async function listContacts() {
  return await readFile();
}

async function getContactById(contactId) {
  const list = await readFile();

  const contact = list.filter(contact => {
    return contact.id === contactId;
  });
  if (contact.length > 0) {
    return contact[0];
  }
  return null;
}

async function removeContact(contactId) {
  const list = await readFile();

  const contactIndex = list.findIndex(contact => contact.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  const contact = list[contactIndex];
  list.splice(contactIndex, 1);
  await writeFile(list);
  return contact;
}

async function addContact(name, email, phone) {
  const newContact = { id: uuidv4(), name, email, phone };
  const list = await readFile();
  list.push(newContact);
  writeFile(list);
  return getContactById(newContact.id);
}

async function updateContactById(id, data) {
  const list = await readFile();
  const updatedList = list.map(element => {
    if (element && element.id === id) {
      return {
        ...element,
        ...data,
      };
    }
    return element;
  });
  await writeFile(updatedList);
  return getContactById(id);
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
