create database springhexo default character set utf8mb4 collate utf8mb4_unicode_ci;

use springhexo;

-- 用户表
create table t_users
(
    id         int auto_increment primary key,
    username   varchar(50)  not null unique,
    password   varchar(100) not null,
    email      varchar(100) not null unique,
    created_at datetime     not null default current_timestamp,
    updated_at datetime     not null default current_timestamp on update current_timestamp
);