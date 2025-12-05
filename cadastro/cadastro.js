async function cadastrar() {
  const nome = document.querySelector("#nome").value.trim();
  const email = document.querySelector("#email").value.trim();
  const senha = document.querySelector("#senha").value;
  const confirmarSenha = document.querySelector("#confirmar_senha").value;

  // Validação básica
  if (!nome || !email || !senha || !confirmarSenha) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem!");
    return;
  }

  try {
    const resposta = await fetch("https://backend-production-ec72d.up.railway.app/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha })
    });

    const dados = await resposta.json();
    alert(dados.mensagem);

    if (dados.sucesso) {
      // Salvar informações no localStorage
      sessionStorage.setItem('usuarioLogado', 'true');
      sessionStorage.setItem('nomeUsuario', nome);
      sessionStorage.setItem('emailUsuario', email);
      sessionStorage.setItem('emailJogador', email);
      
      // Redirecionar para a página inicial
      window.location.href = "../index.html";
    }
  } catch (erro) {
    console.error("Erro no cadastro:", erro);
    alert("Erro ao conectar com o servidor.");
  }
}