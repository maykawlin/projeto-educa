import {useState} from 'react';
import axios from 'axios';

export function Login({setPaginaAtual, setToken}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [erro, setErro] = useState("");

    async function fazerLogin(e) {
        e.preventDefault(); 
        setErro(""); 

        try {
            const resposta = await axios.post("https://api.materialdidaticos.com.br/api/token/", {
                username: username,
                password: password,
            });

            const token = resposta.data.access;

            localStorage.setItem("token", token);
            setToken(token);

            alert("Login realizado com sucesso!")
            setPaginaAtual('loja');            
        } catch (error) {
            console.log(error);
            setErro('Usuário ou senha incorretos. Tente novamente.')
        }
    }

    return (
        <div style={{ maxWidth:"400px", margin:"50px auto", padding: '20px', border: '1px solid #ccc', borderRadius:'8px' }}> 
            <h2 style={{ color: 'var(--cor-primaria-azul)'}}>Acesse sua conta</h2>

            {erro && <p style={{color:'red', fontWeight:'bold'}}>{erro}</p>}

            <form onSubmit={fazerLogin} style={{display:'flex', flexDirection:'column',gap:'15px'}}>
                <div>
                    <label>E-mail:</label>
                    <input type='email' value={username} onChange={(e) => setUsername(e.target.value)} required className='input-login' style={{width:'93%', padding:'10px', marginTop:'5px'}} />
                </div>

                <div>
                    <label>Senha:</label>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required className='input-login' style={{width:'93%', padding:'10px', marginTop:'5px',}} />
                </div>
                
                <div style={{ textAlign: 'right', marginTop: '5px', marginBottom: '15px' }}>
                    <button 
                        type="button" 
                        onClick={() => setPaginaAtual("esqueci_senha")} 
                        style={{ background: 'none', border: 'none', color: 'var(--cor-texto-secundario)', cursor: 'pointer', fontSize: '12px', textDecoration: 'underline', padding: 0 }}
                    >
                        Esqueceu a senha?
                    </button>
                </div>

                <button type="submit" className='btn-secundario' style={{ padding:'10px', backgroundColor:'#007BFF', color:'white', border:'none', cursor:'pointer', fontWeight:'bold' }}>
                    Entrar
                </button>
            </form>
            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
                <span style={{ color: '#666' }}>Não tem uma conta? </span>
                <span onClick={() => setPaginaAtual("cadastro")} style={{ color: '#007BFF', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}>
                    Cadastre-se grátis.
                </span>
            </div>
        </div>
    )
}