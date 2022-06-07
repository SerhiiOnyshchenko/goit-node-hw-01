import path, { parse } from 'path';
import fs from 'fs/promises';

const contactsPath = path.resolve('./db/contacts.json');

export const listContacts = async () => {
   try {
      const dataString = await fs.readFile(contactsPath, 'utf8');
      const data = JSON.parse(dataString);
      return data;
   } catch (error) {
      console.error(error);
   }
};

export const getContactById = async contactId => {
   try {
      const data = await listContacts();
      const file = data.filter(({ id }) => id === String(contactId));
      console.table(file);
   } catch (error) {
      console.error(error);
   }
};

export const removeContact = async contactId => {
   try {
      const data = await listContacts();
      const newData = data.filter(({ id }) => id !== String(contactId));
      await fs.writeFile(contactsPath, JSON.stringify(newData), 'utf8');
   } catch (error) {
      console.error(error);
   }
};

export const addContact = async (id, name, email, phone) => {
   try {
      const data = await listContacts();
      const newContact = { id, name, email, phone };
      data.push(newContact);

      await fs.writeFile(contactsPath, JSON.stringify(data), 'utf8');
   } catch (error) {
      console.error(error);
   }
};
