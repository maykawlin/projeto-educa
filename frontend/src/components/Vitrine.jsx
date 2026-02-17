export function Vitrine({ produtos, adicionarAoCarrinho, busca, setBusca}) {
    return (
        <div>
            <h3>Vitrine de Produtos</h3>

            {/* Campo de busca) */}
            <input
              type="text"
              placeholder="Buscar..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              style={{ padding: '10px', width: '100%', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc'}}
            />

            {/* Lista de Produtos */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
                {produtos
                    .filter(p => (p.titulo || "").toLowerCase().includes(busca.toLowerCase())) // filtrar os produtos pela busca
                    .map(produto => ( // para cada produto, mostrar um card)
                        <div key={produto.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}>
                            
                            {/* imagem do produto) */}
                            {produto.imagem_capa && ( 
                                <img 
                                    src={produto.imagem_capa}
                                    alt={produto.titulo}
                                    style={{ width: '100%', height: '150px', objectFit: 'cover', marginBottom: '10px' }}
                                />
                            )}

                            {/* Título do produto/Dados */}
                            <h3>{produto.titulo}</h3>
                            <p style={{fontWeight: 'bold', color: 'green'}}>R$ {produto.preco}</p>
                            
                            
                            {/* Botão de compra do produto) */}
                            <button 
                                onClick={() => adicionarAoCarrinho(produto)}
                                style={{backgroundColor: '#28a745', 
                                        color: 'white', 
                                        border:'none', 
                                        padding: '5px 10px', 
                                        borderRadius: '4px', 
                                        cursor: 'pointer'}}>
                                Comprar
                            </button>
                        </div>  
                ))}
            </div>
        </div>
    );
}