import { useState, useEffect } from "react";
import axios from "axios";

export function AtivarConta({ setPaginaAtual }) {
    const [mensagem, setMensagem] = useState("⏳ Verificando seu e-mail...");
    const [sucesso, setSucesso] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const uid = urlParams.get('uid');
        const token = urlParams.get('token');

        if (uid && token) {
            axios.post('https://api.materialdidaticos.com.br/api/ativar-conta/', { uid, token })
                .then(resposta => {
                    setMensagem("✅ " + resposta.data.mensagem);
                    setSucesso(true);
                })
                .catch(erro => {
                    setMensagem("❌ Ops! O link expirou ou é inválido.");
                });
        } else {
            setMensagem("❌ Link de ativação corrompido.");
        }
    }, []);

    return (
        <div style={{ maxWidth: '400px', margin: '60px auto', padding: '30px', border: '1px solid var(--cor-borda)', borderRadius: '8px', backgroundColor: 'var(--cor-fundo-card)', textAlign: 'center', boxShadow: 'var(--sombra-suave)' }}>
            <h2 style={{ color: 'var(--cor-primaria-azul)' }}>Ativação de Conta</h2>
            
            <p style={{ fontSize: '16px', fontWeight: 'bold', margin: '20px 0', color: sucesso ? 'var(--cor-primaria-verde)' : 'var(--cor-texto-secundario)' }}>
                {mensagem}
            </p>

            {sucesso && (
                <button onClick={() => { window.history.replaceState({}, '', '/'); setPaginaAtual("login"); }} className="btn-primario" style={{ width: '100%', marginTop: '10px' }}>
                    Ir para o Login
                </button>
            )}
        </div>
    );
}