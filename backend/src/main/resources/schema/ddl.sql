create database if not exists springhexo default character set utf8mb4 collate utf8mb4_unicode_ci;

use springhexo;

-- 用户表
create table t_users
(
    id         int auto_increment primary key comment '用户ID',
    username   varchar(50)  not null unique comment '用户名',
    password   varchar(100) not null comment '密码',
    email      varchar(100) not null unique comment '邮箱地址',
    created_at datetime     not null default current_timestamp comment '创建时间',
    updated_at datetime     not null default current_timestamp on update current_timestamp comment '更新时间',
    isdelete   bit          not null default 0 comment '是否删除 0:未删除 1:已删除'
);
-- 添加默认管理用户 admin/123456
insert into t_users (username, password, email)
values ('admin', '2c36622ddbdb55b0c85bc7bcb5a52f5a', 'admin@localhost');