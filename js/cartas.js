var cartaConversao;
var chanceEspecial = .05;

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
  } else if (cartaConversao == 4) {
    cartaConversao = 'binario'
    document.getElementById('divCartaConversao').innerHTML=`<img src="./css/assets/Edição imagens/convertion_card_binario.png" alt="Carta Binario" style="height: 15.98vh;">`
  } else {
  }

  if (Math.random() <= chanceEspecial) {
    chanceEspecial = .05
    saqueEspecial()
  } else {
    chanceEspecial += .01
  }
}

function sacar() {
  Math.ceil(Math.random() * 2 - 1) //Sortear numero de 0 a 1
  Math.ceil(Math.random() * 8 - 1) //Sortear numero de 0 a 7
  Math.ceil(Math.random() * 10 - 1) //Sortear numero de 0 a 9
  Math.ceil(Math.random() * 16 - 1) //Sortear numero de 0 a 15
}

function saqueEspecial() {
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