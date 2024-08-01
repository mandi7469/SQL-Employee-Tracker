\c employee_tracker_db;

-- inserts department name to the department table
INSERT INTO department(name)
VALUES ('Math'),
       ('Science'),
       ('History'),
       ('Art');

-- inserts role title, salary, and department_id to the role table
INSERT INTO role(title, salary, department_id)
VALUES ('Math Professor', 85000, 1),
        ('Science Teacher', 70000, 2),
        ('History Teacher', 69000, 3),
        ('Art Tutor', 40000, 4);

-- inserts first_name, last_name, role_id and manager_id to employee table
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
        ('Ross', 'Geller', 1, 4),
        ('Phoebe', 'Buffay', 2, 3),
        ('Chandler', 'Bing', 3, 1),
        ('Rachel', 'Green', 4, 5);




