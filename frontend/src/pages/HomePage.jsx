import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container">
      <h1>Bem-vindo à Página Inicial</h1>

      <div className="links">
        <Link to="/concessionarias">Lista de Concessionárias</Link>
        <Link to="/veiculos">Lista de Veículos</Link>
        <Link to="/cadastro-concessionaria">Cadastrar Concessionária</Link>
        <Link to="/cadastro-veiculo">Cadastrar Veículo</Link>
      </div>
    </div>
  );
};

export default HomePage;
