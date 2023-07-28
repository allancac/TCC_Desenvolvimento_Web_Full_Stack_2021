import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VendasServices from "../../../services/VendasServices";
import { DetalharVenda } from "./DetalharVenda";
import { CancelarVenda } from "./CancelarVenda.jsx";

export const DetalhesVenda = () => {
  const { idVenda } = useParams();
  const [venda, setVenda] = useState({});
  const [pagina, setPagina] = useState(0);

  const buscarVenda = async (idVenda) => {
    const vendasServices = new VendasServices();
    try {
      const {
        data: [resultado],
      } = await vendasServices.buscarVendaPorId(idVenda);
      setVenda((venda) => resultado);
    } catch (error) {
      console.log("Erro ao requisitar:", error);
      alert("Venda não encontrada.");
    }
  };

  useEffect(() => {
    buscarVenda(idVenda);
  }, [idVenda, pagina]);

  return (
    <Container>
      {pagina === 0 && venda.id && (
        <DetalharVenda venda={venda} setPagina={setPagina} />
      )}
      {pagina === 1 && <CancelarVenda venda={venda} setPagina={setPagina} />}
    </Container>
  );
};
