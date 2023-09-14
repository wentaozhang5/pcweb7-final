
--@block
CREATE DATABASE computing_training;

--@block 
CREATE TABLE sign_up_courses (
    order_id INT auto_increment primary key,
    user_id INT NOT NULL, 
    course_id INT NOT NULL,
    phone  VARCHAR(30) NOT NULL,
    message VARCHAR(3000),
    CONSTRAINT uc_order UNIQUE (user_id,course_id)

);

--@block
CREATE TABLE cases (
id INT auto_increment primary key,
title VARCHAR(255),
course_name VARCHAR(255),
description TEXT,
video_clip varchar(255)
);

--@block
CREATE TABLE courses (
id INT auto_increment primary key,
name VARCHAR(255),
description TEXT,
image VARCHAR(255)
);

--@block
CREATE TABLE user_login (
user_id INT auto_increment primary key,
user_email VARCHAR(100) NULL,
user_password VARCHAR(100) NULL,
user_name VARCHAR(100)
);