import React, { useState, useEffect } from "react";

const Clubs = () => {
  const [clubes, setClubes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubes = async () => {
      try {
        const response = await fetch("https://api.cartola.globo.com/clubes");
        if (!response.ok) {
          throw new Error("Erro ao obter os dados dos clubes");
        }
        const data = await response.json();
        setClubes(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchClubes();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Ocorreu um erro: {error}</p>;
  }

  return (
    <div>
      <h1>Lista de Clubes</h1>
      <ul>
        {clubes.map((clube) => (
          <li key={clube.id}>{clube.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default Clubs;