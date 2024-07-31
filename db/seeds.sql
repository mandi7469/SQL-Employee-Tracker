\c employee_tracker_db;

-- inserts department name to the department table
INSERT INTO department(name)
VALUES ('General'),
       ('Cardio'),
       ('Neuro'),
       ('Peds');

-- inserts role title, salary, and department_id to the role table
INSERT INTO role(title, salary, department_id)
VALUES ('Chief of Surgery', 500000, 1),
        ('General surgery Attending', 200000, 1),
        ('General surgery Resident', 80000, 1),
        ('General surgery Intern', 30000, 1),
        ('Cardio surgery Attending', 200100, 2),
        ('Cardio surgery Resident', 89000, 2),
        ('Cardio surgery Intern', 32000, 2),
        ('Neuro surgery Attending', 200400, 3),
        ('Neuro surgery Resident', 92000, 3),
        ('Neuro surgery Intern', 36000, 3),
        ('Peds surgery Attending', 300200, 4),
        ('Peds surgery Resident', 99000, 4),
        ('Peds surgery Intern', 40000, 4);

-- inserts first_name, last_name, role_id and manager_id to employee table
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
        ('Richard', 'Webber', 1, 2),
        ('Miranda', 'Bailey', 1, 3),
        ('Meredith', 'Grey', 1, 4),
        ('Joe', 'Wilson', 1, 5),
        ('Preston', 'Burke', 2, 3),
        ('Cristina', 'Yang', 2, 4),
        ('Erica', 'Hahn', 2, 5),
        ('Derek', 'Shepherd', 3, 3),
        ('Amelia', 'Shepherd', 3, 4),
        ('Tom', 'Koracik', 3, 5),
        ('Arizona', 'Robins', 4, 3),
        ('Alex', 'Karev', 4, 4),
        ('Rob', 'Stark', 4, 5);




