const contacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async({action, id, name, email, phone}) => {
  switch(action) {
    case 'list':
      const contactsList = await contacts.listContacts();
      console.table(contactsList);
      break;

    case 'get':
      const selectedContact = await contacts.getContactById(id);
      console.log(selectedContact);
      break;

    case 'remove':
      const deletedContact = await contacts.removeContact(id);
      console.log(deletedContact);
      break;

    case 'add':
      const newContact = await contacts.addContact({name, email, phone});
      console.log(newContact);
      break;

    default:
        console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);




