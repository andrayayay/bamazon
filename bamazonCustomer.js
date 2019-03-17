// Make sure you save and require the MySQL and Inquirer npm packages
var mysql = require('mysql');
var inquirer = require('inquirer');

// Bamazon will...
    // take in orders from customers &
    // deplete stock from the store's inventory

// create connection for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(err){
    if(err)throw err;
    // console.log("It works");
    promptUsers();
});

// First we need to display all items for sale and
// Promt users 
    // ask users the ID of the product they would like to buy
    // ask how many units of the product?
function promptUsers(){
    inquirer
        .prompt({
            name: "bamazon",
            type: "list",
            message: "~~~~~* Browse through our inventory or make a purchase on BAMAZON *~~~~~",
            choices: ["Browse", "Purchase", "Exit"]
        })

        .then(function(answer){
            if (answer.bamazon === "Browse"){
                // console.log("Here's our current inventory..."); 
                browseInventory();
            }

            else if (answer.bamazon === "Purchase"){
                // console.log("Please type the ID of the item you want to buy"); 
                purchase();
            }

            else{
               connection.end();
            }
        })
    }

function browseInventory(){
    var queryStr = 'SELECT * FROM products';
    connection.query(queryStr, function(err,data){
        if (err) throw err;
        console.log("Here's our current inventory");
        console.log('----------------------------');
        var strOut = '';
		for (var i = 0; i < data.length; i++) {
			strOut = '';
            strOut += 'Product Name: ' + data[i].product_name + '  ||  ';
            strOut += 'ID: ' + data[i].id + '  ||  ';
			strOut += 'Department: ' + data[i].department_name + '  ||  ';
            strOut += 'Price: $' + data[i].price + ' || ';
            strOut += 'Stock Quantity: ' + data[i].stock_quantity + ' units' + '\n';

			console.log(strOut);
		}

	  	console.log("--------------------------------------------------------");

          inquirer
          .prompt({
              name: "exit",
              type: "list",
              message: "Scroll up to view inventory. Would you like to make a purchase now?",
              choices: ["Yes", "No"]
          })
          .then(function(answer){
            if (answer.exit === "Yes"){
                purchase();
            }
            else{
                console.log("Thanks for looking. Come again soon.")
                connection.end();
             }
        })
    })
}
       

function purchase(){
    // query mySQL for all items in inventory
    connection.query("SELECT * FROM products", function(err,results){
        if (err) throw err;
    
        inquirer
            .prompt([
                {
                name: "choice",
                type: "rawlist",
                choices: function() {
                    var inventory = [];
                    for (var i = 0; i < results.length; i++){
                        inventory.push(results[i].product_name);
                    }
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    console.log("Here's Bamazon's inventory...");
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    console.log("*** Please remember your order's id number as you will need it to checkout ***");
                    return inventory;
                },
            },
            {
                type: 'input',
                name: 'item_id',
                message: 'Please confirm by entering the ID for the item you would like to purchase.',
            },
            {
                type: 'input',
                name: 'quantity',
                message: 'How many do you need?',
            }
    
            ])
            .then(function(input) {
            // console.log('Customer has selected: \n    item_id = '  + input.item_id + '\n    quantity = ' + input.quantity);
    
            var item = input.item_id;
            var quantity = input.quantity;
    
            // Query db to confirm that the given item ID exists in the desired quantity
            var queryStr = 'SELECT * FROM products WHERE ?';
    
            connection.query(queryStr, {id: item}, function(err, data) {
                if (err) throw err;
    
                else {
                    var productData = data[0];

                    // to see the product data for the product the user selected
                    // console.log('productData = ' + JSON.stringify(productData));
                    // console.log('productData.stock_quantity = ' + productData.stock_quantity);
    
                    // If the quantity requested by the user is in stock
                    if (quantity <= productData.stock_quantity) {
                        console.log('Congratulations, the product you requested is in stock! Placing order!');
    
                        // Construct the updating query string
                        var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE id = ' + item;
                        
                        // this will show us that it subtracted the order amount from mysql
                        // console.log('updateQueryStr = ' + updateQueryStr);
    
                        // Update the inventory
                        connection.query(updateQueryStr, function(err, data) {
                            if (err) throw err;
    
                            console.log('Your order has been placed! Your total is $' + productData.price * quantity);
                            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                            console.log('Thank you for shopping with us!');
    
                            // End the database connection
                            connection.end();
                        })
                        // Check if there's enough product in stock
                        // if not, console.log
                    } else {
                        console.log('Sorry, there is not enough of that item in stock.');
                        console.log('Please modify your order.');
    
                        displayInventory();
                    }
                }
            })
        })
    })
}
                
                
                

    