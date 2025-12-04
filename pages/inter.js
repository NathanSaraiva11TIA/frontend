// Função para scroll suave
function smoothScroll(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Adiciona event listeners para todos os links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        if (targetId) {
            smoothScroll(targetId);
        }
    });
});

// Seu código existente para o menu
const button = document.querySelector("header button");
const menu = document.querySelector("header ul");

// Abrir/fechar menu ao clicar no botão
button.addEventListener("click", (e) => {
    e.stopPropagation(); 
    menu.classList.toggle("show");
});