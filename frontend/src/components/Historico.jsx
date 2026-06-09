import axios from 'axios';

export function Historico({ historicoCompras, setPaginaAtual, token }) {

    
    // Função atualizada para usar Links Seguros da Nuvem
    async function fazerDownload(itemId) {
        try {
        // 1. Pede o Link VIP para o Django
        const resposta = await axios.get(`https://api.materialdidaticos.com.br/api/baixar-material/${itemId}/`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        // 2. O Django devolveu o link? Então abre ele em uma nova aba para iniciar o download!
        if (resposta.data.url_download) {
            window.open(resposta.data.url_download, '_blank');
        }

        } catch (erro) {
        console.log("Erro ao baixar:", erro);
        alert("Ops! Ocorreu um erro ao gerar seu link de download. Tente novamente.");
        }
    }   

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ color: 'var(--cor-primaria-azul)', marginBottom: '20px' }}>
                📚 Meus Materiais (Histórico de Compras)
            </h2>

            {/* Se a lista estiver vazia, mostramos uma mensagem amigável */}
            {historicoCompras.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                    <p style={{ fontSize: '18px', color: 'var(--cor-texto-secundario)' }}>Você ainda não possui pedidos confirmados.</p>
                </div>
            ) : (
                // Se tiver pedidos, fazemos um loop para desenhar cada um
                <div>
                    {historicoCompras.map((pedido) => (
                        <div key={pedido.id} style={{ border: '1px solid var(--cor-borda)', borderRadius: '8px', padding: '20px', marginBottom: '25px', backgroundColor: '#f8f9fa' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                <h3 style={{ margin: 0, color: 'var(--cor-texto-principal)' }}>
                                    Pedido #{pedido.id}
                                </h3>
                                <span style={{ backgroundColor: '#d4edda', color: '#155724', padding: '5px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                                    ✅ Pagamento Confirmado
                                </span>
                            </div>
                            
                            {/* Aqui nós fazemos um SEGUNDO loop para mostrar os itens dentro deste pedido! */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {pedido.itens.map((item) => (
                                    <div key={item.id} style={{ 
                                        border: '1px solid var(--cor-borda)', 
                                        padding: '15px 20px', 
                                        borderRadius: 'var(--borda-arredondada)',
                                        backgroundColor: 'white',
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'space-between', /* Empurra o texto para a esquerda e o botão para a direita */
                                        boxShadow: 'var(--sombra-suave)'
                                    }}>
                                        
                                        {/* Informações do Produto */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                            <span style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--cor-texto-principal)' }}>
                                                📄 {item.produto_titulo}
                                            </span>
                                            <span style={{ fontSize: '13px', color: 'var(--cor-texto-secundario)' }}>
                                                Qtd: {item.quantidade} | Valor: R$ {item.produto_preco}
                                            </span>
                                        </div>
                                    
                                        {/* Só mostra o botão SE o produto tiver um arquivo */}
                                        {item.produto_arquivo ? (
                                            <button 
                                                onClick={() => fazerDownload(item.id, item.produto_titulo)}
                                                className="btn-primario" 
                                                style={{ border: 'none', cursor: 'pointer', padding: '10px 20px', fontSize: '15px' }}>
                                                ⬇️ Baixar Material
                                            </button>
                                        ) : (
                                            <span style={{ color: 'red', fontSize: '14px', fontWeight: 'bold' }}>Arquivo pendente</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <button 
                onClick={() => setPaginaAtual("loja")} 
                className="btn-secundario" 
                style={{ marginTop: '30px', padding: '10px 20px' }}>
                ⬅️ Voltar para a Loja
            </button>
        </div>
    );

    
}
