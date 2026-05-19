import { useState } from "react";
import { FiltrosLateral } from "./FiltrosLateral";
import { ModalProduto } from "./ModalProduto"; 
import { BannerPromocional } from "./BannerPromocional";

export function Vitrine({ 
    produtos, 
    adicionarAoCarrinho, 
    busca, 
    alterarBusca, 
    linkProxima, 
    linkAnterior, 
    setUrlProdutos,
    filtrosSelecionados,
    alternarFiltro,
    limparFiltros,
    carregando 
}) {
    
    const [produtoModal, setProdutoModal] = useState(null);

    return (
        <div>
            <h2 style={{ color: 'var(--cor-primaria-azul)', marginBottom: '20px' }}>
                Vitrine de Produtos
            </h2>

            <BannerPromocional />

            <div className="pesquisa-container">
                <input
                    type="text"
                    placeholder="🔍 O que você está buscando?"
                    value={busca}
                    onChange={(e) => alterarBusca(e.target.value)}
                    className="input-pesquisa"
                />
            </div>

            <div className="layout-loja">
                <FiltrosLateral 
                    filtrosSelecionados={filtrosSelecionados} 
                    alternarFiltro={alternarFiltro} 
                    limparFiltros={limparFiltros}
                />

                <div className="conteudo-vitrine">
                    <div className="grid-produtos">
                        {carregando ? (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0' }}>
                                <h3 style={{ color: 'var(--cor-primaria-azul)', fontSize: '24px' }}>
                                    ⏳ Vasculhando materiais...
                                </h3>
                                <p style={{ color: 'var(--cor-texto-secundario)' }}>
                                    Só um instante enquanto preparamos os melhores resultados para você.
                                </p>
                            </div>
                        ) : (
                            <>
                                {produtos.map(produto => ( 
                                    <div key={produto.id} className="card-produto">
                                        {produto.imagem_capa && ( 
                                            <img 
                                                src={produto.imagem_capa}
                                                alt={produto.titulo}
                                                className="img-produto"
                                                onClick={() => setProdutoModal(produto)} 
                                                style={{cursor: 'pointer'}} 
                                            />
                                        )}
                                        <h3 
                                            style={{ margin: '0 0 10px 0', fontSize: '18px', color: 'var(--cor-texto-principal)', cursor: 'pointer' }}
                                            onClick={() => setProdutoModal(produto)} 
                                        >
                                            {produto.titulo}
                                        </h3>
                                        <p style={{ margin: '0 0 15px 0', fontSize: '20px', fontWeight: 'bold', color: 'var(--cor-primaria-verde)' }}>
                                            R$ {produto.preco}
                                        </p>
                                        <div style={{ marginTop: 'auto' }}>
                                            <button 
                                                onClick={() => adicionarAoCarrinho(produto)}
                                                className="btn-primario"
                                                style={{ width: '100%' }}>
                                                Comprar
                                            </button>
                                        </div>
                                    </div>  
                                ))}

                                {produtos.length === 0 && (
                                    <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--cor-texto-secundario)', padding: '40px 0' }}>
                                        Nenhum material encontrado com esses filtros. 😔
                                    </p>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {produtoModal && (
                <ModalProduto 
                    produto={produtoModal} 
                    todosOsProdutos={produtos}
                    adicionarAoCarrinho={adicionarAoCarrinho} 
                    fechar={() => setProdutoModal(null)} 
                />
            )}

            {!carregando && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px', paddingBottom: '20px' }}>
                    {linkAnterior && (
                        <button onClick={() => setUrlProdutos(linkAnterior)} className="btn-secundario">
                            ⬅️ Página Anterior
                        </button>
                    )}
                    {linkProxima && (
                        <button onClick={() => setUrlProdutos(linkProxima)} className="btn-secundario">
                            Próxima Página ➡️
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}