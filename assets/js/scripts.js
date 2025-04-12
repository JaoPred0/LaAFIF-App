const formEscolha = document.getElementById('form-escolha');
    const formDados = document.getElementById('form-dados');
    const inputsDinamicos = document.getElementById('inputs-dinamicos');
    const resumo = document.getElementById('resumo');
    const listaResumo = document.getElementById('lista-resumo');
    const resultadoFinal = document.getElementById('resultado-final');
    const listaFinal = document.getElementById('lista-final');

    let dadosSelecionados = [];

    formEscolha.addEventListener('submit', function (e) {
      e.preventDefault();
      inputsDinamicos.innerHTML = "";
      dadosSelecionados = [];

      ['estatura', 'massa', 'envergadura'].forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox.checked) {
          dadosSelecionados.push(id);
          const label = checkbox.nextElementSibling.textContent;
          inputsDinamicos.innerHTML += `
            <div class="mb-3">
              <label for="${id}_input" class="form-label">${label}</label>
              <input type="number" step="any" class="form-control" id="${id}_input" required />
            </div>`;
        }
      });

      if (dadosSelecionados.length === 0) {
        alert("Selecione ao menos uma medida!");
        return;
      }

      formEscolha.style.display = "none";
      formDados.style.display = "block";
    });

    formDados.addEventListener('submit', function (e) {
      e.preventDefault();
      listaResumo.innerHTML = "";
      dadosSelecionados.forEach(id => {
        const valor = document.getElementById(`${id}_input`).value;
        const label = document.querySelector(`label[for="${id}_input"]`).textContent;
        listaResumo.innerHTML += `<li class="list-group-item">${label}: <strong>${valor}</strong></li>`;
      });

      formDados.style.display = "none";
      resumo.style.display = "block";
    });

    function editar() {
      resumo.style.display = "none";
      formDados.style.display = "block";
    }

    function confirmar() {
      const dadosFinal = {};
      listaFinal.innerHTML = "";

      dadosSelecionados.forEach(id => {
        const valor = document.getElementById(`${id}_input`).value;
        dadosFinal[id] = valor;

        const label = document.querySelector(`label[for="${id}_input"]`).textContent;
        listaFinal.innerHTML += `<li class="list-group-item">${label}: <strong>${valor}</strong></li>`;
      });

      localStorage.setItem("medidas", JSON.stringify(dadosFinal));

      resumo.style.display = "none";
      resultadoFinal.style.display = "block";
    }

    function reiniciar() {
      formEscolha.reset();
      document.getElementById("form-dados").reset();
      listaResumo.innerHTML = "";
      listaFinal.innerHTML = "";
      formEscolha.style.display = "block";
      formDados.style.display = "none";
      resumo.style.display = "none";
      resultadoFinal.style.display = "none";
    }
