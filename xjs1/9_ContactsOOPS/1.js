class contactApp{
    constructor(){
        this.contacts = [];
    }
    addContact(contact){
        this.contacts.push(contact);
    }
    getContacts(){
        this.contacts.forEach(contact => {
            console.log(`Name: ${contact.name}, Phone: ${contact.phone} ${contact.img ? ', Image: ' + contact.img : ''}`);
        })
    }
}
class contact{
    constructor(name, phone,img){
        this.name = name;
        this.phone = phone;
        this.img = img; // Assuming img is a URL or path to an image // Assuming img is a URL or path to an image
    }
}
mobile = new contactApp
harshita = new contact("Harshita", "1234567890");
harsh = new contact("harsh", "0987654321");
samar = new contact("samar", "1122334455");
akshit = new contact("akshit", "5566778899");
adi = new contact("adi", "9988776655");

mobile.addContact(harshita);
mobile.addContact(harsh);
mobile.addContact(samar);
mobile.addContact(akshit);
mobile.addContact(adi);
mobile.getContacts()