var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(error) {
  if (error) throw error;
  // console.log("connected as id " + connection.threadId);
  displayProducts();
});


// read/SELECT (display) your table's content
function displayProducts() {
  connection.query("SELECT * FROM products", function (error, results, fields) {
    if (error) throw error;
    console.log("\n~~~~~~~~~~~~~~~~~~~~Bamazon Products~~~~~~~~~~~~~~~~~~~~");
    for (var i = 0; i < results.length; i++) {
      console.log("Product ID: " + results[i].item_id + " | Product: " + results[i].product_name + " | Price: " + results[i].price);
    }
    console.log("~~~~~~~~~~~~~~~~~~~~Bamazon Products~~~~~~~~~~~~~~~~~~~~\n");
    chooseProduct();
  });
};

var chooseProduct = function() {
  inquirer.prompt({
    name: "productChoice",
    type: "input",
    message: "Please input the ID of the product you wish to purchase: "
  }).then(function(input) {
    console.log(input.productChoice)
    var query = connection.query("SELECT item_id, product_name FROM products WHERE ?",
    {
      item_id: input.productChoice
    }, function (error, results, fields) {
      // console.log(error);
      // console.log(results);
    })
    console.log(query);
  })
}

// The app should then prompt users with 2 messages:
// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.