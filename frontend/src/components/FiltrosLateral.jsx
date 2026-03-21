export function FiltrosLateral({ filtrosSelecionados, alternarFiltro }) {
    return (
        <div className="sidebar-filtros">
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: 'var(--cor-texto-principal)' }}>
                Filtros
            </h3>

            {/* Filtro de Nível */}
            <div className="grupo-filtro">
                <h4>Nível de Ensino</h4>
                <label className="opcao-filtro">
                    <input 
                        type="checkbox" 
                        checked={filtrosSelecionados.nivel.includes("Ensino Fundamental II")}
                        onChange={() => alternarFiltro('nivel', 'Ensino Fundamental II')}
                    /> Ensino Fundamental II
                </label>
                <label className="opcao-filtro">
                    <input 
                        type="checkbox" 
                        checked={filtrosSelecionados.nivel.includes("Ensino Médio")}
                        onChange={() => alternarFiltro('nivel', 'Ensino Médio')}
                    /> Ensino Médio
                </label>
            </div>

            {/* Filtro de Disciplina */}
            <div className="grupo-filtro">
                <h4>Disciplina</h4>
                <label className="opcao-filtro">
                    <input 
                        type="checkbox" 
                        checked={filtrosSelecionados.disciplina.includes("Física")}
                        onChange={() => alternarFiltro('disciplina', 'Física')}
                    /> Física
                </label>
                <label className="opcao-filtro">
                    <input 
                        type="checkbox" 
                        checked={filtrosSelecionados.disciplina.includes("Química")}
                        onChange={() => alternarFiltro('disciplina', 'Química')}
                    /> Química
                </label>
                <label className="opcao-filtro">
                    <input 
                        type="checkbox" 
                        checked={filtrosSelecionados.disciplina.includes("Biologia")}
                        onChange={() => alternarFiltro('disciplina', 'Biologia')}
                    /> Biologia
                </label>
                <label className="opcao-filtro">
                    <input 
                        type="checkbox" 
                        checked={filtrosSelecionados.disciplina.includes("Núcleo Integrativo")}
                        onChange={() => alternarFiltro('disciplina', 'Núcleo Integrativo')}
                    /> Núcleo Integrativo
                </label>
            </div>

            {/* Filtro de Assunto */}
            <div className="grupo-filtro">
                <h4>Assunto</h4>
                <p style={{ fontSize: '12px', color: 'var(--cor-texto-secundario)', margin: 0 }}>
                    Selecione uma disciplina primeiro para ver os assuntos.
                </p>
            </div>

            {/* Filtro de Tipo */}
            <div className="grupo-filtro">
                <h4>Tipo de Material</h4>
                <label className="opcao-filtro">
                    <input 
                        type="checkbox" 
                        checked={filtrosSelecionados.tipo.includes("Slides (Teoria)")}
                        onChange={() => alternarFiltro('tipo', 'Slides (Teoria)')}
                    /> Slides (Teoria)
                </label>
                <label className="opcao-filtro">
                    <input 
                        type="checkbox" 
                        checked={filtrosSelecionados.tipo.includes("PDF (Teoria)")}
                        onChange={() => alternarFiltro('tipo', 'PDF (Teoria)')}
                    /> PDF (Teoria)
                </label>
                <label className="opcao-filtro">
                    <input 
                        type="checkbox" 
                        checked={filtrosSelecionados.tipo.includes("Listas de Exercícios")}
                        onChange={() => alternarFiltro('tipo', 'Listas de Exercícios')}
                    /> Listas de Exercícios
                </label>
                <label className="opcao-filtro">
                    <input 
                        type="checkbox" 
                        checked={filtrosSelecionados.tipo.includes("Laboratório (Prática)")}
                        onChange={() => alternarFiltro('tipo', 'Laboratório (Prática)')}
                    /> Laboratório (Prática)
                </label>
            </div>
        </div>
    );
}