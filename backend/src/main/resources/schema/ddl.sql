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
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT ='用户表';;
-- 添加默认管理用户 admin/123456
insert into t_users (username, password, email)
values ('admin', '2c36622ddbdb55b0c85bc7bcb5a52f5a', 'admin@localhost');

-- 菜单表

CREATE TABLE t_menus
(
    id         int auto_increment primary key comment '菜单ID',
    title      varchar(50)  not null comment '菜单标题',
    path       varchar(100) not null comment '菜单路径',
    parent_id  int          not null default 0 comment '父菜单ID',
    icon       varchar(100) not null default '' comment '菜单图标',
    sort       int          not null default 0 comment '菜单排序',
    is_fixed   bit          not null default 0 comment '是否固定标签 0:不固定 1:固定',
    created_at datetime     not null default current_timestamp comment '创建时间',
    updated_at datetime     not null default current_timestamp on update current_timestamp comment '更新时间',
    is_delete  bit          not null default 0 comment '是否删除 0:未删除 1:已删除',
    key idx_parent_id (parent_id) comment '父菜单ID索引'
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT ='菜单表';

-- 插入顶级菜单
INSERT INTO t_menus (id, title, path, icon, parent_id, sort, is_fixed, created_at, updated_at, is_delete)
VALUES (1, '首页', '/home', 'mdi-light:home', 0, 1, 1, NOW(), NOW(), 0),
       (2, '文章', '/posts', 'material-symbols:edit-note', 0, 2, 0, NOW(), NOW(), 0),
       (3, '归档', '/archives', 'ion:library-outline', 0, 3, 0, NOW(), NOW(), 0),
       (4, '标签', '/tags', 'tdesign:tag', 0, 4, 0, NOW(), NOW(), 0),
       (5, '关于', '/about', 'icon-park-outline:avatar', 0, 5, 0, NOW(), NOW(), 0),
       (6, '系统设置', '/settings', 'mdi-light:settings', 0, 6, 0, NOW(), NOW(), 0);

-- 插入子菜单
INSERT INTO t_menus (id, title, path, icon, parent_id, sort, is_fixed, created_at, updated_at, is_delete)
VALUES (7, '导入文章', '/settings/importPost', 'mdi:import', 6, 1, 0, NOW(), NOW(), 0);