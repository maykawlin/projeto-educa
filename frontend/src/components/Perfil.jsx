import { useState, useEffect } from 'react';
import axios from 'axios';

export function Perfil({ token }) {
    // Memória para os dados do usuário
    const [dadosUsuario, setDadosUsuario] = useState({ username: "Carregando...", email: "..." });
    
    // Memória para a troca de senha
    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");

    // Assim que a tela abre, ele busca quem é o dono do Token
    useEffect(() => {

        console.log("Token sendo enviado para o Django:", token);


        async function buscarDadosDoPerfil() {
            try {
                const resposta = await axios.get("http://127.0.0.1:8000/api/perfil/", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setDadosUsuario(resposta.data);
            } catch (error) {
                console.error("Erro ao buscar dados do usuário", error);
            }
        }
        buscarDadosDoPerfil();
    }, [token]);

    async function handleMudarSenha(e) {
        e.preventDefault();
        setErro("");
        setSucesso("");

        if (novaSenha !== confirmarSenha) {
            setErro("A nova senha e a confirmação não coincidem.");
            return;
        }

        if (novaSenha.length < 6) {
            setErro("A nova senha deve ter pelo menos 6 caracteres.");
            return;
        }

        try {
            await axios.put("http://127.0.0.1:8000/api/mudar-senha/", {
                senha_atual: senhaAtual,
                nova_senha: novaSenha
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setSucesso("Senha atualizada com sucesso! 🔒");
            setSenhaAtual("");
            setNovaSenha("");
            setConfirmarSenha("");

        } catch (error) {
            if (error.response && error.response.data) {
                const mensagemErro = error.response.data.senha_atual || "Ocorreu um erro ao atualizar a senha.";
                setErro(mensagemErro);
            } else {
                setErro("Erro de conexão com o servidor.");
            }
        }
    }

    return (
        <div style={{ maxWidth: "500px", margin: "50px auto", padding: '30px', border: '1px solid var(--cor-borda)', borderRadius: 'var(--borda-arredondada)', backgroundColor: 'var(--cor-fundo-card)', boxShadow: 'var(--sombra-suave)' }}> 
            
            <h2 style={{ color: 'var(--cor-primaria-azul)', margin: '0 0 5px 0' }}>
                👤 Meu Perfil
            </h2>
            <p style={{ color: 'var(--cor-texto-secundario)', marginBottom: '25px', fontSize: '14px', borderBottom: '2px solid var(--cor-borda)', paddingBottom: '15px' }}>
                Gerencie as informações e a segurança da sua conta.
            </p>

            {/* 👇 OS DADOS DO USUÁRIO APARECEM AQUI 👇 */}
            <div style={{ backgroundColor: '#f4f7f6', padding: '15px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #e1e8ed' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: 'var(--cor-texto-secundario)' }}>
                    Nome de Usuário: <strong style={{ color: 'var(--cor-texto-principal)', fontSize: '16px' }}>{dadosUsuario.username}</strong>
                </p>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--cor-texto-secundario)' }}>
                    E-mail cadastrado: <strong style={{ color: 'var(--cor-texto-principal)' }}>{dadosUsuario.email}</strong>
                </p>
            </div>
            {/* 👆 FIM DOS DADOS 👆 */}

            <h3 style={{ fontSize: '16px', color: 'var(--cor-texto-principal)', marginBottom: '15px' }}>Alterar Senha</h3>

            {erro && <p style={{ color: 'red', fontWeight: 'bold', fontSize: '14px', marginBottom: '15px', padding: '10px', backgroundColor: '#ffe6e6', borderRadius: '4px' }}>❌ {erro}</p>}
            {sucesso && <p style={{ color: 'var(--cor-primaria-verde)', fontWeight: 'bold', fontSize: '14px', marginBottom: '15px', padding: '10px', backgroundColor: '#e6ffe6', borderRadius: '4px' }}>✅ {sucesso}</p>}

            <form onSubmit={handleMudarSenha} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--cor-texto-principal)' }}>Senha Atual:</label>
                    <input type='password' value={senhaAtual} onChange={(e) => setSenhaAtual(e.target.value)} required className='input-login' style={{ width: '94%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }} />
                </div>
                <div>
                    <label style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--cor-texto-principal)' }}>Nova Senha:</label>
                    <input type='password' value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} required className='input-login' style={{ width: '94%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }} />
                </div>
                <div>
                    <label style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--cor-texto-principal)' }}>Confirmar Nova Senha:</label>
                    <input type='password' value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required className='input-login' style={{ width: '94%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }} />
                </div>
                <button type="submit" className='btn-primario' style={{ padding: '12px', width: '100%', fontSize: '16px', marginTop: '10px' }}>
                    Salvar Nova Senha
                </button>
            </form>
        </div>
    );
}