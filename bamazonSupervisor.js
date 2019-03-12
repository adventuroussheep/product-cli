const inquirer = require("inquirer");
const mysql = require("mysql");

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
        message: "Welcome, what would you like to do?",
        type: "list",
        choices: [
          "View Product Sales by Department",
          "Create New Department",
          "Exit"
        ],
        name: "superPrompt"
      }
    ])
    .then(function(response) {
      if (response.superPrompt === "View Product Sales by Department") {
        connection.query("SELECT * FROM departments", function(err, res) {
          console.log("Sales By Department");
          for (i = 0; i < res.length; i++) {
            var profit = res[i].total_sales - res[i].over_head_costs;
            console.log("Department Name: " +
                res[i].department_name + " | Department ID: " +
                res[i].department_id 
            );
            console.log("Overhead Costs: " + res[i].over_head_costs);
            console.log("Total Sales: " + res[i].total_sales);
            console.log("Total Profit: " + profit);
            console.log("~~~~~~~~~~~~~~~~~~~~~~");
          }
          start();
        });
      }
      if (response.superPrompt === "Exit") {
        connection.end();
      }
    });
}
