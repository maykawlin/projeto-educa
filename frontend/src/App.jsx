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

function App() {
  const [ paginaAtual, setPaginaAtual ] = useState("loja");
  const [ produtos, setProdutos ] = useState([]);
  const [ urlProdutos, setUrlProdutos ] = useState('https://projeto-educa.onrender.com/api/produtos/');
  const [ linkProxima, setLinkProxima ] = useState(null);
  const [ linkAnterior, setLinkAnterior ] = useState(null);
  const [ carrinho, setCarrinho ] = useState(() => {
    const dadosSalvos = localStorage.getItem('carrinho');
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });
  const [ historicoCompras, setHistoricoCompras ] = useState([]);
  
  // 🌟 MEMÓRIAS DE BUSCA, FILTROS E CARREGAMENTO
  const [ busca, setBusca ] = useState("");
  const [ carregando, setCarregando ] = useState(false); 
  const [filtrosSelecionados, setFiltrosSelecionados] = useState({
      nivel: [],
      disciplina: [],
      assunto: [], 
      tipo: []
  });

  const [token,setToken] = useState(localStorage.getItem("token"));
  const [ultimoProdutoAdicionado, setUltimoProdutoAdicionado] = useState(null); 
  const [miniCarrinhoAberto, setMiniCarrinhoAberto] = useState(false); 
  
  // O Porteiro
  useEffect(() => {
    const idPendente = localStorage.getItem("carrinhoPendente");
    if (idPendente && token) {
      let tentativas = 0;
      const maxTentativas = 5; 
      const checarPagamento = setInterval(() => {
        tentativas++;
        axios.get('https://projeto-educa.onrender.com/api/carrinho/historico/', {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(resposta => {
          const historico = resposta.data;
          const pagamentoConfirmado = historico.some(compra => compra.id === Number(idPendente));

          if (pagamentoConfirmado) {
            setCarrinho([]); 
            localStorage.removeItem("carrinhoPendente"); 
            setHistoricoCompras(historico);
            setPaginaAtual("historico"); 
            clearInterval(checarPagamento); 
          } else if (tentativas >= maxTentativas) {
            clearInterval(checarPagamento); 
          }
        })
        .catch(erro => {
          clearInterval(checarPagamento); 
        });
      }, 2000); 
      return () => clearInterval(checarPagamento);
    }
  }, [token]); 

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }, [carrinho]); 

  function removerDoCarrinho(indexParaRemover) {
    const novaLista = carrinho.filter((item, index) => index !== indexParaRemover);
    setCarrinho(novaLista);
  }

  async function finalizarCompra() {
    if (!token) {
      alert("Faça o login para finalizar a compra!");
      setPaginaAtual("login"); 
      return; 
    }
    try {
      const resposta = await axios.post('https://projeto-educa.onrender.com/api/carrinho/',
                                        {produtos: carrinho},
                                        {headers: {Authorization: `Bearer ${token}`}} 
                                      );
      const idDoCarrinho = resposta.data.id;
      localStorage.setItem('carrinhoPendente', idDoCarrinho);

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

  const total = carrinho.reduce((soma, item) => soma + Number(item.preco), 0);

  // =================================================================
  // 🌟 MÓDULO INTELIGENTE DE FILTRAGEM 
  // =================================================================
  
  function alterarBusca(texto) {
      setBusca(texto);
      if (texto !== "") {
          setFiltrosSelecionados({ nivel: [], disciplina: [], assunto: [], tipo: [] });
      }
  }

  function alternarFiltro(categoria, valor) {
      setBusca(""); 
      setFiltrosSelecionados(memoriaAnterior => {
          const listaAtual = memoriaAnterior[categoria];
          if (listaAtual.includes(valor)) {
              return { ...memoriaAnterior, [categoria]: [] }; 
          } else {
              return { ...memoriaAnterior, [categoria]: [valor] }; 
          }
      });
  }

  function limparFiltros() {
      setFiltrosSelecionados({ nivel: [], disciplina: [], assunto: [], tipo: [] });
      setBusca("");
  }

  const carregarProdutos = () => {
    let urlBase = 'https://projeto-educa.onrender.com/api/produtos/?';
    
    if (busca) urlBase += `search=${busca}&`;
    if (filtrosSelecionados.disciplina.length > 0) urlBase += `disciplina=${filtrosSelecionados.disciplina.join(',')}&`;
    if (filtrosSelecionados.tipo.length > 0) urlBase += `tipo=${filtrosSelecionados.tipo.join(',')}&`;
    if (filtrosSelecionados.assunto.length > 0) urlBase += `assunto=${filtrosSelecionados.assunto.join(',')}&`;
    
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

  useEffect(() => {
    const cronometro = setTimeout(() => {
      carregarProdutos();
    }, 800); 
    return () => clearTimeout(cronometro);
  }, [busca, filtrosSelecionados]); 

  useEffect(() => {
    setCarregando(true); 
    axios.get(urlProdutos)
      .then(response => {
        const dadosSeguros = response.data.results ? response.data.results : response.data;
        setProdutos(Array.isArray(dadosSeguros) ? dadosSeguros : []);
        setLinkProxima(response.data.next || null);
        setLinkAnterior(response.data.previous || null);
        setCarregando(false); 
      })
      .catch(erro => {
        setCarregando(false); 
      });
  }, [urlProdutos])

  function adicionarAoCarrinho(produtoClicado, origem='vitrine') {
    const produtoComOrigem = { ...produtoClicado, origem_venda: origem };
    setCarrinho([...carrinho, produtoComOrigem]);
    setUltimoProdutoAdicionado(produtoComOrigem);
    setTimeout(() => {
      setUltimoProdutoAdicionado(null);
    }, 3000);
  }

  async function buscarHistorico() {
    try {
      const resposta = await axios.get('https://projeto-educa.onrender.com/api/carrinho/historico/',
        { headers: { Authorization: `Bearer ${token}` } } 
      );
      setHistoricoCompras(resposta.data);
      setPaginaAtual("historico");
    } catch(erro) {
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
            alterarBusca={alterarBusca}
            adicionarAoCarrinho={adicionarAoCarrinho}
            linkProxima={linkProxima}          
            linkAnterior={linkAnterior}        
            setUrlProdutos={setUrlProdutos}
            filtrosSelecionados={filtrosSelecionados}
            alternarFiltro={alternarFiltro}
            limparFiltros={limparFiltros}
            carregando={carregando}
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
          <div>
            <h2 style={{ color: 'var(--cor-primaria-azul)', marginBottom: '20px' }}>Seu Carrinho de Compras</h2>
            {carrinho.length === 0 ? (
              <p>Seu carrinho está vazio. Volte para a loja!</p>
            ) : (
              <div>
                {carrinho.map((item, index) => (
                      <div key={index} style={{ 
                      border: '1px solid var(--cor-borda)', padding: '15px', marginBottom: '15px', 
                      borderRadius: 'var(--borda-arredondada)', backgroundColor: 'var(--cor-fundo-card)',
                      display: 'flex', alignItems: 'center', gap: '20px', boxShadow: 'var(--sombra-suave)'
                    }}
                  >
                    <img src={item.imagem_capa} alt={item.titulo} style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '8px' }} />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: '0 0 10px 0', color: 'var(--cor-texto-principal)' }}>{item.titulo}</h3>
                      <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: 'var(--cor-primaria-verde)' }}>R$ {item.preco}</p>
                    </div>
                    <button onClick={() => removerDoCarrinho(index)} className="btn-perigo">Excluir</button>
                  </div>
                ))}
                <div style={{ marginTop: '20px', fontSize: '20px', fontWeight: 'bold'}}>
                  Total: R$ {total.toFixed(2)}
                </div>
              </div>
            )}
            {carrinho.length > 0 && (
              <div style={{
                marginTop: '25px', padding: '15px', backgroundColor: '#f8f9fa',
                borderLeft: ' 4px solid var(--cor-primaria-verde)', borderRadius: '4px',
                fontSize: '14px', color: 'var(--cor-texto-secundario)', lineHeight: '1.5'
              }}>
                <p style={{margin: 0}}>
                  🔒 <strong>Pagamento 100% seguro.</strong> Fique tranquilo(a), é a nossa conta oficial!
                </p>
              </div>
            )}
            <button onClick={finalizarCompra} className="btn-primario" style={{ display: 'block', width: '100%', marginTop: '20px', fontSize: '18px' }}>
              ✅ Finalizar Compra
            </button>
            <button onClick={() => setPaginaAtual("loja")} className="btn-secundario" style={{ marginTop: '20px' }}>
              ⬅️ Voltar para a Loja
            </button>
          </div> 
        )}   
      </div>
      <div style={{ position: 'relative', zIndex: 9999 }}>
        {miniCarrinhoAberto && (
          <MiniCarrinho 
            carrinho={carrinho} 
            removerDoCarrinho={removerDoCarrinho} 
            fechar={() => setMiniCarrinhoAberto(false)} 
            irParaCheckout={() => setPaginaAtual("carrinho")} 
          />
        )}
      </div>
      <Footer setPaginaAtual={setPaginaAtual}/>
    </div>
  );
}

export default App;