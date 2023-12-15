// VeiculosPage.js
import React from 'react';
import VeiculosList from '../components/VeiculosList';
import { Link } from 'react-router-dom';
import './ConcessionariasPage.css'; // Importe o arquivo CSS

function VeiculosPage() {
  return (
    <div className="container">
      <h1 className="title">Veículos Page</h1>
      <VeiculosList />
      <Link to="/" className="link">Voltar para a Página Inicial</Link>
      <Link to="/cadastro-veiculo" className="link">Cadastrar Novo Veículo</Link>
    </div>
  );
}

export default VeiculosPage;
