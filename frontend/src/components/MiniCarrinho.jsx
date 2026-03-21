export function MiniCarrinho({ carrinho, removerDoCarrinho, fechar, irParaCheckout }) {
    // Calculamos o total aqui mesmo para mostrar no rodapé da gaveta
    const total = carrinho.reduce((acc, item) => acc + parseFloat(item.preco), 0);

    return (
        <>
            {/* O Fundo Escuro: Se clicar nele, a função fechar() é ativada */}
            <div className="overlay-sidebar" onClick={fechar}></div>

            {/* A Gaveta */}
            <div className="sidebar-carrinho">
                
                {/* Cabeçalho da Gaveta */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ margin: 0, color: 'var(--cor-primaria-azul)', fontSize: '22px' }}>🛒 Seu Carrinho</h2>
                    <button onClick={fechar} className='btn-primario' style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', boxShadow:'none' }}>✖️</button>
                </div>

                {/* Área rolável com a lista de itens */}
                <div style={{ flex: 1, overflowY: 'auto', paddingRight: '5px' }}>
                    {carrinho.length === 0 ? (
                        <p style={{ textAlign: 'center', color: 'var(--cor-texto-secundario)', marginTop: '50px' }}>
                            Seu carrinho está vazio.
                        </p>
                    ) : (
                        carrinho.map((item, index) => (
                            <div key={index} className="item-mini-carrinho">
                                <img 
                                    src={item.imagem_capa} 
                                    alt={item.titulo} 
                                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }} 
                                />
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: '0 0 5px 0', fontSize: '14px', color: 'var(--cor-texto-principal)' }}>{item.titulo}</h4>
                                    <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--cor-primaria-verde)' }}>R$ {item.preco}</p>
                                </div>
                                <button 
                                    onClick={() => removerDoCarrinho(index)} 
                                    className='btn-primario'
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', boxShadow:'none' }}
                                    title="Remover item"
                                >
                                    🗑️
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Rodapé da Gaveta (Total e Botão de Checkout) */}
                <div style={{ borderTop: '2px solid var(--cor-borda)', paddingTop: '20px', marginTop: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '18px', fontWeight: 'bold' }}>
                        <span>Total:</span>
                        <span style={{ color: 'var(--cor-primaria-verde)' }}>R$ {total.toFixed(2)}</span>
                    </div>
                    
                    <button
                        onClick={() => {
                            fechar(); // Fecha a gaveta primeiro
                            irParaCheckout(); // Depois vai para a tela de pagamento
                        }}
                        className="btn-primario"
                        style={{ width: '100%', padding: '15px', fontSize: '16px' }}
                        disabled={carrinho.length === 0} // Desabilita o botão se estiver vazio
                    >
                        💳 Ir para o Pagamento
                    </button>
                </div>

            </div>
        </>
    );
}