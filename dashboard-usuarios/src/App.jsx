// src/App.jsx
import { useEffect, useState } from 'react';
import UserCard from './components/UserCard';
import './App.css';

function App() {
  const [users, setUsers] = useState([]); // estado para quando os dados mudam
  const [pgAtual, setCurrentPage] = useState(1); // variavel do estado comeca com 1 e a função altera 
  
  // codigo inicial- useEffect para buscar os dados quando o componente user é montado
  useEffect(() => {
    fetch('http://localhost:3001/peoples')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Erro ao buscar usuários:', err));
  }, []);

  // desafio 1- adicionando uma paginacao
  const ultimoUsuario = pgAtual * 5; // pega o ultimo usuario da pagina
  const primeiroUsuario = ultimoUsuario - 5; // pega o primeiro usuario da pagina
  const usuariosAtuais = users.slice(primeiroUsuario, ultimoUsuario); // users é a variavel do estado, já slice pega os users inicial e final para mostrar na pagina

  const proximaPagina = () => { //função responsavel por ir para a proxima pagina
    if (pgAtual < Math.ceil(users.length / 5)) { // Math.ceil retorna um valor inteiro, já users.legngth é a quantidade de usuarios e divide por 5
      setCurrentPage(parseInt(pgAtual) + 1); // a funcao setCurrentPage altera o estado da pagina atual ao somar mais um e precisa do parseInt para não virar 11 (Concatenacao)
    }
  };

  const paginaAnterior = () => { // função responsavel por ir para a pagina anterior
    if (pgAtual > 1) { // se a pagina atual for maior que 1
      setCurrentPage(parseInt(pgAtual) - 1);  // a funcao setCurrentPage altera o estado da pagina atual ao subtrair menos um e precisa do parseInt para não ser Concatenacao
    }
  };

  // codigo inicial
  return (
    <div className="App">
      <h1>Dashboard de Usuários</h1>
      <h2>Total de usuários: {users.length}</h2>
      <div className="user-container">
        {usuariosAtuais.map((user) => ( // limita a quantidade de usuarios que serão mostrados na pagina (5, nesse caso)
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      <div className="paginacao">
        <button onClick={paginaAnterior} disabled={pgAtual === 1}>Anterior</button>
        <span>Página {pgAtual}</span>
        <button onClick={proximaPagina} disabled={pgAtual >= Math.ceil(users.length / 5)}>Próxima</button>
      </div>
    </div>
  );

}

export default App;