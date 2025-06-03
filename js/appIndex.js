let dados = { categorias: [], sinais: [] };
let slideAtual = 0;
let sinaisFiltrados = [];
let subtitulos = [];

// Codigo de estrada , Transgrecoes e Multas, Sinalizacao, Quiz & Exames, Artigos Favoritos
dados = {
  "categorias": [
    {
      "nome": "Codigo de estrada",
      "url":"home.html",
      "imagem": "imagens/conteudo.png"
    },
    {
      "nome": "Transgrecoes e Multas",
      "url":"userTransgrecoes.html",
      "imagem": "imagens/userTransgrecoes.jpeg"
    }
    ,
    {
      "nome": "Sinalizacao",
      "url":"userSimbols.html",
      "imagem": "imagens/userSimbols.png"
    }
    ,
    {
      "nome": "Quiz & Exames",
      "url":"userQuiz.html",
      "imagem": "imagens/userQuiz.png"
    }
    ,
    {
      "nome": " Artigos Favoritos",
      "url":"favoritos.html",
      "imagem": "imagens/favoritos.png"
    }
  ]
}


mostrarCategorias();

function mostrarCategorias() {
  const container = document.getElementById("categorias");
  container.innerHTML = "";
  dados.categorias.forEach(cat => {
    const div = document.createElement("div");
    const name = cat.nome.replace("_"," ").replace("_"," ").replace("_"," ").replace("_"," ").replace("_"," ");
    div.className = "categoria";
    div.innerHTML = `
      <img src="${cat.imagem}" alt="${cat.nome}" />
      <p>${name}</p>
    `;
    div.onclick = () => selecionarCategoria(cat.url);

    container.appendChild(div);
  });
}

function selecionarCategoria(url) {
 window.location.href = url;
}

