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

//////////////////////////////////// SetUp variables globales ///////////////////
let runner = new Runner();

// ENEMY SETUP
const ENEMIES = 6;
let enemiesArr = [];
let randomFrecuency = { 'min': 1.5, 'max': 3.5 };
let frecuencyEnemy = getRandomNumber(randomFrecuency['min'], randomFrecuency['max']);
let auxTimeEnemy = performance.now() + (frecuencyEnemy * 1000);

// ENEMY SETUP
const CLIENT = 4;
let clientArr = [];
let frecuencyCLient = Math.round(getRandomNumber(randomFrecuency['min'], randomFrecuency['max']));
let auxTimeClient = performance.now() + (frecuencyEnemy * 1000);

// METH SETUP
let methStock = 0;
const METH = 3;
let methArr = [];
let meth_multiplexor = 1;
let auxTimeMeth = (performance.now() + (frecuencyEnemy * 1000)) * meth_multiplexor;
methScore.innerHTML = methStock;

// MONEY SETUP
let moneyStock = 0;
let methCost = 200;
let policeCometa = 1000;
moneyScore.innerHTML = moneyStock;

// LIFE SETUP
const LIFE_POOL = 5;
let lifes = LIFE_POOL;

// TIMER SETUP
let startTime = performance.now();





//////////////////////////////////// GameLoop ///////////////////////////////////
/* cada 50 milisegundos verifica estado del juego */
let game = setInterval(gameLoop, 50);
function gameLoop() {

    // crea enemigos con frecuencia aleatoria
    enemyCreator();

    // crea clientes con frecuencia aleatoria
    clientCreator();

    // crea meth con frecuencia aleatoria
    methCreator();

    // verifica si recolecta metanfetamina
    colisionCheckMeth();

    // verifica si recolecta metanfetamina
    colisionCheckEnemy();

    // verifica si se encontro con un cliente
    colisionCheckClient()

    // verifica
    objectCollector();

    // check time
    gameControl();


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
    if (performance.now() >= auxTimeEnemy) {
        for (let i = 0; i < ENEMIES; i++) {
            if (enemiesArr[i].status == "none") {
                enemiesArr[i].render(true);
                break;
            }
        }
        frecuencyEnemy = getRandomNumber(randomFrecuency['min'], randomFrecuency['max']);
        auxTimeEnemy = performance.now() + (frecuencyEnemy * 1000);
    }
}

//////////////////////////////////// CLIENTE ////////////////////////////////////
// genera el array de clientes
for (let i = 0; i < CLIENT; i++) {
    clientArr[i] = new Cliente();
}

function clientCreator() {
    if (performance.now() >= auxTimeClient) {
        for (let i = 0; i < CLIENT; i++) {
            if (clientArr[i].status == "none") {
                clientArr[i].render(true);
                break;
            }
        }
        frecuencyCLient = getRandomNumber(randomFrecuency['min'], randomFrecuency['max']);
        auxTimeClient = performance.now() + (frecuencyCLient * 1000);
    }
}

//////////////////////////////////// METH ////////////////////////////////////
// genera el array de enemigos
for (let i = 0; i < METH; i++) {
    methArr[i] = new Meth();
}

function methCreator() {
    if (performance.now() >= auxTimeMeth) {
        for (let i = 0; i < METH; i++) {
            if (methArr[i].status == "none") {
                methArr[i].render(true);
                break;
            }
        }
        let frecuency = getRandomNumber(randomFrecuency['min'], randomFrecuency['max']);
        auxTimeMeth = (performance.now() + (frecuency * 1000)) * meth_multiplexor;
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

                if(moneyStock >= policeCometa){
                    moneyStock = moneyStock - policeCometa;
                    moneyScore.innerHTML = moneyStock;
                }else{
                    looseLife();
                }   
                // efecto viasual
                // efecto de sonido
                // aumenta vidas en juego
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

                console.log('client');
                // desaparecer metanfetamina
                if(methStock > 0){

                    // decrece meth stock
                    methStock--;
                    methScore.innerHTML = methStock;

                    // increase money stock
                    moneyStock = moneyStock + methCost;
                    moneyScore.innerHTML = moneyStock;
                }else{
                    looseLife();
                }

                // efecto viasual
                // efecto de sonido
                // aumenta vidas en juego
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
function checkTime(){
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
}

// Función para agregar ceros a la izquierda del tiempo si es necesario
function padTime(value, length = 2) {
    return value.toString().padStart(length, '0');
}

function looseLife(){
    // resta una vida
    lifes --;

    // control life bar
    let anchoDeBarra = lifeBar.offsetWidth;
    let position = - anchoDeBarra + ((lifes)*anchoDeBarra/LIFE_POOL);
    lifeBar.style.backgroundPosition = `${position}px`;
}

function gameControl() {
    if(lifes == 0){
        stopGame()
    }

}


function startGame(){
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

    // ENEMY SETUP
    frecuencyEnemy = getRandomNumber(randomFrecuency['min'], randomFrecuency['max']);
    auxTimeEnemy = performance.now() + (frecuencyEnemy * 1000);

    // ENEMY SETUP
    frecuencyCLient = Math.round(getRandomNumber(randomFrecuency['min'], randomFrecuency['max']));
    auxTimeClient = performance.now() + (frecuencyEnemy * 1000);

    // METH SETUP
    methStock = 0;
    auxTimeMeth = (performance.now() + (frecuencyEnemy * 1000)) * meth_multiplexor;
    methScore.innerHTML = methStock;

    // MONEY SETUP
    moneyStock = 0;
    moneyScore.innerHTML = moneyStock;

    // LIFE SETUP
    lifes = LIFE_POOL;
    lifeBar.style.backgroundPosition = `0px`;

}

function stopGame(){
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

function stopAnimation(animaciones){
    animaciones.forEach((animacion) => {
        animacion.pause();
      });
}
function startAnimation(animaciones){
    animaciones.forEach((animacion) => {
        animacion.play();
      });
}
