const button = document.querySelector("header button");
const menu = document.querySelector("header ul");
let lowErrors = Number(localStorage.getItem("lowErrors")) || 0;

// Abrir/fechar menu ao clicar no botão
button.addEventListener("click", (e) => {
  e.stopPropagation(); 
  menu.classList.toggle("show");
});

// Fechar menu ao clicar fora
document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && e.target !== button) {
    menu.classList.remove("show");
  }
});

// Função para carregar ranking
async function carregarRanking() {
  try {
    const resposta = await fetch("https://backend-one-roan-83.vercel.app/ranking");
    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    // backend returns: { sucesso: true, ranking: [...] }
    const data = await resposta.json();
    const ranking = data.ranking;

    const lista = document.querySelector("#ranking");

    if (!ranking || ranking.length === 0) {
      lista.innerHTML =
        '<li class="no-data">Nenhum jogador no ranking ainda. Seja o primeiro!</li>';
      return;
    }

    lista.innerHTML = ranking
      .map((r, index) => `
        <li>
          <span>${index + 1}. ${r.emailUsuario}</span>
          <span>Total de Erros: ${r.lowErrors} | Total de acertos: ${r.scoreTotal}</span>
        </li>
      `)
      .join("");

  } catch (erro) {
    console.error("Erro ao carregar ranking:", erro);
    const lista = document.querySelector("#ranking");
    lista.innerHTML =
      '<li class="error">Erro ao carregar ranking. Tente novamente.</li>';
  }
}


// Função para verificar se usuário está logado
function verificarLogin() {
  const usuarioLogado = sessionStorage.getItem('usuarioLogado');
  const nomeUsuario = sessionStorage.getItem('nomeUsuario');
  
  // Esta função é opcional, apenas se quiser mostrar info do usuário no ranking
  if (usuarioLogado === 'true' && nomeUsuario) {
    console.log("Usuário logado no ranking:", nomeUsuario);
    // Você pode adicionar lógica aqui se quiser
  }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
  verificarLogin();
  carregarRanking();
});