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
import { QuemSomos} from "./components/QuemSomos";

// ---------------------------------------------------
// COMPONENTE PRINCIPAL DA APLICAÇÃO
// ---------------------------------------------------
function App() {
  // 1. A memória global do App
  const [ paginaAtual, setPaginaAtual ] = useState("loja");
  const [ produtos, setProdutos ] = useState([]);
  const [ urlProdutos, setUrlProdutos ] = useState('https://projeto-educa.onrender.com/api/produtos/');
  const [ linkProxima, setLinkProxima ] = useState(null);
  const [ linkAnterior, setLinkAnterior ] = useState(null);
  const [ carrinho, setCarrinho ] = useState(() => {
                                                    // Tenta ler o carrinho salvo no localStorage
                                                    const dadosSalvos = localStorage.getItem('carrinho');
                                                    // Se tiver dados salvos, retorna-os como um array (JSON.parse)
                                                    // Se não tiver, retorna uma lista vazia
                                                    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
                                                  });
  const [ historicoCompras, setHistoricoCompras ] = useState([]);
  const [ busca, setBusca ] = useState("");
  
  // 🌟 MEMÓRIA CENTRAL DOS FILTROS (Centralizada no App para comunicação com o Django)
  const [filtrosSelecionados, setFiltrosSelecionados] = useState({
      nivel: [],
      disciplina: [],
      assunto: [], 
      tipo: []
  });

  const [token,setToken] = useState(localStorage.getItem("token"));
  const [ultimoProdutoAdicionado, setUltimoProdutoAdicionado] = useState(null); // Para mostrar a notificação do carrinho
  const [miniCarrinhoAberto, setMiniCarrinhoAberto] = useState(false); // Para controlar se o mini carrinho está aberto ou fechado   
  
  // O "Porteiro" - Monitora o Webhook da InfinitePay após a tentativa de compra
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

        axios.get('https://projeto-educa.onrender.com/api/carrinho/historico/', {
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
            clearInterval(checarPagamento); // Para o relógio para não ficar rodando para sempre
          }
        })
        .catch(erro => {
          console.log("Erro ao checar pagamento:", erro);
          clearInterval(checarPagamento); // Se der erro no Django, para o relógio
        });

      }, 2000); 

      return () => clearInterval(checarPagamento);
    }
  }, [token]); 

  // 2. Salva no LocalStorage toda vez que o carrinho mudar
  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }, [carrinho]); 

  // 3. Função para remover um item do carrinho
  function removerDoCarrinho(indexParaRemover) {
    const novaLista = carrinho.filter((item, index) => index !== indexParaRemover);
    setCarrinho(novaLista);
  }

  // 4. Função que dispara a finalização da compra na InfinitePay
  async function finalizarCompra() {
    console.log("Olha o que tem no meu carrinho:", carrinho);
    if (!token) {
      alert("Faça o login para finalizar a compra!");
      setPaginaAtual("login"); 
      return; 
    }

    try {
      // Envia os dados do carrinho para o backend
      const resposta = await axios.post('https://projeto-educa.onrender.com/api/carrinho/',
                                        {produtos: carrinho},
                                        {headers: {Authorization: `Bearer ${token}`}} 
                                      );

      const idDoCarrinho = resposta.data.id;
      localStorage.setItem('carrinhoPendente', idDoCarrinho);

      // Pede o link de checkout para a InfinitePay através do Django
      const respostaPagamento = await axios.post(
                      `https://projeto-educa.onrender.com/api/pagar/${idDoCarrinho}/`,
                      {}, 
                      {headers: {Authorization: `Bearer ${token}`}}
      );

      const linkDeCheckout = respostaPagamento.data.url_pagamento;

      if (linkDeCheckout) {
        window.location.href = linkDeCheckout;
      } else {
        alert("Ops! Não conseguimos gerar o link de pagamento. Tente novamente.");
      }

    } catch (erro) {
      console.log("Erro ao salvar no banco: ", erro);

      if (erro.response && erro.response.status === 401) {
        alert("Sua sessão expirou. Por favor, faça o login novamente.");
        localStorage.removeItem("token"); 
        setToken(null); 
        setPaginaAtual("login"); 
      } else {
        alert("Ops! Ocorreu um erro ao processar seu carrinho. Tente novamente.");
      }
    }
  }

  // 5. Calcula o total financeiro do carrinho
  const total = carrinho.reduce((soma, item) => soma + Number(item.preco), 0);


  // =================================================================
  // 🌟 MÓDULO INTELIGENTE DE FILTRAGEM (INTEGRADO COM BACKEND)
  // =================================================================
  
  // Função que marca e desmarca a caixinha dos filtros laterais
  function alternarFiltro(categoria, valor) {
      setFiltrosSelecionados(memoriaAnterior => {
          const listaAtual = memoriaAnterior[categoria];
          if (listaAtual.includes(valor)) {
              return { ...memoriaAnterior, [categoria]: listaAtual.filter(item => item !== valor) };
          } else {
              return { ...memoriaAnterior, [categoria]: [...listaAtual, valor] };
          }
      });
  }

  // Constrói a URL dinamicamente injetando a busca por texto e caixas marcadas
  const carregarProdutos = () => {
    let urlBase = 'https://projeto-educa.onrender.com/api/produtos/?';
    
    if (busca) urlBase += `search=${busca}&`;
    
    if (filtrosSelecionados.disciplina.length > 0) {
        urlBase += `disciplina=${filtrosSelecionados.disciplina.join(',')}&`;
    }
    
    if (filtrosSelecionados.tipo.length > 0) {
        urlBase += `tipo=${filtrosSelecionados.tipo.join(',')}&`;
    }
    
    if (filtrosSelecionados.nivel.length > 0) {
        const niveisBD = filtrosSelecionados.nivel.map(n => {
            if (n === "Ensino Médio") return "EM";
            if (n === "Ensino Fundamental II") return "EF";
            return n;
        });
        urlBase += `nivel=${niveisBD.join(',')}&`;
    }
    
    setUrlProdutos(urlBase);
  };

  // Monitor de Ações: Se digitar algo ou clicar num checkbox, reconstrói o link
  useEffect(() => {
    carregarProdutos();
  }, [busca, filtrosSelecionados]);
  // =================================================================


  // 6. Busca efetiva dos dados com paginação e regras automáticas anti-crash
  useEffect(() => {
    axios.get(urlProdutos)
      .then(response => {
        const dadosSeguros = response.data.results ? response.data.results : response.data;
        setProdutos(Array.isArray(dadosSeguros) ? dadosSeguros : []);
        setLinkProxima(response.data.next || null);
        setLinkAnterior(response.data.previous || null);
      })
      .catch(erro => console.log("Erro: ", erro))
  }, [urlProdutos])

  // 7. Função que adiciona um item ao carrinho flutuante
  function adicionarAoCarrinho(produtoClicado, origem='vitrine') {
    const produtoComOrigem = { ...produtoClicado, origem_venda: origem };
    setCarrinho([...carrinho, produtoComOrigem]);
    setUltimoProdutoAdicionado(produtoComOrigem);
    setTimeout(() => {
      setUltimoProdutoAdicionado(null);
    }, 3000);
  }

  // 8. Função para puxar o histórico de compras liberado do Django
  async function buscarHistorico() {
    try {
      const resposta = await axios.get('https://projeto-educa.onrender.com/api/carrinho/historico/',
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

  // 9. Renderização das Telas (Visual do Usuário)
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

      {ultimoProdutoAdicionado && (
        <NotificacaoCarrinho produto={ultimoProdutoAdicionado} />
      )}

      <div style={{ padding: '20px'}}>
        { paginaAtual === "loja" ? (
          <Vitrine
            produtos={produtos}
            busca={busca}
            setBusca={setBusca}
            adicionarAoCarrinho={adicionarAoCarrinho}
            linkProxima={linkProxima}          
            linkAnterior={linkAnterior}        
            setUrlProdutos={setUrlProdutos}
            filtrosSelecionados={filtrosSelecionados}
            alternarFiltro={alternarFiltro}
          />
        ) : 
        paginaAtual === "login" ? (
          <Login setPaginaAtual={setPaginaAtual} setToken={setToken}/>
        ) : 
        paginaAtual === "cadastro" ? (
          <Cadastro setPaginaAtual={setPaginaAtual} />
        ) :
        paginaAtual === "historico" ? (
          <Historico 
            historicoCompras={historicoCompras} 
            setPaginaAtual={setPaginaAtual} 
            token={token}
          />
        ) :
        paginaAtual === "perfil" ? (
          <Perfil token={token} />
        ) : 
        paginaAtual === "quem_somos" ? (
          <QuemSomos setPaginaAtual={setPaginaAtual} />
        ) : (
          /* TELA DO CARRINHO DE COMPRAS COMPLETO */
          <div>
            <h2 style={{ color: 'var(--cor-primaria-azul)', marginBottom: '20px' }}>Seu Carrinho de Compras</h2>

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
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '20px', 
                      boxShadow: 'var(--sombra-suave)'
                    }}
                  >
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

                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: '0 0 10px 0', color: 'var(--cor-texto-principal)' }}>
                        {item.titulo}
                      </h3>
                      <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: 'var(--cor-primaria-verde)' }}>
                        R$ {item.preco}
                      </p>
                    </div>

                    <button 
                      onClick={() => removerDoCarrinho(index)}
                      className="btn-perigo"
                    >
                      Excluir
                    </button>

                  </div>
                ))}

                <div style={{ marginTop: '20px', fontSize: '20px', fontWeight: 'bold'}}>
                  Total: R$ {total.toFixed(2)}
                </div>
            
              </div>
            )}
            
            {carrinho.length > 0 && (
              <div style={{
                marginTop: '25px',
                padding: '15px',
                backgroundColor: '#f8f9fa',
                borderLeft: ' 4px solid var(--cor-primaria-verde)',
                borderRadius: '4px',
                fontSize: '14px',
                color: 'var(--cor-texto-secundario)',
                lineHeight: '1.5'
              }}>
                <p style={{margin: 0}}>
                  🔒 <strong>Pagamento 100% seguro.</strong> Para garantir as melhores taxas e repassar o menor preço a você, professor(a), nossa plataforma opera no modelo MEI. Ao prosseguir, o recebedor no seu PIX ou Fatura de Cartão aparecerá como <strong>Maycon Kawlin</strong>. Fique tranquilo(a), é a nossa conta oficial!
                </p>
              </div>
            )}

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
      
      {/* Gaveta do Mini Carrinho Lateral */}
      {miniCarrinhoAberto && (
        <MiniCarrinho 
          carrinho={carrinho} 
          removerDoCarrinho={removerDoCarrinho} 
          fechar={() => setMiniCarrinhoAberto(false)} 
          irParaCheckout={() => setPaginaAtual("carrinho")} 
        />
      )}
      
      <Footer setPaginaAtual={setPaginaAtual}/>
    </div>
  );
}

export default App;