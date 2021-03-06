var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

connection.connect(function (error) {
  if (error) throw error;
  // console.log("connected as id " + connection.threadId);
  displayProducts();
});


// read/SELECT (display) your table's content
function displayProducts() {
  connection.query("SELECT * FROM products", function (error, results) {
    if (error) throw error;
    console.log("\n~~~~~~~~~~~~~~~~~~~~Bamazon Products~~~~~~~~~~~~~~~~~~~~");
    for (var i = 0; i < results.length; i++) {
      console.log("Product ID: " + results[i].item_id + " || Product: " + results[i].product_name + " || Dapartment: " + results[i].department_name + " || Price: " + results[i].price + " || In Stock: " + results[i].stock_quantity);
    }
    console.log("~~~~~~~~~~~~~~~~~~~~Bamazon Products~~~~~~~~~~~~~~~~~~~~\n");
    chooseProduct(results);
  });
};

var chooseProduct = function (results) {
  inquirer.prompt([{
    name: "productChoice",
    type: "input",
    message: "\nPlease input the ID of the product you wish to purchase: ",
    validate: function (value) {
      if (isNaN(value) == false) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    name: "quantity",
    type: "input",
    message: "\nPlease input the quantity you would like to purchase: ",
    validate: function (value) {
      if (isNaN(value) == false) {
        return true;
      } else {
        return false;
      }
    }
  }]).then(function (answer) {
    var correct = false;
    if (answer.productChoice.toUpperCase() == "Q") {
      // connection.end();
      process.exit();
    }
    connection.query("SELECT * FROM products WHERE ?", {
      item_id: answer.productChoice
    }, function (error, res) {
      // console.log(res);
      correct = true;
      var newStockQuantity = res[0].stock_quantity - answer.quantity
      console.log(newStockQuantity);
      if (newStockQuantity >= 0) {
        connection.query("UPDATE products SET stock_quantity = '" + newStockQuantity + "'WHERE item_id = '" + answer.productChoice + "'", function (error, results2) {
          console.log("Product Bought!");
          areYouDone();
        })
      } else {
        console.log("\nSorry, there is not enough in stock. Please choose another quantity or product.\n");
        chooseProduct();
      }
    })
  });
}

function areYouDone() {
  inquirer.prompt([{
    name: "userDone",
    type: "list",
    message: "\nWhat would you like to do next?",
    choices: ["Purchase another item", "Quit"]
  }]).then(function(finalAnswer) {
    if (finalAnswer.userDone === "Purchase another item") {
      displayProducts();
    } else {
      console.log("\nThanks for your business!");
      process.exit();
    }
  })
}