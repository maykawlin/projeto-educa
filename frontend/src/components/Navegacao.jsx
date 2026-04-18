import React, { useState, useRef, useEffect } from 'react';
import logo from '../assets/logotipo.jpeg';

// ==========================================
// 🌟 COMPONENTE DO MENU FLUTUANTE (Dropdown)
// ==========================================
function MenuUsuario({ setPaginaAtual, buscarHistorico, fazerLogout }) {
    const [menuAberto, setMenuAberto] = useState(false);
    const menuRef = useRef(null);

    // Fecha o menu se clicar fora dele
    useEffect(() => {
        function cliqueFora(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuAberto(false);
            }
        }
        document.addEventListener("mousedown", cliqueFora);
        return () => document.removeEventListener("mousedown", cliqueFora);
    }, []);

    return (
        <div style={{ position: 'relative', display: 'inline-block' }} ref={menuRef}>
            {/* O GATILHO */}
            <button
                onClick={() => setMenuAberto(!menuAberto)}
                className="btn-secundario"
                style={{ 
                    display: 'flex', alignItems: 'center', gap: '8px', 
                    cursor: 'pointer', padding: '8px 15px'
                }}
            >
                👤 Olá, Professor(a) {menuAberto ? '▴' : '▾'}
            </button>

            {/* A CAIXINHA FLUTUANTE */}
            {menuAberto && (
                <div style={{
                    position: 'absolute',
                    top: '115%', right: '0',
                    backgroundColor: 'white',
                    border: '1px solid var(--cor-borda)',
                    borderRadius: '8px',
                    boxShadow: '0px 8px 16px rgba(0,0,0,0.15)',
                    width: '220px', zIndex: 1000,
                    display: 'flex', flexDirection: 'column', overflow: 'hidden'
                }}>
                    <button 
                        onClick={() => { buscarHistorico(); setMenuAberto(false); }} 
                        style={estiloOpcaoMenu}>
                        📦 Meus Pedidos
                    </button>

                    <button 
                        onClick={() => { setPaginaAtual("quem_somos"); setMenuAberto(false); }} 
                        style={estiloOpcaoMenu}>
                        👋 Quem Somos Nós
                    </button>
                    
                    <button 
                        onClick={() => { setPaginaAtual("perfil"); setMenuAberto(false); }} 
                        style={estiloOpcaoMenu}>
                        ⚙️ Meus Dados
                    </button>

                    <button 
                        onClick={() => { window.open("https://wa.me/5500000000000", "_blank"); setMenuAberto(false); }} 
                        style={estiloOpcaoMenu}>
                        💬 Contato / Suporte
                    </button>

                    <hr style={{ margin: 0, border: 'none', borderTop: '1px solid #eee' }} />
                    
                    <button 
                        onClick={() => { fazerLogout(); setMenuAberto(false); }} 
                        style={{ ...estiloOpcaoMenu, color: '#d9534f', fontWeight: 'bold' }}>
                        🚪 Sair da Conta
                    </button>
                </div>
            )}
        </div>
    );
}

const estiloOpcaoMenu = {
    background: 'none', border: 'none', padding: '15px 20px',
    textAlign: 'left', cursor: 'pointer', fontSize: '15px', width: '100%',
    color: 'var(--cor-texto-principal)', transition: 'background-color 0.2s',
};

// ==========================================
// 🚀 SEU COMPONENTE DE NAVEGAÇÃO PRINCIPAL
// ==========================================
export function Navegacao({ setPaginaAtual, tamanhoCarrinho, token, setToken, buscarHistorico, abrirMiniCarrinho}) {
    
    function fazerLogout() {
      localStorage.removeItem("token");
      setToken(null);
      setPaginaAtual("loja");
    }

    return (
      <nav style={{ 
        background: '#fff', 
        padding: '10px 20px', 
        color: 'var(--cor-texto-principal)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        width: '100%', 
        boxSizing: 'border-box',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
        }}>

        {/* LOGO */}
        <div 
          onClick={ () => setPaginaAtual("loja") } 
          className="icone-animado"
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <img 
            src={logo} 
            alt="Logo Didáticos" 
            style={{ height: '50px', width: 'auto', marginRight: '10px' }} 
          />
          <h2 style={{ margin: 0, color: 'var(--cor-primaria-azul)' }}>Didáticos</h2>
        </div>

        {/* ÁREA DOS BOTÕES DA DIREITA */}
        <div style={{display: "flex", gap: "15px", alignItems: "center"}}>

          {/* Botão do Carrinho */}
          <button onClick={abrirMiniCarrinho} className="btn-secundario">
            🛒 Carrinho ({ tamanhoCarrinho })
          </button>

          {/* Lógica de Autenticação */}
          {token ? (
            // Se tem token, chama o novo Menu Inteligente
            <MenuUsuario 
                setPaginaAtual={setPaginaAtual} 
                buscarHistorico={buscarHistorico} 
                fazerLogout={fazerLogout} 
            />
          ) : (
            // Se NÃO tem token, continua mostrando Login e Cadastro
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