import { useState } from "react";
import { FiltrosLateral } from "./FiltrosLateral";
import { ModalProduto } from "./ModalProduto"; 
import { BannerPromocional } from "./BannerPromocional";

export function Vitrine({ produtos, adicionarAoCarrinho, busca, setBusca}) {
    
    // Memória dos Filtros
    const [filtrosSelecionados, setFiltrosSelecionados] = useState({
        nivel: [],
        disciplina: [],
        assunto: [], 
        tipo: []
    });

    // Guarda o produto que vai aparecer no Modal (null = fechado)
    const [produtoModal, setProdutoModal] = useState(null);

    // Função que marca e desmarca a caixinha
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

    // Filtrando os produtos
    const produtosFiltrados = produtos.filter(produto => {
        const matchBusca = (produto.titulo || "").toLowerCase().includes(busca.toLowerCase());
        const nomeNivel = produto.nivel?.nome || "";
        const nomeDisciplina = produto.disciplina?.nome || "";
        const nomeTipo = produto.tipo?.nome || "";

        const matchDisciplina = filtrosSelecionados.disciplina.length === 0 || filtrosSelecionados.disciplina.includes(nomeDisciplina);

        const matchNivel = filtrosSelecionados.nivel.length === 0 || 
                           filtrosSelecionados.nivel.some(nivelSelecionado => {
                               if (nivelSelecionado === "Ensino Médio") return nomeNivel.includes("EM");
                               if (nivelSelecionado === "Ensino Fundamental II") return nomeNivel.includes("EF") || nomeNivel.includes("Fundamental");
                               return nomeNivel === nivelSelecionado;
                           });

        const matchTipo = filtrosSelecionados.tipo.length === 0 || 
                          filtrosSelecionados.tipo.some(tipoSelecionado => {
                              return tipoSelecionado.toLowerCase().includes(nomeTipo.toLowerCase());
                          });

        const matchAssunto = filtrosSelecionados.assunto.length === 0 || 
                             filtrosSelecionados.assunto.some(assuntoSelecionado => {
                                 const termo = assuntoSelecionado.toLowerCase();
                                 const tituloDoProduto = (produto.titulo || "").toLowerCase();
                                 const descricaoDoProduto = (produto.descricao || "").toLowerCase(); 
                                 return tituloDoProduto.includes(termo) || descricaoDoProduto.includes(termo);
                             });

        return matchBusca && matchNivel && matchDisciplina && matchTipo && matchAssunto;
    });

    return (
        <div>
            <h2 style={{ color: 'var(--cor-primaria-azul)', marginBottom: '20px' }}>
                Vitrine de Produtos
            </h2>

            <div className="pesquisa-container">
                <input
                    type="text"
                    placeholder="🔍 O que você está buscando?"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="input-pesquisa"
                />
            </div>

            {/* Se a barra de busca estiver VAZIA, mostramos o Banner! */}
            {busca === "" && <BannerPromocional />}

            <div className="layout-loja">
                <FiltrosLateral 
                    filtrosSelecionados={filtrosSelecionados} 
                    alternarFiltro={alternarFiltro} 
                />

                <div className="conteudo-vitrine">
                    <div className="grid-produtos">
                        {produtosFiltrados.map(produto => ( 
                            <div key={produto.id} className="card-produto">
                                
                                {/* 3. GATILHO: Clicar na imagem abre o modal */}
                                {produto.imagem_capa && ( 
                                    <img 
                                        src={produto.imagem_capa}
                                        alt={produto.titulo}
                                        className="img-produto"
                                        onClick={() => setProdutoModal(produto)} // <-- Abre Modal
                                        style={{cursor: 'pointer'}} // Muda o mouse para a mãozinha
                                    />
                                )}
                                
                                {/* 3. GATILHO: Clicar no título abre o modal */}
                                <h3 
                                    style={{ margin: '0 0 10px 0', fontSize: '18px', color: 'var(--cor-texto-principal)', cursor: 'pointer' }}
                                    onClick={() => setProdutoModal(produto)} // <-- Abre Modal
                                >
                                    {produto.titulo}
                                </h3>
                                
                                <p style={{ margin: '0 0 15px 0', fontSize: '20px', fontWeight: 'bold', color: 'var(--cor-primaria-verde)' }}>R$ {produto.preco}</p>
                                
                                <div style={{ marginTop: 'auto' }}>
                                    {/* Mantemos o botão direto para quem já quer comprar sem ler */}
                                    <button 
                                        onClick={() => adicionarAoCarrinho(produto)}
                                        className="btn-primario"
                                        style={{ width: '100%' }}>
                                        Comprar
                                    </button>
                                </div>
                            </div>  
                        ))}

                        {produtosFiltrados.length === 0 && (
                            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--cor-texto-secundario)', padding: '40px 0' }}>
                                Nenhum material encontrado com esses filtros. 😔
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* 4. DESENHO DO MODAL (Aparece se tiver produto na memória) */}
            {produtoModal && (
                <ModalProduto 
                    produto={produtoModal} 
                    todosOsProdutos={produtos}
                    adicionarAoCarrinho={adicionarAoCarrinho} 
                    fechar={() => setProdutoModal(null)} // Esvazia a memória (fecha)
                />
            )}

        </div>
    );
}