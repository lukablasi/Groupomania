CREATE DATABASE gifs

CREATE TABLE db(
    gif_id SERIAL PRIMARY KEY,
    author varchar(255),
    source varchar(255),
    title varchar(255),
    comment varchar(255),
    likes int
);