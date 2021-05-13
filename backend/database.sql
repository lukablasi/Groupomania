CREATE DATABASE gifs

CREATE TABLE db(
    gif_id SERIAL PRIMARY KEY,
    author varchar(255),
    source varchar(255),
    title varchar(255),
    comment varchar(255),
    likes int
);

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);