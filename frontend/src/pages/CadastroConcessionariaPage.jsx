import React from 'react';
import ConcessionariaForm from '../components/ConcessionariaForm';
import { Link } from 'react-router-dom';
import './CadastroConcessionariaPage.css'; // Importe o arquivo CSS

const CadastroConcessionariaPage = () => {
  return (
    <div className="container">
      <h1 className="title">Cadastro de Concessionária</h1>
      <ConcessionariaForm />
      <Link to="/" className="link">Voltar para a Página Inicial</Link>
    </div>
  );
};

export default CadastroConcessionariaPage;
