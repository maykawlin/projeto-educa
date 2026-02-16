import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  // 1. Onde vamos guardar os produtos que chegarem do Django
  const [produtos, setProdutos] = useState([])
  const [carrinho,setCarrinho] = useState([])
  const [busca,setBusca] = useState("")
  const nomeLoja = "Didáticos";

  function adicionarAoCarrinho(produtoClicado){
    setCarrinho([...carrinho,produtoClicado]);
    alert("Você comprou: " + produtoClicado.nome); 
  }

  // 2. O "Gatilho": Executa assim que a tela carrega
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/produtos/')
      .then(response => {
        setProdutos(response.data) // Guarda os dados na caixinha
        console.log("Dados recebidos!", response.data)
      })
      .catch(error => {
        console.error("Deu erro na conexão:", error)
      })
  }, [])



  return (
    <div style={{ padding: '20px'}}>

      {/* Título */}
      <h1 style={{color:'green'}}>{nomeLoja}</h1>


      {/* Input de busca */}
      <input
      type="text"
      placeholder='Buscar curso ...'
      value={busca}
      onChange={ (ev) => setBusca(ev.target.value)}
      style={{ padding: '10px', width: '300px', marginBottom: '20px'}}
      />

      {/* Carrinho */}
      <div
        style={{border: '1px dashed #aaa',
                padding: '10px',
                marginBottom: '20px',
                backgroundColor: '#0c0b0b',
                color: 'white',}}>

        <h3>Meu carrinho ({carrinho.length} itens)</h3>

        <ul style={{ listStyleType: 'none', padding: 0}}>
          {carrinho.map((item,index) => (
            <li 
            key={index} 
            style={{ borderBottom: '1px solid #333', padding: '5px 10px'}}>
              {item.nome} - <span style={{color:'#00ff00'}}>R$ {item.preco}</span>
            </li>
          ))}
        </ul>

        {/* Calculo do total */}
        <div style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '1.2em'}}>
          Total: R$ {carrinho.reduce((total, item) => total + Number(item.preco), 0).toFixed(2)}
        </div>
      </div>


      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>

        {/* 3. O Loop: Para cada produto, cria um cartão */}
        {produtos
          .filter(produto => (produto.nome || "").toLowerCase().includes(busca.toLowerCase()))
          .map(produto => (
            <div key={produto.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', width: '200px' }}>
              
              {/* Tenta mostrar a imagem (se existir) */}
              {produto.imagem && (
                <img src={produto.imagem} alt={produto.nome} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
              )}
              
              {/* Dados */}
              <h3>{produto.nome}</h3>
              <p style={{color:produto.preco >50 ? 'red' : 'green', fontWeight: 'bold'}}>R$ {produto.preco}</p>
              
              {/* Botões */}
              <button 
                onClick={() => adicionarAoCarrinho(produto)}
                style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding:'5px 10px', borderRadius: '4px', cursor: 'pointer'}}
                >
                  Comprar
                </button>

              <button 
                onClick={ () => alert("Detalhes de: " + produto.nome)}
                style={{marginLeft: '10px', backgroundColor: '#444'}}
                >
                  Ver detalhes
                </button>
            </div>
        ))}
        {/* Término da lógica do JavaScript */}

      </div>
    </div>
  )
}

export default App