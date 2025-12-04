// salvarTempo.js
// Use este arquivo para salvar o tempo quando o jogo terminar

function salvarTempoNoRanking(tempoMilissegundos) {
    // Verificar se o usuário está logado
    const email = localStorage.getItem('emailJogador');
    
    if (!email) {
        console.log("Usuário não está logado. Não é possível salvar o tempo.");
        return false;
    }
    
    console.log(`Tentando salvar tempo: ${tempoMilissegundos}ms para o usuário: ${email}`);
    
    // Enviar tempo para o backend
    fetch("http://localhost:3333/salvar-tempo", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            email: email,
            tempoFinal: tempoMilissegundos
        })
    })
    .then(resposta => resposta.json())
    .then(dados => {
        console.log("Resposta do servidor:", dados);
        alert(dados.mensagem); // Mostra "Tempo atualizado!" ou "Tempo mantido"
        
        // Opcional: recarregar a página de ranking se estiver nela
        if (window.location.pathname.includes('ranking')) {
            window.location.reload();
        }
    })
    .catch(erro => {
        console.error("Erro ao salvar tempo:", erro);
        alert("Erro ao salvar tempo no ranking. Tente novamente.");
    });
    
    return true;
}

// Exemplo de como usar em qualquer fase do jogo:
// Quando o jogador perde/termina o jogo, calcule o tempo e chame:
// salvarTempoNoRanking(tempoCalculado);

// Para testar manualmente (no console do navegador):
// salvarTempoNoRanking(45000); // Salva 45 segundos