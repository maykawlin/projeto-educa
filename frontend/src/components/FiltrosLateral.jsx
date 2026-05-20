export function FiltrosLateral({ filtrosSelecionados, alternarFiltro, limparFiltros }) {
    
    // O nosso "Dicionário" inteligente. 
    // O React só vai ler as listas das disciplinas que estiverem marcadas!
    const bancoDeAssuntos = {
        "Física": ["Cinemática", "Dinâmica", "Energia", "Gravitação Universal", "Ondulatória", "Termometria", "Caloriemtria", "Termodinâmica", "Eletrostática", "Eletrodinâmica", "Magnetismo", "Eletromagnetismo", "Física Moderna"],
        "Química": ["Estequiometria", "Termoquímica", "Tabela Periódica", "Química Orgânica"],
        "Biologia": ["Biologia Celular", "Bioquímica", "Reinos", "Zoologia", "Botânica", "Histologia", "Embriologia", "Fisiologia Humana", "Genética", "Evolução", "Ecologia"],
        "Integração Curricular": ["Projeto de Vida", "Protagonismo Juvenil", "Iniciação Científica", "Eletiva", "Pós-Médio", "Prática Experimental"]
    };

    return (
        <div className="sidebar-filtros">
            
            {/* CABEÇALHO DOS FILTROS (Com o Botão de Limpar) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, color: 'var(--cor-texto-principal)' }}>
                    Filtros
                </h3>
                <button 
                    onClick={limparFiltros} 
                    className="btn-secundario" 
                    style={{ padding: '5px 10px', fontSize: '12px' }}
                >
                    Limpar Tudo
                </button>
            </div>

            {/* Filtro de Nível */}
            <div className="grupo-filtro">
                <h4>Nível de Ensino</h4>
                <label className="opcao-filtro">
                    <input type="checkbox" checked={filtrosSelecionados.nivel.includes("Ensino Fundamental II")} onChange={() => alternarFiltro('nivel', 'Ensino Fundamental II')} /> Ensino Fundamental II
                </label>
                <label className="opcao-filtro">
                    <input type="checkbox" checked={filtrosSelecionados.nivel.includes("Ensino Médio")} onChange={() => alternarFiltro('nivel', 'Ensino Médio')} /> Ensino Médio
                </label>
            </div>

            {/* Filtro de Disciplina */}
            <div className="grupo-filtro">
                <h4>Disciplina</h4>
                <label className="opcao-filtro">
                    <input type="checkbox" checked={filtrosSelecionados.disciplina.includes("Física")} onChange={() => alternarFiltro('disciplina', 'Física')} /> Física
                </label>
                <label className="opcao-filtro">
                    <input type="checkbox" checked={filtrosSelecionados.disciplina.includes("Química")} onChange={() => alternarFiltro('disciplina', 'Química')} /> Química
                </label>
                <label className="opcao-filtro">
                    <input type="checkbox" checked={filtrosSelecionados.disciplina.includes("Biologia")} onChange={() => alternarFiltro('disciplina', 'Biologia')} /> Biologia
                </label>
                <label className="opcao-filtro">
                    <input type="checkbox" checked={filtrosSelecionados.disciplina.includes("Integração curricular")} onChange={() => alternarFiltro('disciplina', 'Integração curricular')} /> Integração curricular
                </label>
            </div>

            {/* Filtro de Assunto (DINÂMICO) */}
            <div className="grupo-filtro">
                <h4>Assunto</h4>
                
                {/* Se nenhuma disciplina estiver marcada, mostra o aviso */}
                {filtrosSelecionados.disciplina.length === 0 ? (
                    <p style={{ fontSize: '12px', color: 'var(--cor-texto-secundario)', margin: 0 }}>
                        Selecione uma disciplina primeiro para ver os assuntos.
                    </p>
                ) : (
                    /* Se tiver disciplina marcada, fazemos um loop para mostrar os assuntos dela */
                    filtrosSelecionados.disciplina.map(disciplinaAtiva => {
                        // Pega a lista de assuntos dessa disciplina no nosso dicionário
                        const assuntosDessaDisciplina = bancoDeAssuntos[disciplinaAtiva];
                        
                        // Se existir assuntos cadastrados no dicionário, desenha na tela
                        if (assuntosDessaDisciplina) {
                            return (
                                <div key={disciplinaAtiva} style={{ marginBottom: '10px' }}>
                                    <strong style={{ fontSize: '12px', color: 'var(--cor-primaria-azul)' }}>↳ {disciplinaAtiva}</strong>
                                    {assuntosDessaDisciplina.map(assunto => (
                                        <label key={assunto} className="opcao-filtro" style={{ marginLeft: '10px', marginTop: '5px' }}>
                                            <input 
                                                type="checkbox" 
                                                checked={filtrosSelecionados.assunto.includes(assunto)}
                                                onChange={() => alternarFiltro('assunto', assunto)}
                                            /> {assunto}
                                        </label>
                                    ))}
                                </div>
                            );
                        }
                        return null; // Se não tiver assunto cadastrado, não faz nada
                    })
                )}
            </div>

            {/* Filtro de Tipo */}
            <div className="grupo-filtro">
                <h4>Tipo de Material</h4>
                <label className="opcao-filtro">
                    <input type="checkbox" checked={filtrosSelecionados.tipo.includes("Slide")} onChange={() => alternarFiltro('tipo', 'Slide')} /> Slide
                </label>
                <label className="opcao-filtro">
                    <input type="checkbox" checked={filtrosSelecionados.tipo.includes("EBook")} onChange={() => alternarFiltro('tipo', 'EBook')} /> EBook
                </label>
                <label className="opcao-filtro">
                    <input type="checkbox" checked={filtrosSelecionados.tipo.includes("Lista de Exercícios")} onChange={() => alternarFiltro('tipo', 'Lista de Exercícios')} /> Lista de Exercícios
                </label>
                <label className="opcao-filtro">
                    <input type="checkbox" checked={filtrosSelecionados.tipo.includes("Resumo")} onChange={() => alternarFiltro('tipo', 'Resumo')} /> Resumo
                </label>
                <label className="opcao-filtro">
                    <input type="checkbox" checked={filtrosSelecionados.tipo.includes("Aulas Práticas")} onChange={() => alternarFiltro('tipo', 'Aulas Práticas')} /> Aulas Práticas
                </label>
            </div>
        </div>
    );
}