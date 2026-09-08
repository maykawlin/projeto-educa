import React, {useEffect} from 'react';

export function QuemSomos({ setPaginaAtual }) {
    useEffect(() => {
        window.scrollTo(0, 0); // Diz para o navegador: "Vá para a posição X:0, Y:0" (o topo exato)
    }, []); // As chaves vazias [] significam que isso só vai rodar 1 vez, quando a página abrir

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px', color: 'var(--cor-texto-principal)' }}>
            
            {/* CABEÇALHO PRINCIPAL */}
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h1 style={{ color: 'var(--cor-primaria-azul)', fontSize: '36px', marginBottom: '30px' }}>
                    Transformando a Educação com Você 🚀
                </h1>

                {/* PROPÓSITO */}
                <div style={{ backgroundColor: 'var(--cor-fundo-card)', padding: '30px', borderRadius: '12px', boxShadow: 'var(--sombra-suave)', marginBottom: '30px', textAlign: 'left', borderLeft: '5px solid var(--cor-primaria-verde)' }}>
                    <h2 style={{ color: 'var(--cor-primaria-azul)', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>🎯</span> Nosso Propósito
                    </h2>
                    <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'var(--cor-texto-secundario)', margin: 0 }}>
                        Acreditamos que quando o professor tem as ferramentas certas, ganha tempo para fazer o que realmente importa: ensinar, inspirar e transformar vidas.
                    </p>
                </div>

                {/* MISSÃO E VISÃO (Lado a lado em telas grandes) */}
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <div style={{ flex: '1 1 300px', backgroundColor: 'var(--cor-fundo-card)', padding: '30px', borderRadius: '12px', boxShadow: 'var(--sombra-suave)', textAlign: 'left', borderTop: '5px solid var(--cor-primaria-azul)' }}>
                        <h2 style={{ color: 'var(--cor-primaria-azul)', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span>🚀</span> Nossa Missão
                        </h2>
                        <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'var(--cor-texto-secundario)', margin: 0 }}>
                            Transformar a rotina dos professores, oferecendo materiais didáticos que unem qualidade, praticidade e inovação, para que cada educador tenha mais tempo, confiança e inspiração para ensinar.
                        </p>
                    </div>
                    
                    <div style={{ flex: '1 1 300px', backgroundColor: 'var(--cor-fundo-card)', padding: '30px', borderRadius: '12px', boxShadow: 'var(--sombra-suave)', textAlign: 'left', borderTop: '5px solid var(--cor-primaria-verde)' }}>
                        <h2 style={{ color: 'var(--cor-primaria-verde)', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span>👁️</span> Nossa Visão
                        </h2>
                        <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'var(--cor-texto-secundario)', margin: 0 }}>
                            Ser a principal referência em materiais didáticos para professores no Brasil, reconhecida como a parceira mais confiável e inovadora da educação.
                        </p>
                    </div>
                </div>
            </div>

            {/* VALORES (Em formato de Grid) */}
            <div style={{ marginBottom: '60px' }}>
                <h2 style={{ textAlign: 'center', color: 'var(--cor-primaria-azul)', marginBottom: '30px' }}>💎 Nossos Valores</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                    
                    <div style={estiloCardValor} className="card-produto">
                        <div style={estiloIconeValor}>🎓</div>
                        <h3 style={estiloTituloValor}>Compromisso com a Educação</h3>
                        <p style={estiloTextoValor}>Acreditamos que a educação transforma vidas e que apoiar o professor é investir no futuro.</p>
                    </div>

                    <div style={estiloCardValor} className="card-produto">
                        <div style={estiloIconeValor}>⭐</div>
                        <h3 style={estiloTituloValor}>Excelência</h3>
                        <p style={estiloTextoValor}>Produzimos materiais com qualidade, organização e cuidado em cada detalhe.</p>
                    </div>

                    <div style={estiloCardValor} className="card-produto">
                        <div style={estiloIconeValor}>🤝</div>
                        <h3 style={estiloTituloValor}>Parceria com o Professor</h3>
                        <p style={estiloTextoValor}>Mais do que vender materiais, queremos caminhar ao lado dos educadores, entendendo suas necessidades e oferecendo soluções reais.</p>
                    </div>

                    <div style={estiloCardValor} className="card-produto">
                        <div style={estiloIconeValor}>⏱️</div>
                        <h3 style={estiloTituloValor}>Praticidade</h3>
                        <p style={estiloTextoValor}>Criamos recursos que economizam tempo e simplificam o planejamento das aulas.</p>
                    </div>

                    <div style={estiloCardValor} className="card-produto">
                        <div style={estiloIconeValor}>💡</div>
                        <h3 style={estiloTituloValor}>Inovação</h3>
                        <p style={estiloTextoValor}>Buscamos constantemente novas ideias, metodologias e tecnologias para tornar o ensino mais dinâmico e eficiente.</p>
                    </div>

                    <div style={estiloCardValor} className="card-produto">
                        <div style={estiloIconeValor}>🛡️</div>
                        <h3 style={estiloTituloValor}>Confiança</h3>
                        <p style={estiloTextoValor}>Construímos relações baseadas em transparência, responsabilidade e respeito aos nossos clientes.</p>
                    </div>

                    <div style={estiloCardValor} className="card-produto">
                        <div style={estiloIconeValor}>❤️</div>
                        <h3 style={estiloTituloValor}>Paixão por Ensinar</h3>
                        <p style={estiloTextoValor}>Valorizamos o trabalho do professor e colocamos dedicação em tudo o que produzimos.</p>
                    </div>

                    <div style={estiloCardValor} className="card-produto">
                        <div style={estiloIconeValor}>📈</div>
                        <h3 style={estiloTituloValor}>Evolução Contínua</h3>
                        <p style={estiloTextoValor}>Estamos sempre aprendendo, ouvindo nossos clientes e aprimorando nossos materiais.</p>
                    </div>

                </div>
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
                <div style={estiloCardEquipe}>
                    <div style={estiloFotoPlaceholder}>MK</div>
                    <h3 style={{ margin: '15px 0 5px 0' }}>Maycon Kawlin</h3>
                    <span style={{ color: 'var(--cor-primaria-verde)', fontWeight: 'bold', fontSize: '14px' }}>Fundador & Desenvolvedor</span>
                    <p style={{ fontSize: '14px', color: 'var(--cor-texto-secundario)', marginTop: '10px', textAlign: 'justify' }}>
                        Idealizador da plataforma e responsável por garantir que a sua experiência de compra seja rápida e segura.
                    </p>
                </div>
            </div>

            {/* BOTÃO DE VOLTAR */}
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <button onClick={() => setPaginaAtual("loja")} className="btn-primario" style={{ padding: '12px 30px', fontSize: '16px' }}>
                    ⬅️ Voltar para a Loja
                </button>
            </div>

        </div>
    );
}

// Estilos criados para deixar os cards bonitos e alinhados
const estiloCardValor = { backgroundColor: 'white', padding: '25px 20px', borderRadius: '12px', border: '1px solid var(--cor-borda)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' };
const estiloIconeValor = { fontSize: '36px', marginBottom: '15px' };
const estiloTituloValor = { margin: '0 0 10px 0', color: 'var(--cor-primaria-verde)', fontSize: '16px' };
const estiloTextoValor = { margin: 0, fontSize: '14px', color: 'var(--cor-texto-secundario)', lineHeight: '1.5' };

const estiloCardEquipe = { backgroundColor: 'white', border: '1px solid var(--cor-borda)', borderRadius: '12px', padding: '25px', width: '250px', textAlign: 'center', boxShadow: 'var(--sombra-suave)', transition: 'transform 0.2s' };
const estiloFotoPlaceholder = { width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--cor-primaria-azul)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold', margin: '0 auto' };