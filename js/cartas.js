var cartaConversao;
var chanceEspecial = .1;

function sacar() {
  cartaConversao = Math.round(Math.random() * 4 + 1)

  if (Math.random() <= chanceEspecial) {
    chanceEspecial = .1
    saqueEspecial()
  } else {
    chanceEspecial += .1
  }
}

function saqueEspecial() {
}