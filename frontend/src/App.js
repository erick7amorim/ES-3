// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConcessionariasPage from './pages/ConcessionariasPage';
import VeiculosPage from './pages/VeiculosPage';
import CadastroConcessionariaPage from './pages/CadastroConcessionariaPage';
import CadastroVeiculoPage from './pages/CadastroVeiculoPage';
import HomePage from './pages/HomePage';
import './App.css'; // Importe seus estilos aqui

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cadastro-concessionaria" element={<CadastroConcessionariaPage />} />
        <Route path="/cadastro-veiculo" element={<CadastroVeiculoPage />} />
        <Route path="/concessionarias" element={<ConcessionariasPage />} />
        <Route path="/veiculos" element={<VeiculosPage />} />
      </Routes>
    </Router>
  );
}

export default App;
