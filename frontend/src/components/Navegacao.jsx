import React from 'react';
import logo from '../assets/logotipo.jpeg';
// Recebemos "setPaginaAtual" e "tamanhoCarrinho" como props para controlar a navegação e mostrar o número de itens no carrinho
export function Navegacao({ setPaginaAtual, tamanhoCarrinho, token, setToken, buscarHistorico, abrirMiniCarrinho}) {
    
    function fazerLogout() {
      localStorage.removeItem("token"); // deleta o token do navegador e tem realizar novamente o login
      setToken(null);
      setPaginaAtual("loja");
    }

    {/* Menu de navegação/ Header */}
    return (
    
      <nav style={{ background: '#fff', // Mudamos o fundo para branco para o logo destacar
        padding: '10px 20px', // Diminuímos um pouco o padding vertical
        color: 'var(--cor-texto-principal)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        width: '100%', 
        boxSizing: 'border-box',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)' // Uma sombrinha leve embaixo
        }}>

        {/* Botão para ir para a Loja no header */}
        <div 
          onClick={ () => setPaginaAtual("loja") } 
          className="icone-animado"
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <img 
            src={logo} 
            alt="Logo Didáticos" 
            style={{ 
              height: '50px', // Definimos uma altura fixa para não quebrar o layout
              width: 'auto', // A largura ajusta automaticamente
              marginRight: '10px' 
            }} 
          />
          {/* Se quiser manter o texto junto com o logo, tire o comentário abaixo: */}
          <h2 style={{ margin: 0, color: 'var(--cor-primaria-azul)' }}>Didáticos</h2>
        </div>

        {/* Campo de login no header */}
        <div style={{display: "flex", gap: "15px", alignItems: "center"}}>

          {/* Botão para ir para o carrinho no header*/}
          <button 
              onClick={abrirMiniCarrinho} className="btn-secundario">
            🛒 Carrinho ({ tamanhoCarrinho })
          </button>

          {/*Se tem token, mostra "Sair". Se não tem, mostra "Login" */}
          {token ? (
            // Se tem token, mostramos "Meus Pedidos" e "Sair" num "Fragmento" (essas tags vazias <>)
            <>
              <button onClick={() => setPaginaAtual("perfil")} className="btn-secundario" style={{ marginRight: '10px' }}>
                Meu Perfil
              </button>
              
              <button onClick={buscarHistorico} className="btn-secundario">
                Meus Pedidos
              </button>

              <button onClick={fazerLogout} className="btn-perigo">
                Sair
              </button>
            </>
            
          ) : (
            // Se NÃO tem token, mostramos Login e Cadastro
            <>
              <button onClick={() => setPaginaAtual("login")} className="btn-secundario">
                Login
              </button>
              <button onClick={() => setPaginaAtual("cadastro")} className="btn-primario">
                Criar Conta
              </button>
            </>
            
          )}

          
        </div>

        
      </nav>
    );
}