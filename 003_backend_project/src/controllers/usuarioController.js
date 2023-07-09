const {
  // BadRequest,
  // Unauthorized,
  // Forbidden,
  NotFound,
  // InternalServerError,
  Conflict
} = require('../services/serviceErrors');

const createUsuariosController = (service) => {
  // Handler para obter todos os usuários
  const getAllUsuarios = async (req, res) => {
    const { offset, limit } = req.query;
    try {
      const { count, rows } = await service.getAllUsuarios(offset, limit);
      if (rows.length > 0) {
        return res.status(200).json(
          {
            status: {
              code: 200,
              message: "OK",
            },
            metadata: {
              offset: parseInt(offset), // Offset de registros
              limit: parseInt(limit), // Limite total de registros
              count: rows.length, // Total de registros retornados na requisição atual
              countAll: count
            },
            data: rows
          }
        );
      }
      return res.status(404).json(
        {
          status: {
            code: 404,
            errors: ['Nenhum usuário foi encontrado.']
          }
        }
      );

    } catch (error) {
      // Tratamento de erro genérico
      return res.status(500).json({
        status: {
          code: 500,
          errors: [error.message]
        }
      });
    }
  }
  // Handler para obter um usuario pela id
  const getUsuarioById = async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await service.getUsuarioById(id);
      return res.status(200).json({
        status: {
          code: 200,
          message: 'OK'
        },
        data: [usuario]
      });

    } catch (error) {
      if (error instanceof NotFound) {
        return res.status(404).json({
          status: {
            code: 404,
            errors: [error.message]
          }
        });
      }
      return res.status(500).json({
        status: {
          code: 500,
          errors: [error.message]
        }
      });

    }
  }
  // Handler para criar um novo usuário
  const createUsuario = async (req, res) => {
    try {
      const usuarioData = req.body;
      const usuario = await service.createUsuario(usuarioData);
      if (usuario) {
        return res.status(200).json(
          {
            status: {
              code: 200,
              message: "OK",
            },
            data: [usuario]
          }
        );
      }
    } catch (error) {
      // Tratamento de erro para requisição inválida
      if (error instanceof Conflict) {
        return res.status(409).json({
          status: {
            code: 409,
            errors: [error.message]
          }
        });
      }
      return res.status(500).json({
        status: {
          code: 500,
          errors: [error.message]
        }
      });

    }
  }
  // Handler para atualizar um usuário
  const updateUsuario = async (req, res) => {
    try {
      const { id } = req.params;
      const usuarioData = req.body;
      const usuario = await service.updateUsuario(id, usuarioData);
      return res.status(200).json(
        {
          status: {
            code: 200,
            message: "OK",
          },
          data: [usuario]
        });
    } catch (error) {
      if (error instanceof NotFound) {
        return res.status(404).json({
          status: {
            code: 404,
            errors: [error.message]
          },
        });
      }
      return res.status(500).json({
        status: {
          code: 500,
          errors: [error.message]
        },
      });
    }
  }

  // Handler para excluir um usuário
  const deleteUsuario = async (req, res) => {
    try {
      const { id } = req.params;
      await service.deleteUsuario(id);
      return res.status(200).json({
        status: {
          code: 200,
          message: "Usuário excluído com sucesso.",
        }
      });
    } catch (error) {
      if (error instanceof NotFound) {
        return res.status(404).json({
          status: {
            code: 404,
            errors: [error.message]
          },
        });
      }
      return res.status(500).json({
        status: {
          code: 500,
          errors: [error.message]
        },
      });
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

module.exports = createUsuariosController
