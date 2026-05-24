import React from 'react';

export function TermosDeUso({ setPaginaAtual }) {
    return (
        <div style={{
            maxWidth: "800px", margin: "40px auto", padding: '30px',
            backgroundColor: 'var(--cor-fundo-card)', borderRadius: '8px',
            boxShadow: 'var(--sombra-suave)', lineHeight: '1.6', color: 'var(--cor-texto-principal)'
        }}>
            
            <button 
                onClick={() => setPaginaAtual("loja")} 
                className="btn-secundario" 
                style={{ marginBottom: '20px', padding: '5px 10px', fontSize: '14px' }}
            >
                ⬅️ Voltar para a Loja
            </button>

            <h2 style={{ color: 'var(--cor-primaria-azul)', borderBottom: '2px solid var(--cor-borda)', paddingBottom: '10px' }}>
                Termos de Uso e Políticas de Privacidade
            </h2>

            <p style={{ fontSize: '14px', color: 'var(--cor-texto-secundario)' }}>Última atualização: Maio de 2024</p>

            <h3 style={{ color: 'var(--cor-primaria-verde)', marginTop: '20px' }}>1. Termos e Condições de Uso</h3>
            <p>
                Bem-vindo(a) à plataforma <strong>Didáticos</strong>. Ao acessar e adquirir nossos materiais, você concorda com os seguintes termos:
            </p>
            <ul style={{ marginLeft: '20px' }}>
                <li><strong>Direitos Autorais:</strong> Todos os materiais (slides, listas de exercícios, resumos, etc.) são de propriedade exclusiva da Didáticos. A compra garante o direito de uso pessoal e em sala de aula pelo professor adquirente.</li>
                <li><strong>Proibição de Revenda:</strong> É estritamente proibida a revenda, distribuição não autorizada, rateio ou compartilhamento público (como em sites de downloads e grupos abertos) dos arquivos comprados. O descumprimento pode acarretar bloqueio imediato da conta e medidas legais cabíveis.</li>
                <li><strong>Acesso aos Materiais:</strong> Após a confirmação do pagamento, os arquivos digitais ficarão permanentemente disponíveis para download na aba "Meus Pedidos" da sua conta.</li>
            </ul>

            <h3 style={{ color: 'var(--cor-primaria-verde)', marginTop: '20px' }}>2. Política de Reembolso e Devolução</h3>
            <p>
                Por se tratar da venda de <strong>produtos exclusivamente digitais</strong> (arquivos consumíveis de imediato), a nossa política de reembolso funciona da seguinte forma:
            </p>
            <ul style={{ marginLeft: '20px' }}>
                <li>O reembolso pode ser solicitado no prazo de até <strong>7 (sete) dias</strong> após a compra, conforme o Art. 49 do Código de Defesa do Consumidor, <strong>desde que os arquivos não tenham sido baixados (download efetuado)</strong>.</li>
                <li>Como o acesso ao arquivo caracteriza o consumo imediato do infoproduto, <strong>não haverá reembolso após o download do material</strong>. Certifique-se de ler a descrição e os temas abordados antes de finalizar a compra.</li>
                <li>Em caso de arquivo corrompido ou erro técnico comprovado da plataforma, garantimos a substituição do material ou a devolução integral do valor, independente do download.</li>
            </ul>

            <h3 style={{ color: 'var(--cor-primaria-verde)', marginTop: '20px' }}>3. Políticas de Privacidade (LGPD)</h3>
            <p>
                Nós levamos a sua privacidade a sério e garantimos a proteção dos seus dados, de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018):
            </p>
            <ul style={{ marginLeft: '20px' }}>
                <li><strong>Coleta de Dados:</strong> Coletamos apenas informações essenciais para o cadastro (nome e e-mail) e para a segurança da sua conta.</li>
                <li><strong>Pagamentos:</strong> Não armazenamos dados de cartão de crédito. Todo o processo de pagamento é realizado em ambiente seguro e criptografado diretamente pela nossa parceira processadora de pagamentos (InfinitePay).</li>
                <li><strong>Uso dos Dados:</strong> Seu e-mail será utilizado unicamente para comunicações vitais (confirmação de conta, recuperação de senha e recibos de compra). Não vendemos seus dados para terceiros.</li>
            </ul>

            <h3 style={{ color: 'var(--cor-primaria-verde)', marginTop: '20px' }}>4. Contato</h3>
            <p>
                Se você tiver dúvidas sobre estes termos ou sobre qualquer material, entre em contato com nosso suporte através do botão "Contato / Suporte" disponível no menu da sua conta.
            </p>

        </div>
    );
}