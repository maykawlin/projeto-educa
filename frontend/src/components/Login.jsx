import {useState} from 'react';
import axios from 'axios';

export function Login({setPaginaAtual, setToken}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [erro, setErro] = useState("");

    async function fazerLogin(e) {
        e.preventDefault(); // Evita que a página recarregue ao reenviar o formulário
        setErro(""); // Limpa erros anteriores

        try {
            // Solicitando ao Django o Token
            const resposta = await axios.post("http://127.0.0.1:8000/api/token/", {
                username: username,
                password: password,
            });

            // Se deu certo vamos salvar a resposta em outra variável token
            const token = resposta.data.access;

            // Salva o token de acesso no localStorage do navegador para futuros acessos
            localStorage.setItem("token", token);
            setToken(token);

            // Manda o usuário de volta para a página inicial
            alert("Login realizado com sucesso!")
            setPaginaAtual('loja');            
        } catch (error) {
            console.log(error);
            setErro('Usuário ou senha incorretos. Tente novamente.')
        }
    }

    return (
        <div style={{
            maxWidth:"400px",
            margin:"50px auto",
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius:'8px',
        }}> 
            {/* Campo para os dados de login */}
            <h2 style={{ color: 'var(--cor-primaria-azul)'}}>Acesse sua conta</h2>

            {/* Mostra mensagem de erro se a senha estiver errada */}
            {erro && <p style={{color:'red', fontWeight:'bold'}}>{erro}</p>}

            <form onSubmit={fazerLogin} style={{display:'flex', flexDirection:'column',gap:'15px'}}>
                {/*Campo Usuário */}
                <div>
                    <label>Usuário:</label>
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className='input-login'
                        style={{width:'93%', padding:'10px', marginTop:'5px'}}
                    />
                </div>

                {/*Campo Senha */}
                <div>
                    <label>Senha:</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='input-login'
                        style={{width:'93%', 
                                padding:'10px', 
                                marginTop:'5px',}}
                    />
                </div>

                {/*Botão de Entrar */}
                <button type="submit" className='btn-secundario' style={{
                                            padding:'10px',
                                            backgroundColor:'#007BFF',
                                             color:'white',
                                             border:'none',
                                             cursor:'pointer',
                                             fontWeight:'bold' }}>
                    Entrar
                </button>
            </form>
        </div>
    )
}

