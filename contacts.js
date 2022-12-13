const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');

const contactsPath = path.normalize('./db/contacts.json');

const listContacts = async () => {
    try {
      const response = await fs.readFile(contactsPath, 'utf-8');
      const contacts = JSON.parse(response);    
      return contacts;
    } catch (error) {
      console.log(error);
    }  
}  
  
  
const getContactById = async(id) => {
    try {
      const contacts = await listContacts();
      const selectedContact = contacts.find(contact => contact.id === id);
      return selectedContact || null;
    } catch (error) {
      console.log(error);
    }  
}
  
const removeContact = async(id) => {
     try {
        const contacts = await listContacts();
        const deletedContactIndex = contacts.findIndex(contact => contact.id === id);
        if (deletedContactIndex === -1) {
          return null;
        }
    
        const deletedContact = contacts.splice(deletedContactIndex, 1);
    
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return deletedContact;
     } catch (error) {
        console.log(error);
    }  
}
  
const addContact = async({name, email, phone}) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}