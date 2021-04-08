CREATE DATABASE blog;

CREATE TABLE posts(
	id INT PRIMARY KEY AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    title varchar(40) NOT NULL,
    description varchar(200) NOT NULL,
    create_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
);