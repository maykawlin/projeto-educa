import { useState, useEffect } from 'react';

export function BannerPromocional() {
    const promocoes = [
        {
            id: 1,
            titulo: "Transforme suas aulas com materiais de excelência",
            texto: "Descubra listas de exercícios, mapas mentais e slides focados na BNCC para Ciências da Natureza.",
            botao: "Ver Materiais 👇",
            icone: "📚",
            fundo: "linear-gradient(135deg, var(--cor-primaria-azul), #2a5298)" 
        },
        {
            id: 2,
            titulo: "🔥 Volta às Aulas: 30% OFF em Física",
            texto: "Aproveite nosso combo exclusivo de Mecânica e Termologia. Poupe horas de planejamento!",
            botao: "Aproveitar Desconto ⚡",
            icone: "⚛️",
            fundo: "linear-gradient(135deg, #FF8C00, #d35400)" 
        },
        {
            id: 3,
            titulo: "Novos Mapas Mentais de Biologia",
            texto: "Genética e Citologia explicadas de forma super visual e colorida para engajar seus alunos.",
            botao: "Conhecer Novidades 🧬",
            icone: "🧬",
            fundo: "linear-gradient(135deg, var(--cor-primaria-verde), #1e7145)" 
        }
    ];

    const [slideAtual, setSlideAtual] = useState(0);

    // ==========================================
    // LÓGICA DO SWIPE (ARRASTAR) 👆
    // ==========================================
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const minSwipeDistance = 50; // Distância mínima para considerar que foi um "arrastão" e não só um clique

    // Funções para passar ou voltar os slides
    const avancarSlide = () => setSlideAtual(prev => prev === promocoes.length - 1 ? 0 : prev + 1);
    const voltarSlide = () => setSlideAtual(prev => prev === 0 ? promocoes.length - 1 : prev - 1);

    // O Temporizador Automático (reutilizando a função acima)
    useEffect(() => {
        const timer = setInterval(avancarSlide, 5000);
        return () => clearInterval(timer);
    }, [promocoes.length]);

    // Anota onde o dedo encostou
    const onTouchStart = (e) => {
        setTouchEnd(null); 
        // Verifica se é toque no celular (targetTouches) ou clique no Mouse (clientX)
        setTouchStart(e.targetTouches ? e.targetTouches[0].clientX : e.clientX);
    };

    // Anota por onde o dedo está passando
    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches ? e.targetTouches[0].clientX : e.clientX);
    };

    // Calcula a diferença quando o dedo solta a tela
    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) avancarSlide(); // Arrastou para a esquerda (próximo)
        if (isRightSwipe) voltarSlide(); // Arrastou para a direita (anterior)
        
        // Reseta os valores
        setTouchStart(null);
        setTouchEnd(null);
    };
    // ==========================================

    const slide = promocoes[slideAtual];

    return (
        <div 
            className="banner-container" 
            style={{ 
                background: slide.fundo, 
                transition: 'background 0.5s ease',
                cursor: 'grab', // Deixa o cursor com formato de "mãozinha aberta"
                userSelect: 'none' // Impede do texto ficar azul selecionado enquanto arrasta
            }}
            // Sensores para Tela de Toque (Celular)
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            // Sensores para Mouse (Computador)
            onMouseDown={onTouchStart}
            onMouseMove={(e) => touchStart && onTouchMove(e)} // Só anota o movimento se o botão estiver pressionado
            onMouseUp={onTouchEnd}
            onMouseLeave={() => touchStart && onTouchEnd()} // Se o mouse sair do banner enquanto arrasta
            onDragStart={(e) => e.preventDefault()} // Impede o bug do navegador tentar "salvar a imagem" ao arrastar
        >
            
            <div className="banner-decoracao fade-in" key={`icone-${slide.id}`}>
                {slide.icone}
            </div>
            
            <div className="banner-conteudo fade-in" key={`conteudo-${slide.id}`}>
                <h1 className="banner-titulo">{slide.titulo}</h1>
                <p className="banner-texto">{slide.texto}</p>
                <button 
                    className="banner-btn"
                    onClick={(e) => {
                        e.stopPropagation(); // Impede o botão de ativar o "arrastar" sem querer
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                >
                    {slide.botao}
                </button>
            </div>

            <div className="banner-dots">
                {promocoes.map((item, index) => (
                    <span 
                        key={item.id} 
                        className={`dot ${index === slideAtual ? 'ativo' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSlideAtual(index);
                        }}
                    ></span>
                ))}
            </div>

        </div>
    );
}