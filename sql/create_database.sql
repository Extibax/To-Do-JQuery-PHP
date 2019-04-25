CREATE DATABASE IF NOT EXISTS to_do_extibaxinc CHARACTER SET utf8 COLLATE utf8_unicode_ci;

USE to_do_extibaxinc;

CREATE TABLE IF NOT EXISTS users(
    ID              INT(11) AUTO_INCREMENT NOT NULL,
    Username        VARCHAR(50) NOT NULL,
    Password        VARCHAR(255) NOT NULL,
    Date            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_users PRIMARY KEY(ID)
)ENGINE=InnoDb;

CREATE TABLE IF NOT EXISTS categories(
    ID              INT(11) AUTO_INCREMENT NOT NULL,
    User_id         INT(11) NOT NULL,
    Name            VARCHAR(50) NOT NULL,
    CONSTRAINT pk_categories PRIMARY KEY(ID),
    CONSTRAINT fk_categories_users FOREIGN KEY(User_id) REFERENCES users(ID)
)ENGINE=InnoDb;

CREATE TABLE IF NOT EXISTS todos(
    ID              INT(11) AUTO_INCREMENT NOT NULL,
    User_id         INT(11) NOT NULL,
    Category_id     INT(11) NOT NULL,
    Todo            TEXT NOT NULL,
    Date            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Due_date        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_todos PRIMARY KEY(ID),
    CONSTRAINT fk_users FOREIGN KEY(User_id) REFERENCES users(ID),
    CONSTRAINT fk_categories FOREIGN KEY(Category_id) REFERENCES categories(ID)
)ENGINE=InnoDb;