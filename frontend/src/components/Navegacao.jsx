// Recebemos "setPaginaAtual" e "tamanhoCarrinho" como props para controlar a navegação e mostrar o número de itens no carrinho
export function Navegacao({ setPaginaAtual, tamanhoCarrinho}) {
    {/* Menu de navegação */}
    return (
    
      <nav style={{ background: '#111', padding: '20px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* Botão para ir para a Loja */}
        <h2 onClick={ () => setPaginaAtual("loja") } style={{ cursor: 'pointer', margin: 0 }}>
          Didáticos
        </h2>

        {/* Botão para ir para o carrinho */}
        <button 
            onClick={ () => setPaginaAtual("carrinho") }
            style={{ cursor: 'pointer', padding: '10px 20px', fontWeight: 'bold'}}
        >
          🛒 Carrinho ({ tamanhoCarrinho })
        </button>

      </nav>
    );
}