async function logar() {
  const email = document.querySelector("#email").value.trim();
  const senha = document.querySelector("#senha").value;

  if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
  }

  try {
    const resposta = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
    });

    const dados = await resposta.json();

    if (!dados.sucesso) {
        alert("Email ou senha incorretos!");
        return;
    }

    // Salvar informações no localStorage
    localStorage.setItem('usuarioLogado', 'true');
    localStorage.setItem('nomeUsuario', dados.usuario.nome);
    localStorage.setItem('emailUsuario', email);
    localStorage.setItem('emailJogador', email);
    
    alert("Login realizado com sucesso!");

    // Redirecionar para a página inicial
    window.location.href = "../pages";
    
  } catch (erro) {
    console.error("Erro no login:", erro);
    alert("Erro ao conectar com o servidor.");
  }
}