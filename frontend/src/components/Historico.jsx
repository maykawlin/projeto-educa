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
                                    <li key={item.id} style={{ marginBottom: '10px', display: 'flex', alignItems:'center', gap:'15px' }}>
                                        <span>🔹 {item.produto_titulo} (Qtd: {item.quantidade}) - R$ {item.produto_preco} </span>
                                    
                                        {/*Só mostra o botão SE o produto tiver um arquivo usando o comando item.produto_arquivo &&*/}
                                        {item.produto_arquivo && (
                                            <a 
                                                href={item.produto_arquivo}
                                                target='_blank' /**Faz com que o PDF ou arquivo abra em uma nova aba do navegador, para que o usuário não saia do seu site por acidente. */
                                                rel='noopener noreferrer' /*Sistem da segurança para que hackers não utilize a nova aba para controlar a aba original */
                                                className="btn-primario"
                                                style={{textDecoration:'none', display: 'inline-block'}}>
                                                📥 Baixar Material
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            <button 
                onClick={() => setPaginaAtual("loja")} className="btn-secundario" style={{ marginTop: '20px' }}>
                ⬅️ Voltar para a Loja
            </button>
        </div>
    );
}