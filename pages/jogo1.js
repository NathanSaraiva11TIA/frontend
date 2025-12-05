// Seleciona elementos
const openBtn = document.getElementById("openPopup"); // botão da porta
const overlay = document.getElementById("popupOverlay"); // fundo escuro
const yesBtn = document.getElementById("yesBtn"); // botão "Sim"
const noBtn = document.getElementById("noBtn");   // botão "Não"

// Abrir pop-up
openBtn.addEventListener("click", () => {
  overlay.style.display = "flex";
});

// Fechar pop-up no botão "Não"
noBtn.addEventListener("click", () => {
  overlay.style.display = "none";
});

// Redirecionar ao clicar em "Sim"
yesBtn.addEventListener("click", () => {
  window.location.href = "../index.html"; // ajuste o link da sua página inicial
});

// Fechar clicando fora da caixa
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.style.display = "none";
  }
});

document.getElementById("btnComecar").addEventListener("click", () => {

    const logado = sessionStorage.getItem("usuarioLogado");

    if (logado !== "true") {
        alert("Você precisa estar logado para iniciar a aventura!");
        window.location.href = "../login/login.html"; 
        return;
    }

    window.location.href = "../pages/jogo2.html";
});
