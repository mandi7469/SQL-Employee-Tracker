const pool = require('./connection');

class DB {
  constructor() {}

  async query(sql, args = []) {
    const client = await pool.connect();
    try {
      const result = await client.query(sql, args);
      return result;
    } finally {
      client.release();
    }
  }

   // find departments
   findDepartments() {
    return this.query('SELECT department.id, department.name FROM department;');
  }

 // find all roles, joined with the department that role belongs to and the salary for that role
 findRoles() {
  return this.query(
    'SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;'
  );
}

// finds all employees, joined with roles and departments to display their roles, salaries, departments, and managers
findEmployees() {
  return this.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
  );
}

 // creates a new department
 createDepartment(department) {
  return this.query('INSERT INTO department (name) VALUES ($1)', [
    department.name,
  ]);
}

// creates a new role
createRole(role) {
  const { title, salary, department_id } = role;
  return this.query(
    'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
    [title, salary, department_id]
  );
}

// creates a new employee
createEmployee(employee) {
  const { first_name, last_name, role_id, manager_id } = employee;
  return this.query(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
    [first_name, last_name, role_id, manager_id]
  );
}

 // updates employee's role
 updateEmployeeRole(employeeId, roleId) {
  return this.query('UPDATE employee SET role_id = $1 WHERE id = $2', [
    roleId,
    employeeId,
  ]);
}

}





module.exports = new DB();