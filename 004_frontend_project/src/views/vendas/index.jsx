import React, { useState, useEffect } from "react";
import { menuVendas } from "../../components/Aside/listaMenuLateral";
import setMenuLateral from "../../redux/actions/menuLateralActions";
import { useDispatch } from "react-redux";

export const Vendas = () => {
  //  Hook para disparar as Actions do REDUX
  const dispatch = useDispatch();
  // Hook para controle das páginas de formulários
  const [pagina, setPagina] = useState(1);

  //  Hook de ciclo de vida para criar o Menu Lateral na montagem do componente
  useEffect(() => {
    // Dipatch do REDUX para atualizar o Menu Laretal
    dispatch(setMenuLateral(menuVendas));
  }, []);
  return (
    <>
      <h1>Listagem de vendas</h1>
    </>
  );
};
