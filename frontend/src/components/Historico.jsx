export function Historico({ historicoCompras, setPaginaAtual }) {
    return (
        <div style={{ padding: '20px' }}>
            <h2>Meus Pedidos Concluídos 📦</h2>

            {/* Se a lista estiver vazia, mostramos uma mensagem amigável */}
            {historicoCompras.length === 0 ? (
                <p>Você ainda não possui pedidos confirmados.</p>
            ) : (
                // Se tiver pedidos, fazemos um loop para desenhar cada um
                <div>
                    {historicoCompras.map((pedido) => (
                        <div key={pedido.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', marginBottom: '15px', backgroundColor: '#f9f9f9' }}>
                            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                                Pedido #{pedido.id}
                            </h3>
                            
                            <hr />
                            
                            {/* Aqui nós fazemos um SEGUNDO loop para mostrar os itens dentro deste pedido! */}
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                {pedido.itens.map((item) => (
                                    <li key={item.id} style={{ marginBottom: '5px' }}>
                                        🔹 {item.produto_titulo} (Qtd: {item.quantidade}) - R$ {item.produto_preco}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            <button 
                onClick={() => setPaginaAtual("loja")} 
                style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
            >
                ⬅️ Voltar para a Loja
            </button>
        </div>
    );
}