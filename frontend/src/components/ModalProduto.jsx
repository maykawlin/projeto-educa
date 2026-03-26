export function ModalProduto({ produto, adicionarAoCarrinho, fechar }) {
    
    // Se o usuário clicar no fundo escuro (e não na janela), fecha o modal
    function handleOverlayClick(e) {
        if (e.target.className === 'modal-overlay') {
            fechar();
        }
    }

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

                    {/* Descrição (Rolável se for grande) */}
                    <div style={{ flex: 1, color: 'var(--cor-texto-principal)', lineHeight: '1.6', marginBottom: '20px', fontSize: '15px' }}>
                        <h4 style={{marginBottom: '10px'}}>Descrição do Material:</h4>
                        {/* O Django envia HTML na descrição? Se sim, use dangerouslySetInnerHTML. 
                           Se for texto puro, use pre-wrap para manter quebras de linha */}
                        <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
                            {produto.descricao || "Este material não possui descrição detalhada cadastrada."}
                        </p>
                    </div>

                    {/* Rodapé fixo: Preço e Botão */}
                    <div style={{ borderTop: '1px solid var(--cor-borda)', paddingTop: '20px', marginTop: 'auto' }}>
                        <p className="modal-preco">R$ {produto.preco}</p>
                        
                        <button 
                            onClick={() => {
                                adicionarAoCarrinho(produto);
                                fechar(); // Fecha o modal após adicionar
                            }}
                            className="btn-primario"
                            style={{ width: '100%', padding: '15px', fontSize: '18px' }}>
                            🛒 Adicionar ao Carrinho
                        </button>

                        {produto.arquivo_amostra && (
                            <a 
                                href={produto.arquivo_amostra} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn-secundario"
                                style={{ 
                                    display: 'inline-block', 
                                    marginTop: '10px', 
                                    padding: '10px 20px', 
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    width: '100%'
                                }}
                            >
                                👀 Espiar Material (Amostra Grátis)
                            </a>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}