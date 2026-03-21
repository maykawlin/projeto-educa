import { useState } from "react";
import { FiltrosLateral } from "./FiltrosLateral";

export function Vitrine({ produtos, adicionarAoCarrinho, busca, setBusca}) {
    
    // 1. A Memória dos Filtros (Guarda o que o usuário marcou)
    const [filtrosSelecionados, setFiltrosSelecionados] = useState({
        nivel: [],
        disciplina: [],
        tipo: []
    });


    // 2. Função que marca e desmarca a caixinha
    function alternarFiltro(categoria, valor) {
        setFiltrosSelecionados(memoriaAnterior => {
            const listaAtual = memoriaAnterior[categoria];
            
            // Se já estava marcado, a gente tira da lista (desmarca)
            if (listaAtual.includes(valor)) {
                return { ...memoriaAnterior, [categoria]: listaAtual.filter(item => item !== valor) };
            } 
            // Se não estava marcado, a gente adiciona na lista
            else {
                return { ...memoriaAnterior, [categoria]: [...listaAtual, valor] };
            }
        });
    }

    // 3. A MÁGICA: Filtrando os produtos antes de desenhar na tela
    const produtosFiltrados = produtos.filter(produto => {
        // Filtro de texto (A barra de pesquisa)
        const matchBusca = (produto.titulo || "").toLowerCase().includes(busca.toLowerCase());

        // Extraindo os nomes reais de dentro do objeto do Django
        // Usamos o "?." (Optional Chaining) para não dar erro se o produto não tiver disciplina cadastrada
        const nomeNivel = produto.nivel?.nome || "";
        const nomeDisciplina = produto.disciplina?.nome || "";
        const nomeTipo = produto.tipo?.nome || "";

        // Filtro de Disciplina (Aqui a palavra bate exatamente)
        const matchDisciplina = filtrosSelecionados.disciplina.length === 0 || 
                                filtrosSelecionados.disciplina.includes(nomeDisciplina);

        // Filtro de Nível (Agrupamento Inteligente)
        const matchNivel = filtrosSelecionados.nivel.length === 0 || 
                           filtrosSelecionados.nivel.some(nivelSelecionado => {
                               // Se a caixinha "Ensino Médio" estiver marcada, aceita tudo que tiver "EM" no nome (1º Ano EM, 2º Ano EM)
                               if (nivelSelecionado === "Ensino Médio") return nomeNivel.includes("EM");
                               // Se for Fundamental, aceita o que tiver "EF" ou "Fundamental"
                               if (nivelSelecionado === "Ensino Fundamental II") return nomeNivel.includes("EF") || nomeNivel.includes("Fundamental");
                               return nomeNivel === nivelSelecionado;
                           });

        // Filtro de Tipo (Busca Flexível)
        const matchTipo = filtrosSelecionados.tipo.length === 0 || 
                          filtrosSelecionados.tipo.some(tipoSelecionado => {
                              // Verifica se "Slides (Teoria)" inclui a palavra "Slide" vinda do banco
                              return tipoSelecionado.toLowerCase().includes(nomeTipo.toLowerCase());
                          });

        // O produto só aparece se passar em TODOS os testes acima
        return matchBusca && matchNivel && matchDisciplina && matchTipo;
    });

    return (
        <div>
            <h2 style={{ color: 'var(--cor-primaria-azul)', marginBottom: '20px' }}>
                Vitrine de Produtos
            </h2>

            <div className="pesquisa-container">
                <input
                    type="text"
                    placeholder="🔍 O que você está buscando?"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="input-pesquisa"
                />
            </div>

            <div className="layout-loja">
                
                {/* Enviamos a memória e a função para a barra lateral */}
                <FiltrosLateral 
                    filtrosSelecionados={filtrosSelecionados} 
                    alternarFiltro={alternarFiltro} 
                />

                <div className="conteudo-vitrine">
                    <div className="grid-produtos">
                        
                        {/* Agora usamos a lista FILTRADA em vez da lista crua */}
                        {produtosFiltrados.map(produto => ( 
                            <div key={produto.id} className="card-produto">
                                {produto.imagem_capa && ( 
                                    <img 
                                        src={produto.imagem_capa}
                                        alt={produto.titulo}
                                        className="img-produto"
                                    />
                                )}
                                <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: 'var(--cor-texto-principal)' }}>{produto.titulo}</h3>
                                <p style={{ margin: '0 0 15px 0', fontSize: '20px', fontWeight: 'bold', color: 'var(--cor-primaria-verde)' }}>R$ {produto.preco}</p>
                                
                                <div style={{ marginTop: 'auto' }}>
                                    <button 
                                        onClick={() => adicionarAoCarrinho(produto)}
                                        className="btn-primario"
                                        style={{ width: '100%' }}>
                                        Comprar
                                    </button>
                                </div>
                            </div>  
                        ))}

                        {/* Mensagem amigável se a busca/filtro não encontrar nada */}
                        {produtosFiltrados.length === 0 && (
                            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--cor-texto-secundario)', padding: '40px 0' }}>
                                Nenhum material encontrado com esses filtros. 😔
                            </p>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}