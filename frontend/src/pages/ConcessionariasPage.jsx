import React from 'react';
import ConcessionariasList from '../components/ConcessionariasList'; // ajuste o caminho conforme necessário
import { Link } from 'react-router-dom';
import './ConcessionariasPage.css'; // Importe o arquivo CSS

const ConcessionariasPage = () => {
  return (
    <div className="container">
      <h1 className="title">Concessionárias Page</h1>
      <ConcessionariasList />
      <Link to="/" className="link">Voltar para a Página Inicial</Link>
      <Link to="/cadastro-concessionaria" className="link">Cadastrar Nova Concessionária</Link>
    </div>
  );
};

export default ConcessionariasPage;
