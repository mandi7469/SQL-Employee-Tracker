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
    db.findDepartments()
      .then(({ rows }) => {
        let departments = rows;
        console.log("\n");
        console.table(departments);
      })
      .then(() => loadPrompts());
  }

  // view all the roles
function viewRoles() {
    db.findRoles()
      .then(({ rows }) => {
        let roles = rows;
        console.log("\n");
        console.table(roles);
      })
      .then(() => loadPrompts());
  }

  // view all the employees
function viewEmployees() {
    db.findEmployees()
      .then(({ rows }) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
      })
      .then(() => loadPrompts());
  }

  // adds a department
function addDepartment() {
    prompt([
      {
        name: "name",
        message: "What is the name of the department?",
      },
    ]).then((res) => {
      let name = res;
      db.createDepartment(name)
        .then(() => console.log(`Added ${name.name} to the employee tracker database`))
        .then(() => loadPrompts());
    });
  }

  // adds a role
function addRole() {
    db.findDepartments().then(({ rows }) => {
      let departments = rows;
      const departmentList = departments.map(({ id, name }) => ({
        name: name,
        value: id,
      }));
  
      prompt([
        {
          name: "title",
          message: "What is the name of the role?",
        },
        {
          name: "salary",
          message: "What is the salary of the role?",
        },
        {
          type: "list",
          name: "department_id",
          message: "Which department does the role belong to?",
          choices: departmentList,
        },
      ]).then((role) => {
        db.createRole(role)
          .then(() => console.log(`Added ${role.title} to the employee tracker database`))
          .then(() => loadPrompts());
      });
    });
  }

// adds an employee
function addEmployee() {
    prompt([
      {
        name: "first_name",
        message: "What is the employee's first name?",
      },
      {
        name: "last_name",
        message: "What is the employee's last name?",
      },
    ]).then((res) => {
      let firstName = res.first_name;
      let lastName = res.last_name;
  
      db.findRoles().then(({ rows }) => {
        let roles = rows;
        const roleList = roles.map(({ id, title }) => ({
          name: title,
          value: id,
        }));
  
        prompt({
          type: "list",
          name: "roleId",
          message: "What is the employee's role?",
          choices: roleList,
        }).then((res) => {
          let roleId = res.roleId;
  
          db.findEmployees().then(({ rows }) => {
            let employees = rows;
            const managerList = employees.map(
              ({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id,
              })
            );
  
            managerList.unshift({ name: "None", value: null });
  
            prompt({
              type: "list",
              name: "managerId",
              message: "Who is the employee's manager?",
              choices: managerList,
            })
              .then((res) => {
                let employee = {
                  manager_id: res.managerId,
                  role_id: roleId,
                  first_name: firstName,
                  last_name: lastName,
                };
  
                db.createEmployee(employee);
              })
              .then(() =>
                console.log(`Added ${firstName} ${lastName} to the employee tracker database`)
              )
              .then(() => loadPrompts());
          });
        });
      });
    });
  }

// updates an employee's role
function updateEmployeeRole() {
    db.findEmployees().then(({ rows }) => {
      let employees = rows;
      const employeeList = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      }));
  
      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee's role do you want to update?",
          choices: employeeList,
        },
      ]).then((res) => {
        let employeeId = res.employeeId;
        db.findRoles().then(({ rows }) => {
          let roles = rows;
          const roleList = roles.map(({ id, title }) => ({
            name: title,
            value: id,
          }));
  
          prompt([
            {
              type: "list",
              name: "roleId",
              message:
                "Which role do you want to assign to the selected employee?",
              choices: roleList,
            },
          ])
            .then((res) => db.updateEmployeeRole(employeeId, res.roleId))
            .then(() => console.log("Updated employee's role."))
            .then(() => loadPrompts());
        });
      });
    });
  }

  // quits the prompt
  function quit() {
    console.log("Don't Go!");
    process.exit();
  }
