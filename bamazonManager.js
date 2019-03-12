const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected");
    start();
  }
});

function start() {
  inquirer
    .prompt([
      {
        name: "startPrompt",
        message: "Hello, what would you like to do?",
        type: "list",
        choices: [
          "View all Products",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
          "Exit"
        ]
      }
    ])
    .then(function(response) {
      if (response.startPrompt === "View all Products") {
        connection.query("SELECT * FROM products", function(err, results) {
          if (err) {
            console.log(err);
          } else {
            console.table(results);
            start();
          }
        });
      }

      if (response.startPrompt === "View Low Inventory") {
        connection.query(
          "SELECT * FROM products WHERE stock_quantity <=5",
          function(err, results) {
            if (err) {
              console.log(err);
            } else {
              console.table(results);
              start();
            }
          }
        );
      }

      if (response.startPrompt === "Add to Inventory") {
        inquirer
          .prompt([
            {
              message: "Enter the item_id you would like to add to: ",
              name: "addId",
              type: "input"
            },
            {
              message: "How many would you like to add?",
              name: "addAmount",
              type: "input"
            }
          ])
          .then(function(response) {
            connection.query("SELECT * FROM products", function(err, results) {
                if (err) {
                  console.log(err);
                } else {
                    if (response.addId <= results.length && isNaN(response.addAmount) == false) {
                            console.log("Changes Submitted");
                            newTotal = parseFloat(response.addAmount)+parseFloat(results[response.addId-1].stock_quantity);
                            connection.query("UPDATE products SET stock_quantity = "+ newTotal +" WHERE item_id = "+ response.addId + ";"
                            )

                            start();
                        } else {
                            console.log("You must enter a valid response.");
                            start();
                        }
                    }
                  });
          });
      }

      if (response.startPrompt === "Add New Product") {
          inquirer.prompt([{
              message: "What is the products name?",
              type: "input",
              name: "userProduct"
          },
        {
            message: "What department does this belong in?",
            type: "list",
            choices: ["Pet", "Home", "Tech", "Unlisted"],
            name: "userDept"
        },
        {
            message: "What is the price of the product?",
            type: "input",
            name: "userPrice"
        },
        {
            message: "How much product are you adding?",
            type: "input",
            name: "userStock"
        }
        ]).then(function(response){
            if(isNaN(response.userPrice) == false && isNaN(response.userStock) == false){
                // connection.query
                var valueFormat = "\""+response.userProduct+"\","+"\""+response.userDept+"\","+"\""+response.userPrice+"\","+"\""+response.userStock+"\","+0;
                connection.query("INSERT INTO products(product_name, department_name, price, stock_quantity,product_sales)VALUES("+valueFormat+");");
                console.log(valueFormat);
                start();
            }
            else {
                console.log("Please enter a valid response.");
                start();
            }
        })


      }
      if (response.startPrompt === "Exit"){
          connection.end();
      }
    });
}
