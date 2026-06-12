import { useState } from "react";

export function FiltrosLateral({ filtrosSelecionados, alternarFiltro, limparFiltros }) {
    
    // Memórias para controlar quais abas da sanfona estão abertas
    const [nivelAberto, setNivelAberto] = useState("");
    const [disciplinaAberta, setDisciplinaAberta] = useState("");
    const [serieAberta, setSerieAberta] = useState("");

    // O nosso "Dicionário" com a Hierarquia Exata (Agora com Integração Curricular restaurada!)
    const bancoDeAssuntos = {
        "Ensino Médio": {
            "Física": ["Cinemática", "Dinâmica", "Energia", "Gravitação Universal", "Ondulatória", "Termometria", "Calorimetria", "Termodinâmica", "Eletrostática", "Eletrodinâmica", "Magnetismo", "Eletromagnetismo", "Física Moderna"],
            "Química": ["Matéria e Atomística", "Tabela Periódica", "Ligações Químicas", "Forças Intermoleculares", "Funções Inorgânicas", "Reações Químicas e Estequiometria", "Soluções", "Termoquímica", "Cinética Química", "Equilíbrio Químico", "Eletroquímica", "Química Orgânica", "Química Ambiental"],
            "Biologia": ["Biologia Celular", "Bioquímica", "Reinos", "Zoologia", "Botânica", "Histologia", "Embriologia", "Fisiologia Humana", "Genética", "Evolução", "Ecologia"],
            "Integração Curricular": ["Projeto de Vida", "Protagonismo Juvenil", "Iniciação Científica", "Eletiva", "Pós-Médio", "Prática Experimental"]
        },
        "Ensino Fundamental II": {
            "Ciências": {
                "6º Ano EF": ["Células", "Sistema Solar", "Atmosfera e Litosfera", "Misturas"],
                "7º Ano EF": ["Máquinas Simples", "Vírus e Bactérias", "Reino Vegetal", "Ecossistemas", "Calor e Temperatura"],
                "8º Ano EF": ["Corpo Humano", "Eletricidade", "Clima e Tempo", "Sistema Reprodutor"],
                "9º Ano EF": ["Física Clássica", "Química Básica", "Genética Básica", "Evolução"]
            }
        }
    };

    const estiloGrupo = { marginBottom: '15px', borderBottom: '1px solid var(--cor-borda)', paddingBottom: '10px' };
    const estiloLinha = { display: 'flex', alignItems: 'center', cursor: 'pointer', margin: '8px 0' };
    const txtPonteiro = { cursor: 'pointer', flex: 1 };

    return (
        <div className="sidebar-filtros" style={{ backgroundColor: '#fff', borderRadius: '8px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, color: 'var(--cor-texto-principal)' }}>Filtros</h3>
                <button onClick={limparFiltros} className="btn-secundario" style={{ padding: '5px 10px', fontSize: '12px' }}>
                    Limpar Tudo
                </button>
            </div>

            {/* Renderização Inteligente da Árvore */}
            {Object.keys(bancoDeAssuntos).map(nivel => (
                <div key={nivel} style={estiloGrupo}>
                    {/* 1. NÍVEL (Ex: Ensino Médio) */}
                    <div style={{ ...estiloLinha, color: 'var(--cor-primaria-azul)', fontWeight: 'bold' }}>
                        <input 
                            type="checkbox" 
                            checked={filtrosSelecionados.nivel.includes(nivel)}
                            onChange={() => alternarFiltro('nivel', nivel)}
                            style={{ marginRight: '8px' }}
                        />
                        <span style={txtPonteiro} onClick={() => setNivelAberto(nivelAberto === nivel ? "" : nivel)}>
                            {nivel} {nivelAberto === nivel ? "▴" : "▾"}
                        </span>
                    </div>

                    {/* 2. DISCIPLINAS (Se o Nível estiver aberto) */}
                    {nivelAberto === nivel && Object.keys(bancoDeAssuntos[nivel]).map(disciplina => (
                        <div key={disciplina} style={{ marginLeft: '20px' }}>
                            <div style={{ ...estiloLinha, color: 'var(--cor-texto-principal)' }}>
                                <input 
                                    type="checkbox" 
                                    checked={filtrosSelecionados.disciplina.includes(disciplina)}
                                    onChange={() => alternarFiltro('disciplina', disciplina)}
                                    style={{ marginRight: '8px' }}
                                />
                                <span style={txtPonteiro} onClick={() => setDisciplinaAberta(disciplinaAberta === disciplina ? "" : disciplina)}>
                                    {disciplina} {disciplinaAberta === disciplina ? "▴" : "▾"}
                                </span>
                            </div>

                            {/* 3A. ASSUNTOS DO ENSINO MÉDIO (Pula a série) */}
                            {nivel === "Ensino Médio" && disciplinaAberta === disciplina && bancoDeAssuntos[nivel][disciplina].map(assunto => (
                                <label key={assunto} style={{ ...estiloLinha, marginLeft: '25px', fontSize: '13px', color: 'var(--cor-texto-secundario)' }}>
                                    <input 
                                        type="checkbox" 
                                        checked={filtrosSelecionados.assunto.includes(assunto)}
                                        onChange={() => alternarFiltro('assunto', assunto)}
                                        style={{ marginRight: '8px' }}
                                    />
                                    {assunto}
                                </label>
                            ))}

                            {/* 3B. SÉRIES DO ENSINO FUNDAMENTAL */}
                            {nivel === "Ensino Fundamental II" && disciplinaAberta === disciplina && Object.keys(bancoDeAssuntos[nivel][disciplina]).map(serie => (
                                <div key={serie} style={{ marginLeft: '20px' }}>
                                    <div style={{ ...estiloLinha, fontSize: '14px', color: 'var(--cor-texto-principal)' }}>
                                        <input 
                                            type="checkbox" 
                                            // A Série do EF é um NÍVEL no seu Banco de Dados!
                                            checked={filtrosSelecionados.nivel.includes(serie)}
                                            onChange={() => alternarFiltro('nivel', serie)}
                                            style={{ marginRight: '8px' }}
                                        />
                                        <span style={txtPonteiro} onClick={() => setSerieAberta(serieAberta === serie ? "" : serie)}>
                                            {serie} {serieAberta === serie ? "▴" : "▾"}
                                        </span>
                                    </div>

                                    {/* 4. ASSUNTOS DA SÉRIE ESPECÍFICA */}
                                    {serieAberta === serie && bancoDeAssuntos[nivel][disciplina][serie].map(assunto => (
                                        <label key={assunto} style={{ ...estiloLinha, marginLeft: '25px', fontSize: '13px', color: 'var(--cor-texto-secundario)' }}>
                                            <input 
                                                type="checkbox" 
                                                checked={filtrosSelecionados.assunto.includes(assunto)}
                                                onChange={() => alternarFiltro('assunto', assunto)}
                                                style={{ marginRight: '8px' }}
                                            />
                                            {assunto}
                                        </label>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}

            {/* Filtro de Tipo Mantido Intacto do seu Original */}
            <div className="grupo-filtro" style={{ marginTop: '20px' }}>
                <h4 style={{ color: 'var(--cor-primaria-azul)' }}>Tipo de Material</h4>
                {["Slide", "EBook", "Lista de Exercícios", "Resumo", "Aulas Práticas"].map(tipo => (
                    <label key={tipo} className="opcao-filtro" style={{ display: 'block', margin: '8px 0', fontSize: '14px' }}>
                        <input 
                            type="checkbox" 
                            checked={filtrosSelecionados.tipo.includes(tipo)} 
                            onChange={() => alternarFiltro('tipo', tipo)} 
                            style={{ marginRight: '8px' }} 
                        /> 
                        {tipo}
                    </label>
                ))}
            </div>
        </div>
    );
}