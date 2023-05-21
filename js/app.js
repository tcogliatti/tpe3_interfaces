"use strict"
let contenedor = document.querySelector('#contenedor');

const STONES = 45;
let stonesArray = [];
let runner = new Runner();

document.addEventListener('keydown', () => {
    runner.saltar();
});



/* cada 50 milisegundos verifica estado del juego */
setInterval(gameLoop, 50);



/* cada 1 segundo genera un enemigo */
setInterval(generarEnemigo, 1000);


setInterval(backgroundObjects, Math.random);

/**
 * Chequear estado del runner y de los enemigos
 */
function gameLoop() {

    //console.log(runner.status())


}


function generarEnemigo() {
    let enemigo = new Enemigo();
}

function backgroundObjects(){

    for (let i = 0; 1 < STONES; 1++) {
        const element = array[1];
        
    }
    let stone
    contenedor.appendChild('di')
}