drop database if exists dbMensulCalc;
create database dbMensulCalc;

use dbMensulCalc;

drop table if exists Users;

drop user if exists dbMensulCalc_user;

create user dbMensulCalc_user identified by 'azerty';
grant select, update, insert, delete on dbMensulCalc.* to dbMensulCalc_user;

create table Users(
    id int primary key auto_increment,
    login varchar(10) not null,
    password varchar(10) not null
);

insert into Users(login, password) values('user', 'user');

commit;