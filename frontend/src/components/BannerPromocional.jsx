import { useState, useEffect } from 'react';

export function BannerPromocional() {
    // 1. A NOSSA LISTA DE PROMOÇÕES (Você pode adicionar quantas quiser aqui!)
    const promocoes = [
        {
            id: 1,
            titulo: "Transforme suas aulas com materiais de excelência",
            texto: "Descubra listas de exercícios, mapas mentais e slides focados na BNCC para Ciências da Natureza.",
            botao: "Ver Materiais 👇",
            icone: "📚",
            // Fundo azul
            fundo: "linear-gradient(135deg, var(--cor-primaria-azul), #2a5298)" 
        },
        {
            id: 2,
            titulo: "🔥 Volta às Aulas: 30% OFF em Física",
            texto: "Aproveite nosso combo exclusivo de Mecânica e Termologia. Poupe horas de planejamento!",
            botao: "Aproveitar Desconto ⚡",
            icone: "⚛️",
            // Fundo Laranja/Avermelhado
            fundo: "linear-gradient(135deg, #FF8C00, #d35400)" 
        },
        {
            id: 3,
            titulo: "Novos Mapas Mentais de Biologia",
            texto: "Genética e Citologia explicadas de forma super visual e colorida para engajar seus alunos.",
            botao: "Conhecer Novidades 🧬",
            icone: "🧬",
            // Fundo Verde
            fundo: "linear-gradient(135deg, var(--cor-primaria-verde), #1e7145)" 
        }
    ];

    // 2. A Memória de qual slide estamos vendo agora (começa no 0)
    const [slideAtual, setSlideAtual] = useState(0);

    // 3. O Temporizador: Troca o slide sozinho a cada 5 segundos
    useEffect(() => {
        const timer = setInterval(() => {
            // Se for o último slide, volta pro zero. Se não, vai pro próximo.
            setSlideAtual((slideAnterior) => 
                slideAnterior === promocoes.length - 1 ? 0 : slideAnterior + 1
            );
        }, 5000); // 5000 milissegundos = 5 segundos

        // Limpa o temporizador se o usuário sair da tela (boas práticas)
        return () => clearInterval(timer);
    }, [promocoes.length]);

    // O slide que vai ser desenhado na tela neste exato momento
    const slide = promocoes[slideAtual];

    return (
        // Usamos o estilo inline para mudar a cor de fundo dinamicamente
        <div className="banner-container" style={{ background: slide.fundo, transition: 'background 0.5s ease' }}>
            
            {/* O ícone decorativo gigante */}
            <div className="banner-decoracao fade-in" key={`icone-${slide.id}`}>
                {slide.icone}
            </div>
            
            <div className="banner-conteudo fade-in" key={`conteudo-${slide.id}`}>
                <h1 className="banner-titulo">{slide.titulo}</h1>
                <p className="banner-texto">{slide.texto}</p>
                <button 
                    className="banner-btn"
                    onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
                >
                    {slide.botao}
                </button>
            </div>

            {/* As "Bolinhas" de navegação */}
            <div className="banner-dots">
                {promocoes.map((item, index) => (
                    <span 
                        key={item.id} 
                        // Se o index da bolinha for igual ao slide atual, ela ganha a classe 'ativo'
                        className={`dot ${index === slideAtual ? 'ativo' : ''}`}
                        // Se o usuário clicar na bolinha, vai direto para aquele slide
                        onClick={() => setSlideAtual(index)}
                    ></span>
                ))}
            </div>

        </div>
    );
}