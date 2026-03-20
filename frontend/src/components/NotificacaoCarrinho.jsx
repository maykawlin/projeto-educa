export function NotificacaoCarrinho({produto}) {
    // Se não tiver nenhum produto selecionado, não desenha nada
    if (!produto) return null;

    return (
        <div className="notificacao-container">
            {/*Foto pequena do produto */}
            <img
                src={produto.imagem_capa}
                alt={produto.titulo}
                style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', marginRight: '10px' }}
            />

            {/* Textos*/}
            <div>
                <h4 style={{margin: '0 0 5px 0', color:'var(--cor-primaria-verde)'}}>✅ Adicionado ao carrinho!</h4>
                <p style={{margin:0, fontSize:'14px', color: 'var(--cor-texto-secundario)'}}>{produto.titulo}</p>
            </div>
        </div>
    )
}