const {
  BadRequest,           //400
  // Unauthorized,         //401
  // Forbidden,            //403
  Conflict,             //409
  NotFound,             //404
  InternalServerError,  //500
} = require('./serviceErrors');

const createUsuarioService = (Usuario) => {
  // Função para obter todos os usuarios
  const getAllUsuarios = async (offset = 0, limit = 10) => {
    try {
      if (offset >= 0 && limit >= 0) {
        const usuarios = await Usuario.findAll(
          {
            offset: parseInt(offset),
            limit: parseInt(limit),
          }
        );
        // Verifica se há usuarios encontrados
        if (usuarios) {
          return usuarios;
        } else {
          throw new NotFound('Nenhum usuario encontrado.');
        }
        // Lança um erro genérico que será tratado
      } else {
        throw new BadRequest('Parâmetros inválidos.');
      }
    } catch (error) {
      if (error instanceof NotFound) {
        throw error;
      } else if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new InternalServerError('Não foi possível listar os usuarios.');
      }
    }
  }

  // Obtém um Usuario pelo ID
  const getUsuarioById = async (id) => {
    try {
      if (id !== null || id !== undefined) {
        const Usuario = await Usuario.findByPk(id);
        // Verifica se o Usuario foi encontrado
        if (Usuario) {
          return Usuario;
        } else {
          throw new NotFound('Usuário não encontrada.');
        }
      } else {
        throw new BadRequest('Parâmetros inválidos.');
      }
    } catch (error) {
      if (error instanceof NotFound) {
        throw error;
      } else if (error instanceof BadRequest) {
        throw error;
      }
      else {
        throw new InternalServerError('Não foi possível buscar o usuário.');
      }
    }
  }
  // Cria um novo Usuário
  const createUsuario = async (usuarioData) => {
    try {
      const idExiste = await Usuario.findByPk(usuarioData.id);
      if (idExiste) {
        throw new Conflict();
      } else {
        const Usuario = await Usuario.create(usuarioData);
        if (Usuario) {
          return Usuario;
        } else {
          throw new Error();
        }
      }
    } catch (error) {
      if (error instanceof Conflict) {
        throw new Conflict('Usuário já cadastrado no sistema.')
      } else {
        throw new InternalServerError('Não foi possível criar o usuário.')

      }
    }
  }

  const updateUsuario = async (id, usuarioData) => {
    try {
      const idExiste = await Usuario.findByPk(id);
      if (idExiste) {
        const Usuario = await Usuario.update(usuarioData, { where: { id } })
        return usuarioData;
      } else {
        throw new NotFound('Usuário não encontrado.');
      }
    } catch (error) {
      if (error instanceof NotFound) {
        throw error;
      } else {
        throw new InternalServerError('Não foi possível atualizar o usuário.');
      }
    }
  }



  // Deleta um Usuario pelo ID
  const deleteUsuario = async (id) => {
    try {
      const idExiste = await Usuario.findByPk(id);
      if (idExiste) {
        const usuarioApagado = await Usuario.destroy({ where: { id } });
        if (usuarioApagado) {
          return usuarioApagado;
        } else {
          throw new Error();
        }
      } else {
        throw new NotFound('Usuário não encontrado.');
      }
    } catch (error) {
      if (error instanceof NotFound) {
        throw error;
      } else {
        throw new InternalServerError('Não foi possível atualizar o usuário.');
      }
    }
  }

  return {
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
  }

}

module.exports = createUsuarioService;
