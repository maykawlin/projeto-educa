import { useState } from 'react';
import axios from 'axios';

export function Cadastro({ setPaginaAtual }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState(false);

    async function fazerCadastro(e) {
        e.preventDefault(); // Evita que a página recarregue
        setErro(""); 

        // 1. Validação de Senha no Frontend (A experiência do usuário agradece!)
        if (password !== confirmPassword) {
            setErro("As senhas não coincidem. Tente novamente.");
            return;
        }

        try {
            // 2. Enviando os dados para o Django
            // Atenção: Configurei para a rota /api/register/ (Ajuste se no seu Django o nome for diferente)
            await axios.post("http://127.0.0.1:8000/api/register/", {
                nome_completo: username,
                email: email,
                senha: password,
                confirmar_senha: confirmPassword
            });

            // Se o Django responder "Ok", mostramos a mensagem de sucesso
            setSucesso(true);
            
            // Depois de 2 segundos, mandamos ele para a tela de Login para entrar na conta nova
            setTimeout(() => {
                setPaginaAtual("login");
            }, 2000);

        } catch (error) {
            console.log(error);
            // Se o Django disser que o usuário já existe, tratamos o erro
            if (error.response && error.response.status === 400) {
                setErro("Este nome de usuário ou e-mail já está em uso.");
            } else {
                setErro("Ocorreu um erro ao criar a conta. Tente novamente.");
            }
        }
    }

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", padding: '30px', border: '1px solid var(--cor-borda)', borderRadius: 'var(--borda-arredondada)', backgroundColor: 'var(--cor-fundo-card)', boxShadow: 'var(--sombra-suave)' }}> 
            
            <h2 style={{ color: 'var(--cor-primaria-azul)', marginBottom: '5px' }}>Criar Nova Conta</h2>
            <p style={{ color: 'var(--cor-texto-secundario)', marginBottom: '20px', fontSize: '14px' }}>
                Junte-se à maior plataforma para professores do Brasil.
            </p>

            {/* Mensagens de Erro ou Sucesso */}
            {erro && <p style={{ color: 'red', fontWeight: 'bold', fontSize: '14px', marginBottom: '15px' }}>❌ {erro}</p>}
            {sucesso && <p style={{ color: 'var(--cor-primaria-verde)', fontWeight: 'bold', fontSize: '14px', marginBottom: '15px' }}>✅ Conta criada com sucesso! Redirecionando...</p>}

            <form onSubmit={fazerCadastro} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
                <div>
                    <label style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--cor-texto-principal)' }}>Nome de Completo:</label>
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className='input-login'
                        style={{ width: '93%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div>
                    <label style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--cor-texto-principal)' }}>E-mail:</label>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='input-login'
                        style={{ width: '93%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div>
                    <label style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--cor-texto-principal)' }}>Senha:</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='input-login'
                        style={{ width: '93%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div>
                    <label style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--cor-texto-principal)' }}>Confirmar Senha:</label>
                    <input
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className='input-login'
                        style={{ width: '93%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <button type="submit" className='btn-primario' style={{ padding: '12px', width: '100%', fontSize: '16px', marginTop: '10px' }}>
                    Cadastrar
                </button>
            </form>

            {/* O "Pulo do Gato" da UX: Se ele já tem conta, mandamos ele pro Login */}
            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
                <span style={{ color: 'var(--cor-texto-secundario)' }}>Já tem uma conta? </span>
                <span 
                    onClick={() => setPaginaAtual("login")} 
                    style={{ color: 'var(--cor-primaria-azul)', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
                >
                    Faça login aqui.
                </span>
            </div>
        </div>
    );
}