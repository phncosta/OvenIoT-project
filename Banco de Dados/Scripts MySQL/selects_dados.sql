select * from Usuario;
select * from tipoUsuario;
select * from UsuarioSensor;
select * from Eventos;
select * from Receita;
select * from TemperaturaUmidade;

-- selecionar média das temperaturas registradas
select avg(t.temperatura) as 'Média de Temperatura'
	from TemperaturaUmidade as t,
		 Receita as r
			where r.codTemperaturaUmidade = t.codTemperaturaUmidade
				and r.nomeReceita like 'Bolo de Pão';

-- selecionar todos os campos da tabela receita e alguns da tabela temperatura
select r.*, t.temperatura, t.umidade, t.minTemp, t.maxTemp
	from Receita as r, TemperaturaUmidade as t
		where r.codTemperaturaUmidade = t.codTemperaturaUmidade;

-- selecionar todos os campos da tabela receita e alguns da tabela temperatura, ligados pelo nome
select r.nomeReceita, t.minTemp, t.maxTemp,avg(t.temperatura) as 'Média de Temperatura'
	from Receita as r, TemperaturaUmidade as t
		where r.nomeReceita like 'Bolo de Pão'
			group by r.nomeReceita, t.minTemp, t.maxTemp;