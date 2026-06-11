import { useEffect } from 'react';

export function Sucesso({ setPaginaAtual }) {
    
    useEffect(() => {
        // Assim que essa tela abre, ela espera 4 segundos e muda para o histórico sozinha!
        const timer = setTimeout(() => {
            setPaginaAtual("historico");
        }, 4000);

        return () => clearTimeout(timer);
    }, [setPaginaAtual]);

    return (
        <div style={{ textAlign: 'center', padding: '100px 20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '50px', margin: '0 0 20px 0' }}>🎉</h1>
            <h2 style={{ color: 'var(--cor-primaria-verde)' }}>Pagamento Confirmado!</h2>
            <p style={{ fontSize: '18px', color: 'var(--cor-texto-secundario)' }}>
                Que legal ter você com a gente! Estamos processando o seu recibo e separando os seus materiais.
            </p>
            <p style={{ marginTop: '30px', fontWeight: 'bold' }}>
                ⏳ Redirecionando automaticamente para os seus materiais...
            </p>
        </div>
    );
}