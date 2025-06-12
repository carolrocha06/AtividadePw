// src/App.jsx
import { useEffect, useState } from 'react';
import UserCard from './components/UserCard';
import './App.css';

function App() {
  const [users, setUsers] = useState([]); // estado para quando os dados mudam
  const [pgAtual, setCurrentPage] = useState(1); // desafio 1- variavel do estado comeca com 1 e a função altera 
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null); // desafio 2- estado para o usuario selecionado, que comeca com null pois nenhum usuario esta selecionado inicialmente
  
  // codigo inicial- useEffect para buscar os dados quando o componente user é montado
  // executa toda vez que o app carrega
  useEffect(() => {
    fetch('http://localhost:3001/peoples')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Erro ao buscar usuários:', err));
  }, []);

  // desafio 1- adicionando uma paginacao, muda a pagina e consequentemente reinicia o valor da constante
  const ultimoUsuario = pgAtual * 5; // pega o ultimo usuario da pagina
  const primeiroUsuario = ultimoUsuario - 5; // pega o primeiro usuario da pagina
  const usuariosAtuais = users.slice(primeiroUsuario, ultimoUsuario); // users é a variavel do estado, já slice pega os users inicial e final para mostrar na pagina

  const proximaPagina = () => { //função responsavel por ir para a proxima pagina
    if (pgAtual < Math.ceil(users.length / 5)) { // Math.ceil retorna um valor inteiro, já users.legngth é a quantidade de usuarios e divide por 5
      setCurrentPage(parseInt(pgAtual) + 1); // a funcao setCurrentPage altera o estado da pagina atual ao somar mais um e precisa do parseInt para não virar 11 (Concatenacao)
    }
  };

  const paginaAnterior = () => { // atribui a variavel para a arrow function (com seta) anonima responsavel por ir para a pagina anterior
    if (pgAtual > 1) { // se a pagina atual for maior que 1
      setCurrentPage(parseInt(pgAtual) - 1);  // a funcao setCurrentPage altera o estado da pagina atual ao subtrair menos um e precisa do parseInt para não ser Concatenacao
    }
  };

  // desafio 2- função para selecionar um usuario
  const selecionarUsuario = (user) => {
    setUsuarioSelecionado(user); // altera o estado do usuario selecionado
  };

  const deselecionarUsuario = () => {
    setUsuarioSelecionado(null); // altera o estado do usuario selecionado para null (vazio), ou seja, nenhum usuario selecionado
  }

  if (usuarioSelecionado) { // se um usuario estiver selecionado (conter um valor diferente de null), se for null não executa o codigo do if
    return (
      <div className="Detalhes"> {/* retorna a pagina de detalhes se o usuario estiver selecionado */}
        <h1>Detalhes do Usuário</h1> {/* titulo da pagina de detalhes */}
        <img className="usuario-avatar" src={usuarioSelecionado.avatar} alt={usuarioSelecionado.name} /> {/* mostra a imagem do usuario selecionado */}
        <h2>Nome Completo: {usuarioSelecionado.firstName} {usuarioSelecionado.lastName}</h2> {/* mostra o nome completo do usuario selecionado */}
        <h2>Email: {usuarioSelecionado.email} </h2>  {/* email do usuario selecionado */}
        <h2>Endereço: {usuarioSelecionado.address}</h2> {/* endereço do usuario selecionado (todas os dados em h2) */}
        <button onClick={deselecionarUsuario}>Voltar</button> {/* volta para pg inicial e chama a função deselecionarUsuario (estado null) */}
      </div>
    );
  }

  // codigo inicial + desafio
  return (
    <div className="App">
      <h1>Dashboard de Usuários</h1>
      <h2>Total de usuários: {users.length}</h2>
      <div className="user-container"> 
        {usuariosAtuais.map((user) => ( // limita a quantidade de usuarios que serão mostrados na pagina (5, nesse caso)
        <div onClick={() => selecionarUsuario(user)}>
          <UserCard key={user.id} user={user} />
        </div>
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
