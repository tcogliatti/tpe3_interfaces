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
const maxRandomFrecuency = 3.5;
let randomFrecuency = { 'min': 1, 'max': maxRandomFrecuency };
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
const briberyPoints     = 500;
const timeSecondsPoints = 5;

// SOUND SETUP
const methSound = new Audio('../sound/meth.mp3');
const ouch1Sound = new Audio('../sound/ouch.mp3');
const sobornoSound = new Audio('../sound/soborno.mp3');
const sellSound = new Audio('../sound/sell.mp3');
const gameMusic = new Audio('../sound/gameMusic.mp3');
gameMusic.loop = true;
const wellcameMusic = new Audio('../sound/wellcameMusic.mp3');
wellcameMusic.loop = true;

// SPEED GAME SETUP
const initSpeedGame = 5.5;
const frecencyIncrese = 10000;
// const frecencyIncrese = 15000;
const amountIncrese = 0.1;
let speedGame = initSpeedGame;

//////////////////////////////////// GAME ///////////////////////////////////
/* cada 50 milisegundos verifica estado del juego */
let game = setInterval(gameLoop, 50);
function gameLoop() {

    // Create random elements in random time
    createElements();

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
 function createElements(){
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

 }

function gameControl() {
    if (lifes == 0) {
        stopGame()
    }
}

/**
 * Determina la velociodad del juego y la incrementa a medida que corre el tiempo
 */
let speedGameInterval = setInterval(speedGameFunction, frecencyIncrese);
function speedGameFunction() {
    speedGame = speedGame - amountIncrese;
    speedGame = Math.ceil(speedGame * 10) / 10;
    
    //setea la velocidad de los personajes
    setSpeed(speedGame);

    // disminuye el tiempo máximo del random de generar elementos
    randomFrecuency['max'] = randomFrecuency['max'] - amountIncrese;

}
function setSpeed(speed){
 // Enemigo
 enemiesArr.forEach((enemy) => {
    enemy.getDiv().style.animation = `enemigo ${speed}s forwards linear, correrEnemigo .4s steps(4) infinite`;
 });
 // Cliente
 clientArr.forEach((client) =>{
    client.getDiv().style.animation = `enemigo ${speed}s forwards linear, correrCliente .8s steps(8) infinite`;
 });
 // Metha
 methArr.forEach((meth) =>{
    meth.getDiv().style.animation = `things ${speed}s forwards linear`
 });
}



/*
    procedimiento que da inicio a juego
*/

function startGame() {
    // INIT PERSONAJE PRINCIPAL
    // document.addEventListener('keydown', saltar);

    // SET INIT SPEED GAME 
    speedGame = initSpeedGame;
    setSpeed(speedGame);

    // INICIAR MUSICA
    gameMusic.currentTime = 0;
    gameMusic.play();
    wellcameMusic.pause();

    // HIDE BEGIN SCREEN
    beginScreen.style.display = "none";

    // TIME SETUP
    startTime = performance.now();

    // START INTERVALOS
    game = setInterval(gameLoop, 50);
    timerInterval = setInterval(checkTime, 10);
    speedGameInterval = setInterval(speedGameFunction, frecencyIncrese);

    // INICIAR TODAS LAS ANIMACIONES
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
    randomFrecuency['max'] = maxRandomFrecuency;

    // METH SETUP
    methStock = 0;
    totalMeth = 0;
    methScore.innerHTML = methStock;

    // MONEY SETUP
    totalMoney = 0;
    moneyStock = 1000;
    moneyScore.innerHTML = moneyStock;

    // LIFE SETUP
    lifes = LIFE_POOL;
    lifeBar.style.backgroundPosition = `0px`;

    personaje.style.bottom = "12% !important";

    // OTHERS
    totalSels = 0;
    totalSoborno = 0;
}
/**
 * GAME OVER
 * este procedimiento detiene todas las animaciones y lleva a la pantalla de game over
 */
function stopGame() {
    // document.removeEventListener('keydown', saltar);
    gameMusic.pause();
    wellcameMusic.currentTime = 0;
    wellcameMusic.play();
    stopAnimations();
    renderScreens("game-over");
}

function stopAnimations(){
  // DETENER INTERVALOS
  clearInterval(game);
  clearInterval(timerInterval);
  clearInterval(speedGameInterval);

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


// funciones que detienen las animaciones de las colecciones que se pasan 
// como parametro
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

// procedimiento que se encarga de renderizar la barra de vidas y manejar la variable lifes
function looseLife() {
    // resta una vida
    lifes--;

    // control life bar
    let anchoDeBarra = lifeBar.offsetWidth;
    let position = - anchoDeBarra + ((lifes) * anchoDeBarra / LIFE_POOL);
    lifeBar.style.backgroundPosition = `${position}px`;
}



/**
 * Función tipo router
 * se encarga de esconder y renderizar las pantallas correspondientes
 * @param {String} screen 
 */
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
            explanations.style.display  = 'flex';
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

/**
 * Pagina de puntajes
 * Procedimiento encargado de calcular y renderizar los puntajes del final del juego
 */
function showPonits(){
    methCollected.innerHTML = totalMeth;
    let methTP = totalMeth * methPoints;
    finalMethScore.innerHTML = methTP;

    moneyWin.innerHTML = moneyStock;
    // moneyWin.innerHTML = totalMoney;
    let moneyTP = moneyStock * moneyPoints;
    // let moneyTP = totalMoney * moneyPoints;
    finalMoneyScore.innerHTML = moneyTP;

    policeBribery.innerHTML = totalSoborno;
    let briberyTP = totalSoborno * briberyPoints;
    briberyScore.innerHTML = '-'+briberyTP;

    gameTotalTime.innerHTML = `${padTime(gameTime['min'])}:${padTime(gameTime['seg'])}:${gameTime['ms']}`;
    let timeTP = (gameTime['min'] * 60 + gameTime['seg']) * timeSecondsPoints;
    timeScoreShow.innerHTML = timeTP;
    finalScore.innerHTML = methTP + moneyTP - briberyTP + timeTP
}
/**
 * Pagina de como jugar
 * procedimiento encatfado de mostrar como jugar
 * tambien se encarga de mostrar los valores y puntos correspondientes a cada elemento
 */
function showHowToPlay(){
    renderScreens("explanations")
    let data = document.querySelectorAll('#explanations span');
    data[0].innerHTML = methCost;
    data[1].innerHTML = policeCometa;
    data[2].innerHTML = methPoints;
    data[3].innerHTML = methSells;
    data[4].innerHTML = briberyPoints;
    data[5].innerHTML = moneyPoints;
    data[6].innerHTML = timeSecondsPoints;

}

//////////////////////////////////// PERSONAJE PRINCIPAL ////////////////////////
function saltar(){
    runner.saltar();
}



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
                    sobornoSound.play();
                } else {
                    looseLife();
                    ouch1Sound.play();
                }
            }
        }
    });
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
                    
                    // sonido de venta 
                    sellSound.play();
                } else {
                    looseLife();
                    ouch1Sound.play();
                }
            }
        }
    });
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

                // efecto de sonido
                methSound.play();
            }

        }
    });
}



//////////////////////////////////// Auxiliares ////////////////////////////////////
/**
 * PROCEDIMIENTO que verifica si cada objeto se encuentra en el lateral derecho de
 * la pantalla. Si es así lo esconde
 */
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





//////////////////////////////// EJECUCION INICAL CUANDO SE ENTRA A LA WEB ///////////////////////////////////////////////////

stopAnimations();
// renderScreens('game-over');
renderScreens('start');



