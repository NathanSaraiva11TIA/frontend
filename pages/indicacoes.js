new Siema({
  loop: true
})



const button = document.querySelector("header button");
const menu = document.querySelector("header ul");

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

