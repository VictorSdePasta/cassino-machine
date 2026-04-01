// ===== CONFIG =====
const BASES = {
  decimal: { base: 10, length: 4, naipe: 'spades', chars: '0123456789' },
  hexadecimal: { base: 16, length: 3, naipe: 'clubs', chars: '0123456789ABCDEF' },
  octal: { base: 8, length: 4, naipe: 'diamonds', chars: '01234567' },
  binario: { base: 2, length: 6, naipe: 'hearts', chars: '01' }
};

const CARTAS_CONVERSAO = [
  'decimal',
  'hexadecimal',
  'octal',
  'binario'
];

// ===== STATE =====
let cartaConversao = '';
let baseAtual = '';
let cartas = [];
let ordemConversao = [];

let chanceEspecial = 0.05;
let comeco = false;
let converteu = false;
let jogoComecou = false;
let novoTurno = false;
let limiteCartas;
let pontuacao = random(1, 9999);

// ===== INIT =====
document.getElementById('divPontuacao').innerHTML = pontuacao;

// ===== HELPERS =====
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChar(chars) {
  return chars[random(0, chars.length - 1)];
}

function getNovaBase(diferenteDe) {
  let nova;
  do {
    nova = CARTAS_CONVERSAO[random(0, 3)];
  } while (nova === diferenteDe);
  return nova;
}

function gerarNumero(base) {
  const cfg = BASES[base];
  let num = '';

  for (let i = 0; i < cfg.length; i++) {
    num += randomChar(cfg.chars);
  }

  return num;
}

function gerarCartas(base, valor) {
  const { naipe } = BASES[base];
  return valor.split('').map(v => `card_${naipe}_${v}.png`);
}

function renderCartas(lista, container, callback) {
  let html = '';

  lista.forEach((carta, i) => {
    html += `
      <div id="campoCarta${container}${i}">
        <input type="checkbox" id="carta${container}${i}">
        <label 
          class="labelCarta"
          for="carta${container}${i}"
          onclick="${callback}('campoCarta${container}${i}', '${carta}')"
        >
          <img 
            src="./css/assets/kenney_playing-cards-pack/PNG/Cards (large)/${carta}" 
            style="height: 15.98vh"
          >
        </label>
      </div>
    `;
  });

  document.getElementById(container).innerHTML = html;
}


// ===== GAME FLOW =====
function sacarConversao(local) {
  if ((local === 'site' && !jogoComecou) || local === 'codigo') {
    jogoComecou = true;

    if (comeco && converteu) {
      baseAtual = cartaConversao;
      converteu = false;
      limitarMao();
    }

    cartaConversao = getNovaBase(cartaConversao);
    renderCartaConversao(cartaConversao);

    if (Math.random() <= chanceEspecial) {
      chanceEspecial = 0.05;
      saqueEspecial();
    } else {
      chanceEspecial += 0.01;
    }

    if (!comeco) saqueInicial();
  }
}

function saqueInicial() {
  comeco = true;

  baseAtual = getNovaBase();
  let numero = gerarNumero(baseAtual);

  cartas = gerarCartas(baseAtual, numero);

  limitarMao();

  renderCartas(cartas, 'mao', 'moverConversao');
}

function moverConversao(id, carta) {
  document.getElementById('divConversor')
    .appendChild(document.getElementById(id));

  ordemConversao.push(carta);

  converter();
}

function converter() {
  novoTurno = true;
  converteu = true;

  let numero = ordemConversao
    .map(c => c[c.length - 5])
    .join('');

  let decimal = parseInt(numero, BASES[baseAtual].base);

  pontuar(decimal);

  let convertido = decimal.toString(BASES[cartaConversao].base).toUpperCase();

  let novasCartas = gerarCartas(cartaConversao, convertido);

  renderCartas(novasCartas, 'divResultadoConversao', 'moverMao');
}

function moverMao(id, carta) {
  if (novoTurno) {
    resetTurno();
    sacarConversao('codigo');
  }

  if (cartas.length < limiteCartas) {
    cartas.push(carta);
    document.getElementById(id).remove();

    renderCartas(cartas, 'mao', 'moverConversao');
  }
}

function resetTurno() {
  document.getElementById('divConversor').innerHTML = '';
  document.getElementById('mao').innerHTML = '';

  novoTurno = false;
  cartas = [];
  ordemConversao = [];
}

// ===== RULES =====
function limitarMao() {
  limiteCartas = {
    decimal: 5,
    binario: 16,
    hexadecimal: 4,
    octal: 6
  }[baseAtual];
}

function pontuar(numero) {
  pontuacao -= numero;
  pontuacao = Math.max(0, pontuacao);

  document.getElementById('divPontuacao').innerHTML = pontuacao;
}

// ===== ESPECIAL =====
function saqueEspecial() {
  let r = Math.random();

  if (r <= 0.05) {
    // 3 cartas especiais
  } else if (r <= 0.2) {
    // nova mão
  } else if (r <= 0.4) {
    // escolher base
  } else if (r <= 0.8) {
    // multiplicador
  } else {
    // max
  }
}

const MISSOES = {
  binario: '',
  decimal: '',
  hexadecimal: '',
  octal: ''
};

function gerarMissao(base) {
  const cfg = BASES[base];
  const tamanho = random(2, cfg.length + 2);

  let valor = '';
  for (let i = 0; i < tamanho; i++) {
    valor += randomChar(cfg.chars);
  }

  // evitar zero
  if (parseInt(valor, cfg.base) === 0) return gerarMissao(base);

  return valor;
}

function inicializarMissoes() {
  Object.keys(MISSOES).forEach(base => {
    MISSOES[base] = gerarMissao(base);
  });

  atualizarUI();
}

function verificarMissao(valor) {
  for (let base in MISSOES) {
    if (valor == MISSOES[base]) {
      pontuacao -= parseInt(valor, BASES[base].base);
      MISSOES[base] = gerarMissao(base);
    }
  }

  atualizarUI();
}

function atualizarUI() {
  document.getElementById('divMissao').innerHTML = `
    Missões <br>
    ${MISSOES.binario} - Bin ♥ <br>
    ${MISSOES.decimal} - Dec ♠ <br>
    ${MISSOES.octal} - Oct ♦ <br>
    ${MISSOES.hexadecimal} - Hex ♣
  `;
}

function renderCartaConversao(base) {
  const mapa = {
    decimal: {
      img: 'convertion_card_decimal.png',
      alt: 'Carta Decimal'
    },
    hexadecimal: {
      img: 'convertion_card_hexa.png',
      alt: 'Carta Hexadecimal'
    },
    octal: {
      img: 'convertion_card_octal.png',
      alt: 'Carta Octal'
    },
    binario: {
      img: 'convertion_card_binario.png',
      alt: 'Carta Binario'
    }
  };

  const carta = mapa[base];

  document.getElementById('divCartaConversao').innerHTML = `
    <img 
      src="./css/assets/Edição imagens/${carta.img}" 
      alt="${carta.alt}" 
      style="height: 15.98vh;"
    >
  `;
}