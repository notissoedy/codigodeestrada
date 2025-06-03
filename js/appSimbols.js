let dados = { categorias: [], sinais: [] };
let slideAtual = 0;
let sinaisFiltrados = [];
let subtitulos = [];

dados = {
  "categorias": [
    {
      "nome": "sinais_dos_agentes_reguladores_de_transito",
      "imagem": "data:image/png;base64,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lCU+ADm4Va8IpKu9ucIHIIcL6eqXkOADkLMSiRjfbqhUQvgA5INa9apAuqo1iQ9AjhfSMBA+ADm+EambqHp4xQ8LkGOEbEckot7xRz8qQD6vhmhAAPmExazWefAByLFFhA9A5KzTLD4AIWTy2is/IEAI6a9+PYIHIF8pJAbzfrdHPxlAvmExaxYCFoB82WLWhAXvNSDfN80aLQ/eWEC+U0goEoAQklUlgADkW4TEyGorD4DIv+vtdC24AiITRIAARAQQb4EIICKAiAAiAogIICKAiAAiAogIICICiAggIoCIACICiAggIoCIACICiAggIgKICCAigIgAIgKICCAigIgAIgKIiAAiAogIICKAiAAiAogIICKAiAAiAoiIACICiAggIoCIACICiAggIoCIACIigIgAIgKICCAigIgAIgKICCAigIgAIiKAiAAiAogIICKAiAAiAogIICKAiAggIoCIACICiAggIoCIACICiAggIoCICCAigIgAIgKICCAigIgAIgKICCAigHgLRAARAUQEEBFARAARAUQEEBFARAAREUBEABEBRAQQEUBEABEBRAQQEUBEABERQEQAEQFEBBARQEQAEQFEBBARQEQEEBFARAAR2Sz/CTAAfk+ai6gEJs0AAAAASUVORK5CYII="
    },
    {
      "nome": "perigo_sinais_temporarios",
      "imagem": "data:image/png;base64,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"
    }
  ],
  "sinais": [
    {
      "id": "1747532958708",
      "nome": "Paragem do tráfego que venha da frente",
      "tipo": "sinais_dos_agentes_reguladores_de_transito",
      "descricao": "Paragem do tráfego que venha da frente",
      "imagem": "sinais/sinais_dos_agentes_reguladores_de_transito/685-400x300.png"
    },
    {
      "id": "1747533053997",
      "nome": "Paragem do tráfego que venha da retaguarda.",
      "tipo": "sinais_dos_agentes_reguladores_de_transito",
      "descricao": "Paragem do tráfego que venha da retaguarda.",
      "imagem": "sinais/sinais_dos_agentes_reguladores_de_transito/684-400x300.png"
    },
    {
      "id": "1747533417051",
      "nome": "Paragem do tráfego que venha da frente e da retaguarda.",
      "tipo": "sinais_dos_agentes_reguladores_de_transito",
      "descricao": "Paragem do tráfego que venha da frente e da retaguarda.",
      "imagem": "sinais/sinais_dos_agentes_reguladores_de_transito/Captura de Ecrã (155).png"
    },
    {
      "id": "1747533545536",
      "nome": "Sinal para faser avançar o tráfego De frente",
      "tipo": "sinais_dos_agentes_reguladores_de_transito",
      "descricao": "Sinal para faser avançar o tráfego De frente",
      "imagem": "sinais/sinais_dos_agentes_reguladores_de_transito/686-400x300.png"
    },
    {
      "id": "1747533608563",
      "nome": "Sinal para faser avançar o tráfego Da esquerda",
      "tipo": "sinais_dos_agentes_reguladores_de_transito",
      "descricao": "Sinal para faser avançar o tráfego Da esquerda",
      "imagem": "sinais/sinais_dos_agentes_reguladores_de_transito/687-400x300.png"
    },
    {
      "id": "1747533671175",
      "nome": "Sinal para faser avançar o tráfego Da direita",
      "tipo": "sinais_dos_agentes_reguladores_de_transito",
      "descricao": "Sinal para faser avançar o tráfego Da direita",
      "imagem": "sinais/sinais_dos_agentes_reguladores_de_transito/688-400x300.png"
    },
    {
      "id": "A1",
      "nome": "Trabalhos na estrada",
      "tipo": "perigo_sinais_temporarios",
      "descricao": "Trabalhos na estrada !",
      "imagem": "sinais/perigo_sinais_temporarios/1.png"
    },
    {
      "id": "A2",
      "nome": "Entocamento com estrada com prioridade em T",
      "tipo": "perigo_sinais_temporarios",
      "descricao": "Entocamento com estrada com prioridade em T",
      "imagem": "sinais/perigo_sinais_temporarios/2.png"
    },
    {
      "id": "A3",
      "nome": "Entocamento lateral  à  direita",
      "tipo": "perigo_sinais_temporarios",
      "descricao": "Entocamento lateral  à  direita",
      "imagem": "sinais/perigo_sinais_temporarios/3.png"
    },
    {
      "id": "A4",
      "nome": "Entrocamentos sucessivos primeiro à  direita",
      "tipo": "perigo_sinais_temporarios",
      "descricao": "Entrocamentos sucessivos primeiro à  direita",
      "imagem": "sinais/perigo_sinais_temporarios/4.png"
    },
    {
      "id": "A5",
      "nome": "Entrocamento agudo para esquerda",
      "tipo": "perigo_sinais_temporarios",
      "descricao": "Entrocamento agudo para esquerda",
      "imagem": "sinais/perigo_sinais_temporarios/5.png"
    },
    {
      "id": "A6",
      "nome": "Entrocamento agudo da esquerda",
      "tipo": "perigo_sinais_temporarios",
      "descricao": "Entrocamento agudo da esquerda",
      "imagem": "sinais/perigo_sinais_temporarios/6.png"
    },
    {
      "id": "A7",
      "nome": "Fim da fila à direita",
      "tipo": "perigo_sinais_temporarios",
      "descricao": "Fim da fila à direita",
      "imagem": "sinais/perigo_sinais_temporarios/7.png"
    },
    {
      "id": "A8",
      "nome": "Sinalização luminosa",
      "tipo": "perigo_sinais_temporarios",
      "descricao": "Sinalização luminosa",
      "imagem": "sinais/perigo_sinais_temporarios/8.png"
    },
    {
      "id": "A9",
      "nome": "Paragem obrigatória",
      "tipo": "perigo_sinais_temporarios",
      "descricao": "Paragem obrigatória",
      "imagem": "sinais/perigo_sinais_temporarios/9.png"
    },
    {
      "id": "A10",
      "nome": "Curva a direita",
      "tipo": "perigo_sinais_temporarios",
      "descricao": "Curva a direita",
      "imagem": "sinais/perigo_sinais_temporarios/10.png"
    },
    {
      "id": "A11",
      "nome": "Curva à esquerda e contracurva",
      "tipo": "perigo_sinais_temporarios",
      "descricao": "Curva à esquerda e contracurva",
      "imagem": "sinais/perigo_sinais_temporarios/11.png"
    },
    {
      "id": "A12",
      "nome": "Transito nos dois sentidos",
      "tipo": "perigo_sinais_temporarios",
      "descricao": "Transito nos dois sentidos",
      "imagem": "sinais/perigo_sinais_temporarios/12.png"
    },
    {
      "id": "A13",
      "nome": "Aproximacao de uma estrada com prioridade",
      "tipo": "perigo_sinais_temporarios",
      "descricao": "Aproximacao de uma estrada com prioridade",
      "imagem": "sinais/perigo_sinais_temporarios/13.png"
    },
    {
      "id": "A15",
      "nome": "Paragem obrigatória",
      "tipo": "perigo_sinais_temporarios",
      "descricao": "Paragem obrigatória",
      "imagem": "sinais/perigo_sinais_temporarios/14.png"
    },
    {
      "id": "A16",
      "nome": "Paragem obrigatória",
      "tipo": "perigo_sinais_temporarios",
      "descricao": "Paragem obrigatória",
      "imagem": "sinais/perigo_sinais_temporarios/15.png"
    },
    {
      "id": "A17",
      "nome": "Controlo policial por pirilampos",
      "tipo": "perigo_sinais_temporarios",
      "descricao": "Controlo policial por pirilampos",
      "imagem": "sinais/perigo_sinais_temporarios/16.png"
    },
    {
      "id": "A18",
      "nome": "Visibilidade reduzida",
      "tipo": "perigo_sinais_temporarios",
      "descricao": "Visibilidade reduzida",
      "imagem": "sinais/perigo_sinais_temporarios/17.png"
    },
    {
      "id": "A19",
      "nome": "Congestionamento de tráfego",
      "tipo": "perigo_sinais_temporarios",
      "descricao": "Congestionamento de tráfego",
      "imagem": "sinais/perigo_sinais_temporarios/18.png"
    },
    {
      "id": "A20",
      "nome": "Pavimento escorregadio",
      "tipo": "perigo_sinais_temporarios",
      "descricao": "Pavimento escorregadio",
      "imagem": "sinais/perigo_sinais_temporarios/19.png"
    },
    {
      "id": "A21",
      "nome": "Início de estrada alcatroada",
      "tipo": "perigo_sinais_temporarios",
      "descricao": "Início de estrada alcatroada",
      "imagem": "sinais/perigo_sinais_temporarios/20.png"
    },
    {
      "id": "A22",
      "nome": "Fim da  estrada alcatroada",
      "tipo": "perigo_sinais_temporarios",
      "descricao": "Fim da  estrada alcatroada",
      "imagem": "sinais/perigo_sinais_temporarios/21.png"
    },
    {
      "id": "A23",
      "nome": "Queda de pedras à direita",
      "tipo": "perigo_sinais_temporarios",
      "descricao": "Queda de pedras à direita",
      "imagem": "sinais/perigo_sinais_temporarios/22.png"
    },
    {
      "id": "A24",
      "nome": "Queda de pedras à esquerda",
      "tipo": "perigo_sinais_temporarios",
      "descricao": "Queda de pedras à esquerda",
      "imagem": "sinais/perigo_sinais_temporarios/23.png"
    }
  ]
}


document.getElementById('jsonFile').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      dados = JSON.parse(e.target.result);
      mostrarCategorias();
    } catch (error) {
      alert("Erro ao carregar JSON: " + error.message);
    }
  };
  reader.readAsText(file);
});

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
    div.onclick = () => selecionarCategoria(cat.nome);

    
    container.appendChild(div);
  });
}

function selecionarCategoria(idCategoria) {
  sinaisFiltrados = dados.sinais.filter(s => s.tipo === idCategoria);
  slideAtual = 0;
  atualizarCarrossel();
  document.getElementById("slideshow-container").style.display = "flex";
  showSlides(0);
  show() 

}


function atualizarCarrossel() {
  const slides = document.getElementById("slideshow-container");
  const dots = document.getElementById("dots");
  slides.innerHTML = "";
  dots.innerHTML = "";
  const prev = document.createElement("span");
  const next = document.createElement("span");
  prev.innerHTML = ` <a class="prev" onclick="plusSlides(-1)">&#10094;</a> `;
  next.innerHTML = `<a class="next" onclick="plusSlides(1)">&#10095;</a> `;
    slides.appendChild(prev);
    slides.appendChild(next);

  sinaisFiltrados.forEach((sinal, index) => {
    const div = document.createElement("div");
    const span = document.createElement("span");

    div.className = "mySlides fade" + (index === slideAtual ? " active" : "");
    div.innerHTML = `
      <img src="${sinal.imagem}" alt="${sinal.nome}"/>
      <div class="numbertext">${index+1}/ ${sinaisFiltrados.length}</div>
      <div class="text">${sinal.nome}</div>
    `;
    
    //span.className = "dot";
    span.innerHTML = `
      <span class="dot" onclick="currentSlide(${index+1})"></span>
    `;

    dots.appendChild(span);
    slides.appendChild(div);
  

    subtitulos[index]= sinal.descricao;
  
  });



}


// slider

let slideIndex = 1;
//showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
showSlides(slideIndex = n);
}

function exit() {
   document.getElementById("container").style.display = "block";
   document.getElementById("exit").style.display = "none";
   document.getElementById("slideshow-container").style.display = "none";
   document.getElementById("dots").style.display = "none";
   document.getElementById("subtitle").style.display = "none";
}

function show() {
   document.getElementById("container").style.display = "none";
   document.getElementById("exit").style.display = "block";
   document.getElementById("slideshow-container").style.display = "block";
   document.getElementById("dots").style.display = "block";
   document.getElementById("subtitle").style.display = "block";
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    let stitle = document.getElementById("subtitle");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";

    stitle.textContent=subtitulos[slideIndex-1]
}