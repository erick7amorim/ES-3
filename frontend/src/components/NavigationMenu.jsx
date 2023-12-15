// NavigationMenu.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavigationMenu = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cadastro-concessionaria">Cadastrar Concessionária</Link>
        </li>
        <li>
          <Link to="/cadastro-veiculo">Cadastrar Veículo</Link>
        </li>
        <li>
          <Link to="/concessionarias">Lista de Concessionárias</Link>
        </li>
        <li>
          <Link to="/veiculos">Lista de Veículos</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;
