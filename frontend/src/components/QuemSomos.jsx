import { useState, useEffect } from 'react';
import axios from 'axios';

export function Historico({ setPaginaAtual, token }) {
    const [pedidos, setPedidos] = useState([]);
    // COMEÇA COMO VERDADEIRO E SÓ MUDA DEPOIS DA REQUISIÇÃO
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(false);

    useEffect(() => {
        // Se não tiver token (usuário não logado), para de carregar e mostra vazio
        if (!token) {
            setCarregando(false);
            return;
        }

        // Inicia a busca
        axios.get('https://api.materialdidaticos.com.br/api/carrinho/historico/', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(resposta => {
            // Quando a resposta chega, salva os pedidos e DESLIGA o carregando
            setPedidos(resposta.data);
            setCarregando(false);
        })
        .catch(erro => {
            console.error("Erro ao carregar os pedidos:", erro);
            setErro(true);
            setCarregando(false);
        });
    }, [token]);

    async function fazerDownload(itemId) {
        try {
            const resposta = await axios.get(`https://api.materialdidaticos.com.br/api/baixar-material/${itemId}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (resposta.data.url_download) {
                window.open(resposta.data.url_download, '_blank');
            }
        } catch (erro) {
            console.log("Erro ao baixar:", erro);
            alert("Ops! Ocorreu um erro ao gerar seu link de download. Tente novamente.");
        }
    }   

    // RENDERIZAÇÃO BLINDADA
    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ color: 'var(--cor-primaria-azul)', marginBottom: '20px' }}>
                📚 Meus Materiais (Histórico de Compras)
            </h2>

            {/* CONDIÇÃO 1: ESTÁ CARREGANDO? MOSTRA A AMPULHETA */}
            {carregando && (
                <div style={{ textAlign: 'center', padding: '60px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                    <h3 style={{ color: 'var(--cor-primaria-azul)' }}>⏳ Buscando seus materiais...</h3>
                    <p style={{ color: 'var(--cor-texto-secundario)' }}>Conectando ao servidor seguro, só um instante.</p>
                </div>
            )}

            {/* CONDIÇÃO 2: DEU ERRO NA BUSCA? */}
            {!carregando && erro && (
                <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#fff3f3', border: '1px solid #ffcaca', borderRadius: '8px' }}>
                    <p style={{ fontSize: '18px', color: '#d9534f', fontWeight: 'bold' }}>❌ Ops! Não conseguimos conectar ao servidor.</p>
                    <p style={{ color: 'var(--cor-texto-secundario)' }}>Verifique sua conexão ou tente recarregar a página.</p>
                </div>
            )}

            {/* CONDIÇÃO 3: TERMINOU DE CARREGAR, NÃO DEU ERRO E A LISTA ESTÁ VAZIA? */}
            {!carregando && !erro && pedidos.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                    <p style={{ fontSize: '18px', color: 'var(--cor-texto-secundario)' }}>Você ainda não possui pedidos confirmados.</p>
                </div>
            )}

            {/* CONDIÇÃO 4: TERMINOU DE CARREGAR, NÃO DEU ERRO E TEM PEDIDOS? */}
            {!carregando && !erro && pedidos.length > 0 && (
                <div>
                    {pedidos.map((pedido) => (
                        <div key={pedido.id} style={{ border: '1px solid var(--cor-borda)', borderRadius: '8px', padding: '20px', marginBottom: '25px', backgroundColor: '#f8f9fa' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                <h3 style={{ margin: 0, color: 'var(--cor-texto-principal)' }}>
                                    Pedido #{pedido.id}
                                </h3>
                                <span style={{ backgroundColor: '#d4edda', color: '#155724', padding: '5px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                                    ✅ Pagamento Confirmado
                                </span>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {pedido.itens.map((item) => (
                                    <div key={item.id} style={{ 
                                        border: '1px solid var(--cor-borda)', 
                                        padding: '15px 20px', 
                                        borderRadius: 'var(--borda-arredondada)',
                                        backgroundColor: 'white',
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'space-between',
                                        boxShadow: 'var(--sombra-suave)'
                                    }}>
                                        
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                            <span style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--cor-texto-principal)' }}>
                                                📄 {item.produto_titulo}
                                            </span>
                                            <span style={{ fontSize: '13px', color: 'var(--cor-texto-secundario)' }}>
                                                Qtd: {item.quantidade} | Valor: R$ {item.produto_preco}
                                            </span>
                                        </div>
                                    
                                        {item.produto_arquivo ? (
                                            <button 
                                                onClick={() => fazerDownload(item.id)}
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