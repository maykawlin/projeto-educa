// Recebemos "setPaginaAtual" e "tamanhoCarrinho" como props para controlar a navegação e mostrar o número de itens no carrinho
export function Navegacao({ setPaginaAtual, tamanhoCarrinho, token, setToken}) {
    
    function fazerLogout() {
      localStorage.removeItem("token"); // deleta o token do navegador e tem realizar novamente o login
      setToken(null);
      setPaginaAtual("loja");
    }

    {/* Menu de navegação/ Header */}
    return (
    
      <nav style={{ background: '#111', padding: '20px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* Botão para ir para a Loja no header */}
        <h2 onClick={ () => setPaginaAtual("loja") } style={{ cursor: 'pointer', margin: 0 }}>
          Didáticos
        </h2>

        {/* Campo de login no header */}
        <div style={{display: "flex", gap: "15px", alignItems: "center"}}>
          {/*Se tem token, mostra "Sair". Se não tem, mostra "Login" */}
          {token ? (
            <button onClick={fazerLogout} style={{cursor:'pointer', padding: '5px 10px', backgroundColor: 'red', color: 'white', border:'none'}}>
              Sair
            </button>
          ) : (
            <button onClick={() => setPaginaAtual("login")} style={{cursor:'pointer', padding:'5px 10px'}}>
              Login
            </button>
          )}

          {/* Botão para ir para o carrinho no header*/}
          <button 
              onClick={ () => setPaginaAtual("carrinho") }
              style={{ cursor: 'pointer', padding: '10px 20px', fontWeight: 'bold'}}
          >
            🛒 Carrinho ({ tamanhoCarrinho })
          </button>
        </div>
      </nav>
    );
}