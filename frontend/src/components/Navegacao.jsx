// Recebemos "setPaginaAtual" e "tamanhoCarrinho" como props para controlar a navegação e mostrar o número de itens no carrinho
export function Navegacao({ setPaginaAtual, tamanhoCarrinho, token, setToken, buscarHistorico}) {
    
    function fazerLogout() {
      localStorage.removeItem("token"); // deleta o token do navegador e tem realizar novamente o login
      setToken(null);
      setPaginaAtual("loja");
    }

    {/* Menu de navegação/ Header */}
    return (
    
      <nav style={{ background: '#111', padding: '20px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', boxSizing: 'border-box'}}>

        {/* Botão para ir para a Loja no header */}
        <h2 onClick={ () => setPaginaAtual("loja") } style={{ cursor: 'pointer', margin: 0 }}>
          Didáticos
        </h2>

        {/* Campo de login no header */}
        <div style={{display: "flex", gap: "15px", alignItems: "center"}}>
          {/*Se tem token, mostra "Sair". Se não tem, mostra "Login" */}
          {token ? (
            // Se tem token, mostramos "Meus Pedidos" e "Sair" num "Fragmento" (essas tags vazias <>)
            <>
              <button onClick={buscarHistorico} style={{cursor:'pointer', padding:'5px 10px', backgroundColor: '#4CAF50', color: 'white', border:'none'}}>
                Meus Pedidos
              </button>

              <button onClick={fazerLogout} style={{cursor:'pointer', padding: '5px 10px', backgroundColor: 'red', color: 'white', border:'none'}}>
                Sair
              </button>
            </>
            
          ) : (
            // Se NÃO tem token, mostramos só o Login
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