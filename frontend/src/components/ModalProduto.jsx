export function ModalProduto({ produto, todosOsProdutos, adicionarAoCarrinho, fechar }) {
    
    // Se o usuário clicar no fundo escuro (e não na janela), fecha o modal
    function handleOverlayClick(e) {
        if (e.target.className === 'modal-overlay') {
            fechar();
        }
    }

    // A INTELIGÊNCIA DO CROSS-SELL
    // 1. Pega todos os produtos e filtra os que são da mesma disciplina do produto atual
    // 2. Tira o produto atual da lista (para ele não sugerir ele mesmo)
    // 3. Usa o slice(0, 2) para pegar no máximo 2 sugestões
    const produtosRelacionados = todosOsProdutos ? todosOsProdutos.filter(
        p => p.disciplina?.id === produto.disciplina?.id && p.id !== produto.id
    ).slice(0, 2) : [];

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-container">
                
                {/* Botão X */}
                <button className="modal-fechar" onClick={fechar}>✖</button>

                {/* Coluna 1: Imagem (Esquerda) */}
                <div className="modal-imagem-container">
                    <img 
                        src={produto.imagem_capa || produto.imagem} 
                        alt={produto.titulo} 
                        className="modal-imagem"
                    />
                </div>

                {/* Coluna 2: Detalhes (Direita) */}
                <div className="modal-detalhes">
                    
                    {/* Tags */}
                    <div className="modal-tags">
                        <span className="tag">{produto.disciplina?.nome}</span>
                        <span className="tag">{produto.nivel?.nome}</span>
                        <span className="tag">{produto.tipo?.nome}</span>
                    </div>

                    {/* Título */}
                    <h1 style={{ color: 'var(--cor-primaria-azul)', margin: '0 0 15px 0', fontSize: '28px' }}>
                        {produto.titulo}
                    </h1>

                    {/* Descrição (Adicionado overflowY: 'auto' por precaução) */}
                    <div style={{ flex: 1, color: 'var(--cor-texto-principal)', lineHeight: '1.6', marginBottom: '15px', fontSize: '15px', overflowY: 'auto' }}>
                        <h4 style={{marginBottom: '10px'}}>Descrição do Material:</h4>
                        <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
                            {produto.descricao || "Este material não possui descrição detalhada cadastrada."}
                        </p>
                    </div>

                    {/* 👇 RODAPÉ OTIMIZADO (PREÇO E BOTÃO NA MESMA LINHA) 👇 */}
                    <div style={{ borderTop: '1px solid var(--cor-borda)', paddingTop: '15px', marginTop: 'auto' }}>
                        
                        {/* Linha 1: Preço + Adicionar ao Carrinho */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px' }}>
                            <p style={{ margin: 0, fontSize: '26px', fontWeight: 'bold', color: 'var(--cor-primaria-verde)', whiteSpace: 'nowrap' }}>
                                R$ {produto.preco}
                            </p>
                            
                            <button 
                                onClick={() => {
                                    adicionarAoCarrinho(produto);
                                    fechar(); // Fecha o modal após adicionar
                                }}
                                className="btn-primario"
                                style={{ flex: 1, padding: '12px', fontSize: '15px', whiteSpace: 'nowrap' }}>
                                🛒 Adicionar ao Carrinho
                            </button>
                        </div>

                        {/* Linha 2: Botão de Amostra */}
                        {produto.arquivo_amostra && (
                            <a 
                                href={produto.arquivo_amostra} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn-secundario"
                                style={{ 
                                    display: 'block', 
                                    marginTop: '10px', 
                                    padding: '8px', 
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    fontSize: '14px',
                                    width: '100%',
                                    boxSizing: 'border-box'
                                }}
                            >
                                👀 Espiar Material (Amostra Grátis)
                            </a>
                        )}
                    </div>

                    {/* 👇 SESSÃO COMPRE JUNTO (CROSS-SELL OTIMIZADO) 👇 */}
                    {produtosRelacionados.length > 0 && (
                        <div style={{ marginTop: '12px', borderTop: '2px dashed var(--cor-borda)', paddingTop: '10px' }}>
                            <h4 style={{ fontSize: '12px', color: 'var(--cor-texto-secundario)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                🔥 Quem ensina {produto.disciplina?.nome} também leva:
                            </h4>
                            
                            {/* Grid com 2 colunas */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                {produtosRelacionados.map(relacionado => (
                                    <div key={relacionado.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#f4f7f6', padding: '6px', borderRadius: '8px', border: '1px solid #e1e8ed' }}>
                                        
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                                            <img src={relacionado.imagem_capa || relacionado.imagem} alt={relacionado.titulo} style={{ width: '35px', height: '35px', objectFit: 'cover', borderRadius: '4px' }} />
                                            <div>
                                                <p style={{ margin: 0, fontSize: '11px', fontWeight: 'bold', color: 'var(--cor-texto-principal)', lineHeight: '1.2' }}>
                                                    {relacionado.titulo.length > 25 ? relacionado.titulo.substring(0, 25) + '...' : relacionado.titulo}
                                                </p>
                                                <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--cor-primaria-verde)', fontWeight: 'bold' }}>R$ {relacionado.preco}</p>
                                            </div>
                                        </div>
                                        
                                        <button
                                            onClick={() => adicionarAoCarrinho(relacionado)}
                                            style={{ width: '100%', backgroundColor: 'var(--cor-primaria-azul)', color: 'white', border: 'none', padding: '5px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', transition: 'background-color 0.2s' }}
                                            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                                            onMouseOut={(e) => e.target.style.backgroundColor = 'var(--cor-primaria-azul)'}
                                        >
                                            + Levar junto
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {/* 👆 FIM DA SESSÃO COMPRE JUNTO 👆 */}

                </div>

            </div>
        </div>
    );
}