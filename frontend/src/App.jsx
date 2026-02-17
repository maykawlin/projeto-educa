import { useState, useEffect } from "react";
import axios from 'axios';

import {Navegacao} from './components/Navegacao';
import { Vitrine } from "./components/Vitrine";

// ---------------------------------------------------
// COMPONENTE x: ......
// ---------------------------------------------------
function App() {
  // 1. A memória do App
  const [ paginaAtual, setPaginaAtual ] = useState("loja");
  const [ produtos, setProdutos ] = useState([]);
  const [ carrinho, setCarrinho ] = useState(() => {
    // Tenta ler o carrinho salvo no localStorage
    const dadosSalvos = localStorage.getItem('carrinho');
    // Se tiver dados salvos, retorna eles como um array (JSON.parse)
    // Se não tiver, retorna uma lista vazia
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });
  const [ busca, setBusca ] = useState("");

  // 2. Salva no LocalStorage toda vez que o carrinho mudar
  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }, [carrinho]); // <--- O array de dependência diz: "Vigie a variável carrinho"

  // 3. Função para remover um item do carrinho
  function removerDoCarrinho(indexParaRemover) {
    // O filter cria uma nova lista
    // "index" é a posição do item na lista, (0, 1, 2, 3...)
    // Se a posição for diferente da que quero apagar, o item fica.
    const novaLista = carrinho.filter((item, index) => index !== indexParaRemover);
    setCarrinho(novaLista);
  }

  // 4. Função que simula a finalização da compra
  function finalizarCompra() {
    alert("Compra finalizada! \nTotal: R$ " + total.toFixed(2));

    // 1. Zera o carrinho (Volta a ser uma lista vazia)
    setCarrinho([]); 

    // 2. Manda o usuário de volta para a vitrine da loja
    setPaginaAtual("loja");
  }

  // 5. Calcula o total do carrinho
  // O "Number" garante que o texto "15.00" vire um número 15.00
  const total = carrinho.reduce((soma, item) => soma + Number(item.preco), 0);

  // 6. Busca de dados
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/produtos/')
      .then(response => setProdutos(response.data))
      .catch(erro => console.log("Erro: ", erro))
  }, [])

  // 7. Função que adicona ao carrinho
  function adcionarAoCarrinho(produtoClicado) {
    setCarrinho([...carrinho,produtoClicado]);
  }

  // 8. Renderização/Desenho da tela/ O que aparece para o usuário
  return (
    <div>
      
      <Navegacao
        setPaginaAtual={setPaginaAtual}
        tamanhoCarrinho={carrinho.length}
      />

      <hr />

      {/* Conteúdo da página atual (Renderização Condicional) */}
      <div style={{ padding: '20px'}}>

        { paginaAtual === "loja" ? (

          // OPÇÃO A: Se for a loja, mostrar os produtos
          <Vitrine
            produtos={produtos}
            busca={busca}
            setBusca={setBusca}
            adicionarAoCarrinho={adcionarAoCarrinho}
          />
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