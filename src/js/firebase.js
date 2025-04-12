import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCK6dvPBHfML27nK92MvLtf0R9K89QdJ30",
    authDomain: "laafif-app-5eafb.firebaseapp.com",
    projectId: "laafif-app-5eafb",
    storageBucket: "laafif-app-5eafb.appspot.com",
    messagingSenderId: "589657294527",
    appId: "1:589657294527:web:d7f96d0edcba9305e5680a",
    measurementId: "G-SVKRMWHGHS"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Função para verificar se o username já está em uso
async function isUsernameTaken(username) {
    const q = query(collection(db, "usuarios"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Retorna true se o nome já existir
}

// Função de criação de conta
async function createAccount() {
    const nome = document.getElementById("none").value.trim();
    const genero = document.getElementById("genero").value;
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("sena").value.trim();
    console.log("Senha:", senha);  // Verifique o valor da senha no console
    console.log(nome, genero, username, email, senha);  // Verifique no console se os valores estão sendo capturados corretamente

    const erroMsg = document.getElementById("erroMsg");

    // Limpa a mensagem de erro antes de qualquer verificação
    erroMsg.classList.add("hidden");
    erroMsg.textContent = "";

    // Verifica se todos os campos estão preenchidos
    if (!nome || !genero || !username || !email || !senha) {
        erroMsg.textContent = "Todos os campos devem ser preenchidos.";
        erroMsg.classList.remove("hidden");
        return;
    }

    // Verifica se o username já está em uso
    if (await isUsernameTaken(username)) {
        erroMsg.textContent = "Este username já está em uso. Escolha outro.";
        erroMsg.classList.remove("hidden");
        return;
    }

    // Verifica se a senha tem pelo menos 6 caracteres
    if (senha.length < 6) {
        erroMsg.textContent = "A senha deve ter pelo menos 6 caracteres.";
        erroMsg.classList.remove("hidden");
        return;
    }

    try {
        // Criar usuário com email e senha
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;

        // Salvar dados adicionais no Firestore
        await addDoc(collection(db, "usuarios"), {
            uid: user.uid,
            nome: nome,
            genero: genero,
            username: username,
            email: email
        });

        console.log("Usuário criado com sucesso:", user);
        console.log("Dados salvos no Firestore.");

        // Redirecionar para a página de login após sucesso
        window.location.href = "login.html";
    } catch (error) {
        erroMsg.textContent = error.code === 'auth/email-already-in-use'
            ? "Este e-mail já está em uso. Tente outro."
            : "Erro ao criar conta: " + error.message;
        erroMsg.classList.remove("hidden");
    }
}

function verificarLogin() {
    const logado = localStorage.getItem("login");

    document.querySelectorAll(".spa").forEach(div => div.classList.add("oculto"));

    if (logado === "true") {
        const home = Spa('home');
        if (home) {
            home.classList.remove("oculto");
        }
    } else {
        const entrada = Spa('entrada');
        if (entrada) {
            entrada.classList.remove("oculto");
        }
    }
}


document.addEventListener("DOMContentLoaded", function() {
    const btnAcessar = document.getElementById('btn-acessar');
    if (btnAcessar) {
        btnAcessar.addEventListener('click', function() {
            console.log('Botão clicado!');
            document.querySelectorAll(".spa").forEach(div => div.classList.add("oculto"));

            const login = Spa('login');
            if (login) {
                login.classList.remove("oculto");
            }
        });
    }
});




// Login com Google
document.addEventListener("DOMContentLoaded", function () {
    // Acesso aos elementos
    const googleLoginButton = document.getElementById('googleLogin');
    const facebookLoginButton = document.getElementById('facebookLogin');
    const googleLoginButtonn = document.getElementById('googleLoginn');
    const facebookLoginButtonn = document.getElementById('facebookLoginn');

    // Função para cadastro
    document.getElementById("btnCadastrar").addEventListener("click", createAccount);

    // Login com Google
    googleLoginButton.addEventListener('click', async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Usuário logado com Google:", user);
            localStorage.setItem("login", "true");
            verificarLogin();
        } catch (error) {
            console.error("Erro ao fazer login com Google:", error.message);
            alert(error.message);
        }
    });

    // Login com Facebook
    facebookLoginButton.addEventListener('click', async () => {
        const provider = new FacebookAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Usuário logado com Facebook:", user);
            localStorage.setItem("login", "true");
            verificarLogin();
        } catch (error) {
            console.error("Erro ao fazer login com Facebook:", error.message);
        }
    });

    // Login com Google (segunda instância)
    googleLoginButtonn.addEventListener('click', async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Usuário logado com Google:", user);
            localStorage.setItem("login", "true");
            verificarLogin();
        } catch (error) {
            console.error("Erro ao fazer login com Google:", error.message);
            alert(error.message);
        }
    });

    // Login com Facebook (segunda instância)
    facebookLoginButtonn.addEventListener('click', async () => {
        const provider = new FacebookAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Usuário logado com Facebook:", user);
            localStorage.setItem("login", "true");
            verificarLogin();
        } catch (error) {
            console.error("Erro ao fazer login com Facebook:", error.message);
        }
    });

    const logoutButton = document.getElementById('logoutButton');

    if (logoutButton) {
        // Adicionar o evento de clique no botão de logout
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem("login");
            Spa('entrada')
            console.log("Usuário deslogado com sucesso.");
        });
    } else {
        console.log("Botão de logout não encontrado.");
    }

    // Verificar login ao carregar a página
    verificarLogin();
});


// Adiciona o evento ao botão
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnCadastrar").addEventListener("click", createAccount);
});

onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;
      const lista = document.getElementById("listaResultados");
  
      try {
        const ref = collection(db, "usuarios", uid, "avaliacoes");
        const snapshot = await getDocs(ref);
  
        snapshot.forEach(doc => {
          const data = doc.data();
  
          const item = document.createElement("li");
          item.className = "list-group-item";
  
          const medidas = Object.entries(data.valores || {}).map(
            ([k, v]) => `${k}: ${v}`
          ).join(", ");
  
          item.innerHTML = `<strong>${data.nome}</strong>: ${medidas}`;
          lista.appendChild(item);
        });
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
    } else {
      alert("Você precisa estar logado.");
      // Redireciona para login se quiser:
      // window.location.href = "login.html";
    }
});

let quantidadeTotal = 0;
let pessoaAtual = 1;
let pessoasRegistradas = [];

document.addEventListener("DOMContentLoaded", () => {
    window.comecar = function () {
        quantidadeTotal = parseInt(document.getElementById("quantidadeTotal").value);
        pessoaAtual = 1;
        pessoasRegistradas = [];

        document.getElementById("config-quantidade").style.display = "none";
        document.getElementById("form-pessoa").style.display = "block";
        document.getElementById("numeroPessoa").innerText = pessoaAtual;

        if (quantidadeTotal === 0) {
            document.getElementById("btnFinalizarAgora").style.display = "inline-block";
        }
    };
});

document.getElementById("form-pessoa").addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nomePessoa").value.trim();
    const medidasSelecionadas = [];

    if (document.getElementById("estatura").checked) medidasSelecionadas.push("estatura");
    if (document.getElementById("massa").checked) medidasSelecionadas.push("massa");
    if (document.getElementById("envergadura").checked) medidasSelecionadas.push("envergadura");
    if (document.getElementById("perimetro").checked) medidasSelecionadas.push("perimetro");
    if (document.getElementById("massaCorporal").checked) medidasSelecionadas.push("massaCorporal");
    if (document.getElementById("RCE").checked) medidasSelecionadas.push("RCE");
    if (document.getElementById("sentarAlcancar").checked) medidasSelecionadas.push("sentarAlcancar");
    if (document.getElementById("abdominais").checked) medidasSelecionadas.push("abdominais");
    if (document.getElementById("corrida").checked) medidasSelecionadas.push("corrida");
    if (document.getElementById("medicineBall").checked) medidasSelecionadas.push("medicineBall");
    if (document.getElementById("SaltoHorizontal").checked) medidasSelecionadas.push("SaltoHorizontal");
    if (document.getElementById("testQuadrado").checked) medidasSelecionadas.push("testQuadrado");
    if (document.getElementById("corrida20m").checked) medidasSelecionadas.push("corrida20m");

    if (!nome || medidasSelecionadas.length === 0) {
        alert("Preencha o nome e selecione pelo menos uma medida.");
        return;
    }

    document.getElementById("nomeAtual").innerText = nome;
    const container = document.getElementById("inputsMedidas");
    container.innerHTML = "";

    medidasSelecionadas.forEach(medida => {
        const input = document.createElement("input");
        input.type = "number";
        input.className = "form-control mb-2";
        input.placeholder = `Digite a medida de ${medida}`;
        input.setAttribute("data-tipo", medida);
        container.appendChild(input);
    });

    pessoasRegistradas.push({ nome, medidasSelecionadas, valores: {} });

    document.getElementById("form-pessoa").style.display = "none";
    document.getElementById("form-medidas").style.display = "block";
});

document.getElementById("form-medidas").addEventListener("submit", async function (e) {
    e.preventDefault();

    const inputs = document.querySelectorAll("#inputsMedidas input");
    const pessoa = pessoasRegistradas[pessoaAtual - 1];

    inputs.forEach(input => {
        const tipo = input.getAttribute("data-tipo");
        const valor = parseFloat(input.value);
        pessoa.valores[tipo] = valor;
    });

    const user = auth.currentUser;
    if (user) {
        const pessoaRef = collection(db, "usuarios", user.uid, "avaliacoes");
        await addDoc(pessoaRef, pessoa);
    }

    pessoaAtual++;

    if (quantidadeTotal === 0 || pessoaAtual <= quantidadeTotal) {
        document.getElementById("form-medidas").style.display = "none";
        document.getElementById("form-pessoa").style.display = "block";
        document.getElementById("numeroPessoa").innerText = pessoaAtual;

        document.getElementById("nomePessoa").value = "";
        document.getElementById("estatura").checked = false;
        document.getElementById("massa").checked = false;
        document.getElementById("envergadura").checked = false;
    } else {
        mostrarResultadoFinal();
    }
});

function mostrarResultadoFinal() {
    document.getElementById("form-pessoa").style.display = "none";
    document.getElementById("form-medidas").style.display = "none";
    document.getElementById("resultadoFinal").style.display = "block";

    const lista = document.getElementById("listaResultados");
    lista.innerHTML = "";

    pessoasRegistradas.forEach(pessoa => {
        const item = document.createElement("li");
        item.className = "list-group-item";
        item.innerHTML = `<strong>${pessoa.nome}</strong>: ${Object.entries(pessoa.valores).map(([k, v]) => `${k}: ${v}`).join(", ")}`;
        lista.appendChild(item);
    });
}

document.getElementById("selecionarTodos").addEventListener("change", function() {
    const checkboxes = document.querySelectorAll("#form-pessoa .form-check-input"); // Seleciona todos os checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked; // Marca ou desmarca todos com base no "Selecionar Todos"
    });
});


function continuarRodada() {
    document.getElementById("resultadoFinal").style.display = "none";
    document.getElementById("form-pessoa").style.display = "block";
    document.getElementById("numeroPessoa").innerText = pessoaAtual;
}

function finalizarTudo() {
    alert("Finalizado! Obrigado.");
    location.reload();
}

window.continuarRodada = continuarRodada;
window.finalizarTudo = finalizarTudo;
window.mostrarResultadoFinal = mostrarResultadoFinal;
