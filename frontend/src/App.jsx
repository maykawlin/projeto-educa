import { useState, useEffect } from "react";
import axios from 'axios';

// ---------------------------------------------------
// COMPONENTE x: ......
// ---------------------------------------------------
function App() {
  // 1. A memória do App
  const [ paginaAtual, setPaginaAtual ] = useState("loja");
  const [ produtos, setProdutos ] = useState([]);
  const [ carrinho, setCarrinho ] = useState([]);
  const [ busca, setBusca ] = useState("");

  // 2. Função para remover um item do carrinho
  function removerDoCarrinho(indexParaRemover) {
    // O filter cria uma nova lista
    // "index" é a posição do item na lista, (0, 1, 2, 3...)
    // Se a posição for diferente da que quero apagar, o item fica.
    const novaLista = carrinho.filter((item, index) => index !== indexParaRemover);
    setCarrinho(novaLista);
  }

  // Função que simula a finalização da compra
  function finalizarCompra() {
    alert("Compra finalizada! \nTotal: R$ " + total.toFixed(2));

    // 1. Zera o carrinho (Volta a ser uma lista vazia)
    setCarrinho([]); 

    // 2. Manda o usuário de volta para a vitrine da loja
    setPaginaAtual("loja");
  }

  // 3. Calcula o total do carrinho
  // O "Number" garante que o texto "15.00" vire um número 15.00
  const total = carrinho.reduce((soma, item) => soma + Number(item.preco), 0);

  // 4. Busca de dados
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/produtos/')
      .then(response => setProdutos(response.data))
      .catch(erro => console.log("Erro: ", erro))
  }, [])

  // 5. Renderização/Desenho da tela/ O que aparece para o usuário
  return (
    <div>
      {/* Menu de navegação */}
      <nav style={{ background: '#111', padding: '20px', color: 'white', display: 'flex', justifyContent: 'space-between' }}>

        {/* Botão para ir para a Loja */}
        <h2 onClick={ () => setPaginaAtual("loja") } style={{ cursor: 'pointer' }}>
          Didáticos
        </h2>

        {/* Botão para ir para o carrinho */}
        <button onClick={ () => setPaginaAtual("carrinho") }>
          Carrinho ({ carrinho.length })
        </button>

      </nav>

      <hr />

      {/* Conteúdo da página atual (Renderização Condicional) */}
      <div style={{ padding: '20px'}}>

        { paginaAtual === "loja" ? (

          // OPÇÃO A: Se for a loja, mostrar os produtos
          <div>
            <h3>Vitrine de Produtos</h3>
            {/* Campo busca) */}
            <input
              type="text"
              placeholder="Buscar..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              style={{ padding: '10px', width: '100%', marginBottom: '20px' }}
            />

            {produtos
              .filter(p => (p.titulo || "").toLowerCase().includes(busca.toLowerCase())) // filtrar os produtos pela busca
              .map(produto => ( // para cada produto, mostrar um card)
              <div key={produto.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px'}}>
                {/* imagem do produto) */}
                {produto.imagem_capa && ( 
                  <img 
                    src={produto.imagem_capa}
                    alt={produto.titulo}
                    style={{ width: '100%', height: '150px', objectFit: 'cover', marginBottom: '10px' }}
                  />
                )}
                {/* Título do produto) */}
                <p>{produto.titulo} - R$ {produto.preco}</p>
                {/* Botão de compra do produto) */}
                <button onClick={() => setCarrinho([...carrinho, produto])}>
                  Comprar
                </button>
              </div>
              
            ))}
          </div>
          ) : (
          // OPÇÃO B: Se for o carrinho, mostrar os itens do carrinho
          <div>
            <h3>Seu Carrinho de Compras</h3>

            {/* Se o carrinho estiver vazio, mostrar uma mensagem */}
            {carrinho.length === 0 ? (
              <p>Seu carrinho está vazio. Volte para a loja!</p>
            ) : (
              <div>
                {carrinho.map((item, index) => (
                  <div key={index} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px'}}>
                    
                    {/* Esquerda: Dados do produto */}
                    <div>
                      <p style={{ fontWeight: 'bold'}}>{item.titulo}</p>
                      <p>R$ {item.preco}</p>
                    </div>

                    {/* Direita: Botão de Excluir */}
                    <button 
                      onClick={ () => removerDoCarrinho(index)}
                      style={{backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor:'pointer'}}
                      >
                      Excluir
                    </button>

                  </div>
                ))}

                {/* Total do carrinho) */}
                <div style={{ marginTop: '20px', fontSize: '20px', fontWeight: 'bold'}}>
                  Total: R$ {total.toFixed(2)}
                </div>
            
              </div>
            )}
            
            {/* Botão que simula finalizar compra */}
            <button
              onClick={finalizarCompra}
              style={{
                display:'block',
                width: '100%',
                padding: '15px',
                color:'white',
                border:'none',
                marginTop: '20px',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 'bold',
              }}>
              ✅ Finalizar Compra
            </button>
            
            <button onClick={() => setPaginaAtual("loja")} style={{ marginTop: '20px' }}>
              ⬅️ Voltar para a Loja
            </button>
         
        </div>  
      )}   
      </div>
    </div>
  );
}

export default App; 