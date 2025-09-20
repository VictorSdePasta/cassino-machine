var cartaConversao;
var chanceEspecial = .05;
var comeco = false;

function sacarConversao() {
  if (cartaConversao == 'decimal') {
    cartaConversao = Math.ceil(Math.random() * 3 + 1)
  } else if (cartaConversao == 'hexadecimal') {
    cartaConversao = Math.ceil(Math.random() * 3 + 2)
    if (cartaConversao == 5) {cartaConversao=1}
  } else if (cartaConversao == 'octal') {
    cartaConversao = Math.ceil(Math.random() * 3)
    if (cartaConversao == 3) {cartaConversao=4}
  } else if (cartaConversao == 'binario') {
    cartaConversao = Math.ceil(Math.random() * 3)
  } else {
    cartaConversao = Math.ceil(Math.random() * 4 + 1)
  }

  if (cartaConversao == 1) {
    cartaConversao = 'decimal'
    document.getElementById('divCartaConversao').innerHTML=`<img src="./css/assets/Edição imagens/convertion_card_decimal.png" alt="Carta Decimal" style="height: 15.98vh;">`
  } else if (cartaConversao == 2) {
    cartaConversao = 'hexadecimal'
    document.getElementById('divCartaConversao').innerHTML=`<img src="./css/assets/Edição imagens/convertion_card_hexa.png" alt="Carta Hexadecimal" style="height: 15.98vh;">`
  } else if (cartaConversao == 3) {
    cartaConversao = 'octal'
    document.getElementById('divCartaConversao').innerHTML=`<img src="./css/assets/Edição imagens/convertion_card_octal.png" alt="Carta Octal" style="height: 15.98vh;">`
  } else {
    cartaConversao = 'binario'
    document.getElementById('divCartaConversao').innerHTML=`<img src="./css/assets/Edição imagens/convertion_card_binario.png" alt="Carta Binario" style="height: 15.98vh;">`
  }

  if (Math.random() <= chanceEspecial) {
    chanceEspecial = .05
    saqueEspecial()
  } else {
    chanceEspecial += .01
  }

  if(!comeco) {
    saqueInicial()
  }
}

function saqueInicial() {
  comeco = true
  var saqueIncicial = Math.ceil(Math.random() * 4 + 1)
  var numero = ''
  var base = ''

  if (saqueIncicial == 1) {
    base = 'decimal'
    for (var i=0; i<=3; i++) {
      numero += Math.ceil(Math.random() * 10 - 1) //Sortear numero de 0 a 9
    }
  } else if (saqueIncicial == 2) {
    base = 'hexadecimal'
    for (var i=0; i<=2; i++) {
      numero += '0123456789ABCDEF'[Math.ceil(Math.random() * 16 - 1)] //Sortear numero de 0 a 15
    }
  } else if (saqueIncicial == 3) {
    base = 'octal'
    for (var i=0; i<=3; i++) {
      numero += Math.ceil(Math.random() * 8 - 1) //Sortear numero de 0 a 7
    }
  } else {
    base = 'binario'
    for (var i=0; i<=5; i++) {
      numero += Math.ceil(Math.random() * 2 - 1) //Sortear numero de 0 a 1
    }
  }

  var msg = ``
  var cartas = transformarCartas(base, numero)
  for (var i=0; i<cartas.length;i++) {
    msg += `<input type="checkbox" id="cartaMao${i}"><label class="labelCarta" for="cartaMao${i}"><img src="./css/assets/kenney_playing-cards-pack/PNG/Cards (large)/${cartas[i]}" style="height: 15.98vh"></label>`
  };
  document.getElementById('mao').innerHTML = msg
}

function saqueEspecial(lista, numero) {
  var especial = Math.random().toFixed(2)
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
  var cartas = [];
  if (base == 'decimal') {
    for (var i=0; i<valor.length-1;) {
      cartas.push(`card_spades_${valor[i]}.png`)
      i++
    }
  } else if (base=='hexadecimal') {
    for (var i=0; i<valor.length-1;) {
      cartas.push(`card_clubs_${valor[i]}_hexa.png`)
      i++
    }
  } else if (base=='octal') {
    for (var i=0; i<valor.length-1;) {
      cartas.push(`card_diamonds_${valor[i]}.png`)
      i++
    }
  } else {
    for (var i=0; i<valor.length-1;) {
      cartas.push(`card_hearts_${valor[i]}.png`)
      i++
    }
  }
  return cartas
}