export function Vitrine({ produtos, adicionarAoCarrinho, busca, setBusca}) {
    return (
        <div>
            <h2 style={{ color: 'var(--cor-primaria-azul)', marginBottom: '20px' }}>
                Vitrine de Produtos
            </h2>

            {/* Campo de busca) */}
            <div className="pesquisa-container">
                <input
                type="text"
                placeholder="🔍 O que você está buscando?"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="input-pesquisa"
                />
            </div>

            {/* Lista de Produtos */}
            <div className="grid-produtos">
                {produtos
                    .filter(p => (p.titulo || "").toLowerCase().includes(busca.toLowerCase())) // filtrar os produtos pela busca
                    .map(produto => ( // para cada produto, mostrar um card)
                        <div key={produto.id} className="card-produto">
                            {/* imagem do produto) */}
                            {produto.imagem_capa && ( 
                                <img 
                                    src={produto.imagem_capa}
                                    alt={produto.titulo}
                                    className="img-produto"
                                />
                            )}

                            {/* Título do produto/Dados */}
                            <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: 'var(--cor-texto-principal)' }}>{produto.titulo}</h3>

                            <p style={{ margin: '0 0 15px 0', fontSize: '20px', fontWeight: 'bold', color: 'var(--cor-primaria-verde)' }}>R$ {produto.preco}</p>
                            
                            {/* Botão de compra do produto) */}
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
            </div>
        </div>
    );
}