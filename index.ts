#! /usr/bin/env node
import inquirer from "inquirer";

// Initializing user balance and pin

let mybalance = 10000; // dollars
let mypin = 3523;

//pin code checking and options
async function main() {
  let pinAnswer = await inquirer.prompt([
    {
      name: "pin",
      message: "Please enter your pin code!",
      type: "number",
    },
  ]);

  if (pinAnswer.pin == mypin) {
    console.log("You entered the correct pin code!");

    let optionsAns = await inquirer.prompt([
      {
        name: "option",
        message: "Please select an option",
        type: "list",
        choices: ["withdraw", "check balance", "fast cash"],
      },
    ]);

    //if withdraw option selected
    if (optionsAns.option === "withdraw") {
      let choicesAns = await inquirer.prompt([
        {
          name: "choice",
          message: "Enter your amount",
          type: "number",
        },
      ]);

      if (choicesAns.choice <= mybalance) {
        mybalance -= choicesAns.choice;
        console.log("Your remaining balance is:", `${mybalance}`);
      } else {
        console.log("Your current balance is insufficient!");
      }
    }

    //if mybalance option selected
    if (optionsAns.option === "check balance") {
      console.log("Your current balance is:", mybalance);
    }

    //if fast cash option selected
    if (optionsAns.option === "fast cash") {
      let cashAns = await inquirer.prompt([
        {
          name: "cash",
          message: "Please select an amount",
          type: "list",
          choices: ["1000", "2000", "3000", "4000", "5000", "other amount"],
        },
      ]);
      let amount = parseInt(cashAns.cash);
      if (amount <= mybalance) {
        mybalance -= amount;
        console.log("Your remaining balance is:", `${mybalance}`);
      } else if (cashAns.cash == "other amount") {
        let amountAns = await inquirer.prompt([
          {
            name: "amount",
            message: "please inter your amount",
            type: "number",
          },
        ]);
        if (amountAns.amount <= mybalance) {
          mybalance -= amountAns.amount;
          console.log("Your remaining balance is:", `${mybalance}`);
        } else {
          console.log("Your current balance is insufficient!");
        }
      } else {
        console.log("Your current balance is insufficient!");
      }
    }
  } else {
    console.log("Incorrect pin code!");
  }
}

main();
