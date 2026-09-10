export function Footer({ setPaginaAtual }) {
    const anoAtual = new Date().getFullYear(); // Pega o ano automaticamente para o Copyright

    return (
        <footer className="footer-container">
            <div className="footer-conteudo">
                
                {/* Coluna 1: Sobre */}
                <div className="footer-coluna">
                    <h3>📚 Sobre a Didáticos</h3>
                    <p style={{ textAlign: 'justify' }}>
                        Na Didáticos, acreditamos que o professor merece mais tempo para ensinar e menos tempo preparando materiais.
                        Criamos atividades, apostilas, slides, e-books e recursos pedagógicos desenvolvidos com qualidade e 
                        organização para facilitar a rotina dos educadores. Nosso compromisso é ser muito mais que um fornecedor de 
                        materiais: queremos ser o parceiro de confiança dos professores.{' '}
                        <span 
                            onClick={() => setPaginaAtual("quem_somos")} 
                            style={{ cursor: 'pointer', color: 'var(--cor-primaria-verde)', textDecoration: 'underline' }}
                        >
                            Nossa História
                        </span>
                    </p>
                </div>

                {/* Coluna 2: Links Rápidos (Herdando a estilização nativa do index.css) */}
                <div className="footer-coluna">
                    <h3>🔗 Links Rápidos</h3>
                    <ul>
                        <li onClick={() => setPaginaAtual("loja")}>
                            Página Inicial
                        </li>
                        <li onClick={() => setPaginaAtual("como_funciona")}>
                            Como Funciona
                        </li>
                        <li onClick={() => setPaginaAtual("termos")}>
                            Termos e Privacidade
                        </li>
                    </ul>
                </div>

                {/* Coluna 3: Contato e WhatsApp */}
                <div className="footer-coluna">
                    <h3>💬 Precisa de Ajuda?</h3>
                    <p style={{ textAlign: 'justify' }}>
                        Tem alguma dúvida sobre os materiais ou problemas com seu acesso? 
                        Fale diretamente com nossa equipe de suporte.
                    </p>
                    
                    {/* Link do WhatsApp utilizando a classe oficial do seu design system */}
                    <a 
                        href="https://wa.me/5500000000000?text=Olá!%20Estou%20na%20loja%20Didáticos%20e%20preciso%20de%20ajuda." 
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