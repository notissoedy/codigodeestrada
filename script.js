let data = {
  sinais: {
    perigo_sinais_temporarios: {
      id: "perigo_sinais_temporarios",
      informacao: [
        { id: "1", significado: "Trabalhos na estrada", imagem: "sinais/perigo_sinais_temporarios/1.png" },
        { id: "2", significado: "Entroncamentos com estrada com prioridade em T", imagem: "sinais/perigo_sinais_temporarios/2.png" },
        // ... outros
      ],
    },
    proibicao_sinais_temporarios: {
      id: "proibicao_sinais_temporarios",
      informacao: [
        { id: "62", significado: "Proibição a velocidade de 60 km/h", imagem: "sinais/proibicao_sinais_temporarios/62.png" },
        { id: "63", significado: "Trânsito proibido a veículos de peso total superior a 12t", imagem: "sinais/proibicao_sinais_temporarios/63.png" },
        // ... outros
      ],
    },
    // outras categorias...
  },
};

data = allData;

let categoriaAtual = "todos";
let termosBusca = "";
let paginaAtual = 1;
const sinaisPorPagina = 8;

function formatarTitulo(id) {
  return id.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function criarBotaoFiltros() {
  const container = document.getElementById("filter-buttons");
  container.innerHTML = "";
  const categorias = ["todos", ...Object.keys(data.sinais)];

  categorias.forEach((categoria) => {
    const btn = document.createElement("button");
    btn.textContent = categoria === "todos" ? "Todos" : formatarTitulo(categoria);
    btn.className = "filter-btn";
    btn.onclick = () => {
      categoriaAtual = categoria;
      paginaAtual = 1;
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderSinais();
    };
    container.appendChild(btn);
  });
}

function filtrarSinais() {
  let sinais = [];

  for (const cat in data.sinais) {
    if (categoriaAtual !== "todos" && categoriaAtual !== cat) continue;
    sinais = sinais.concat(data.sinais[cat].informacao);
  }

  return sinais.filter(sinal =>
    sinal.significado.toLowerCase().includes(termosBusca.toLowerCase())
  );
}

function renderSinais() {
  const container = document.getElementById("container");
  container.innerHTML = "";

  const sinaisFiltrados = filtrarSinais();
  const totalPaginas = Math.ceil(sinaisFiltrados.length / sinaisPorPagina);
  const sinaisDaPagina = sinaisFiltrados.slice(
    (paginaAtual - 1) * sinaisPorPagina,
    paginaAtual * sinaisPorPagina
  );

  const grid = document.createElement("div");
  grid.className = "grid";

  sinaisDaPagina.forEach((sinal) => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = sinal.imagem;
    img.alt = sinal.significado;
    img.onclick = () => mostrarModal(sinal.imagem, sinal.significado);

    const desc = document.createElement("div");
    desc.className = "description";
    desc.textContent = sinal.significado;

    card.appendChild(img);
    card.appendChild(desc);
    grid.appendChild(card);
  });

  container.appendChild(grid);
  renderPaginacao(totalPaginas);

  configurarSwipeGestures();
}

function renderPaginacao(totalPaginas) {
  const container = document.getElementById("container");

  const paginacao = document.createElement("div");
  paginacao.className = "pagination";

  const criarBotao = (texto, onClick, desabilitado = false) => {
    const btn = document.createElement("button");
    btn.textContent = texto;
    btn.className = "nav-btn";
    btn.disabled = desabilitado;
    btn.onclick = onClick;
    paginacao.appendChild(btn);
  };

  // Botão Anterior
  criarBotao("«", () => {
    if (paginaAtual > 1) {
      paginaAtual--;
      renderSinais();
    }
  }, paginaAtual === 1);

  const mostrarPagina = (i) => {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = "page-btn";
    if (i === paginaAtual) btn.classList.add("active");

    btn.onclick = () => {
      paginaAtual = i;
      renderSinais();
    };
    paginacao.appendChild(btn);
  };

  const limiteVizinho = 2;

  for (let i = 1; i <= totalPaginas; i++) {
    if (
      i === 1 || i === totalPaginas ||
      (i >= paginaAtual - limiteVizinho && i <= paginaAtual + limiteVizinho)
    ) {
      mostrarPagina(i);
    } else if (
      i === paginaAtual - limiteVizinho - 1 ||
      i === paginaAtual + limiteVizinho + 1
    ) {
      const dots = document.createElement("span");
      dots.textContent = "...";
      paginacao.appendChild(dots);
    }
  }

  // Botão Próxima
  criarBotao("»", () => {
    if (paginaAtual < totalPaginas) {
      paginaAtual++;
      renderSinais();
    }
  }, paginaAtual === totalPaginas);

  container.appendChild(paginacao);
}



function mostrarModal(src, descricao) {
  const modal = document.getElementById("modal");
  document.getElementById("modal-img").src = src;
  document.getElementById("modal-desc").textContent = descricao;
  modal.classList.remove("hidden");
}

document.getElementById("modal-close").onclick = () => {
  document.getElementById("modal").classList.add("hidden");
};

document.getElementById("search-input").addEventListener("input", (e) => {
  termosBusca = e.target.value;
  paginaAtual = 1;
  renderSinais();
});

document.addEventListener("DOMContentLoaded", () => {
  criarBotaoFiltros();
  renderSinais();
});


function configurarSwipeGestures() {
  let touchStartX = 0;
  let touchEndX = 0;

  const zonaSwipe = document.getElementById("sinais");

  zonaSwipe.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  zonaSwipe.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
  });

  function handleSwipeGesture() {
    const deltaX = touchEndX - touchStartX;
    const minDist = 50; // mínimo para considerar swipe

    if (Math.abs(deltaX) < minDist || window.innerWidth > 768) return;

    if (deltaX > 0 && paginaAtual > 1) {
      // Swipe para a direita (voltar)
      paginaAtual--;
      renderSinais();
    } else if (deltaX < 0 && paginaAtual < totalPaginasGlobais) {
      // Swipe para a esquerda (avançar)
      paginaAtual++;
      renderSinais();
    }
  }
}
