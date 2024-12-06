let listaDeNumeroSorteados = [];
let numeroMaximo = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto')
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroMaximo}`)
};

exibirMensagemInicial()

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você acertou o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled')


    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é Menor!');
        } else {
            exibirTextoNaTela('p', 'O número secreto é Maior!');
        }
        tentativas++;
        limparCampo()
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeDeNumerosnaLista = listaDeNumeroSorteados.length;

    if (quantidadeDeNumerosnaLista == numeroMaximo) {
        listaDeNumeroSorteados = [];
    }

    if (listaDeNumeroSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumeroSorteados.push(numeroEscolhido)
        console.log(listaDeNumeroSorteados)
        return numeroEscolhido;
    }

}

function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio()
    limparCampo();
    exibirMensagemInicial()
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
reiniciarJogo();