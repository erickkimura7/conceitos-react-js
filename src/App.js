import React, { useEffect, useState } from "react";
import api from './services/api';
import "./styles.css";


function App() {

  const [repositorios, setRepositorios] = useState([]);

  useEffect(() => {
    api.get('repositories').then(reponse => {
      setRepositorios(reponse.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Teste",
      url: "http://teste",
      techs: [
        'Java',
        'Python'
      ]
    });

    setRepositorios([...repositorios, response.data]);
  }

  async function handleRemoveRepository(id) {
    const copyRepositorios = [...repositorios];
    const index = repositorios.findIndex(value => value.id === id);

    const response = await api.delete(`repositories/${id}`);

    if (response.status === 204) {
      copyRepositorios.splice(index, 1);
      setRepositorios(copyRepositorios);
    }

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositorios.map(repositorio => {
          return (
            <li key={repositorio.id}>
              {repositorio.title}
              <button onClick={() => handleRemoveRepository(repositorio.id)}>
                Remover
              </button>
            </li>
          )
        })}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
