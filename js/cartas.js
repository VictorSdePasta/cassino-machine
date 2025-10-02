let cartaConversao = ''
let baseAtual = ''
let chanceEspecial = .05
let comeco = false
let cartas = []
let converteu = false
let limiteMao
let jogoComecou = false
let limitou = false
let pontuacao = Math.floor(Math.random() * 99999999999999 + 1)
document.getElementById('divPontuacao').innerHTML = pontuacao

function sacarConversao(local) {
  if ((local == 'site' && !jogoComecou) || local == 'codigo') {
    jogoComecou = true
    if (comeco && converteu) {
      baseAtual = cartaConversao
      converteu = false
      limitarMao()
    }

    if (cartaConversao == 'decimal') {
      cartaConversao = Math.ceil(Math.random() * 3 + 1)
    } else if (cartaConversao == 'hexadecimal') {
      cartaConversao = Math.ceil(Math.random() * 3 + 2)
      if (cartaConversao == 5) { cartaConversao = 1 }
    } else if (cartaConversao == 'octal') {
      cartaConversao = Math.ceil(Math.random() * 3)
      if (cartaConversao == 3) { cartaConversao = 4 }
    } else if (cartaConversao == 'binario') {
      cartaConversao = Math.ceil(Math.random() * 3)
    } else {
      cartaConversao = Math.ceil(Math.random() * 4 + 1)
    }

    if (cartaConversao == 1) {
      cartaConversao = 'decimal'
      document.getElementById('divCartaConversao').innerHTML = `<img src="./css/assets/Edição imagens/convertion_card_decimal.png" alt="Carta Decimal" style="height: 15.98vh;">`
    } else if (cartaConversao == 2) {
      cartaConversao = 'hexadecimal'
      document.getElementById('divCartaConversao').innerHTML = `<img src="./css/assets/Edição imagens/convertion_card_hexa.png" alt="Carta Hexadecimal" style="height: 15.98vh;">`
    } else if (cartaConversao == 3) {
      cartaConversao = 'octal'
      document.getElementById('divCartaConversao').innerHTML = `<img src="./css/assets/Edição imagens/convertion_card_octal.png" alt="Carta Octal" style="height: 15.98vh;">`
    } else {
      cartaConversao = 'binario'
      document.getElementById('divCartaConversao').innerHTML = `<img src="./css/assets/Edição imagens/convertion_card_binario.png" alt="Carta Binario" style="height: 15.98vh;">`
    }

    if (Math.random() <= chanceEspecial) {
      chanceEspecial = .05
      saqueEspecial()
    } else {
      chanceEspecial += .01
    }

    if (!comeco) {
      saqueInicial()
    }
  }
}

function saqueInicial() {
  comeco = true

  let saqueIncicial
  if (cartaConversao == 'decimal') {
    saqueIncicial = Math.ceil(Math.random() * 3 + 1)
  } else if (cartaConversao == 'hexadecimal') {
    saqueIncicial = Math.ceil(Math.random() * 3 + 2)
    if (cartaConversao == 5) { cartaConversao = 1 }
  } else if (cartaConversao == 'octal') {
    saqueIncicial = Math.ceil(Math.random() * 3)
    if (cartaConversao == 3) { cartaConversao = 4 }
  } else if (cartaConversao == 'binario') {
    saqueIncicial = Math.ceil(Math.random() * 3)
  } else {
    saqueIncicial = Math.ceil(Math.random() * 4 + 1)
  }

  let numero = ''

  if (saqueIncicial == 1) {
    baseAtual = 'decimal'
    for (let i = 0; i <= 3; i++) {
      numero += Math.ceil(Math.random() * 10 - 1) //Sortear numero de 0 a 9
    }
  } else if (saqueIncicial == 2) {
    baseAtual = 'hexadecimal'
    for (let i = 0; i <= 2; i++) {
      numero += '0123456789ABCDEF'[Math.ceil(Math.random() * 16 - 1)] //Sortear numero de 0 a 15
    }
  } else if (saqueIncicial == 3) {
    baseAtual = 'octal'
    for (let i = 0; i <= 3; i++) {
      numero += Math.ceil(Math.random() * 8 - 1) //Sortear numero de 0 a 7
    }
  } else {
    baseAtual = 'binario'
    for (let i = 0; i <= 5; i++) {
      numero += Math.ceil(Math.random() * 2 - 1) //Sortear numero de 0 a 1
    }
  }

  limitou = true
  limitarMao()
  missao()

  transformarCartas(baseAtual, numero)
  let msg = ``
  for (let i = 0; i < cartas.length; i++) {
    conversoes++
    msg += `<div id="campoCartaMao${i}"><input type="checkbox" id="cartaMao${i}"><label class="labelCarta" for="cartaMao${i}" onclick="moverConversao('campoCartaMao${i}', '${cartas[i]}')"><img src="./css/assets/kenney_playing-cards-pack/PNG/Cards (large)/${cartas[i]}" style="height: 15.98vh"></label></div>`
  };
  document.getElementById('mao').innerHTML = msg
}

function saqueEspecial() {
  let especial = Math.random().toFixed(2)
  if (especial <= .05) {
    // Comprar 3 cartas especiais
  } else if (especial <= .2) {
    // Sacar nova mão
  } else if (especial <= .4) {
    // Escolhe o sistema de conversão
  } else if (especial <= .8) {
    // Multiplica por 2, 5 ou 7
  } else {
    // Valor Máximo
  }
}

function transformarCartas(base, valor) {
  cartas = [];
  if (base == 'decimal') {
    for (let i = 0; i < valor.length - 1;) {
      cartas.push(`card_spades_${valor[i]}.png`)
      i++
    }
  } else if (base == 'hexadecimal') {
    for (let i = 0; i < valor.length - 1;) {
      cartas.push(`card_clubs_${valor[i]}.png`)
      i++
    }
  } else if (base == 'octal') {
    for (let i = 0; i < valor.length - 1;) {
      cartas.push(`card_diamonds_${valor[i]}.png`)
      i++
    }
  } else {
    for (let i = 0; i < valor.length - 1;) {
      cartas.push(`card_hearts_${valor[i]}.png`)
      i++
    }
  }
}

let ordemConversao = []
let conversoes = 0

function moverConversao(elementoCarta, carta) {
  let cartaAMover = document.getElementById(`${elementoCarta}`)
  let destino = document.getElementById(`divConversor`)
  destino.appendChild(cartaAMover)

  let limiteMaximo = conversoes

  if (ordemConversao.length < limiteMaximo) {
    ordemConversao.push(carta)
  } else {
    ordemConversao.shift()
    ordemConversao.push(carta)
  }

  limitou = true
  converter()
}

function converter() {
  novoTurno = true
  converteu = true

  let numeroAConverter = ''
  let numeroConvertido = ''
  let msg = ``
  for (let i = 0; i <= ordemConversao.length - 1; i++) {
    let caracter = ordemConversao[i].length - 5
    numeroAConverter += `${ordemConversao[i][caracter]}`
  };

  let decimalValue = parseInt(numeroAConverter, baseAtual === 'hexadecimal' ? 16 : baseAtual === 'octal' ? 8 : baseAtual === 'binario' ? 2 : 10);

  pontuar(decimalValue, baseAtual, cartaConversao)

  if (cartaConversao == 'decimal') {
    numeroConvertido = `${decimalValue}`;
  } else if (cartaConversao == 'hexadecimal') {
    numeroConvertido = `${decimalValue.toString(16).toUpperCase()}`;
  } else if (cartaConversao == 'octal') {
    numeroConvertido = `${decimalValue.toString(8)}`;
  } else if (cartaConversao == 'binario') {
    numeroConvertido = `${decimalValue.toString(2)}`;
  }

  missao(numeroAConverter)
  missao(numeroConvertido)

  let novasCartas = []

  for (let i = 0; i <= numeroConvertido.length - 1; i++) {
    if (cartaConversao == 'decimal') {
      novasCartas.push(`card_spades_${numeroConvertido[i]}.png`)
    } else if (cartaConversao == 'hexadecimal') {
      novasCartas.push(`card_clubs_${numeroConvertido[i]}.png`)
    } else if (cartaConversao == 'octal') {
      novasCartas.push(`card_diamonds_${numeroConvertido[i]}.png`)
    } else if (cartaConversao == 'binario') {
      novasCartas.push(`card_hearts_${numeroConvertido[i]}.png`)
    }
  }

  for (let i = 0; i <= numeroConvertido.length - 1; i++) {
    msg += `<div id="campoCartaConvertido${i}"><input type="checkbox" id="cartaConvertida${i}"><label class="labelCarta" for="cartaConvertida${i}" onclick="moverMao('campoCartaConvertido${i}', '${novasCartas[i]}')"><img src="./css/assets/kenney_playing-cards-pack/PNG/Cards (large)/${novasCartas[i]}" style="height: 15.98vh"></label></div>`
  }
  document.getElementById('divResultadoConversao').innerHTML = msg
}

let novoTurno = false

function moverMao(eliminar, carta) {
  if (novoTurno) {
    document.getElementById(`divConversor`).innerHTML = ``
    document.getElementById(`mao`).innerHTML = ``
    novoTurno = false
    cartas = []
    ordemConversao = []

    sacarConversao('codigo')
  }

  if (cartas.length < limiteCartas) {
    cartas.push(carta)
    document.getElementById(`${eliminar}`).remove()

    let msg = ``
    for (let i = 0; i < cartas.length; i++) {
      conversoes++
      msg += `<div id="campoCartaMao${i}"><input type="checkbox" id="cartaMao${i}"><label class="labelCarta" for="cartaMao${i}" onclick="moverConversao('campoCartaMao${i}', '${cartas[i]}')"><img src="./css/assets/kenney_playing-cards-pack/PNG/Cards (large)/${cartas[i]}" style="height: 15.98vh"></label></div>`
    };
    document.getElementById('mao').innerHTML = msg
  }
}

let limiteCartas

function limitarMao() {
  if (limitou) {
    limitou = false
    limiteCartas = (baseAtual === 'decimal' ? 5 : baseAtual === 'binario' ? 16 : baseAtual === 'hexadecimal' ? 4 : 6)
  }
}

let missaoBin = ''
let missaoDec = ''
let missaoHex = ''
let missaoOct = ''

function missao(valor) {
  if (valor == missaoBin) {
    pontuacao += missaoBin
    let algarBin = Math.ceil(Math.random() * 8 - 1)
    console.log(algarBin)
    for (let i = 0; i <= algarBin; i++) {
      missaoBin += Math.ceil(Math.random() * 2 - 1) //Sortear numero de 0 a 1
      console.log(missaoBin)
    }
    missaoBin = `${missaoBin / 1}`
  } else if (valor == missaoDec) {
    pontuacao += missaoDec
    let algarDec = Math.ceil(Math.random() * 6 - 1)
    console.log(algarDec)
    for (let i = 0; i <= algarDec; i++) {
      missaoDec += Math.ceil(Math.random() * 10 - 1) //Sortear numero de 0 a 9
      console.log(missaoDec)
    }
    missaoDec = `${missaoDec / 1}`
  } else if (valor == missaoHex) {
    pontuacao += missaoHex
    let algarHex = Math.ceil(Math.random() * 5 - 1)
    console.log(algarHex)
    for (let i = 0; i <= algarHex; i++) {
      missaoHex += '0123456789ABCDEF'[Math.ceil(Math.random() * 16 - 1)] //Sortear numero de 0 a 15
    }
  } else if (valor == missaoOct) {
    pontuacao += missaoOct
    let algarOct = Math.ceil(Math.random() * 5 - 1)
    console.log(algarOct)
    for (let i = 0; i <= algarOct; i++) {
      missaoOct += Math.ceil(Math.random() * 8 - 1) //Sortear numero de 0 a 7
    }
    missaoOct = `${missaoOct / 1}`
  } else if (missaoBin == '') {
    let algarBin = Math.ceil(Math.random() * 8 - 1)
    for (let i = 0; i <= algarBin; i++) {
      missaoBin += Math.ceil(Math.random() * 2 - 1) //Sortear numero de 0 a 1
    }
    let algarDec = Math.ceil(Math.random() * 6 - 1)
    for (let i = 0; i <= algarDec; i++) {
      missaoDec += Math.ceil(Math.random() * 10 - 1) //Sortear numero de 0 a 9
    }
    let algarHex = Math.ceil(Math.random() * 5 - 1)
    for (let i = 0; i <= algarHex; i++) {
      missaoHex += '0123456789ABCDEF'[Math.ceil(Math.random() * 16 - 1)] //Sortear numero de 0 a 15
    }
    let algarOct = Math.ceil(Math.random() * 5 - 1)
    for (let i = 0; i <= algarOct; i++) {
      missaoOct += Math.ceil(Math.random() * 8 - 1) //Sortear numero de 0 a 7
    }

    missaoBin = `${(missaoBin / 1) == 0 ? 1 : (missaoBin / 1)}`
    missaoDec = `${(missaoDec / 1) == 0 ? 1 : (missaoDec / 1)}`
    missaoOct = `${(missaoOct / 1) == 0 ? 1 : (missaoOct / 1)}`
    missaoHex = `${(missaoHex) === '0' ? '1' : (missaoHex)}`
  }

  document.getElementById('divMissao').innerHTML = `
   Missões <br> Faça os números: <br>
    ${missaoBin} - Bin ♥ <br>
    ${missaoDec} - Dec ♠ <br>
    ${missaoOct} - Oct ♦ <br>
    ${missaoHex} - Hex ♣
  `
}

function pontuar(numero, base, conversao) {
  let pontos = numero

  let lista

  if (base == 'hexadecimal') {
    lista = ['hexadecimal', 'binario', 'decimal', 'octal']
  } else if (base == 'decimal') {
    lista = ['decimal', 'octal', 'hexadecimal', 'binario']
  } else if (base == 'binario') {
    lista = ['binario', 'hexadecimal', 'octal', 'decimal']
  } else if (base == 'octal') {
    lista = ['octal', 'decimal', 'binario', 'hexadecimal']
  }

  let mult = Number(lista.indexOf(base) - lista.indexOf(conversao))

  if (mult < 0) {
    mult *= -1
  }

  pontuacao -= pontos * Math.floor(1 + (mult / 100))

  if (pontuacao <= 0) {
    pontuacao = 0
  }

  document.getElementById('divPontuacao').innerHTML = pontuacao
}