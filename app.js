const prompt = require('prompt-sync')();

// const username = prompt('What is your name? ');

// console.log(`Your name is ${username}`);const prompt = require('prompt-sync')();

// const username = prompt('What is your name? ');

// console.log(`Your name is ${username}`);
const mongoose = require('mongoose')
const Customers = require('./models/Customers')
const dotenv = require('dotenv');
// const { log } = require('console');
dotenv.config()

const connect = async () =>{
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('connection is successful')
}

connect();
console.log("Welcome to the Customer Application!");

const displayMenu =  () =>{
    console.log("\nWhat would you like to do?")
    console.log(" 1. Create a customer");
    console.log(" 2. View all customers");
    console.log(" 3. Update a customer");
    console.log(" 4. Delete a customer");
    console.log(" 5. Quit");
   
}
const display = async ()=> {
    displayMenu();
    const userAction = prompt ("Number of action to run :")

    switch (userAction) {
        case '1':
            await createCustomer();
            break;
        case '2':
            await viewCustomers(); 
            break; 
        case '3':
            await updateCustomer();
            break;
            case '4':
                await deleteCustomer();
                break;
              case '5':
                console.log("Quitting application.");
                await mongoose.disconnect(); 
                process.exit(); 
                mongoose.disconnect();
                return;

    }
}


const createCustomer = async () =>{
    const name = prompt ("Enter Customer name:")
     const age = prompt ("Enter Customer age:")
    // const age = parseInt(prompt("Enter Customer age: "), 10);

    const customer = new Customers ({ name, age })
    await customer.save();
    console.log("Customer created successfully")
}

const viewCustomers = async ()=>{
    console.log ("\nCustomer List")
    const customers = await Customers.find();
    if (customers.length === 0){
        console.log("No customers found")

    }else {
        customers.forEach((customer, index) => {
            console.log(`${index + 1}. ID: ${customer._id}, Name: ${customer.name}, Age: ${customer.age}`);
        });
    }
   
}

const updateCustomer = async () => {
    await viewCustomers();
    const id = prompt("\nCopy and paste the id of the customer you would like to update here: ");
    const existingCustomer = await Customers.findById(id);
  
    if (existingCustomer) {
      const newCustomerName = prompt("What is the customer's new name? ");
      const newCustomerAge = prompt('What is the customers new age?')
  
      existingCustomer.name = newCustomerName;
      existingCustomer.age = newCustomerAge;
  
      await existingCustomer.save();
      console.log('Record updated successfully');
      await viewCustomers();
    } else {
      console.log('Customer not found. Please try again.');
    }
  
    await display();
  };
  const deleteCustomer = async () => {
    await viewCustomers();
    const id = prompt("\nCopy and paste the id of the customer you would like to delete here: ");
    const customerToDelete = await Customers.findById(id);
  
    if (customerToDelete) {
      await Customers.findByIdAndDelete(id);
      console.log("Customer deleted successfully.");
      await viewCustomers();
    } else {
      console.log("Customer not found. Please try again.");
    }
  
    
  };

display();