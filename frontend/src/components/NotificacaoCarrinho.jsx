export function NotificacaoCarrinho({ produto, abrirCarrinho }) {
    // Se não tiver nenhum produto selecionado, não desenha nada
    if (!produto) return null;

    return (
        <div 
            className="notificacao-container"
            onClick={abrirCarrinho} // 👈 O GATILHO ESTÁ AQUI
            style={{ 
                cursor: 'pointer', // Muda o mouse para a "mãozinha"
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease'
            }}
            // Efeito visual rápido quando passa o mouse
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {/*Foto pequena do produto */}
                <img
                    src={produto.imagem_capa}
                    alt={produto.titulo}
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', marginRight: '10px' }}
                />

                {/* Textos*/}
                <div>
                    <h4 style={{margin: '0 0 5px 0', color:'var(--cor-primaria-verde)'}}>✅ Adicionado!</h4>
                    <p style={{margin:0, fontSize:'14px', color: 'var(--cor-texto-secundario)'}}>{produto.titulo}</p>
                </div>
            </div>
            
            {/* Seta indicativa para o usuário saber que é clicável */}
            <div style={{ fontSize: '20px', marginLeft: '10px' }}>
                👉 🛒
            </div>
        </div>
    )
}