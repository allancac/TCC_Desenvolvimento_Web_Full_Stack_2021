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
      const usuarios = await service.getAllUsuarios(offset, limit);
      if (usuarios.length > 0) {
        res.status(200).json(
          {
            status: {
              code: 200,
              message: "OK",
            },
            metadata: {
              offset: parseInt(offset), // Offset de registros
              limit: parseInt(limit), // Limite total de registros
              count: usuarios.length, // Total de registros retornados na requisição atual
            },
            data: usuarios
          });
      } else {
        res.status(404).json({
          status: {
            code: 404,
            error: 'Nenhum usuário foi encontrado.'
          }
        });
      }
    } catch (error) {
      // Tratamento de erro genérico
      res.status(500).json({
        status: {
          code: 500,
          error: error.message
        }
      });
    }
  }
  // Handler para obter um usuario pela id
  const getUsuarioById = async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await service.getUsuarioById(id);
      const resultado = []
      resultado.push(usuario)
      res.status(200).json({
        status: {
          code: 200,
          message: 'OK'
        },
        data: resultado
      });

    } catch (error) {
      if (error instanceof NotFound) {
        res.status(404).json({
          status: {
            code: 404,
            error: error.message
          }
        });
      } else {
        res.status(500).json({
          status: {
            code: 500,
            error: error.message
          }
        });
      }
    }
  }
  // Handler para criar um novo usuário
  const createUsuario = async (req, res) => {
    try {
      const usuarioData = req.body;
      const usuario = await service.createUsuario(usuarioData);
      if (usuario) {
        const resultado = []
        resultado.push(usuario)
        res.status(200).json(
          {
            status: {
              code: 200,
              message: "OK",
            },
            data: resultado

          }
        );
      }
    } catch (error) {
      // Tratamento de erro para requisição inválida
      if (error instanceof Conflict) {
        res.status(409).json({
          status: {
            code: 409,
            error: error.message
          }
        });
      }
      // Outros erros não tratados
      else {
        res.status(500).json({
          status: {
            code: 500,
            error: error.message
          }
        });
      }
    }
  }
  // Handler para atualizar um usuário
  const updateUsuario = async (req, res) => {
    try {
      const { id } = req.params;
      const usuarioData = req.body;
      const usuario = await service.updateUsuario(id, usuarioData);
      const resultado = []
      resultado.push(usuario)
      res.status(200).json(
        {
          status: {
            code: 200,
            message: "OK",
          },
          data: resultado
        });
    } catch (error) {
      // Tratamento de erro para usuário não encontrado
      if (error instanceof NotFound) {
        res.status(404).json({
          status: {
            code: 404,
            error: error.message
          },
        });
      }
      // Tratamento de erro genérico
      else {
        res.status(500).json({
          status: {
            code: 500,
            error: error.message
          },
        });
      }

    }
  }

  // Handler para excluir um usuário
  const deleteUsuario = async (req, res) => {
    try {
      const { id } = req.params;
      await service.deleteUsuario(id);
      res.status(200).json({
        status: {
          code: 200,
          message: "Usuário excluído com sucesso.",
        }
      });
    } catch (error) {
      if (error instanceof NotFound) {
        res.status(404).json({
          status: {
            code: 404,
            error: error.message
          },
        });
      }
      else {
        res.status(500).json({
          status: {
            code: 500,
            error: error.message
          },
        });
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

module.exports = createUsuariosController
