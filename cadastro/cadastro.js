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
    const resposta = await fetch("http://localhost:3333/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha })
    });

    const dados = await resposta.json();
    alert(dados.mensagem);

    if (dados.sucesso) {
      // Salvar informações no localStorage
      localStorage.setItem('usuarioLogado', 'true');
      localStorage.setItem('nomeUsuario', nome);
      localStorage.setItem('emailUsuario', email);
      localStorage.setItem('emailJogador', email);
      
      // Redirecionar para a página inicial
      window.location.href = "../pages";
    }
  } catch (erro) {
    console.error("Erro no cadastro:", erro);
    alert("Erro ao conectar com o servidor.");
  }
}