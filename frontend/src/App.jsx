import { useState, useEffect } from "react";
import axios from 'axios';

import {Navegacao} from './components/Navegacao';
import { Vitrine } from "./components/Vitrine";
import {Login} from "./components/Login";
import { Historico } from "./components/Historico";
import { NotificacaoCarrinho } from "./components/NotificacaoCarrinho";
import { MiniCarrinho } from "./components/MiniCarrinho";
import { Cadastro } from "./components/Cadastro";
import { Perfil } from "./components/Perfil";
import { Footer } from "./components/Footer";

// ---------------------------------------------------
// COMPONENTE x: ......
// ---------------------------------------------------
function App() {
  // 1. A memória do App
  const [ paginaAtual, setPaginaAtual ] = useState("loja");
  const [ produtos, setProdutos ] = useState([]);
  const [ carrinho, setCarrinho ] = useState(() => {
                                                    // Tenta ler o carrinho salvo no localStorage
                                                    const dadosSalvos = localStorage.getItem('carrinho');
                                                    // Se tiver dados salvos, retorna eles como um array (JSON.parse)
                                                    // Se não tiver, retorna uma lista vazia
                                                    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
                                                  });
  const [ historicoCompras, setHistoricoCompras ] = useState([]);
  const [ busca, setBusca ] = useState("");
  const [token,setToken] = useState(localStorage.getItem("token"));
  const [ultimoProdutoAdicionado, setUltimoProdutoAdicionado] = useState(null); // Para mostrar a notificação do carrinho
  const [miniCarrinhoAberto, setMiniCarrinhoAberto] = useState(false); // Para controlar se o mini carrinho está aberto ou fechado   
  
  useEffect(() => {
    const idPendente = localStorage.getItem("carrinhoPendente");

    if (idPendente && token) {
      console.log("🕵️‍♂️ Porteiro ativado: Procurando confirmação do pedido", idPendente);
      
      let tentativas = 0;
      const maxTentativas = 5; // Vai tentar 5 vezes (total de 10 segundos)

      // Cria um "relógio" que repete a pergunta a cada 2 segundos
      const checarPagamento = setInterval(() => {
        tentativas++;
        console.log(`Procurando pagamento no banco... Tentativa ${tentativas}`);

        axios.get('http://127.0.0.1:8000/api/carrinho/historico/', {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(resposta => {
          const historico = resposta.data;
          const pagamentoConfirmado = historico.some(compra => compra.id === Number(idPendente));

          if (pagamentoConfirmado) {
            console.log("✅ Pagamento confirmado pelo Django! Esvaziando carrinho...");
            setCarrinho([]); // Limpa o carrinho de verdade
            localStorage.removeItem("carrinhoPendente"); // Rasga o aviso
            
            // Joga o cliente direto pro histórico dele
            setHistoricoCompras(historico);
            setPaginaAtual("historico"); 
            
            // Para o relógio, já achamos!
            clearInterval(checarPagamento); 
          } else if (tentativas >= maxTentativas) {
            console.log("❌ O webhook demorou muito. Desistindo de procurar automaticamente.");
            clearInterval(checarPagamento); // Para o relógio para não ficar rodando pra sempre
          }
        })
        .catch(erro => {
          console.log("Erro ao checar pagamento:", erro);
          clearInterval(checarPagamento); // Se der erro no Django, para o relógio
        });

      }, 2000); // 2000 milissegundos = 2 segundos de intervalo

      // Isso garante que se o cliente sair do site do nada, o relógio desliga sozinho
      return () => clearInterval(checarPagamento);
    }
  }, []); // O array vazio significa para rodar apenas quando o site abrir/recarregar

  // 2. Salva no LocalStorage toda vez que o carrinho mudar
  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }, [carrinho]); // <--- O array de dependência diz: "Vigie a variável carrinho"

  // 3. Função para remover um item do carrinho
  function removerDoCarrinho(indexParaRemover) {
    // O filter cria uma nova lista
    // "index" é a posição do item na lista, (0, 1, 2, 3...)
    // Se a posição for diferente da que quero apagar, o item fica.
    const novaLista = carrinho.filter((item, index) => index !== indexParaRemover);
    setCarrinho(novaLista);
  }

  // 4. Função que simula a finalização da compra
  async function finalizarCompra() {
    console.log("Olha o que tem no meu carrinho:", carrinho);
    // Passo 1: O usuário tem o token?
    if (!token) {
      alert("Faça o login para finalizar a compra!");
      setPaginaAtual("login"); // Manda para a tela de login
      return; // Para a função aqui, não continua para os próximos passos
    }

    try {
      // Passo 2 - Enviar os dados do carrinho para o backend
      // Como o carrinho tem vários produtos, enviamos a lista inteira
      const resposta = await axios.post('http://127.0.0.1:8000/api/carrinho/',
                                        {produtos: carrinho},// o formato exato depende de como montamos o Serializer no Django
                                        {headers: {Authorization: `Bearer ${token}`}} // É aqui que enviamos o token para o backend reconhecer quem é o usuário
                                      );

      // Passo 3 - O Django nos devolve os dados do carrinho criado. Vamos pegar o ID dele!
      const idDoCarrinho = resposta.data.id;
      
      // Salva o carrinho no armazenamento do navegador casa o cliente desista da compra quando for pagar
      localStorage.setItem('carrinhoPendente', idDoCarrinho);

      // Passo 4 - Bater na porta nova da InfinitePay pedindo o link
      const respostaPagamento = await axios.post(
                      `http://127.0.0.1:8000/api/pagar/${idDoCarrinho}/`,
                      {}, // O corpo é vazio, o Django já sabe o que fazer com o ID
                      {headers: {Authorization: `Bearer ${token}`}}
      );

      // Passo 5 - Pegamos o link devolvido pela InfinitePay
      const linkDeCheckout = respostaPagamento.data.url_pagamento;

      // Se a InfinitePay nos deu o link com sucesso...
      if (linkDeCheckout) {
                
        // 🚀 O REDIRECIONAMENTO MÁGICO 🚀
        // O comando window.location.href tira o cliente do seu site e joga ele
        // na tela segura da InfinitePay para digitar o cartão ou escanear o PIX!
        window.location.href = linkDeCheckout;
        
      } else {
        alert("Ops! Não conseguimos gerar o link de pagamento. Tente novamente.");
      }

    } catch (erro) {
      console.log("Erro ao salvar no banco: ", erro);

      // Se o token venceu, o Django devolve um erro 401 (Unauthorized)
      if (erro.response && erro.response.status === 401) {
        alert("Sua sessão expirou. Por favor, faça o login novamente.");
        localStorage.removeItem("token"); // Limpa o token vencido
        setToken(null); 
        setPaginaAtual("login"); // Manda para a tela de login
      } else {
        alert("Ops! Ocorreu um erro ao processar seu carrinho. Tente novamente.");
      }
    }
  }

  // 5. Calcula o total do carrinho
  // O "Number" garante que o texto "15.00" vire um número 15.00
  const total = carrinho.reduce((soma, item) => soma + Number(item.preco), 0);

  // 6. Busca de dados
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/produtos/')
      .then(response => setProdutos(response.data))
      .catch(erro => console.log("Erro: ", erro))
  }, [])

  // 7. Função que adicona ao carrinho
  function adicionarAoCarrinho(produtoClicado, origem='vitrine') {

    // Clone do produto e a etiqueta de origem
    const produtoComOrigem = { ...produtoClicado, origem_venda: origem };

    setCarrinho([...carrinho,produtoComOrigem]);

    // Mostra o produto na notificação
    setUltimoProdutoAdicionado(produtoComOrigem);

    // Esconde a notificação depois de 3 segundos
    setTimeout(() => {
      setUltimoProdutoAdicionado(null);
    }, 3000);
  }

  // 8. Função para visualizar o histórico do carrinho
  async function buscarHistorico() {
    try {
      const resposta = await axios.get('http://127.0.0.1:8000/api/carrinho/historico/',
        { headers: { Authorization: `Bearer ${token}` } } 
      );
      
      setHistoricoCompras(resposta.data);
      setPaginaAtual("historico");

    } catch(erro) {
      console.log("Erro ao acessar o histórico: ", erro);
      if (erro.response && erro.response.status === 401) {
        alert("Sua sessão expirou. Por favor, faça o login novamente.");
        localStorage.removeItem("token"); 
        setToken(null); 
        setPaginaAtual("login"); 
      } else {
        alert("Ops! Ocorreu um erro ao buscar seu histórico. Tente novamente.");
      }
    }
  }

  // 9. Renderização/Desenho da tela/ O que aparece para o usuário
  return (
    <div>
      
      <Navegacao
        setPaginaAtual={setPaginaAtual}
        tamanhoCarrinho={carrinho.length}
        token={token}
        setToken={setToken}
        buscarHistorico={buscarHistorico}
        abrirMiniCarrinho={() => setMiniCarrinhoAberto(true)}
      />

      <hr />

      {/*Notificação flutuante se houver um produto adicionado */}
      {ultimoProdutoAdicionado && (
        <NotificacaoCarrinho produto={ultimoProdutoAdicionado} />
      )}

      {/* Conteúdo da página atual (Renderização Condicional) */}
      <div style={{ padding: '20px'}}>

        { paginaAtual === "loja" ? (

          // OPÇÃO A: Se for a loja, mostrar os produtos
          <Vitrine
            produtos={produtos}
            busca={busca}
            setBusca={setBusca}
            adicionarAoCarrinho={adicionarAoCarrinho}
          />
        ) : 
        
        // OPÇÃO B: Aqui vai mostar os campos para colocar o login no miolo da página
        paginaAtual === "login" ? (
          <Login setPaginaAtual={setPaginaAtual} setToken={setToken}/>
        ) : 

        // OPÇÃO EXTRA: A tela de Cadastro
        paginaAtual === "cadastro" ? (
          <Cadastro setPaginaAtual={setPaginaAtual} />
        ) :
        
        // OPÇÃO D: Mostrar o Histórico de Compras
        paginaAtual === "historico" ? (
          <Historico 
            historicoCompras={historicoCompras} 
            setPaginaAtual={setPaginaAtual} 
          />
        
        ) :
        
        // OPÇÃO E: Mostrar o Perfil
        paginaAtual === "perfil" ? (
          <Perfil token={token} />
        ) : (


          // OPÇÃO C: Se for o carrinho, mostrar os itens do carrinho
          <div>
            <h2 style={{ color: 'var(--cor-primaria-azul)', marginBottom: '20px' }}>Seu Carrinho de Compras</h2>

            {/* Se o carrinho estiver vazio, mostrar uma mensagem */}
            {carrinho.length === 0 ? (
              <p>Seu carrinho está vazio. Volte para a loja!</p>
            ) : (
              <div>
                {carrinho.map((item, index) => (
                      <div key={index} style={{ 
                      border: '1px solid var(--cor-borda)', 
                      padding: '15px', 
                      marginBottom: '15px', 
                      borderRadius: 'var(--borda-arredondada)',
                      backgroundColor: 'var(--cor-fundo-card)',
                      display: 'flex', /* Coloca os elementos lado a lado */
                      alignItems: 'center', /* Centraliza verticalmente */
                      gap: '20px', /* Espaço entre a imagem, texto e botão */
                      boxShadow: 'var(--sombra-suave)'
                    }}
                  >
                    {/* 1. A IMAGEM DO PRODUTO */}
                    <img 
                      src={item.imagem_capa} 
                      alt={item.titulo} 
                      style={{ 
                        width: '90px', 
                        height: '90px', 
                        objectFit: 'cover', 
                        borderRadius: '8px' 
                      }} 
                    />

                    {/* 2. OS TEXTOS (O flex: 1 faz essa parte crescer e empurrar o botão pra direita) */}
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: '0 0 10px 0', color: 'var(--cor-texto-principal)' }}>
                        {item.titulo}
                      </h3>
                      <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: 'var(--cor-primaria-verde)' }}>
                        R$ {item.preco}
                      </p>
                    </div>

                    {/* 3. O BOTÃO DE EXCLUIR */}
                    <button 
                      onClick={() => removerDoCarrinho(index)}
                      className="btn-perigo"
                    >
                      Excluir
                    </button>

                  </div>
                ))}

                {/* Total do carrinho) */}
                <div style={{ marginTop: '20px', fontSize: '20px', fontWeight: 'bold'}}>
                  Total: R$ {total.toFixed(2)}
                </div>
            
              </div>
            )}
            
            {/* Botão que simula finalizar compra */}
            <button
              onClick={finalizarCompra}
              className="btn-primario"
              style={{ display: 'block', width: '100%', marginTop: '20px', fontSize: '18px' }}>
              ✅ Finalizar Compra
            </button>
            
            <button onClick={() => setPaginaAtual("loja")} className="btn-secundario" style={{ marginTop: '20px' }}>
              ⬅️ Voltar para a Loja
            </button>
         
          </div> 

        )}   
      </div>
      
        {/* Se a memória for true, desenha a gaveta */}
        {miniCarrinhoAberto && (
          <MiniCarrinho 
            carrinho={carrinho} 
            removerDoCarrinho={removerDoCarrinho} 
            fechar={() => setMiniCarrinhoAberto(false)} 
            irParaCheckout={() => setPaginaAtual("carrinho")} 
          />
        )}
      

      <Footer />
    </div>
  );
}

export default App; 