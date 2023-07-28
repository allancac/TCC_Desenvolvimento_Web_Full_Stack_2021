import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UsuariosServices from "../../../services/UsuariosServices";
import { DetalharUsuario } from "./DetalharUsuario";
import { AlterarUsuario } from "./AlterarUsuario.jsx";
// import { ExcluirUsuario } from './ExcluirUsuario';

export const DetalhesUsuario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState({
    id: "",
    nomeUsuario: "",
    nome: "",
    sobreNome: "",
    foto: "",
    ativo: "",
    email: "",
    perfil: "",
    createdAt: "",
    updatedAt: "",
  });
  const [pagina, setPagina] = useState(0);

  const buscarUsuario = async (id) => {
    const usuariosServices = new UsuariosServices();
    try {
      const {
        data: [resultado],
      } = await usuariosServices.buscarUsuario(id);
      setUsuario((usuario) => resultado);
    } catch (error) {
      console.log("Erro ao requisitar:", error);
      alert("Usuario não encontrado");
    }
  };

  useEffect(() => {
    buscarUsuario(id);
  }, [id, pagina]);

  return (
    <Container>
      {pagina === 0 && usuario.id && (
        <DetalharUsuario usuario={usuario} setPagina={setPagina} />
      )}
      {pagina === 1 && (
        <AlterarUsuario usuario={usuario} setPagina={setPagina} />
      )}
    </Container>
  );
};
