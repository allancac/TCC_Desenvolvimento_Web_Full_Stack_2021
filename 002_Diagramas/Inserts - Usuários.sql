INSERT INTO EMASA.Usuarios(id, nomeUsuario, nome, sobrenome, foto, ativo, email, senha, perfil, createdAt, updatedAt) 
VALUES(uuid(), 'Allan Chaves', 'Allan', 'Chaves', '', false, 'allancac@gmail.com', 'secret', 'vendedor',current_timestamp,current_timestamp);

#SELECT * from 
#EMASA.Usuarios
#where ativo = false;

#UPDATE EMASA.Usuarios
#set ativo = true
#where id = 2;

#delete from 
#EMASA.Usuarios
#where id = 1;