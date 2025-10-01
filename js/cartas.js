let cartaConversao = ''
let baseAtual = ''
let chanceEspecial = .05
let comeco = false
let cartas = []
let converteu = false
let limiteMao

function sacarConversao() {
  if (comeco && converteu) {
    baseAtual = cartaConversao
    converteu = false
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

  if (cartaConversao == 'decimal') {
    numeroConvertido = `${decimalValue}`;
  } else if (cartaConversao == 'hexadecimal') {
    numeroConvertido = `${decimalValue.toString(16).toUpperCase()}`;
  } else if (cartaConversao == 'octal') {
    numeroConvertido = `${decimalValue.toString(8)}`;
  } else if (cartaConversao == 'binario') {
    numeroConvertido = `${decimalValue.toString(2)}`;
  }

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
  }

  let limiteCartas = cartaConversao == 'decimal' ? 5 : cartaConversao == 'binario' ? 16 : cartaConversao == 'hexadecimal' ? 4 : 6
  
  if (cartas.length<limiteCartas) {
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