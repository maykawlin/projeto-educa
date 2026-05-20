import { useState } from "react";
import axios from "axios";

export function EsqueciSenha({ setPaginaAtual }) {
    const [email, setEmail] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function enviarPedido(e) {
        e.preventDefault();
        setCarregando(true);
        try {
            await axios.post('https://projeto-educa.onrender.com/api/esqueci-senha/', { email });
            setMensagem("E-mail enviado! Verifica a tua caixa de entrada e também a pasta de spam.");
        } catch (erro) {
            setMensagem("Ocorreu um erro ao enviar o e-mail. Tenta novamente.");
        }
        setCarregando(false);
    }

    return (
        <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid var(--cor-borda)', borderRadius: '8px', backgroundColor: 'var(--cor-fundo-card)', boxShadow: 'var(--sombra-suave)' }}>
            <h2 style={{ color: 'var(--cor-primaria-azul)', textAlign: 'center' }}>Recuperar Senha</h2>
            {mensagem ? (
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <p style={{ color: 'var(--cor-primaria-verde)', fontWeight: 'bold' }}>{mensagem}</p>
                    <button onClick={() => setPaginaAtual("login")} className="btn-secundario" style={{ width: '100%' }}>Voltar ao Login</button>
                </div>
            ) : (
                <form onSubmit={enviarPedido} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <p style={{ color: 'var(--cor-texto-secundario)', fontSize: '14px', textAlign: 'center' }}>
                        Digita o e-mail associado à tua conta. Enviaremos um link seguro para criares uma nova senha.
                    </p>
                    <input type="email" placeholder="O teu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                    <button type="submit" className="btn-primario" disabled={carregando}>
                        {carregando ? "A enviar..." : "Enviar Link de Recuperação"}
                    </button>
                    <button type="button" onClick={() => setPaginaAtual("login")} className="link-quem-somos" style={{ marginTop: '10px', background: 'none', border: 'none', color: 'var(--cor-primaria-azul)', cursor: 'pointer', textDecoration: 'underline' }}>
                        Cancelei, quero voltar ao Login
                    </button>
                </form>
            )}
        </div>
    );
}