create database oveniot;
use oveniot;

create table TipoUsuario 
(
	codTipoUsuario int primary key auto_increment,
	tipoUsuario varchar(20)
);

create table Usuario 
(
	codUsuario int primary key auto_increment,
	nomeUsuario varchar(40) not null,
	emailUsuario varchar(50) not null,
	senhaUsuario varchar(130) not null,
	codTipoUsuario int not null,
	foreign key(codTipoUsuario) references TipoUsuario(codTipoUsuario)
);

create table UsuarioSensor 
(
	codSensor int primary key,
	codUsuario int not null,
    foreign key(codUsuario) references Usuario (codUsuario)
);

create table Eventos 
(
	codEventos int primary key auto_increment,
	temperaturaSensor float not null,
	umidadeSensor float not null,
	dataHora datetime,
	codSensor int not null,
	foreign key(codSensor) references UsuarioSensor(codSensor)
);

create table Receita 
(
	codReceita int primary key auto_increment,
	nomeReceita varchar(40) not null,
	tempoReceita time not null,
    tipoReceita varchar(10) not null,
    descReceita varchar(1000),
    imagemReceita varchar(150),
    temperaturaReceita int not null,
	codUsuario int not null,
    foreign key(codUsuario) references Usuario(codUsuario)
);
 