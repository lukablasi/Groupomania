CREATE DATABASE groupomania;

CREATE TABLE posts(
    post_id SERIAL PRIMARY KEY,
    author varchar(255),
    title varchar(255),
    body varchar(500)
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE seen(
    user_id uuid NOT NULL,
    post_id int NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id)
);

INSERT INTO seen SELECT user_id, post_id FROM posts CROSS JOIN users;
SELECT post_id FROM posts WHERE post_id = (SELECT MAX(post_id) from posts);

INSERT INTO seen SELECT user_id, post_id FROM posts WHERE post_id = (SELECT MAX(post_id) from posts) CROSS JOIN users;

