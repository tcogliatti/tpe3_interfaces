"use strict"
let contenedor = document.querySelector('#contenedor');
let ground = document.querySelector('#ground');


//////////////////////////////////// SetUp variables globales ///////////////////
const ENEMIES = 6;
let enemiesArr = [];
let runner = new Runner();
let randomFrecuency = {'min': 1, 'max': 3.5};
let frecuencyEnemy = getRandomNumber(randomFrecuency['min'], randomFrecuency['max']);
let auxTimeEnemy = performance.now() + (frecuencyEnemy * 1000);
const METH = 3;
let methArr = [];
let meth_multiplexor = 1.2;
let auxTimeMeth = (performance.now() + (frecuencyEnemy * 1000)) * meth_multiplexor;
const personaje = document.querySelector('#personaje');




//////////////////////////////////// GameLoop ///////////////////////////////////
/* cada 50 milisegundos verifica estado del juego */
setInterval(gameLoop, 50);
function gameLoop() {

    // crea enemigos con frecuencia aleatoria
    enemyCreator();

    // crea meth con frecuencia aleatoria
    methCreator();

    // verifica si recolecta metanfetamina
    colisionCheckMeth();

    // verifica si recolecta metanfetamina
    colisionCheckEnemy();

    // verifica
    objectCollector();


}



//////////////////////////////////// Personaje principal ////////////////////////
document.addEventListener('keydown', () => {
    runner.saltar();
});




//////////////////////////////////// Enemigo ////////////////////////////////////
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

//////////////////////////////////// Things ////////////////////////////////////
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

    // meth
    methArr.forEach((meth) => {
        if(meth.status != "none")
            if(meth.getOffsetLeft() >= window.innerWidth){
                meth.render(false);
            }
    });
}

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

function colisionCheckMeth(){
    methArr.forEach((meth) => {
        if(meth.status != "none"){
            let div = meth.getDiv();
            if(estanEnContacto(div, 0)){
                // desaparecer metanfetamina
                meth.render(false);
                // efecto viasual
                // efecto de sonido
                // aumenta vidas en juego
            }
        }
    });
}

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

