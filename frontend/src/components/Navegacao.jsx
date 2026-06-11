import React, { useState, useRef, useEffect } from 'react';
import logo from '../assets/logo_em_cores_v3.png';

// ==========================================
// 🌟 COMPONENTE DO MENU FLUTUANTE (Dropdown)
// ==========================================
function MenuUsuario({ setPaginaAtual, buscarHistorico, fazerLogout }) {
    const [menuAberto, setMenuAberto] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function cliqueFora(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuAberto(false);
            }
        }
        document.addEventListener("mousedown", cliqueFora);
        return () => document.removeEventListener("mousedown", cliqueFora);
    }, []);

    const estiloOpcaoMenu = {
        background: 'none', border: 'none', padding: '15px 20px', textAlign: 'left', cursor: 'pointer', 
        fontSize: '15px', width: '100%', color: 'var(--cor-texto-principal)', transition: 'background-color 0.2s',
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }} ref={menuRef}>
            <button
                onClick={() => setMenuAberto(!menuAberto)}
                className="btn-secundario"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '8px 15px' }}
            >
                👤 <span className="texto-oculto-mobile">Olá, Professor(a)</span> {menuAberto ? '▴' : '▾'}
            </button>

            {menuAberto && (
                <div style={{
                    position: 'absolute', top: '115%', right: '0', backgroundColor: 'white',
                    border: '1px solid var(--cor-borda)', borderRadius: '8px',
                    boxShadow: '0px 8px 16px rgba(0,0,0,0.15)', width: '220px', zIndex: 1000,
                    display: 'flex', flexDirection: 'column', overflow: 'hidden'
                }}>
                    <button onClick={() => { setPaginaAtual("loja"); setMenuAberto(false); }} style={estiloOpcaoMenu}>
                        🏠 Página Inicial
                    </button>
                    <button onClick={() => { buscarHistorico(); setMenuAberto(false); }} style={estiloOpcaoMenu}>
                        📦 Meus Pedidos
                    </button>
                    <button onClick={() => { setPaginaAtual("quem_somos"); setMenuAberto(false); }} style={estiloOpcaoMenu}>
                        👋 Quem Somos Nós
                    </button>
                    <button onClick={() => { setPaginaAtual("perfil"); setMenuAberto(false); }} style={estiloOpcaoMenu}>
                        ⚙️ Meus Dados
                    </button>
                    <button onClick={() => { window.open("https://wa.me/5500000000000", "_blank"); setMenuAberto(false); }} style={estiloOpcaoMenu}>
                        💬 Contato / Suporte
                    </button>
                    <hr style={{ margin: 0, border: 'none', borderTop: '1px solid #eee' }} />
                    <button onClick={() => { fazerLogout(); setMenuAberto(false); }} style={{ ...estiloOpcaoMenu, color: '#d9534f', fontWeight: 'bold' }}>
                        🚪 Sair da Conta
                    </button>
                </div>
            )}
        </div>
    );
}

// ==========================================
// 🚀 SEU COMPONENTE DE NAVEGAÇÃO PRINCIPAL
// ==========================================
export function Navegacao({ setPaginaAtual, tamanhoCarrinho, token, setToken, buscarHistorico, abrirMiniCarrinho, busca, alterarBusca, setBuscaAtiva }) {
    
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function fazerLogout() {
      localStorage.removeItem("token");
      setToken(null);
      setPaginaAtual("loja");
    }

    return (
      <nav style={{ 
        position: 'sticky', top: 0, zIndex: 1000, background: '#fff', 
        padding: isMobile ? '10px' : '10px 20px', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        display: 'flex', flexDirection: 'column', gap: '10px'
      }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {/* 🌟 LOGO COM EFEITO E TAMANHO MAIOR */}
                <div 
                    onClick={() => setPaginaAtual("loja")} 
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'transform 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <img src={logo} alt="Logo Didáticos" style={{ height: isMobile ? '65px' : '100px', width: 'auto' }} />
                </div>

                {!isMobile && (
                    <>
                        {/* 🌟 BOTÕES COM ESTILO SECUNDÁRIO */}
                        <button onClick={() => setPaginaAtual("loja")} className="btn-secundario" style={{ padding: '8px 15px' }}>
                            Página Inicial
                        </button>
                        <button onClick={() => setPaginaAtual("quem_somos")} className="btn-secundario" style={{ padding: '8px 15px' }}>
                            Quem Somos
                        </button>
                    </>
                )}
            </div>

            {!isMobile && (
                <div style={{ flex: 1, maxWidth: '500px', margin: '0 20px' }}>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <span style={{ position: 'absolute', left: '15px', fontSize: '18px' }}>🔍</span>
                        <input 
                            type="text" placeholder="Pesquisar materiais..." value={busca}
                            onChange={(e) => alterarBusca(e.target.value)} onFocus={() => setBuscaAtiva(true)} onBlur={() => setBuscaAtiva(false)}
                            style={{ width: '100%', padding: '12px 15px 12px 45px', borderRadius: '25px', border: '1px solid var(--cor-borda)', fontSize: '15px', outline: 'none', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)' }}
                        />
                    </div>
                </div>
            )}

            <div style={{ display: "flex", gap: isMobile ? "8px" : "15px", alignItems: "center" }}>
                <button onClick={abrirMiniCarrinho} className="btn-secundario" style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: isMobile ? '8px 10px' : '8px 15px' }}>
                    🛒 <span className="texto-oculto-mobile">Carrinho</span> ({tamanhoCarrinho})
                </button>

                {token ? (
                    <MenuUsuario setPaginaAtual={setPaginaAtual} buscarHistorico={buscarHistorico} fazerLogout={fazerLogout} />
                ) : (
                    <>
                        <button onClick={() => setPaginaAtual("login")} className="btn-secundario" style={{ padding: isMobile ? '8px 10px' : '8px 15px' }}>Login</button>
                        {!isMobile && <button onClick={() => setPaginaAtual("cadastro")} className="btn-primario">Criar Conta</button>}
                    </>
                )}
            </div>
        </div>

        {isMobile && (
            <div style={{ width: '100%' }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span style={{ position: 'absolute', left: '15px', fontSize: '18px' }}>🔍</span>
                    <input 
                        type="text" placeholder="Pesquisar materiais..." value={busca}
                        onChange={(e) => alterarBusca(e.target.value)} onFocus={() => setBuscaAtiva(true)} onBlur={() => setBuscaAtiva(false)}
                        style={{ width: '100%', padding: '12px 15px 12px 45px', borderRadius: '25px', border: '1px solid var(--cor-borda)', fontSize: '15px', outline: 'none', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)' }}
                    />
                </div>
            </div>
        )}
      </nav>
    );
}