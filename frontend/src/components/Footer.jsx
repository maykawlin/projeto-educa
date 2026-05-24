export function Footer({setPaginaAtual}) {
    const anoAtual = new Date().getFullYear(); // Pega o ano automaticamente para o Copyright

    return (
        <footer className="footer-container">
            <div className="footer-conteudo">
                
                {/* Coluna 1: Sobre */}
                <div className="footer-coluna">
                    <h3>📚 Sobre a Didáticos</h3>
                    <p style={{ textAlign: 'justify'}}>
                        Plataforma dedicada a professores apaixonados por ensinar. 
                        Compartilhamos materiais de alta qualidade para transformar 
                        salas de aula em todo o Brasil. <span onClick={() => setPaginaAtual("quem_somos")} style={{ cursor: 'pointer', color: '#4CAF50', textDecoration: 'underline' }}>
                        Nossa História (Quem Somos)
                    </span>
                    </p>
                </div>

                {/* Coluna 2: Links Rápidos (AGORA FUNCIONANDO!) */}
                <div className="footer-coluna">
                    <h3>🔗 Links Rápidos</h3>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '10px' }}>
                            <span onClick={() => setPaginaAtual("loja")} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'var(--cor-texto-principal)' }}>
                                Início
                            </span>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <span onClick={() => setPaginaAtual("quem_somos")} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'var(--cor-texto-principal)' }}>
                                Como funciona
                            </span>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <span onClick={() => setPaginaAtual("termos")} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'var(--cor-texto-principal)' }}>
                                Termos de Uso
                            </span>
                        </li>
                        <li>
                            <span onClick={() => setPaginaAtual("termos")} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'var(--cor-texto-principal)' }}>
                                Política de Privacidade
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Coluna 3: Contato e WhatsApp */}
                <div className="footer-coluna">
                    <h3>💬 Precisa de Ajuda?</h3>
                    <p style={{ textAlign: 'justify'}}>
                        Tem alguma dúvida sobre os materiais ou problemas com seu acesso? 
                        Fale diretamente com nossa equipe de suporte.
                    </p>
                    
                    {/* link do WhatsApp (Lembre-se de mudar o número depois para o seu!) */}
                    <a 
                        href="https://wa.me/5511999999999?text=Olá!%20Estou%20na%20loja%20Didáticos%20e%20preciso%20de%20ajuda." 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-whatsapp"
                    >
                        Atendimento via WhatsApp
                    </a>
                </div>

            </div>

            {/* Linha final de Copyright */}
            <div className="footer-bottom">
                <p>&copy; {anoAtual} Didáticos. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}