import axios from 'axios';

export function Historico({ historicoCompras, setPaginaAtual, token }) {

    
    async function fazerDownload(itemId, nomeArquivo) {
        try {
            // Mostra um feedback visual de que está baixando
            console.log('Iniciando download seguro ...');

            const resposta = await axios.get(`http://127.0.0.1:8000/api/baixar-material/${itemId}/`,{
                headers: { Authorization:`Bearer ${token}`},
                responseType: 'blob' // Isso diz ao axios que a resposta é um arquivo e não JSON
            });

            // Cria um link fantasma na memória do navegador para forçar o download
            const url = window.URL.createObjectURL(new Blob([resposta.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${nomeArquivo}.pdf`); //Dá o nome correto ao arquivo
            document.body.appendChild(link);
            link.click();

            //Limpa a memória
            link.parentNode.removeChild(link);
        } catch(erro) {
            console.error(erro);
            alert("Erro ao baixar o arquivo. Tente fazer login novamente.")
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
