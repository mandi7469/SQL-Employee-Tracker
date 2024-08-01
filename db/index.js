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



}



module.exports = new DB();