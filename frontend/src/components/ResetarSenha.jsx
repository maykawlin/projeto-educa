import { useState, useEffect } from "react";
import axios from "axios";

export function ResetarSenha({ setPaginaAtual }) {
    const [novaSenha, setNovaSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [tokens, setTokens] = useState({ uid: "", token: "" });

    // Assim que a tela abre, o React procura as chaves secretas escondidas na URL!
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setTokens({
            uid: urlParams.get('uid'),
            token: urlParams.get('token')
        });
    }, []);

    async function salvarNovaSenha(e) {
        e.preventDefault();
        setCarregando(true);
        try {
            await axios.post('https://projeto-educa.onrender.com/api/resetar-senha/', { 
                uid: tokens.uid, 
                token: tokens.token, 
                nova_senha: novaSenha 
            });
            setMensagem("✅ Senha atualizada com sucesso!");
        } catch (erro) {
            setMensagem("❌ Erro: O link expirou ou é inválido. Pede um novo link.");
        }
        setCarregando(false);
    }

    return (
        <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid var(--cor-borda)', borderRadius: '8px', backgroundColor: 'var(--cor-fundo-card)', boxShadow: 'var(--sombra-suave)' }}>
            <h2 style={{ color: 'var(--cor-primaria-azul)', textAlign: 'center' }}>Criar Nova Senha</h2>
            {mensagem ? (
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <p style={{ fontWeight: 'bold' }}>{mensagem}</p>
                    <button onClick={() => { window.history.replaceState({}, '', '/'); setPaginaAtual("login"); }} className="btn-primario" style={{ width: '100%' }}>Ir para o Login</button>
                </div>
            ) : (
                <form onSubmit={salvarNovaSenha} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input type="password" placeholder="Digita a tua nova senha" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} minLength="6" />
                    <button type="submit" className="btn-primario" disabled={carregando}>
                        {carregando ? "A salvar..." : "Guardar Nova Senha"}
                    </button>
                </form>
            )}
        </div>
    );
}