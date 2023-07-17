INSERT INTO EMASA.Vendas(id_usuario, id_produto,id_estoque,id_cliente,id_endereco,cpf_motorista,placa,quantidade,preco_total,createdAt,updatedAt)
VALUES(2,1,1,4,4,'12345678902','ABC1234',12,840,current_timestamp,current_timestamp);

INSERT INTO EMASA.Vendas(id_usuario, id_produto,id_estoque,id_cliente,id_endereco,cpf_motorista,placa,quantidade,preco_total,createdAt,updatedAt)
VALUES(1,1,1,4,4,'12345678902','ABC1234',10,700,current_timestamp,current_timestamp);


SELECT * FROM EMASA.Vendas;