const fs = require("fs/promises")
const path = require("path")
const { nanoid } = require('nanoid');

const dbPath = path.join(__dirname, 'db', 'contacts.json')


async function listContacts() {
    const allContacts = await fs.readFile(dbPath)
    return JSON.parse(allContacts)
}

async function getContactById(contactId) {
    const allContacts = await listContacts();
    const contactById = allContacts.find(el => el.id === contactId)
    console.log(contactById)
    return contactById
}

async function removeContact(contactId) {
    const allContacts = await listContacts();
    const index = allContacts.findIndex(el => el.id === contactId)
    const [results] = allContacts.splice(index, 1)
    fs.writeFile(dbPath, JSON.stringify(allContacts, null, 2))
    return console.log('deleted contact', results)
}

async function addContact(name, email, phone) {
    const allContacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    const updatedContacts = [...allContacts, newContact]
    fs.writeFile(dbPath, JSON.stringify(updatedContacts, null, 2))
    return newContact;
}



module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}