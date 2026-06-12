export function ComoFunciona({ setPaginaAtual }) {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
            
            <h1 style={{ color: 'var(--cor-primaria-azul)', textAlign: 'center', marginBottom: '10px' }}>
                Como funciona a Didáticos?
            </h1>
            
            <p style={{ textAlign: 'center', color: 'var(--cor-texto-secundario)', fontSize: '18px', marginBottom: '40px' }}>
                Simples, rápido e seguro. Veja como adquirir seus materiais em 3 passos.
            </p>

            {/* Passo 1: Usando a sua classe card-produto para herdar o fundo, sombra e hover do index.css */}
            <div className="card-produto" style={{ display: 'block', borderLeft: '5px solid var(--cor-primaria-verde)', marginBottom: '20px', padding: '25px' }}>
                <h2 style={{ color: 'var(--cor-primaria-verde)', margin: '0 0 10px 0' }}>1. Escolha seus materiais 🛒</h2>
                <p style={{ color: 'var(--cor-texto-principal)', lineHeight: '1.6', margin: 0 }}>
                    Navegue pela nossa vitrine ou use os filtros laterais para encontrar slides, listas e resumos específicos para a sua disciplina. Clique em <strong>Comprar</strong> para adicionar os itens ao seu carrinho.
                </p>
            </div>

            {/* Passo 2 */}
            <div className="card-produto" style={{ display: 'block', borderLeft: '5px solid var(--cor-primaria-verde)', marginBottom: '20px', padding: '25px' }}>
                <h2 style={{ color: 'var(--cor-primaria-verde)', margin: '0 0 10px 0' }}>2. Pagamento Seguro 🔒</h2>
                <p style={{ color: 'var(--cor-texto-principal)', lineHeight: '1.6', margin: 0 }}>
                    Finalize sua compra de forma rápida criando sua conta. O pagamento é processado pela InfinitePay, uma das plataformas mais seguras do Brasil.
                </p>
            </div>

            {/* Passo 3 */}
            <div className="card-produto" style={{ display: 'block', borderLeft: '5px solid var(--cor-primaria-verde)', marginBottom: '20px', padding: '25px' }}>
                <h2 style={{ color: 'var(--cor-primaria-verde)', margin: '0 0 10px 0' }}>3. Download Imediato 📥</h2>
                <p style={{ color: 'var(--cor-texto-principal)', lineHeight: '1.6', margin: 0 }}>
                    Assim que o pagamento for aprovado, os materiais estarão disponíveis para download na mesma hora. Basta acessar a aba <strong>Meus Pedidos</strong> no seu perfil. Você também receberá um recibo no seu e-mail!
                </p>
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
                {/* Botão primário oficial puxando direto do seu CSS */}
                <button onClick={() => setPaginaAtual("loja")} className="btn-primario" style={{ padding: '15px 30px', fontSize: '18px' }}>
                    Começar a Explorar
                </button>
            </div>
            
        </div>
    );
}