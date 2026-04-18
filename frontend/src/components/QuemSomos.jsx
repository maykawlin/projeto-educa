import React, {useEffect} from 'react';

export function QuemSomos({ setPaginaAtual }) {

    useEffect(() => {
        window.scrollTo(0, 0); // Diz para o navegador: "Vá para a posição X:0, Y:0" (o topo exato)
    }, []); // As chaves vazias [] significam que isso só vai rodar 1 vez, quando a página abrir

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px', color: 'var(--cor-texto-principal)' }}>
            
            {/* CABEÇALHO (A Missão) */}
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h1 style={{ color: 'var(--cor-primaria-azul)', fontSize: '36px', marginBottom: '15px' }}>
                    Nossa Missão é Valorizar o Seu Tempo ⏳
                </h1>
                <p style={{ fontSize: '18px', color: 'var(--cor-texto-secundario)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6', textAlign: 'justify' }}>
                    Sabemos que a rotina de um educador vai muito além da sala de aula. A <strong>Didáticos</strong> nasceu para entregar materiais de altíssima qualidade, prontos para uso, para que você foque no que realmente importa: inspirar seus alunos (e ter o seu merecido descanso).
                </p>
            </div>

            {/* NOSSA HISTÓRIA */}
            <div style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '12px', marginBottom: '50px', borderLeft: '5px solid var(--cor-primaria-verde)' }}>
                <h2 style={{ marginTop: 0, color: 'var(--cor-primaria-azul)' }}>Como tudo começou 📖</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.6', textAlign: 'justify' }}>
                    Tudo começou com a mesma frustração que você provavelmente já sentiu: passar o final de semana inteiro montando listas de exercícios e formatando provas. 
                    Nós decidimos juntar nossa experiência em sala de aula para criar um acervo definitivo. Hoje, operamos como uma plataforma independente (via MEI) para garantir que o material chegue até você com o menor custo possível e a maior qualidade do mercado.
                </p>
            </div>

            {/* A EQUIPE (Os Fundadores) */}
            <h2 style={{ textAlign: 'center', color: 'var(--cor-primaria-azul)', marginBottom: '30px' }}>Quem faz a Didáticos acontecer 🤝</h2>
            
            <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
                
                {/* CARD MAYCON */}
                <div style={estiloCardEquipe}>
                    <div style={estiloFotoPlaceholder}>MK</div>
                    <h3 style={{ margin: '15px 0 5px 0' }}>Maycon Kawlin</h3>
                    <span style={{ color: 'var(--cor-primaria-verde)', fontWeight: 'bold', fontSize: '14px' }}>Fundador & Desenvolvedor</span>
                    <p style={{ fontSize: '14px', color: 'var(--cor-texto-secundario)', marginTop: '10px', textAlign: 'justify' }}>
                        Idealizador da plataforma e responsável por garantir que a sua experiência de compra seja rápida e segura.
                    </p>
                </div>

                {/* CARD SÓCIO 1 (Pode copiar e colar para mais sócios) */}
                <div style={estiloCardEquipe}>
                    <div style={estiloFotoPlaceholder}>S1</div>
                    <h3 style={{ margin: '15px 0 5px 0' }}>Nome do Sócio</h3>
                    <span style={{ color: 'var(--cor-primaria-verde)', fontWeight: 'bold', fontSize: '14px' }}>Co-fundador(a) & Conteúdo</span>
                    <p style={{ fontSize: '14px', color: 'var(--cor-texto-secundario)', marginTop: '10px', textAlign: 'justify' }}>
                        Especialista em criar e curar os melhores materiais didáticos para garantir que suas aulas sejam incríveis.
                    </p>
                </div>

            </div>

            {/* BOTÃO DE VOLTAR */}
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <button onClick={() => setPaginaAtual("loja")} className="btn-primario" style={{ padding: '12px 30px', fontSize: '16px' }}>
                    ⬅️ Voltar para a Vitrine
                </button>
            </div>

        </div>
    );
}

// Estilos para deixar os cards da equipe bonitos
const estiloCardEquipe = {
    backgroundColor: 'white',
    border: '1px solid var(--cor-borda)',
    borderRadius: '12px',
    padding: '25px',
    width: '250px',
    textAlign: 'center',
    boxShadow: 'var(--sombra-suave)',
    transition: 'transform 0.2s'
};

const estiloFotoPlaceholder = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: 'var(--cor-primaria-azul)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0 auto'
};