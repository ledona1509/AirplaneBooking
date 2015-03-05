-- Create database
CREATE DATABASE `airlinebooking` CHARACTER SET utf8 COLLATE utf8_general_ci;
GRANT ALL ON `airlinebooking`.* TO `mysqluser`@localhost IDENTIFIED BY 'mysqluser123';
FLUSH PRIVILEGES;
use airlinebooking;

-- Create Table
CREATE TABLE account (
id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'unique id',
user_name VARCHAR(100) NOT NULL COMMENT 'ten dang nhap',
password VARCHAR(100) NOT NULL COMMENT 'mat khau',
customer_id INT(10) NOT NULL COMMENT 'customer id',
status INT(1) COMMENT 'trang thai: 0: inactive, 1: active',
create_user VARCHAR(100) COMMENT 'nguoi tao',
create_date DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'ngay tao',
update_user VARCHAR(100) COMMENT 'nguoi cap nhat',
update_date DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT 'ngay cap nhat'
);

CREATE TABLE customer (
id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'unique id',
title VARCHAR(100) NOT NULL COMMENT 'xung ho',
first_name VARCHAR(100) NOT NULL COMMENT 'ten',
last_name VARCHAR(100) NOT NULL COMMENT 'ho va ten dem',
mobilephone VARCHAR(20) NOT NULL COMMENT 'dien thoai di dong',
telephone VARCHAR(20) COMMENT 'dien thoai ban',
email VARCHAR(100) COMMENT 'email',
city VARCHAR(100) COMMENT 'tinh/thanh pho',
district VARCHAR(100) COMMENT 'quan/huyen',
ward VARCHAR(100) COMMENT 'phuong/xa',
address TEXT COMMENT 'duong/pho/thon/xom',
birth_date DATE COMMENT 'ngay thang nam sinh',
create_user VARCHAR(100) COMMENT 'nguoi tao',
create_date DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'ngay tao',
update_user VARCHAR(100) COMMENT 'nguoi cap nhat',
update_date DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT 'ngay cap nhat'
);

CREATE TABLE app_param (
id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'unique id',
code_type VARCHAR(100) NOT NULL COMMENT 'ma phan biet tung loai: dia diem, thoi gian crawler dinh ky, parser output config, trang thai don hang',
value TEXT COMMENT 'gia tri',
description TEXT COMMENT 'mo ta',
status INT(1) COMMENT 'trang thai: 0: inactive, 1: active',
telephone VARCHAR(20) COMMENT 'dien thoai ban',
attr1 VARCHAR(100) COMMENT 'thuoc tinh du phong 1',
attr2 VARCHAR(100) COMMENT 'thuoc tinh du phong 2',
attr3 VARCHAR(100) COMMENT 'thuoc tinh du phong 3',
attr4 VARCHAR(100) COMMENT 'thuoc tinh du phong 4',
create_user VARCHAR(100) COMMENT 'nguoi tao',
create_date DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'ngay tao',
update_user VARCHAR(100) COMMENT 'nguoi cap nhat',
update_date DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT 'ngay cap nhat'
);

CREATE TABLE ticket_storage (
id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'unique id',
airline_type INT(1) COMMENT 'hang may bay: 1: VNAirline, 2: Jetstar, 3: Vietjet',
flight_code VARCHAR(100) COMMENT 'ma chuyen bay',
origin_code VARCHAR(10) COMMENT 'ma diem di',
destination_code VARCHAR(10) COMMENT 'ma diem den',
from_date Date COMMENT 'ngay di',
to_date Date COMMENT 'ngay den',
from_time DATETIME COMMENT 'gio di',
to_time DATETIME COMMENT 'gio den',
duration_time INT(10) COMMENT 'thoi gian bay',
ticket_type VARCHAR(100) COMMENT 'loai ve',
origin_param_id INT(10) COMMENT 'diem di - link den bang app_param',
destination_param_id INT(10) COMMENT 'diem den - link den bang app_param',
amount int(10) COMMENT 'gia ve',
create_user VARCHAR(100) COMMENT 'nguoi tao',
create_date DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'ngay tao',
update_user VARCHAR(100) COMMENT 'nguoi cap nhat',
update_date DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT 'ngay cap nhat'
);

CREATE TABLE customer_booking (
id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'unique id',
account_id INT(10) COMMENT 'link den account hoac co the NULL',
customer_id INT(10) COMMENT 'link den customer',
ticket_storage_id INT(10) NOT NULL COMMENT 'id ticket_storage',
adult_quanlity INT(2) DEFAULT 1 COMMENT 'so luong nguoi lon (default = 1)',
children_quanlity INT(2) DEFAULT 0 COMMENT 'so luong tre em (default = 0)',
infant_quanlity INT(2) DEFAULT 0 COMMENT 'so luong tre so sinh (default = 0)',
amount_total int(10) COMMENT 'tong thanh tien sau khi dat cho',
create_user VARCHAR(100) COMMENT 'nguoi tao',
create_date DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'ngay tao',
update_user VARCHAR(100) COMMENT 'nguoi cap nhat',
update_date DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT 'ngay cap nhat'
);

CREATE TABLE customer_company (
id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'unique id',
customer_booking_id int(10) COMMENT 'id customer_booking',
customer_type int(1) COMMENT 'loai khach: 1: adult, 2: children, 3: infant',
title VARCHAR(100) NOT NULL COMMENT 'xung ho',
first_name VARCHAR(100) NOT NULL COMMENT 'ten',
last_name VARCHAR(100) NOT NULL COMMENT 'ho va ten dem',
mobilephone VARCHAR(20) COMMENT 'dien thoai di dong',
birth_date DATE COMMENT 'ngay thang nam sinh',
package_id int(10) COMMENT 'package id',
amount_ticket int(10) COMMENT 'gia ve',
amount_package int(10) COMMENT 'gia hanh ly',
amount_total int(10) COMMENT 'tong cong',
create_user VARCHAR(100) COMMENT 'nguoi tao',
create_date DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'ngay tao',
update_user VARCHAR(100) COMMENT 'nguoi cap nhat',
update_date DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT 'ngay cap nhat'
);


CREATE TABLE package (
id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'unique id',
airline_type INT(1) COMMENT 'hang may bay: 1: VNAirline, 2: Jetstar, 3: Vietjet',
weight INT(10) COMMENT 'khoi luong',
amount int(10) COMMENT 'thanh tien',
create_user VARCHAR(100) COMMENT 'nguoi tao',
create_date DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'ngay tao',
update_user VARCHAR(100) COMMENT 'nguoi cap nhat',
update_date DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT 'ngay cap nhat'
);