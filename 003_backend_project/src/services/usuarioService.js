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
        const { count, rows } = await Usuario.findAndCountAll(
          {
            offset: parseInt(offset),
            limit: parseInt(limit),
          }
        );
        if (rows) {
          return { count, rows };
        }
        throw new NotFound('Nenhum usuario encontrado.');
      }
      throw new BadRequest('Parâmetros inválidos.');

    } catch (error) {
      if (error instanceof NotFound) {
        throw error;
      } else if (error instanceof BadRequest) {
        throw error;
      }
      throw new InternalServerError('Não foi possível listar os usuarios.');
    }
  }
  // Obtém um Usuario pelo ID
  const getUsuarioById = async (id) => {
    try {
      if (id !== null || id !== undefined) {
        const usuario = await Usuario.findByPk(id);
        // Verifica se o Usuario foi encontrado
        if (usuario) {
          return usuario;
        }
        throw new NotFound('Usuário não encontrada.');
      }
      throw new BadRequest('Parâmetros inválidos.');
    } catch (error) {
      if (error instanceof NotFound) {
        throw error;
      } else if (error instanceof BadRequest) {
        throw error;
      }
      throw new InternalServerError('Não foi possível buscar o usuário.');
    }
  }
  // Cria um novo Usuário
  const createUsuario = async (usuarioData) => {
    try {
      const idExiste = await Usuario.findByPk(usuarioData.id);
      if (idExiste) {
        throw new Conflict();
      }
      const usuario = await Usuario.create(usuarioData);
      if (usuario) { return usuario }
      throw new Error();
    } catch (error) {
      if (error instanceof Conflict) {
        throw new Conflict('Usuário já cadastrado no sistema.')
      }
      throw new InternalServerError('Não foi possível criar o usuário.')
    }
  }

  const updateUsuario = async (id, usuarioData) => {
    try {
      const idExiste = await Usuario.findByPk(id);
      if (idExiste) {
        const usuario = await Usuario.update(usuarioData, { where: { id } })
        return usuarioData;
      }
      throw new NotFound('Usuário não encontrado.');
    } catch (error) {
      if (error instanceof NotFound) {
        throw error;
      }
      throw new InternalServerError('Não foi possível atualizar o usuário.');
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
        }
        throw new Error();
      }
      throw new NotFound('Usuário não encontrado.');
    } catch (error) {
      if (error instanceof NotFound) {
        throw error;
      }
      throw new InternalServerError('Não foi possível atualizar o usuário.');
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
