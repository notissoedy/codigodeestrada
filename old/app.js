let quizData = [];

document.getElementById("image").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      document.getElementById("preview").src = reader.result;
      document.getElementById("preview").style.display = "block";
      document.getElementById("preview").dataset.image = reader.result;
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById("question-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const question = document.getElementById("question").value;
  const options = [
    document.getElementById("opt0").value,
    document.getElementById("opt1").value,
    document.getElementById("opt2").value,
    document.getElementById("opt3").value
  ];
  const correct = parseInt(document.getElementById("correct").value);
  const image = document.getElementById("preview").dataset.image || null;
  const editIndex = document.getElementById("editIndex").value;

  const newQuestion = { question, image, options, correct };

  if (editIndex === "") {
    quizData.push(newQuestion);
  } else {
    quizData[parseInt(editIndex)] = newQuestion;
  }

  this.reset();
  document.getElementById("preview").style.display = "none";
  document.getElementById("editIndex").value = "";

  renderTable();
});

function renderTable() {
  const tbody = document.querySelector("#quiz-table tbody");
  tbody.innerHTML = "";

  quizData.forEach((q, i) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${q.question}</td>
      <td>${q.image ? '<img src="' + q.image + '" width="80">' : '—'}</td>
      <td><ol>${q.options.map(o => `<li>${o}</li>`).join("")}</ol></td>
      <td>${q.correct}</td>
      <td>
        <button onclick="editQuestion(${i})">✏️ Editar</button>
        <button onclick="deleteQuestion(${i})">🗑️ Apagar</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

function editQuestion(index) {
  const q = quizData[index];
  document.getElementById("question").value = q.question;
  document.getElementById("opt0").value = q.options[0];
  document.getElementById("opt1").value = q.options[1];
  document.getElementById("opt2").value = q.options[2];
  document.getElementById("opt3").value = q.options[3];
  document.getElementById("correct").value = q.correct;
  document.getElementById("editIndex").value = index;

  if (q.image) {
    document.getElementById("preview").src = q.image;
    document.getElementById("preview").style.display = "block";
    document.getElementById("preview").dataset.image = q.image;
  } else {
    document.getElementById("preview").style.display = "none";
  }
}

function deleteQuestion(index) {
  if (confirm("Deseja mesmo apagar esta pergunta?")) {
    quizData.splice(index, 1);
    renderTable();
  }
}

function downloadQuizData() {
  const dataStr = JSON.stringify(quizData, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quiz_codigo_estrada.json";
  a.click();
  URL.revokeObjectURL(url);
}

document.getElementById("import-json").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = JSON.parse(e.target.result);
      if (Array.isArray(data)) {
        quizData = data;
        renderTable();
      } else {
        alert("JSON inválido.");
      }
    } catch (err) {
      alert("Erro ao carregar JSON: " + err.message);
    }
  };
  reader.readAsText(file);
});

renderTable(); // inicialização
