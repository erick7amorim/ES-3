import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VeiculoForm = ({ onSubmit }) => {
  const navigate = useNavigate(); // Obtém a instância de navigate

  const [nome, setNome] = useState('');
  const [categoriaNome, setCategoriaNome] = useState('');
  const [concessionariaId, setConcessionariaId] = useState('');
  const [concessionarias, setConcessionarias] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Busque as concessionárias disponíveis ao carregar o componente
    const fetchConcessionarias = async () => {
      try {
        const response = await axios.get('http://localhost:3000/concessionarias');
        setConcessionarias(response.data);
      } catch (error) {
        console.error('Erro ao buscar concessionárias:', error);
      }
    };

    // Busque as categorias disponíveis ao carregar o componente
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:3000/categorias');
        setCategorias(response.data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchConcessionarias();
    fetchCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Busque o ID da categoria com base no nome
      const categoria = categorias.find((cat) => cat.nome === categoriaNome);
      const categoriaId = categoria ? categoria.id : null;

      // Faça a requisição POST para o endpoint da sua API
      const response = await axios.post(`http://localhost:3000/veiculos/concessionarias/${concessionariaId}`, {
        nome,
        categoriaId,
      });

      // Chame a função onSubmit com os dados da resposta se necessário
      onSubmit(response.data);

      // Limpe o estado do formulário
      setNome('');
      setCategoriaNome('');
      setConcessionariaId('');

      // Redirecione para a listagem de veículos após o sucesso
      navigate('/veiculos');
    } catch (error) {
      console.error('Erro ao cadastrar veículo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
      </label> <br></br><br></br>
      <label>
        Categoria:
        <select value={categoriaNome} onChange={(e) => setCategoriaNome(e.target.value)}>
          <option value="" disabled>
            Selecione a Categoria
          </option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.nome}>
              {categoria.nome}
            </option>
          ))}
        </select>
      </label><br></br><br></br>
      <label>
        Concessionária:
        <select value={concessionariaId} onChange={(e) => setConcessionariaId(e.target.value)}>
        <option value="" disabled>
            Selecione a Concessionária
          </option>
          {concessionarias.map((concessionaria) => (
            <option key={concessionaria.id} value={concessionaria.id}>
              {concessionaria.nome}
            </option>
          ))}
        </select>
      </label><br></br><br></br>
      <button type="submit">Cadastrar Veículo</button>
    </form>
  );
};

export default VeiculoForm;
