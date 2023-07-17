INSERT INTO EMASA.Usuarios(ativo, email, senha, nome, sobrenome, perfil, createdAt, updatedAt) 
VALUES(false,  'allancac@gmail.com', 'secret', 'Allan', 'Chaves', 'vendedor',current_timestamp,current_timestamp);

#SELECT * from 
#EMASA.Usuarios
#where ativo = false;

#UPDATE EMASA.Usuarios
#set ativo = true
#where id = 2;

#delete from 
#EMASA.Usuarios
#where id = 1;