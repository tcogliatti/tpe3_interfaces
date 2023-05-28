"use strict"
let contenedor = document.querySelector('#contenedor');
let ground = document.querySelector('#ground');

const STONES = 15;
let stonesArray = [];
let runner = new Runner();

document.addEventListener('keydown', () => {
    runner.saltar();
});



/* cada 50 milisegundos verifica estado del juego */
setInterval(gameLoop, 50);



/* cada 1 segundo genera un enemigo */
setInterval(generarEnemigo, 1000);


// setInterval(backgroundObjects, Math.random);

/**
 * Chequear estado del runner y de los enemigos
 */
function gameLoop() {

    //console.log(runner.status())


}


function generarEnemigo() {
    let enemigo = new Enemigo();
}












// backgroundObjects()

// function backgroundObjects(){

//     for (let i = 0; 1 < STONES; i++) {
//         // setStone()
//         console.log(i);
//     }
// }


// let altura = ground.offsetHeight;
// let ancho = ground.offsetWidth;
// let initY = ground.offsetTop;
// console.log('Alto', altura, "/ Ancho", ancho, '/init Y', initY);

// let stone = document.createElement('div');
// stone.style.bottom = `${initY+20}px`;
// stone.style.width = '178px';
// stone.style.height = '135px';
// stone.style.animation = 'stones 10s linear infinite';
// stone.classList.add("stones");
// stone.style.transform = 'scale(0.1)';
// stone.style.backgroundPosition = '178px';
// ground.appendChild(stone)



// function setStone(){
//     // obtengo el alto del div ground sobre el que se posarán las piedras
//     let altura = ground.offsetHeight;
//     let ancho = ground.offsetWidth;
//     let initY = ground.offsetTop

//     console.log('Alto', altura, "/ Ancho", ancho, '/init Y', initY);
//     // crea el elemento
//     let stone = document.createElement('div');
//     // asigan una altura ramdom

//     // stone.style.left = '50px';
//     stone.style.left = `${Math.floor(Math.random() * (100 + 1))}%`;
//     stone.id = 'stoneID';
//     stone.style.width = '178px';
//     stone.style.height = '135px';
//     stone.style.animation = 'stones 10s linear infinite';
//     stone.classList.add("stones");
    
//     let stoneHeight = stone.offsetHeight;
//     // let posY =  Math.random() * (altura);
//     // let posY =  Math.floor(Math.random() * 38);
//     let posY =  Math.floor(Math.random() * (63 - 26 + 1)) + 26;
//     stone.style.top = `${posY}%`;
//     let scale = ((posY-26) / 37)
//     stone.style.transform = `scale(${scale})`;
//     let spriteStone = 178 * 3;
//     stone.style.backgroundPosition = `${spriteStone}px`;

//     ground.appendChild(stone)
// }
// setStone()

// setInterval(() => {
// let stone = document.querySelector('#stoneID');

//     stone.syle.left = `${stone.offsetLeft + 2}px`;
// }, 100);