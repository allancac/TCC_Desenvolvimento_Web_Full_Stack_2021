/****************************************************************
***************************CLIENTES******************************
****************************************************************/
INSERT INTO EMASA.Clientes ( nome, TELEFONE, EMAIL, CNPJ, createdAt, updatedAt)
VALUES ( 'Construtora Alpha', '2198765432', 'contato@construtoraalpha.com.br', '12345678901234',current_timestamp, current_timestamp );

INSERT INTO EMASA.Clientes (nome, TELEFONE, EMAIL,CNPJ, createdAt, updatedAt)
VALUES ( 'Loja de Materiais Beta', '2134567890', 'contato@lojademateriaisbeta.com.br', '12345678901244',current_timestamp, current_timestamp );

INSERT INTO EMASA.Clientes (nome, TELEFONE, EMAIL,CNPJ, createdAt, updatedAt)
VALUES ( 'Construtora Gamma', '2123456789', 'contato@construtoragamma.com.br', '34567890123456',current_timestamp, current_timestamp );

INSERT INTO EMASA.Clientes (nome, TELEFONE, EMAIL,CNPJ, createdAt, updatedAt)
VALUES ( 'Loja de Materiais Delta', '2134567891', 'contato@lojademateriaisdelta.com.br', '45678901234567',current_timestamp, current_timestamp );

INSERT INTO EMASA.Clientes (nome, TELEFONE, EMAIL,CNPJ, createdAt, updatedAt)
VALUES ( 'Construtora Epsilon', '2123456788', 'contato@construtoraepsilon.com.br', '56789012345678',current_timestamp, current_timestamp );

INSERT INTO EMASA.Clientes (nome, TELEFONE, EMAIL,CNPJ, createdAt, updatedAt)
VALUES ( 'Loja de Materiais Zeta', '2134567892', 'contato@lojademateriaiszeta.com.br', '67890123456789',current_timestamp, current_timestamp );

INSERT INTO EMASA.Clientes (nome, TELEFONE, EMAIL,CNPJ, createdAt, updatedAt)
VALUES ( 'Construtora Eta', '2123456787', 'contato@construtoraeta.com.br', '78901234567890',current_timestamp, current_timestamp );

INSERT INTO EMASA.Clientes (nome, TELEFONE, EMAIL,CNPJ, createdAt, updatedAt)
VALUES ( 'Loja de Materiais Teta', '2134567893', 'contato@lojademateriaisteta.com.br', '89012345678901',current_timestamp, current_timestamp );

INSERT INTO EMASA.Clientes (nome, TELEFONE, EMAIL,CNPJ, createdAt, updatedAt)
VALUES ( 'Construtora Iota', '2123456786', 'contato@construtoraiota.com.br', '90123456789012',current_timestamp, current_timestamp );

INSERT INTO EMASA.Clientes (nome, TELEFONE, EMAIL,CNPJ, createdAt, updatedAt)
VALUES ('Loja de Materiais Kapa', '2134567894', 'contato@lojademateriaiskapacom', '70123456789013',current_timestamp, current_timestamp );

INSERT INTO EMASA.Clientes (nome, TELEFONE, EMAIL,CNPJ, createdAt, updatedAt)
VALUES ( 'Construtora Lambda', '2123456785', 'contato@construtoralambda.com.br', '01234567890123',current_timestamp, current_timestamp );

INSERT INTO EMASA.Clientes (nome, TELEFONE, EMAIL,CNPJ, createdAt, updatedAt)
VALUES ( 'Loja de Materiais Mu', '2134567895', 'contato@lojademateriaismu.com.br', '12345678901239',current_timestamp, current_timestamp );

INSERT INTO EMASA.Clientes (nome, TELEFONE, EMAIL,CNPJ, createdAt, updatedAt)
VALUES ( 'Construtora Nu', '2123456784', 'contato@construtoranu.com.br', '23456789032345',current_timestamp, current_timestamp );

INSERT INTO EMASA.Clientes (nome, TELEFONE, EMAIL,CNPJ, createdAt, updatedAt)
VALUES ( 'Loja de Materiais Xi', '2134567896', 'contato@lojademateriaisxi.com.br', '34567290123456',current_timestamp, current_timestamp );

INSERT INTO EMASA.Clientes (nome, TELEFONE, EMAIL,CNPJ, createdAt, updatedAt)
VALUES ( 'Construtora Omicron', '2123456783', 'contato@construtoraomicron.com.br', '15678901234567',current_timestamp, current_timestamp );

INSERT INTO EMASA.Clientes (nome, TELEFONE, EMAIL,CNPJ, createdAt, updatedAt)
VALUES ( 'Loja de Materiais Pi', '2134567897', 'contato@lojademateriaispi.com.br', '56789212345678',current_timestamp, current_timestamp );

INSERT INTO EMASA.Clientes (nome, TELEFONE, EMAIL,CNPJ, createdAt, updatedAt)
VALUES ( 'Construtora Rho', '2123456782', 'contato@construtorarho.com.br', '67890123656789',current_timestamp, current_timestamp );

INSERT INTO EMASA.Clientes (nome, TELEFONE, EMAIL,CNPJ, createdAt, updatedAt)
VALUES ('Loja de Materiais Sigma', '2134567898', 'contato@lojademateriaissigma.com.br', '72901234567890',current_timestamp, current_timestamp );

INSERT INTO EMASA.Clientes (nome, TELEFONE, EMAIL,CNPJ, createdAt, updatedAt)
VALUES ('Construtora Tau', '2123456781', 'contato@construtoratau.com.br', '89012345678961',current_timestamp, current_timestamp );

INSERT INTO EMASA.Clientes (nome, TELEFONE, EMAIL,CNPJ, createdAt, updatedAt)
VALUES ('Loja de Materiais Ômega', '2134567899', 'contato@lojademateriaisomega.com.br', '90123456782012',current_timestamp, current_timestamp );


/****************************************************************
***************************ENDEREÇOS*****************************
****************************************************************/
INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES (1, 'Rua A, 123', 'Rio de Janeiro', 'RJ', '20000-000', 'Comercial', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES ( 2, 'Avenida B, 456', 'Niterói', 'RJ', '24000-000', 'Entrega', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES ( 3, 'Rua C, 789', 'São Gonçalo', 'RJ', '24700-000', 'Comercial', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES ( 4, 'Avenida D, 1011', 'Niterói', 'RJ', '24000-100', 'Entrega', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES ( 5, 'Rua E, 1213', 'Rio de Janeiro', 'RJ', '20000-200', 'Comercial', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES ( 6, 'Avenida F, 1415', 'São Gonçalo', 'RJ', '24700-100', 'Entrega', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES (7, 'Rua G, 1617', 'Niterói', 'RJ', '24000-200', 'Comercial', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES ( 8, 'Avenida H, 1819', 'Rio de Janeiro', 'RJ', '20000-300', 'Entrega', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES ( 9, 'Rua I, 2021', 'São Gonçalo', 'RJ', '24700-200', 'Entrega', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES ( 10, 'Avenida J, 2223', 'Niterói', 'RJ', '24000-300', 'Comercial', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES (11, 'Rua K, 2425', 'Rio de Janeiro', 'RJ', '20000-400', 'Entrega', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES ( 12, 'Avenida L, 2627', 'Niterói', 'RJ', '24000-400', 'Comercial', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES ( 13, 'Rua M, 2829', 'São Gonçalo', 'RJ', '24700-300', 'Entrega', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES ( 14, 'Avenida N, 3031', 'Niterói', 'RJ', '24000-500', 'Comercial', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES (15, 'Rua O, 3233', 'Rio de Janeiro', 'RJ', '20000-500', 'Entrega', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES (16, 'Avenida P, 3435', 'São Gonçalo', 'RJ', '24700-400', 'Comercial', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES ( 17, 'Rua Q, 3637', 'Niterói', 'RJ', '24000-600', 'Entrega', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES ( 18, 'Avenida R, 3839', 'Rio de Janeiro', 'RJ', '20000-600', 'Comercial', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES ( 19, 'Rua S, 4041', 'São Gonçalo', 'RJ', '24700-500', 'Entrega', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES ( 20, 'Avenida T, 4243', 'Niterói', 'RJ', '24000-700', 'Comercial', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES ( 1, 'Rua U, 4445', 'Rio de Janeiro', 'RJ', '20000-700', 'Entrega', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES ( 7, 'Avenida V, 4647', 'Niterói', 'RJ', '24000-800', 'Comercial', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES ( 3, 'Rua W, 4849', 'São Gonçalo', 'RJ', '24700-600', 'Entrega', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES (7, 'Avenida X, 5051', 'Niterói', 'RJ', '24000-900', 'Comercial', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES ( 1, 'Rua Y, 5253', 'Rio de Janeiro', 'RJ', '20000-800', 'Entrega', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES (3, 'Avenida Z, 5455', 'São Gonçalo', 'RJ', '24700-700', 'Comercial', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES (7, 'Rua 1, 5657', 'Niterói', 'RJ', '24000-1000', 'Entrega', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES ( 1, 'Avenida 2, 5859', 'Rio de Janeiro', 'RJ', '20000-900', 'Comercial', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES ( 3, 'Rua 3, 6061', 'São Gonçalo', 'RJ', '24700-800', 'Entrega', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES ( 7, 'Avenida 4, 6263', 'Niterói', 'RJ', '24000-1100', 'Comercial', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES (1, 'Rua 5, 6465', 'Rio de Janeiro', 'RJ', '20000-1000', 'Entrega', current_timestamp, current_timestamp);

INSERT INTO EMASA.Enderecos (ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, createdAt, updatedAt)
VALUES (7, 'Avenida 6, 6667', 'Niterói', 'RJ', '24000-1200', 'Comercial', current_timestamp, current_timestamp);

/****************************************************************
***************************VEÍCULOS*****************************
****************************************************************/
INSERT INTO EMASA.Veiculos (PLACA, ID_CLIENTE, MARCA, MODELO, ALTURA_CACAMBA, LARGURA_CACAMBA, COMPRIMENTO_CACAMBA, createdAt, updatedAt) 
VALUES ('ABC1234', 1, 'Scania', 'R440', 0.80, 2.60, 7.80, current_timestamp, current_timestamp);

INSERT INTO EMASA.Veiculos (PLACA, ID_CLIENTE, MARCA, MODELO, ALTURA_CACAMBA, LARGURA_CACAMBA, COMPRIMENTO_CACAMBA, createdAt, updatedAt) 
VALUES ('DEF5678', 2, 'Volvo', 'FH540', 0.90, 2.50, 8.20, current_timestamp, current_timestamp);

INSERT INTO EMASA.Veiculos (PLACA, ID_CLIENTE, MARCA, MODELO, ALTURA_CACAMBA, LARGURA_CACAMBA, COMPRIMENTO_CACAMBA, createdAt, updatedAt) 
VALUES ('GHI9101', 3, 'Mercedes-Benz', 'Actros 2651', 0.60, 2.70, 8.00, current_timestamp, current_timestamp);

INSERT INTO EMASA.Veiculos (PLACA, ID_CLIENTE, MARCA, MODELO, ALTURA_CACAMBA, LARGURA_CACAMBA, COMPRIMENTO_CACAMBA, createdAt, updatedAt) 
VALUES ('JKL2345', 4, 'Volvo', 'FMX420', 0.00, 2.50, 7.50, current_timestamp, current_timestamp);

INSERT INTO EMASA.Veiculos (PLACA, ID_CLIENTE, MARCA, MODELO, ALTURA_CACAMBA, LARGURA_CACAMBA, COMPRIMENTO_CACAMBA, createdAt, updatedAt) 
VALUES ('MNO6789', 5, 'Scania', 'P360', 1.50, 2.80, 8.60, current_timestamp, current_timestamp);

INSERT INTO EMASA.Veiculos (PLACA, ID_CLIENTE, MARCA, MODELO, ALTURA_CACAMBA, LARGURA_CACAMBA, COMPRIMENTO_CACAMBA, createdAt, updatedAt) 
VALUES ('PQR1234', 6, 'Ford', 'Cargo 2623E', 1.30, 2.60, 7.80, current_timestamp, current_timestamp);

INSERT INTO EMASA.Veiculos (PLACA, ID_CLIENTE, MARCA, MODELO, ALTURA_CACAMBA, LARGURA_CACAMBA, COMPRIMENTO_CACAMBA, createdAt, updatedAt) 
VALUES ('STU5678', 7, 'Iveco', 'Stralis 560', 1.10, 2.50, 8.20, current_timestamp, current_timestamp);

INSERT INTO EMASA.Veiculos (PLACA, ID_CLIENTE, MARCA, MODELO, ALTURA_CACAMBA, LARGURA_CACAMBA, COMPRIMENTO_CACAMBA, createdAt, updatedAt) 
VALUES ('VWX9101', 8, 'Scania', 'G440', 0.80, 2.70, 8.00, current_timestamp, current_timestamp);

INSERT INTO EMASA.Veiculos (PLACA, ID_CLIENTE, MARCA, MODELO, ALTURA_CACAMBA, LARGURA_CACAMBA, COMPRIMENTO_CACAMBA, createdAt, updatedAt) 
VALUES ('YZA2345', 9, 'Volvo', 'FH440', 1.20, 2.50, 7.50, current_timestamp, current_timestamp);

INSERT INTO EMASA.Veiculos (PLACA, ID_CLIENTE, MARCA, MODELO, ALTURA_CACAMBA, LARGURA_CACAMBA, COMPRIMENTO_CACAMBA, createdAt, updatedAt) 
VALUES ('BCD6789', 10, 'Mercedes-Benz', 'Axor 3344', 0.95, 2.80, 8.60, current_timestamp, current_timestamp);

INSERT INTO EMASA.Veiculos (PLACA, ID_CLIENTE, MARCA, MODELO, ALTURA_CACAMBA, LARGURA_CACAMBA, COMPRIMENTO_CACAMBA, createdAt, updatedAt)
VALUES ('PQR1235', 11, 'Ford', 'Cargo 2628E', 2.90, 2.70, 7.90, current_timestamp, current_timestamp);

INSERT INTO EMASA.Veiculos (PLACA, ID_CLIENTE, MARCA, MODELO, ALTURA_CACAMBA, LARGURA_CACAMBA, COMPRIMENTO_CACAMBA, createdAt, updatedAt)
VALUES ('STU5679', 12, 'Iveco', 'Trakker 500', 3.20, 2.60, 8.30, current_timestamp, current_timestamp);

INSERT INTO EMASA.Veiculos (PLACA, ID_CLIENTE, MARCA, MODELO, ALTURA_CACAMBA, LARGURA_CACAMBA, COMPRIMENTO_CACAMBA, createdAt, updatedAt)
VALUES ('VWX9102', 13, 'Scania', 'G480', 3.00, 2.80, 8.10, current_timestamp, current_timestamp);

INSERT INTO EMASA.Veiculos (PLACA, ID_CLIENTE, MARCA, MODELO, ALTURA_CACAMBA, LARGURA_CACAMBA, COMPRIMENTO_CACAMBA, createdAt, updatedAt)
VALUES ('YZA2346', 14, 'Volvo', 'FMX460', 3.40, 2.60, 7.70, current_timestamp, current_timestamp);

INSERT INTO EMASA.Veiculos (PLACA, ID_CLIENTE, MARCA, MODELO, ALTURA_CACAMBA, LARGURA_CACAMBA, COMPRIMENTO_CACAMBA, createdAt, updatedAt)
VALUES ('BCD6780', 15, 'Mercedes-Benz', 'Actros 2653', 2.80, 2.70, 8.20, current_timestamp, current_timestamp);

INSERT INTO EMASA.Veiculos (PLACA, ID_CLIENTE, MARCA, MODELO, ALTURA_CACAMBA, LARGURA_CACAMBA, COMPRIMENTO_CACAMBA, createdAt, updatedAt)
VALUES ('CDE1236', 16, 'Volvo', 'FH500', 3.00, 2.80, 8.30, current_timestamp, current_timestamp);

INSERT INTO EMASA.Veiculos (PLACA, ID_CLIENTE, MARCA, MODELO, ALTURA_CACAMBA, LARGURA_CACAMBA, COMPRIMENTO_CACAMBA, createdAt, updatedAt)
VALUES ('EFG5680', 17, 'Scania', 'R580', 3.50, 2.50, 8.40, current_timestamp, current_timestamp);

INSERT INTO EMASA.Veiculos (PLACA, ID_CLIENTE, MARCA, MODELO, ALTURA_CACAMBA, LARGURA_CACAMBA, COMPRIMENTO_CACAMBA, createdAt, updatedAt)
VALUES ('GHI9102', 18, 'Mercedes-Benz', 'Atego 3030', 2.60, 2.70, 7.80, current_timestamp, current_timestamp);

INSERT INTO EMASA.Veiculos (PLACA, ID_CLIENTE, MARCA, MODELO, ALTURA_CACAMBA, LARGURA_CACAMBA, COMPRIMENTO_CACAMBA, createdAt, updatedAt)
VALUES ('JKL2346', 19, 'Volvo', 'FH540', 3.20, 2.50, 7.90, current_timestamp, current_timestamp);

INSERT INTO EMASA.Veiculos (PLACA, ID_CLIENTE, MARCA, MODELO, ALTURA_CACAMBA, LARGURA_CACAMBA, COMPRIMENTO_CACAMBA, createdAt, updatedAt)
VALUES ('MNO6780', 20, 'Scania', 'P410', 2.90, 2.80, 8.20, current_timestamp, current_timestamp);

INSERT INTO EMASA.Veiculos (PLACA, ID_CLIENTE, MARCA, MODELO, ALTURA_CACAMBA, LARGURA_CACAMBA, COMPRIMENTO_CACAMBA, createdAt, updatedAt)
VALUES ('PQR1236', 4, 'Ford', 'Cargo 2629E', 2.80, 2.70, 8.00, current_timestamp, current_timestamp);

INSERT INTO EMASA.Veiculos (PLACA, ID_CLIENTE, MARCA, MODELO, ALTURA_CACAMBA, LARGURA_CACAMBA, COMPRIMENTO_CACAMBA, createdAt, updatedAt)
VALUES ('STU5680', 7, 'Iveco', 'Trakker 450', 3.00, 2.60, 8.30, current_timestamp, current_timestamp);

INSERT INTO EMASA.Veiculos (PLACA, ID_CLIENTE, MARCA, MODELO, ALTURA_CACAMBA, LARGURA_CACAMBA, COMPRIMENTO_CACAMBA, createdAt, updatedAt)
VALUES ('VWX9103', 7, 'Scania', 'R500', 3.10, 2.80, 8.10, current_timestamp, current_timestamp);

INSERT INTO EMASA.Veiculos (PLACA, ID_CLIENTE, MARCA, MODELO, ALTURA_CACAMBA, LARGURA_CACAMBA, COMPRIMENTO_CACAMBA, createdAt, updatedAt)
VALUES ('YZA2347', 7, 'Volvo', 'FMX460', 3.20, 2.50, 7.70, current_timestamp, current_timestamp);

INSERT INTO EMASA.Veiculos (PLACA, ID_CLIENTE, MARCA, MODELO, ALTURA_CACAMBA, LARGURA_CACAMBA, COMPRIMENTO_CACAMBA, createdAt, updatedAt)
VALUES ('BCD6781', 3, 'Mercedes-Benz', 'Actros 3348', 2.90, 2.70, 8.20, current_timestamp, current_timestamp);

INSERT INTO EMASA.Veiculos (PLACA, ID_CLIENTE, MARCA, MODELO, ALTURA_CACAMBA, LARGURA_CACAMBA, COMPRIMENTO_CACAMBA, createdAt, updatedAt)
VALUES ('CDE1237', null, 'Volvo', 'FH540', 3.10, 2.50, 7.90, current_timestamp, current_timestamp);

INSERT INTO EMASA.Veiculos (PLACA, ID_CLIENTE, MARCA, MODELO, ALTURA_CACAMBA, LARGURA_CACAMBA, COMPRIMENTO_CACAMBA, createdAt, updatedAt)
VALUES ('EFG5681', null, 'Scania', 'S650', 3.50, 2.50, 8.40, current_timestamp, current_timestamp);


/****************************************************************
***************************MOTORISTAS****************************
****************************************************************/
INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('12345678900', 'CDE1237', 'João da Silva', '(11) 9999-9999', 'joao.silva@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('98765432100', 'EFG5681', 'Maria Souza', '(21) 8888-8888', 'maria.souza@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('11122233344', 'DEF5678', 'Lucas Ferreira', '(31) 7777-7777', 'lucas.ferreira@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('55544433322', 'JKL2345', 'Ana Rodrigues', '(41) 6666-6666', 'ana.rodrigues@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('99988877766', 'MNO6789', 'Pedro Santos', '(51) 5555-5555', 'pedro.santos@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('77788899900', 'PQR1234', 'Carla Oliveira', '(81) 4444-4444', 'carla.oliveira@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('44433322211', 'STU5678', 'Roberto Costa', '(22) 3333-3333', 'roberto.costa@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('22211100099', 'VWX9101', 'Jéssica Santos', '(44) 2222-2222', 'jessica.santos@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('66677788855', 'YZA2345', 'Ricardo Souza', '(55) 1111-1111', 'ricardo.souza@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('88899900044', 'BCD6789', 'Luana Rodrigues', '(62) 8888-8888', 'luana.rodrigues@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('12345678901', 'PQR1235', 'Gustavo Lima', '(71) 7777-7777', 'gustavo.lima@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('98765432101', 'STU5679', 'Amanda Costa', '(84) 6666-6666', 'amanda.costa@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('11122233345', 'VWX9102', 'Thiago Souza', '(92) 5555-5555', 'thiago.souza@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('55544433323', 'CDE1236', 'Gabriela Santos', '(63) 4444-4444', 'gabriela.santos@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('99988877767', 'MNO6780', 'Eduardo Rodrigues', '(98) 3333-3333', 'eduardo.rodrigues@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('77788899901', 'JKL2346', 'Fernanda Souza', '(61) 9999-9999', 'fernanda.souza@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('44433322212', 'BCD6780', 'Felipe Almeida', '(98) 8888-8888', 'felipe.Almeida@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('22211100098', 'GHI9102', 'Mariana Silva', '(31) 7777-7777', 'mariana.silva@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('66677788856', 'GHI9102', 'Rafael Castro', '(82) 6666-6666', 'rafael.castro@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('88899900045', 'MNO6780', 'Luciana Oliveira', '(77) 5555-5555', 'luciana.oliveira@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('12345678902', 'JKL2345', 'Giovana Pereira', '(48) 9999-9999', 'giovana.pereira@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('98765432102', 'JKL2345', 'Renato Costa', '(16) 8888-8888', 'renato.costa@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('11122233346', 'YZA2346', 'Pedro Henrique', '(98) 7777-7777', 'pedro.henrique@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('55544433324', 'BCD6780', 'Marcelo Santos', '(21) 6666-6666', 'marcelo.santos@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('99988877768', 'EFG5681', 'Aline Rodrigues', '(31) 5555-5555', 'aline.rodrigues@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('77788899902', 'EFG5681', 'José Silva', '(85) 8888-8888', 'jose.silva@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('44433322213', 'BCD6780', 'Camila Almeida', '(64) 7777-7777', 'camila.Almeida@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('22211100097', 'PQR1235', 'Luiz Santos', '(11) 6666-6666', 'luiz.santos@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('66677788857', 'VWX9102', 'Juliana Costa', '(27) 5555-5555', 'juliana.costa@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('88899900046', 'BCD6780', 'Carla Oliveira', '(61) 7777-7777', 'carla.oliveira@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('12345678903', 'CDE1236', 'Fernando Rodrigues', '(84) 6666-6666', 'fernando.rodrigues@email.com', current_timestamp, current_timestamp);

INSERT INTO EMASA.Motorista (CPF, PLACA, NOME, TELEFONE, EMAIL,  createdAt, updatedAt)
VALUES ('98765432103', 'EFG5680', 'Isabela Alves', '(62) 5555-5555', 'isabela.alves@email.com', current_timestamp, current_timestamp);


/****************************************************************
***************************PRODUTOS******************************
****************************************************************/
INSERT INTO EMASA.Produtos(nome,tipo,descricao,preco, createdAt, updatedAt)
VALUES("Pedra 1", "Brita", "Pedra tipo 1 com 25mm de diâmetro", 70.00, current_timestamp, current_timestamp);

INSERT INTO EMASA.Produtos(nome,tipo,descricao,preco, createdAt, updatedAt)
VALUES("Pedra 2", "Brita", "Pedra tipo 2 com 35mm de diâmetro", 65.00, current_timestamp, current_timestamp);

INSERT INTO EMASA.Produtos(nome,tipo,descricao,preco, createdAt, updatedAt)
VALUES("Pedra 3", "Brita", "Pedra tipo 1 com 40mm de diâmetro", 65.00, current_timestamp, current_timestamp);

INSERT INTO EMASA.Produtos(nome,tipo,descricao,preco, createdAt, updatedAt)
VALUES("Pedra de mão", "Pedra", "Pedra 10cm de diâmetro", 60.00, current_timestamp, current_timestamp);

INSERT INTO EMASA.Produtos(nome,tipo,descricao,preco, createdAt, updatedAt)
VALUES("Pó de Pedra", "Subproduto", "Resíduo com aproximadamente 10mm de diâmetro", 30.00, current_timestamp, current_timestamp);


/****************************************************************
***************************ESTOQUES******************************
****************************************************************/
INSERT INTO EMASA.Estoques(capacidade_maxima,tipo_estoque,localizacao,volume,id_produto,createdAt,updatedAt)
VALUES(20000,"pilha","Pátio Superior",16500, 1, current_timestamp, current_timestamp);
INSERT INTO EMASA.Estoques(capacidade_maxima,tipo_estoque,localizacao,volume,id_produto,createdAt,updatedAt)
VALUES(40000,"pilha", "Pátio Superior",36000, 2, current_timestamp, current_timestamp);
INSERT INTO EMASA.Estoques(capacidade_maxima,tipo_estoque,localizacao,volume,id_produto,createdAt,updatedAt)
VALUES(10000,"silo", "Pátio Inferior",5000, 1, current_timestamp, current_timestamp);

/****************************************************************
***************************USUÁRIOS******************************
****************************************************************/
INSERT INTO EMASA.Usuarios(id, nomeUsuario, nome, sobrenome, foto, ativo, email, senha, perfil, createdAt, updatedAt) 
VALUES(uuid(), 'Allan Chaves', 'Allan', 'Chaves', '', false, 'allancac@gmail.com', 'secret', 'vendedor',current_timestamp,current_timestamp);

/****************************************************************
***************************VENDAS******************************
****************************************************************/
INSERT INTO EMASA.Vendas(id_usuario, id_produto,id_estoque,id_cliente,id_endereco,cpf_motorista,placa,quantidade,preco_total,createdAt,updatedAt)
VALUES(2,1,1,4,4,'12345678902','ABC1234',12,840,current_timestamp,current_timestamp);

INSERT INTO EMASA.Vendas(id_usuario, id_produto,id_estoque,id_cliente,id_endereco,cpf_motorista,placa,quantidade,preco_total,createdAt,updatedAt)
VALUES(1,1,1,4,4,'12345678902','ABC1234',10,700,current_timestamp,current_timestamp);
