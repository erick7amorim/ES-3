// ConcessionariasList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ConcessionariasList() {
  const [concessionarias, setConcessionarias] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/concessionarias')
      .then(response => setConcessionarias(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Concessionárias</h2>
      <ul>
        {concessionarias.map(concessionaria => (
          <li key={concessionaria.id}>{concessionaria.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default ConcessionariasList;
