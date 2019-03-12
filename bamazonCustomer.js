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
    displayProducts();
    buyFunc();
  }
});

function displayProducts() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
    }
  });
}

function buyFunc() {
  inquirer
    .prompt([
      {
        name: "buyId",
        type: "input",
        message: "Input selected item's ID: "
      },
      {
          name: "buyUnits",
          type: "input",
          message: "How many would you like to buy? "
      }
    ])
    .then(function(answer) {
        connection.query("SELECT * FROM products", function(err, results) {
            if (err){
                console.log(err);
            } else {
                if (answer.buyId > results.length || answer.buyId -1 < 0){
                    console.log("No product by that ID");
                    buyFunc();
                } else {
                    if (answer.buyUnits > results[answer.buyId-1].stock_quantity){
                        console.log("Not Enough Units to Sell");
                    } else {
                      unitsRemaining = results[answer.buyId-1].stock_quantity - answer.buyUnits;

                     connection.query("UPDATE products SET stock_quantity = "+ unitsRemaining +" WHERE item_id = "+ answer.buyId + ";"
                     )

                     unitSalesPrice = parseFloat(answer.buyUnits * results[answer.buyId-1].price) + parseFloat(results[answer.buyId-1].product_sales);

                     connection.query("UPDATE products SET product_sales = " + unitSalesPrice + " WHERE item_id = " + answer.buyId +";"
                     )
                     
                     console.log("You have purchased "+ answer.buyUnits+" "+results[answer.buyId-1].product_name+"(s) for " +answer.buyUnits * results[answer.buyId-1].price);
                     console.log("There are " + unitsRemaining + " left.");

                      deptName = results[answer.buyId-1].department_name;

                      singleUnitSales = parseFloat(answer.buyUnits * results[answer.buyId-1].price);

                      currentTotal = results[answer.buyId-1].product_sales;
                     
                      var deptIndex = "";

                      if (deptName === "Pet"){
                        deptIndex = 0;
                      } if (deptName === "Home"){
                        deptIndex = 1;
                      } if (deptName === "Tech"){
                        deptIndex = 2;
                      } if (deptName === "Unlisted"){
                        deptIndex = 3;
                      }               

                      updateSupervisor();
                    }
                    function updateSupervisor(err,results){
                      connection.query("SELECT * FROM departments", function(err, results) {
                        if (err){
                          console.log(err);
                        } else {
                          departmentSales = parseFloat(singleUnitSales) + parseFloat(results[deptIndex].total_sales);

                      connection.query("UPDATE departments SET total_sales = " + departmentSales + " WHERE department_name = " + "\""+deptName+"\"" + ";"
                      )
                        }
                      })
                    }
                  
                    inquirer.prompt([{
                      name: "buyAgain",
                      type: "list",
                      message: "Would you like to make another purchase?",
                      choices: ["Yes", "No"]
                    }]).then(function(again){
                      if (again.buyAgain == "Yes"){
                        displayProducts();
                        buyFunc();
                      } else {
                        connection.end();
                      }
                    })
                }
                
            }
          })
        })
}
