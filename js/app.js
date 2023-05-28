"use strict"
let contenedor = document.querySelector('#contenedor');
let ground = document.querySelector('#ground');
let methBar = document.querySelector('#methBarInside');
let moneyBar = document.querySelector('#moneyBarInside');
let personaje = document.querySelector('#personaje');

//////////////////////////////////// SetUp variables globales ///////////////////
let runner = new Runner();

// ENEMY SETUP
const ENEMIES = 6;
let enemiesArr = [];
let randomFrecuency = {'min': 1.5, 'max': 3.5};
let frecuencyEnemy = getRandomNumber(randomFrecuency['min'], randomFrecuency['max']);
let auxTimeEnemy = performance.now() + (frecuencyEnemy * 1000);

// ENEMY SETUP
const CLIENT = 4;
let clientArr = [];
let frecuencyCLient = Math.round(getRandomNumber(randomFrecuency['min'], randomFrecuency['max']));
let auxTimeClient = performance.now() + (frecuencyEnemy * 1000);

// METH SETUP
let methStock = 0;
const MAX_METH = 4;
const METH = 3;
let methArr = [];
let meth_multiplexor = 1.2;
let auxTimeMeth = (performance.now() + (frecuencyEnemy * 1000)) * meth_multiplexor;

// MONEY SETUP
let moneyStock = 0;
const MAX_MONEY = 100;


//////////////////////////////////// GameLoop ///////////////////////////////////
/* cada 50 milisegundos verifica estado del juego */
const game = setInterval(gameLoop, 50);
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
for(let i = 0; i < ENEMIES; i++) {
    enemiesArr[i] = new Enemigo();
}

function enemyCreator(){
    if(performance.now() >= auxTimeEnemy){
        for(let i = 0; i < ENEMIES; i++) {
            if(enemiesArr[i].status == "none"){
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
for(let i = 0; i < CLIENT; i++) {
    clientArr[i] = new Cliente();
}

function clientCreator(){
    if(performance.now() >= auxTimeClient){
        for(let i = 0; i < CLIENT; i++) {
            if(clientArr[i].status == "none"){
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
for(let i = 0; i < METH; i++) {
    methArr[i] = new Meth();
}

function methCreator(){
    if(performance.now() >= auxTimeMeth){
        for(let i = 0; i < METH; i++) {
            if(methArr[i].status == "none"){
                methArr[i].render(true);
                break;
            }
        }
        let frecuency = getRandomNumber(randomFrecuency['min'], randomFrecuency['max']);
        auxTimeMeth = (performance.now() + (frecuency * 1000)) * meth_multiplexor;
    }
    
}

//////////////////////////////////// Auxiliares ////////////////////////////////////

function objectCollector(){
    // enemies
    enemiesArr.forEach((enemy) => {
        if(enemy.status != "none")
            if(enemy.getOffsetLeft() >= window.innerWidth){
                enemy.render(false);
            }
    });

    // yonki
    clientArr.forEach((client) => {
        if(client.status != "none")
            if(client.getOffsetLeft() >= window.innerWidth){
                client.render(false);
            }
    });

    // meth
    methArr.forEach((meth) => {
        if(meth.status != "none")
            if(meth.getOffsetLeft() >= window.innerWidth){
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
function colisionCheckMeth(){
    methArr.forEach((meth) => {
        if(meth.status != "none"){
            let div = meth.getDiv();
            if(estanEnContacto(div, 0)){
                // desaparecer metanfetamina
                meth.render(false);
                if(methStock < MAX_METH){
                    methStock++;
                    methBarControl()
                    
                }
                // efecto viasual
                // efecto de sonido
                // aumenta vidas en juego
            }
        }
    });
}
looseAllMeth()
function methBarControl(){
    const anchoDeBarra = methBar.offsetWidth;
    const position = - anchoDeBarra + (methStock*anchoDeBarra/MAX_METH);
    methBar.style.backgroundPosition = `${position}px`;
    console.log(position);
}
function looseAllMeth(){
    const anchoDeBarra = methBar.offsetWidth;
    methBar.style.backgroundPosition = `-${anchoDeBarra}px`;
}
/**
 * Procedimiento que recorre todos enemigos para chekear colision con el presonaje
 */
function colisionCheckEnemy(){
    enemiesArr.forEach((enemy) => {
        if(enemy.status != "none"){
            let div = enemy.getDiv();
            if(estanEnContacto(div, 90)){
                console.log('arrested');
                // desaparecer metanfetamina
                enemy.render(false);
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
function colisionCheckClient(){
    clientArr.forEach((client) => {
        if(client.status != "none"){
            let div = client.getDiv();
            if(estanEnContacto(div, 90)){
                console.log('client');
                // desaparecer metanfetamina
                client.render(false);
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
        rectPersonaje.right   < rectObjeto.left     + tolerance    ||
        rectPersonaje.left    > rectObjeto.right    - tolerance    ||
        rectPersonaje.bottom  < rectObjeto.top      + tolerance               ||
        rectPersonaje.top     > rectObjeto.bottom   - tolerance
    );
  }

  function gameControl(){

  }

