import React,{useEffect,useState} from "react";
import "./styles.css";
import api from './services/api'
function App() {
  const [repositories,setRepositories] = useState([])
  async function handleAddRepository() {
    const repository = await api.post('repositories',{
       title: `teest ${Date.now()}`,
        url: "http://localhost"
    })

      setRepositories([...repositories,repository.data])
  }

  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })

  },[])

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    setRepositories([...repositories.filter(rep=>rep.id!==id)])

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository=> (<li key={repository.id}>
            {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
        </li>))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
