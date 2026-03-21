export function FiltrosLateral({ filtrosSelecionados, alternarFiltro }) {
    
    // O nosso "Dicionário" inteligente. 
    // O React só vai ler as listas das disciplinas que estiverem marcadas!
    const bancoDeAssuntos = {
        "Física": ["Cinemática", "Dinâmica", "Ondulatória", "Termometria", "Termodinâmica", "Eletrostática", "Eletrodinâmica", "Física Moderna"],
        "Química": ["Estequiometria", "Termoquímica", "Tabela Periódica", "Química Orgânica"],
        "Biologia": ["Citologia", "Genética", "Ecologia", "Evolução"],
        "Núcleo Integrativo": ["Projeto de Vida", "Protagonismo Juvenil"]
    };

    return (
        <div className="sidebar-filtros">
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: 'var(--cor-texto-principal)' }}>
                Filtros
            </h3>

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
                    <input type="checkbox" checked={filtrosSelecionados.disciplina.includes("Núcleo Integrativo")} onChange={() => alternarFiltro('disciplina', 'Núcleo Integrativo')} /> Núcleo Integrativo
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
                    <input type="checkbox" checked={filtrosSelecionados.tipo.includes("Slides (Teoria)")} onChange={() => alternarFiltro('tipo', 'Slides (Teoria)')} /> Slides (Teoria)
                </label>
                <label className="opcao-filtro">
                    <input type="checkbox" checked={filtrosSelecionados.tipo.includes("PDF (Teoria)")} onChange={() => alternarFiltro('tipo', 'PDF (Teoria)')} /> PDF (Teoria)
                </label>
                <label className="opcao-filtro">
                    <input type="checkbox" checked={filtrosSelecionados.tipo.includes("Listas de Exercícios")} onChange={() => alternarFiltro('tipo', 'Listas de Exercícios')} /> Listas de Exercícios
                </label>
                <label className="opcao-filtro">
                    <input type="checkbox" checked={filtrosSelecionados.tipo.includes("Laboratório (Prática)")} onChange={() => alternarFiltro('tipo', 'Laboratório (Prática)')} /> Laboratório (Prática)
                </label>
            </div>
        </div>
    );
}