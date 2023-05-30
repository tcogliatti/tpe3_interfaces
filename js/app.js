"use strict"
let contenedor = document.querySelector('#contenedor');
let methScore = document.querySelector('#methScore');
let moneyScore = document.querySelector('#moneyScore');
let timeScore = document.querySelector('#timeScore');
let lifeBar = document.querySelector('#lifeBarInside');
let personaje = document.querySelector('#personaje');

let farMountain = document.querySelector('#farMountain');
let flatMountain = document.querySelector('#flatMountain');
let stones1 = document.querySelector('#stones1');
let stones2 = document.querySelector('#stones2');
let stones3 = document.querySelector('#stones3');
let stones4 = document.querySelector('#stones4');
let ground = document.querySelector('#ground');
let cielo = document.querySelector('#cielo');
let piso = document.querySelector('#piso');

let beginScreen     = document.querySelector('#beginScreen');
let startScreen     = document.querySelector('#startScreen');
let explanations    = document.querySelector('#explanations');
let gameOver        = document.querySelector('#gameOver');
let methCollected   = document.querySelector('#methCollected');
let finalMethScore  = document.querySelector('#finalMethScore');
let moneyWin        = document.querySelector('#moneyWin');
let finalMoneyScore = document.querySelector('#finalMoneyScore');
let policeBribery   = document.querySelector('#policeBribery');
let briberyScore    = document.querySelector('#briberyScore');
let gameTotalTime   = document.querySelector('#gameTotalTime');
let timeScoreShow   = document.querySelector('#timeScoreShow');
let finalScore      = document.querySelector('#finalScore');


//////////////////////////////////// SetUp variables globales ///////////////////
let runner = new Runner();

// RANDOM TIME SETUP
let randomFrecuency = { 'min': 1, 'max': 3.5 };
let frecuency = 0;
let auxTime = 0;

// ENEMY SETUP
let totalSoborno = 0;
const ENEMIES = 6;
let enemiesArr = [];

// CLIENT SETUP
let totalSels = 0;
const CLIENT = 4;
let clientArr = [];

// METH SETUP
let totalMeth = 0;
let methStock = 0;
const METH = 3;
let methArr = [];


// MONEY SETUP
let totalMoney = 0;
let moneyStock = 0;
let methCost = 200;
let policeCometa = 1000;
moneyScore.innerHTML = moneyStock;

// LIFE SETUP
const LIFE_POOL = 5;
let lifes = LIFE_POOL;

// TIMER SETUP
let startTime = performance.now();
let gameTime = {'min': 0, 'seg': 0, 'ms': 0};

// POINTS GAME SETUP
const methPoints        = 100;
const moneyPoints       = 50;
const methSells         = 300;
const briberyPoints     = 3000;
const timeSecondsPoints = 5;





//////////////////////////////////// GAME ///////////////////////////////////
/* cada 50 milisegundos verifica estado del juego */
let game = setInterval(gameLoop, 50);
function gameLoop() {

    // Create random elements in random time
    if (performance.now() >= auxTime) {
        // recalculo el tiempo del proximo evento
        frecuency = getRandomNumber(randomFrecuency['min'], randomFrecuency['max']);
        auxTime = performance.now() + (frecuency * 1000);

        // calculo random de que elemento voy a crear: policia, cliente, meth
        let randomNumber = Math.random();

        // Compara el número aleatorio con rangos para asignar probabilidades
        // crea enemigos con probabilidad de 40%
        if (randomNumber < 0.4)
            enemyCreator();
        // Crea clientes con probabilidad del 30%
        else if (randomNumber < 0.7)
            clientCreator();
        // Crea meth on probabilidad del 30%
        else
            methCreator();
    }

    // verifica si recolecta metanfetamina
    colisionCheckMeth();

    // verifica si recolecta metanfetamina
    colisionCheckEnemy();

    // verifica si se encontro con un cliente
    colisionCheckClient()

    // verifica
    objectCollector();

    // check lifes
    gameControl();
}


function gameControl() {
    if (lifes == 0) {
        stopGame()
    }
}
 
function startGame() {
    beginScreen.style.display = "none";
    // TIME SETUP
    startTime = performance.now();

    // START INTERVALOS
    game = setInterval(gameLoop, 50);
    timerInterval = setInterval(checkTime, 10);

    // DETENER TODAS LAS ANIMACIONES
    let animacion = farMountain.getAnimations();
    startAnimation(animacion);
    animacion = flatMountain.getAnimations();
    startAnimation(animacion);
    animacion = stones1.getAnimations();
    startAnimation(animacion);
    animacion = stones2.getAnimations();
    startAnimation(animacion);
    animacion = stones3.getAnimations();
    startAnimation(animacion);
    animacion = stones4.getAnimations();
    startAnimation(animacion);
    animacion = ground.getAnimations();
    startAnimation(animacion);
    animacion = cielo.getAnimations();
    startAnimation(animacion);
    animacion = piso.getAnimations();
    startAnimation(animacion);
    animacion = personaje.getAnimations();
    startAnimation(animacion);

    // FRECUENCY SETUP
    auxTime = 0;

    // METH SETUP
    methStock = 0;
    totalMeth = 0;
    methScore.innerHTML = methStock;

    // MONEY SETUP
    totalMoney = 0;
    moneyStock = 0;
    moneyScore.innerHTML = moneyStock;

    // LIFE SETUP
    lifes = LIFE_POOL;
    lifeBar.style.backgroundPosition = `0px`;

    personaje.style.bottom = "12% !important";

    // OTHERS
    totalSels = 0;
    totalSoborno = 0;
}

function stopGame() {
    stopAnimations();
    renderScreens("game-over");
}

function stopAnimations(){
  // DETENER INTERVALOS
  clearInterval(game);
  clearInterval(timerInterval);

  // DETENER TODAS LAS ANIMACIONES
  let animacion = farMountain.getAnimations();
  stopAnimation(animacion);
  animacion = flatMountain.getAnimations();
  stopAnimation(animacion);
  animacion = stones1.getAnimations();
  stopAnimation(animacion);
  animacion = stones2.getAnimations();
  stopAnimation(animacion);
  animacion = stones3.getAnimations();
  stopAnimation(animacion);
  animacion = stones4.getAnimations();
  stopAnimation(animacion);
  animacion = ground.getAnimations();
  stopAnimation(animacion);
  animacion = cielo.getAnimations();
  stopAnimation(animacion);
  animacion = piso.getAnimations();
  stopAnimation(animacion);
  animacion = personaje.getAnimations();
  stopAnimation(animacion);
  // enemies
  enemiesArr.forEach((enemy) => {
      enemy.render(false);
  });
  // yonki
  clientArr.forEach((client) => {
      client.render(false);
  });
  // meth
  methArr.forEach((meth) => {
      meth.render(false);
  });
}

function stopAnimation(animaciones) {
    animaciones.forEach((animacion) => {
        animacion.pause();
    });
}
function startAnimation(animaciones) {
    animaciones.forEach((animacion) => {
        animacion.play();
    });
}


//////////////////////////////////// PERSONAJE PRINCIPAL ////////////////////////
document.addEventListener('keydown', () => {
    runner.saltar();
});




//////////////////////////////////// ENEMIGO ////////////////////////////////////
// genera el array de enemigos
for (let i = 0; i < ENEMIES; i++) {
    enemiesArr[i] = new Enemigo();
}

function enemyCreator() {
    for (let i = 0; i < ENEMIES; i++) {
        if (enemiesArr[i].status == "none") {
            enemiesArr[i].render(true);
            break;
        }
    }
}

//////////////////////////////////// CLIENTE ////////////////////////////////////
// genera el array de clientes
for (let i = 0; i < CLIENT; i++) {
    clientArr[i] = new Cliente();
}

function clientCreator() {
    for (let i = 0; i < CLIENT; i++) {
        if (clientArr[i].status == "none") {
            clientArr[i].render(true);
            break;
        }
    }
}

//////////////////////////////////// METH ////////////////////////////////////
// genera el array de enemigos
for (let i = 0; i < METH; i++) {
    methArr[i] = new Meth();
}

function methCreator() {
    for (let i = 0; i < METH; i++) {
        if (methArr[i].status == "none") {
            methArr[i].render(true);
            break;
        }
    }

}

//////////////////////////////////// Auxiliares ////////////////////////////////////

function objectCollector() {
    // enemies
    enemiesArr.forEach((enemy) => {
        if (enemy.status != "none")
            if (enemy.getOffsetLeft() >= window.innerWidth) {
                enemy.render(false);
            }
    });

    // yonki
    clientArr.forEach((client) => {
        if (client.status != "none")
            if (client.getOffsetLeft() >= window.innerWidth) {
                client.render(false);
            }
    });

    // meth
    methArr.forEach((meth) => {
        if (meth.status != "none")
            if (meth.getOffsetLeft() >= window.innerWidth) {
                meth.render(false);
            }
    });
}

/**
 * Funsión que devuelve un numero random entre un dos valores
 * 
 * @param {number} min 
 * @param {numbe} max 
 * @returns number
 */
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Procedimiento que recorre todas las metanfetaminas para chekear si estan en 
 * colisión con el personaje
 */
function colisionCheckMeth() {
    methArr.forEach((meth) => {
        if (meth.status != "none") {
            let div = meth.getDiv();
            if (estanEnContacto(div, 0)) {
                // desaparecer metanfetamina
                meth.render(false);
                // scoring Meth
                totalMeth++;
                methStock++;
                methScore.innerHTML = methStock;
                // efecto viasual
                // efecto de sonido
            }

        }
    });
}

/**
 * Procedimiento que recorre todos enemigos para chekear colision con el presonaje
 */
function colisionCheckEnemy() {
    enemiesArr.forEach((enemy) => {
        if (enemy.status != "none") {
            let div = enemy.getDiv();
            if (estanEnContacto(div, 90)) {
                // desaparecer policia
                enemy.render(false);

                if (moneyStock >= policeCometa) {
                    totalSoborno++;
                    moneyStock = moneyStock - policeCometa;
                    moneyScore.innerHTML = moneyStock;
                } else {
                    looseLife();
                }
                // efecto viasual
                // efecto de sonido
            }
        }
    });
}

/**
 * Procedimiento que recorre todos enemigos para chekear colision con el presonaje
 */
function colisionCheckClient() {
    clientArr.forEach((client) => {
        if (client.status != "none") {
            let div = client.getDiv();
            if (estanEnContacto(div, 90)) {
                client.render(false);

                // desaparecer metanfetamina
                if (methStock > 0) {
                    totalSels++;
                    // decrece meth stock
                    methStock--;
                    methScore.innerHTML = methStock;

                    // increase money stock
                    totalMoney = totalMoney + methCost;
                    moneyStock = moneyStock + methCost;
                    moneyScore.innerHTML = moneyStock;
                } else {
                    looseLife();
                }

                // efecto viasual
                // efecto de sonido
            }
        }
    });
}


/**
 * determina si la posición de un objeto pasado por parametro entro en 
 * colición con el personaje principal del juego
 * 
 * @param {object} objeto que coliciona con personaje
 * @param {number} tolerance achica el area de colision
 * @returns {boolean} true: coliciono / false: no colisiono
 */
function estanEnContacto(objeto, tolerance) {
    const rectObjeto = objeto.getBoundingClientRect();
    const rectPersonaje = personaje.getBoundingClientRect();

    return !(
        rectPersonaje.right < rectObjeto.left + tolerance ||
        rectPersonaje.left > rectObjeto.right - tolerance ||
        rectPersonaje.bottom < rectObjeto.top + tolerance ||
        rectPersonaje.top > rectObjeto.bottom - tolerance
    );
}


// Actualiza el temporizador en intervalos regulares (cada 10 ms)

let timerInterval = setInterval(checkTime, 10);
function checkTime() {
    // Calcula el tiempo transcurrido desde el momento inicial
    let elapsedTime = performance.now() - startTime;

    // Convierte el tiempo transcurrido a minutos, segundos y milisegundos
    let minutes = Math.floor(elapsedTime / 60000);
    let seconds = Math.floor((elapsedTime % 60000) / 1000);
    let milliseconds = Math.floor(elapsedTime % 1000);
    milliseconds = String(milliseconds).slice(0, 2);
    milliseconds = parseInt(milliseconds);

    // Formatea los minutos, segundos y milisegundos en el formato deseado (dos dígitos para cada componente)
    let formattedTime = `${padTime(minutes)}:${padTime(seconds)}:${milliseconds}`;

    // Actualiza el contenido del elemento <h1> con el temporizador
    timeScore.innerHTML = formattedTime;

    // almacena el tiempo de juego en una variable gobal
    gameTime = {'min': minutes, 'seg': seconds, 'ms': milliseconds};
}

// Función para agregar ceros a la izquierda del tiempo si es necesario
function padTime(value, length = 2) {
    return value.toString().padStart(length, '0');
}

function looseLife() {
    // resta una vida
    lifes--;

    // control life bar
    let anchoDeBarra = lifeBar.offsetWidth;
    let position = - anchoDeBarra + ((lifes) * anchoDeBarra / LIFE_POOL);
    lifeBar.style.backgroundPosition = `${position}px`;
}
function renderScreens(screen){
    switch (screen) {
        case "start":
            beginScreen.style.display   = 'block';
            explanations.style.display  = 'none';
            gameOver.style.display      = 'none';
            startScreen.style.display   = 'flex';
            break;
        case "explanations":
            beginScreen.style.display   = 'block';
            explanations.style.display  = 'block';
            gameOver.style.display      = 'none';
            startScreen.style.display   = 'none';
            break;
        case "game-over":
            beginScreen.style.display   = 'block';
            explanations.style.display  = 'none';
            gameOver.style.display      = 'flex';
            startScreen.style.display   = 'none';
            showPonits();
            break;
        // cerrar todo
        default: 
            beginScreen.style.display   = 'none';
            explanations.style.display  = 'none';
            gameOver.style.display      = 'none';
            startScreen.style.display   = 'none';
            break;
    }
}

function showPonits(){
    methCollected.innerHTML = totalMeth;
    let methTP = totalMeth * methPoints;
    finalMethScore.innerHTML = methTP;

    moneyWin.innerHTML = totalMoney;
    let moneyTP = totalMoney * moneyPoints;
    finalMoneyScore.innerHTML = moneyTP;

    policeBribery.innerHTML = totalSoborno;
    let briberyTP = totalSoborno * briberyPoints;
    briberyScore.innerHTML = briberyTP;

    gameTotalTime.innerHTML = `${padTime(gameTime['min'])}:${padTime(gameTime['seg'])}:${gameTime['ms']}`;
    let timeTP = (gameTime['min'] * 60 + gameTime['seg']) * timeSecondsPoints;
    timeScoreShow.innerHTML = timeTP;
    finalScore.innerHTML = methTP + moneyTP + briberyTP + timeTP
}

stopAnimations();
// renderScreens('game-over');
renderScreens('start');

