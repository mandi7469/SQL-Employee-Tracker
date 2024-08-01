// imports
const { prompt } = require("inquirer");
const logoArt = require("asciiart-logo");
const db = require("./db");

init();

// display logo-art and prompts
function init() {
  const logoText = logoArt({ name: "EMPLOYEE MANAGER" }).render();

  console.log(logoText);

  loadPrompts();
}

function loadPrompts() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES",
        },
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "Add a Department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Add a Role",
          value: "ADD_ROLE",
        },
        {
          name: "Add an Employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Update an Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE",
        },
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]).then((res) => {
    let choice = res.choice;
    // calls the appropriate function depending what the user selected
    switch (choice) {
      case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "ADD_DEPARTMENT":
        addDepartment();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeRole();
        break;
      default:
        quit();
    }
  });
}

// view the departments
function viewDepartments() {
    db.findAllDepartments()
      .then(({ rows }) => {
        let departments = rows;
        console.log("\n");
        console.table(departments);
      })
      .then(() => loadPrompts());
  }








  function quit() {
    console.log("Don't Go!");
    process.exit();
  }
