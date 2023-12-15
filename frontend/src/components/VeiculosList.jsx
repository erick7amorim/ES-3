// VeiculosList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function VeiculosList() {
  const [veiculos, setVeiculos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/veiculos')
      .then(response => setVeiculos(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Veículos</h2>
      <ul>
        {veiculos.map(veiculo => (
          <li key={veiculo.id}>{veiculo.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default VeiculosList;
