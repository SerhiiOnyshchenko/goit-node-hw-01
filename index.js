import {
   listContacts,
   addContact,
   removeContact,
   getContactById,
} from './contacts.js';
import { nanoid } from 'nanoid';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv)).argv;

async function invokeAction({ action, id, name, email, phone }) {
   switch (action) {
      case 'list':
         console.table(await listContacts());
         break;

      case 'get':
         getContactById(id);
         break;

      case 'add':
         const newId = nanoid(4);
         addContact(newId, name, email, phone);
         break;

      case 'remove':
         removeContact(id);
         break;

      default:
         console.warn('\x1B[31m Unknown action type!');
   }
}

invokeAction(argv);
